import FadeLoader from "react-spinners/FadeLoader";
import { useSelector } from "react-redux";

const Loader = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "5px",
      }}
    >
      <p>LOADING...</p>
      <FadeLoader color="#36D7B7" size={300} />
    </div>
  );
};

export default Loader;
