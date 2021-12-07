import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import {enableMapSet} from "immer";
enableMapSet();

ReactDOM.render(<App />, document.getElementById("root"));
