import { BlinkBlur } from "react-loading-indicators";

const Loading = () => {
  return (
    <div
      style={{
        position: "absolute",
        width: "100%",
        height: "100vh",
        left: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BlinkBlur color="#06ebb1" size="large" text="" textColor="" />
    </div>
  );
};
export default Loading;
