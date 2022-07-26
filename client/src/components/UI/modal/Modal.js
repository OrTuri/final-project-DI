import style from "./Modal.module.css";
import Button from "../Form/Button";
import ReactDom from "react-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { resetModal } from "../../../features/modalSlice";

const Backdrop = (props) => {
  return <div className={style.backdrop}>{props.children}</div>;
};

const Modal = (props) => {
  const dispatch = useDispatch();
  const { isOpen, modalTitle, modalBody } = useSelector((state) => state.modal);
  return !isOpen
    ? null
    : ReactDom.createPortal(
        <Backdrop>
          <div className={style.modal}>
            <h3 className={style.title}>{modalTitle}</h3>
            <p className={style.body}>{modalBody}</p>
            <div className={style["btns-container"]}>
              <Button
                onClick={() => {
                  dispatch(resetModal());
                }}
                color={props.twoButtons ? "#B20600" : "#F0A500"}
                label={props.btn1Label}
              />
              {props.twoButtons && (
                <Button
                  onClick={props.onClick}
                  color="#125B50"
                  label={props.btn2Label}
                />
              )}
            </div>
          </div>
        </Backdrop>,
        document.getElementById("modal")
      );
};

export default Modal;
