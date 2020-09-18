import React from "react";

const Pages = (props) => {
  return <p>{props.match.params.id}</p>;
};

export default Pages;
