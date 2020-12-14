import React, { Component } from "react";
import ListGroup from "./listGroup";
import Container from "./container";
// document.documentElement.clientHeight,
// document.documentElement.clientWidth

class Content extends Component {
  state = {
    deviceType: "computer",
  };

  UNSAFE_componentWillMount = () => {
    let { deviceType } = this.state;
    if (document.documentElement.clientWidth < 500) {
      deviceType = "mobile";
      this.setState({ deviceType });
    } else {
      return;
    }
  };

  render() {
    const { theme } = this.props;
    return (
      <div className="container">
        <div className="row">
          {this.state.deviceType === "computer" && <ListGroup theme={theme} />}

          <Container theme={theme} />
        </div>
      </div>
    );
  }
}

export default Content;
