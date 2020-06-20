import React, { Component } from "react";
import { Link } from "@reach/router";
import { ShipmentContext } from "./ShipmentContext";

import Pagination from "./Pagination";
import Search from "./Search";
import Sort from "./Sort";

class AllShipmentsList extends Component {
  static contextType = ShipmentContext;

  state = {};

  render() {
    const { loading, listsOnThisPage } = this.context;

    return (
      <div className="container mt-3">
        <div className="list-group mb-2">
          <h1 className="display-4 text-center">Shipments List</h1>
          {loading ? (
            <h2 className="text-center">Loading...</h2>
          ) : (
            <>
              <span className="d-flex justify-content-between">
                <Pagination />
                <Search />
                <Sort />
              </span>
              <div className="mb-2">
                {listsOnThisPage.map((shipment) => {
                  return (
                    <Link
                      to={"/details/" + shipment.id}
                      className="list-group-item list-group-item-action"
                      key={shipment.id}
                    >
                      <div className="d-flex w-100 justify-content-between mb-2">
                        <h5 className="mb-1">{shipment.name}</h5>
                        <small>{shipment.status}</small>
                      </div>
                      <p className="mb-1">
                        <strong>{shipment.origin}</strong> to
                        <strong> {shipment.destination}</strong>
                      </p>
                      <small>
                        <strong>ID : </strong>
                        {shipment.id}
                      </small>
                      <br />
                      <small>
                        <strong>User ID : </strong>
                        {shipment.userId}
                      </small>
                    </Link>
                  );
                })}
              </div>
              <Pagination />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default AllShipmentsList;
