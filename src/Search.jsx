import React, { Component } from "react";
import { ShipmentContext } from "./ShipmentContext";

class Search extends Component {
  static contextType = ShipmentContext;

  state = {
    searchFieldText: "",
  };

  updateSearchField(e) {
    //console.log(e.target.value);
    this.setState({ searchFieldText: e.target.value });
    this.context.searchShipmentById(e.target.value);
    //console.log(this.state.searchFieldText);
  }

  render() {
    return (
      <form
        className="form-inline my-2 my-lg-0"
        onSubmit={(e) => {
          e.preventDefault();
          this.updateSearchField.bind(this);
        }}
      >
        <input
          className="form-control mr-sm-2"
          type="search"
          value={this.state.searchFieldText}
          onChange={this.updateSearchField.bind(this)}
          placeholder="Search by shipment id"
          aria-label="Search"
        />
        {/* <button className="btn btn-outline-danger my-2 my-sm-0">Cancel</button> */}
      </form>
    );
  }
}

export default Search;
