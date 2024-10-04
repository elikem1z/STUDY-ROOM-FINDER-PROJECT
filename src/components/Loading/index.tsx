import React from "react";

const Loading = ({ loadingText = "Loading" }) => (
    <div className="loading">
        <h2>{loadingText}...</h2>
    </div>
);

export default Loading;
