import MoonLoader from "react-spinners/MoonLoader";

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
      <MoonLoader color="#36D7B7" />
    </div>
  );
};

export default Loader;
