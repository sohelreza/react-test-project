import React, { Component } from "react";
import { ShipmentContext } from "./ShipmentContext";

class Example extends Component {
  static contextType = ShipmentContext;

  state = {};
  render() {
    return (
      <div>
        <p>hello</p>
      </div>
    );
  }
}

export default Example;
