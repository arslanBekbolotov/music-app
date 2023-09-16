import React from "react";
import { CircularProgress } from "@mui/material";

const Spinner = () => {
  return (
    <div
      style={{
        position: "absolute",
        top: "30%",
        left: "50%",
        transform: "translate(-50%",
      }}
    >
      <CircularProgress />
    </div>
  );
};

export default Spinner;
