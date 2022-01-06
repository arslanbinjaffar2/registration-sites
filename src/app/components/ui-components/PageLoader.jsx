import React from "react";

const PageLoader = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100vh",
        position: "absolute",
        zIndex: 111,
        backgroundColor: "#fff",
        top: 0,
      }}
    >
      <img
        style={{ width: "25%" }}
        src={require("img/fullPageLoader.gif")}
        alt=""
      />
    </div>
  );
};

export default PageLoader;
