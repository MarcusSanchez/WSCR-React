import React from "react";
import ReactDOM from "react-dom";
import Nav from "./components/Nav/Nav";
import App from "./components/App/App";

ReactDOM.render(
    (
        <React.StrictMode>
            <Nav />
            <App />
        </React.StrictMode>
    ),
    document.getElementsByTagName("body")[0]
);