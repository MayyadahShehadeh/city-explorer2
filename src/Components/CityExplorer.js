import axios from "axios";
import React, { Component } from "react";
import Weather from "./Weather";
import Movies from "./Movies";
import { Row, Form, Button } from "react-bootstrap";

let Token = process.env.REACT_APP_LOCATIONIQ_KEY;

export class CityExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      searchCity: "",
      showAll: false,
      errorMsg: false,
      weatherObj: [],
      moviesArray: []
    };
  }

  getCityLocation = async (e) => {
    e.preventDefault();
    console.log("hii");

    await this.setState({
      searchCity: e.target.city.value,
    });

    // ---------------- get locationIQ api -------------
    let locaUrl = `https://eu1.locationiq.com/v1/search?key=${Token}&q=${this.state.searchCity}&format=json`;
    try {
      let locData = await axios.get(locaUrl);

      // ------------- get weather api from local server -----------
      let weatherData = await axios.get(
        `http://localhost:3001/weather?searchQuery=${this.state.searchCity}`
      );
      console.log("weather dattaaaa", weatherData.data);

      // ----------- get movies api from local server ---------
      let moviesData = await axios.get(
        `http://localhost:3001/movies?searchQuery=${this.state.searchCity}`
      )
      console.log('axios moviesss', moviesData);
      this.setState({
        cityData: locData.data[0],
        showAll: true,
        moviesArray: moviesData.data
        // weatherObj: weatherData.data,
      });
      console.log('moviess', this.state.moviesArray);
    } catch (error) {
      console.log("error:", error);
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
        <Form onSubmit={this.getCityLocation}>
          <Form.Control type="text" placeholder="Enter a City" name="city" style={{ width: "300px" }} />
          <Button variant="primary" type="submit">
            Explore!
          </Button>
        </Form>

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
            <Row xs={1} md={5} className="g-4">
              {this.state.moviesArray.map((item, idx) => {
                return (
                  <Movies
                    key={idx}
                    movieTitle={item.title}
                    movieImg={item.imageUrl}
                    movieOverview={item.overview}
                  />
                )
              })}
            </Row>
          </>
        )}

        {this.state.errorMsg && <p>error message</p>}
      </>
    );
  }
}

export default CityExplorer;
