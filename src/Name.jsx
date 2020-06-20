import React, { Component } from "react";
import { ShipmentContext } from "./ShipmentContext";

class Name extends Component {
  static contextType = ShipmentContext;

  state = {
    isEditing: false,
  };

  toggleEditing = (e) => {
    this.setState({
      isEditing: !this.state.isEditing,
    });
  };

  editNameSubmitHandler = (e) => {
    e.preventDefault();
    this.context.editShipmentName(this.props.shipmentId, this.newName.value);
    this.toggleEditing();
  };

  render() {
    if (this.state.isEditing) {
      return (
        <form onSubmit={this.editNameSubmitHandler}>
          <div className="form-group">
            <label htmlFor="shipmentName">Shipment Name</label>
            <input
              type="text"
              defaultValue={this.props.name}
              ref={(name) => {
                this.newName = name;
              }}
              className="form-control"
              id="shipmentName"
              aria-describedby="shipmentName"
              placeholder="Enter Shipment Name"
            />
            <small id="shipmentName" className="form-text text-muted">
              You can edit the shipment name or give it a new name.
            </small>
          </div>
          <button type="submit" className="btn btn-success ml-2">
            Save
          </button>
          <button
            type="button"
            onClick={this.toggleEditing}
            className="btn btn-danger ml-2"
          >
            Cancel
          </button>
        </form>
      );
    }

    return (
      <span>
        <strong>Name</strong> : {this.props.name}
        <button onClick={this.toggleEditing} className="btn btn-primary ml-2">
          Edit Name
        </button>
      </span>
    );
  }
}

export default Name;
