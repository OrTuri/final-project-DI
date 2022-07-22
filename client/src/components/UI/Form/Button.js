import style from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      style={{
        backgroundColor: props.color,
        width: props.width,
        margin: props.margin,
      }}
      type={props.type}
      className={style.btn}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default Button;
