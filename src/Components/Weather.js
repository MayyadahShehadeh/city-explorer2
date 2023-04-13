import React, { Component } from "react";

export class Weather extends Component {
  render() {
    return (
      <>
        {this.props.weatherInfo.map((item) => {
          return(
          <p>
            date: {item.date}
            <br />
            description: {item.description}
          </p>

          )
        })}
      </>
    );
  }
}

export default Weather;
