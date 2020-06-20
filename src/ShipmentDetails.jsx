import React, { Component } from "react";
import { ShipmentContext } from "./ShipmentContext";
import Name from "./Name";

class ShipmentDetails extends Component {
  static contextType = ShipmentContext;

  state = {
    id: this.props.shipmentId,
  };

  renderDetails(data) {
    if (data) {
      return (
        <div className="container mt-3 justify-content-center text-center">
          <h4 className="display-5 text-center">
            <Name name={data.name} shipmentId={this.props.shipmentId} />
            <br />
            <strong>Shipment ID</strong> : {data.id}
            <br />
            <strong>User ID</strong> : {data.userId}
            <br />
            <strong>Status</strong> : {data.status}
          </h4>
          <table className="table table-bordered">
            <tbody>
              <tr>
                <th scope="row">Cargo</th>
                {data.cargo.map((e) => {
                  return (
                    <td key={e.description}>
                      <strong>Type : </strong>
                      {e.type} <br />
                      <strong>Description : </strong>
                      {e.description}
                      <br />
                      <strong>Volume : </strong>
                      {e.volume}
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row">Mode</th>
                <td>{data.mode}</td>
              </tr>
              <tr>
                <th scope="row">Type</th>
                <td>{data.type}</td>
              </tr>
              <tr>
                <th scope="row">Destination</th>
                <td>{data.destination}</td>
              </tr>
              <tr>
                <th scope="row">Origin</th>
                <td>{data.origin}</td>
              </tr>
              <tr>
                <th scope="row">Services</th>
                {data.services.map((e) => {
                  return (
                    <td key={e.type}>
                      <strong>Type : </strong>
                      {e.type} <br />
                      <strong>Value : </strong>
                      {e.value ? e.value : "N/A"}
                      <br />
                    </td>
                  );
                })}
              </tr>
              <tr>
                <th scope="row">Total</th>
                <td>{data.total}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }

    return <h2 className="text-center">Loading...</h2>;
  }

  render() {
    const data = this.context.getShipmentData(this.state.id);

    return <>{this.renderDetails(data)}</>;
  }
}

export default ShipmentDetails;
