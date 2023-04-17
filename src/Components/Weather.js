import React, { Component } from "react";
import { Table } from "react-bootstrap";

export class Weather extends Component {
  render() {
    return (
      <>
        <Table striped bordered hover tyle={{ width: "14rem" }} className="text-center">
          <thead>
            <tr>
              <th > date:</th>
              <th>description:</th>
            </tr>
          </thead>
          {this.props.weatherInfo.slice(0, 4).map((item, idx) => {
            return (
              <>
              <tr>
                <td>{item.date}</td>
                <td>{item.description}</td>
              </tr>

              </>
            )


          })}
        </Table>
      </>
    );
  }
}

export default Weather;
