const EmptyData = () => {
  return (
    <div
      style={{
        height: "100%",
        maxHeight: "15rem",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: 16,
      }}
    >
      <div>
        <img
          style={{ width: "100%", height: "120px" }}
          src="./assets/empty.svg"
          alt="No Data"
        />
        <h2>No transactions</h2>
      </div>
    </div>
  );
};

export default EmptyData;
