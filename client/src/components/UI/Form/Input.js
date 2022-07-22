import style from "./Input.module.css";

const Input = (props) => {
  return (
    <input
      style={{ margin: props.margin, width: props.width }}
      id={props.id}
      name={props.name}
      autoComplete={props.autoComplete}
      required={props.required}
      type={props.type}
      className={style.input}
      value={props.value}
      placeholder={props.placeholder}
      onChange={props.onChange}
    />
  );
};

export default Input;
