import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import Main from "./components/Main";

const container = document.getElementById("root");
const root = ReactDOM.createRoot(container);
const router = (
    <React.StrictMode>
        <Main />
    </React.StrictMode>
);

root.render(router);
