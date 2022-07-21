import style from "./Button.module.css";

const Button = (props) => {
  return (
    <button
      style={{ backgroundColor: props.color }}
      type={props.type}
      className={style.btn}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
};

export default Button;
