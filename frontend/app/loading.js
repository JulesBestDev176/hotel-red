import { Ripple } from "react-css-spinners";

export default function Loading() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "black",
      }}
    >
      <Ripple color="rgba(245,166,35,1)" size={100} thickness={7} />
    </div>
  );
}
