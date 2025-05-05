import React from "react";
import "./card.css";

const DiscoverMore = ({ texte }) => {
  return (
    <button
      style={{
        width: "fit-content",
      }}
      className="btn p-2 rounded-3"
    >
      {texte}
    </button>
  );
};

export default DiscoverMore;
