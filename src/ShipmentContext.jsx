import React, { Component, createContext } from "react";
import axios from "axios";

export const ShipmentContext = createContext();

class ShipmentContextProvider extends Component {
  _isMounted = false;

  state = {
    allShipmentsData: [],
    sortedShipmentsData: [],
    loading: false,
    shipmentsListPerPage: 20,
    currentPage: 1,
  };

  //Getting All Data and Loading Status

  fetchShipmentsData = () => {
    this.setState({
      loading: true,
    });

    axios.get("http://localhost:3333/shipments").then((result) => {
      if (this._isMounted) {
        this.setState({
          allShipmentsData: result.data,
          loading: false,
          sortedShipmentsData: result.data,
        });
      }
    });
  };

  componentDidMount() {
    this._isMounted = true;

    this.fetchShipmentsData();
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  //Set Pagination
  paginate = (pageNumber) => this.setState({ currentPage: pageNumber });

  //Get Individual Shipment Data
  getShipmentData = (shipmentId) => {
    let tempShipmentsData = [...this.state.allShipmentsData];
    const shipmentData = tempShipmentsData.find(
      (shipment) => shipment.id === shipmentId
    );
    return shipmentData;
  };

  //Editing the shipment name
  editShipmentName = (shipmentId, newName) => {
    const objIndex = this.state.allShipmentsData.findIndex(
      (e) => e.id === shipmentId
    );
    const data = this.state.allShipmentsData[objIndex];

    axios
      .put("http://localhost:3333/shipments/" + shipmentId, {
        ...data,
        name: newName,
      })
      .then(
        //changing name in state
        this.setState((prevState) => ({
          allShipmentsData: prevState.allShipmentsData.map((eachItem) =>
            eachItem.id === shipmentId
              ? {
                  ...eachItem,
                  name: newName,
                }
              : eachItem
          ),
        }))
      );
  };

  //Search shipment by id

  searchShipmentById = (text) => {
    //console.log(text, "context");
    let filteredShipments = this.state.allShipmentsData.filter((data) => {
      return data.id.toLowerCase().indexOf(text.toLowerCase()) !== -1;
    });
    //console.log(filteredShipments);
    this.setState({ sortedShipmentsData: filteredShipments });
  };

  render() {
    const {
      sortedShipmentsData,
      loading,
      shipmentsListPerPage,
      currentPage,
    } = this.state;

    //Shipments List for Single Page
    const indexOfLastPost = currentPage * shipmentsListPerPage;
    const indexOfFirstPost = indexOfLastPost - shipmentsListPerPage;
    const listsOnThisPage = sortedShipmentsData.slice(
      indexOfFirstPost,
      indexOfLastPost
    );

    const totalShipments = sortedShipmentsData.length;

    return (
      <ShipmentContext.Provider
        value={{
          listsOnThisPage,
          loading,
          totalShipments,
          shipmentsListPerPage,
          paginate: this.paginate,
          getShipmentData: this.getShipmentData,
          editShipmentName: this.editShipmentName,
          searchShipmentById: this.searchShipmentById,
        }}
      >
        {this.props.children}
      </ShipmentContext.Provider>
    );
  }
}

export default ShipmentContextProvider;
