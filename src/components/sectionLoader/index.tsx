import { BeatLoader } from "react-spinners";

const Loader = () => {
  return (
    <div
      style={{
        height: "70vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BeatLoader color="#3f6ad8" />
    </div>
  );
};

export function SectionLoader() {
  return (
    <div
      style={{
        height: "10rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <BeatLoader color="#3f6ad8" />
    </div>
  );
}

export default Loader;
