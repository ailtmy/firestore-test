import React from "react";
import DataAddAndManage from "./components/DataAddAndManage";
import QueryCursor from "./components/QueryCursor";
import ReadData from "./components/ReadData";
import "./styles.css";

export default function App() {
  return (
    <>
      <DataAddAndManage />
      <hr />
      <ReadData />
      <hr />
      <QueryCursor />
    </>
  );
}
