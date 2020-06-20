import React, { Component } from "react";
import { Link } from "@reach/router";
import { ShipmentContext } from "./ShipmentContext";

class Pagination extends Component {
  static contextType = ShipmentContext;

  state = {};

  render() {
    const { totalShipments, shipmentsListPerPage, paginate } = this.context;
    const pageNumbers = [];
    for (
      let i = 1;
      i <= Math.ceil(totalShipments / shipmentsListPerPage);
      i++
    ) {
      pageNumbers.push(i);
    }

    return (
      <nav>
        <ul className="pagination justify-content-center">
          {pageNumbers.map((number) => (
            <li key={number} className="page-item">
              <Link
                onClick={() => paginate(number)}
                to="/"
                className="page-link"
              >
                {number}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    );
  }
}

export default Pagination;
