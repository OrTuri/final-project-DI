import style from "./Container.module.css";

const Container = ({ children }) => {
  return <section className={style.container}>{children}</section>;
};

export default Container;
