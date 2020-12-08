import React from "react";
import ListGroup from "./listGroup";
import Container from "./container";

const Content = (props) => {
  const { theme } = props;
  return (
    <div className="container">
      <div className="row">
        <ListGroup theme={theme} />
        <Container theme={theme} />
      </div>
    </div>
  );
};

export default Content;
