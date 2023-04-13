import axios from "axios";
import React, { Component } from "react";
import Weather from "./Weather";

let Token = process.env.REACT_APP_LOCATIONIQ_KEY;

export class CityExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      searchCity: "",
      showAll: false,
      errorMsg: false,
      weatherObj: {},
    };
  }

  getCityLocation = async (e) => {
    e.preventDefault();
    console.log("hii");

    await this.setState({
      searchCity: e.target.city.value,
    });
    let locaUrl = `https://eu1.locationiq.com/v1/search?key=${Token}&q=${this.state.searchCity}&format=json`;
    try {
      let locData = await axios.get(locaUrl);

      let weatherData = await axios.get(
        `http://localhost:3001/weather?searchQuery=${this.state.searchCity}`
      );
      console.log("weather dattaaaa", weatherData.data);
      this.setState({
        cityData: locData.data[0],
        showAll: true,
        weatherObj: weatherData.data,
      });
    } catch (error) {
      this.setState({
        showAll: false,
        errorMsg: true,
      });
    }
  };

  render() {
    return (
      <>
        <h1>city explorer</h1>
        <form onSubmit={this.getCityLocation}>
          <input type="text" placeholder="Enter a City" name="city" />
          <button>Explore!</button>
        </form>

        {this.state.showAll && (
          <>
            <p>
              {this.state.cityData.display_name}
              <br />
              lat: {this.state.cityData.lat}
              <br />
              lon: {this.state.cityData.lon}
              <br />
            </p>
            <Weather weatherInfo={this.state.weatherObj} />
            <img
              src={`https://maps.locationiq.com/v3/staticmap?key=${Token}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=18&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>`}
            />
          </>
        )}

        {this.state.errorMsg && <p>error message</p>}
      </>
    );
  }
}

export default CityExplorer;
