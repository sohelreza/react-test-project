import React, { Component } from "react";
import { Router } from "@reach/router";

import AllShipmentsList from "./AllShipmentsList";
import ShipmentDetails from "./ShipmentDetails";
import Example from "./Example";

class App extends Component {
  state = {};

  render() {
    return (
      <Router>
        <AllShipmentsList path="/" />
        <ShipmentDetails path="/details/:shipmentId" />
        <Example path="/ex" />
      </Router>
    );
  }
}

export default App;
