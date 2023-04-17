import axios from "axios";
import React, { Component } from "react";
import Weather from "./Weather";
import Movies from "./Movies";
import { Row, Form, Button, Col } from "react-bootstrap";
import { LocationIq } from "./LocationIq";

let Token = process.env.REACT_APP_LOCATIONIQ_KEY;

export class CityExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      searchCity: "",
      showAll: false,
      errorMsg: false,
      weatherArray: [],
      moviesArray: []
    };
  }

  getCityLocation = async (e) => {
    e.preventDefault();

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
        moviesArray: moviesData.data,
        weatherArray: weatherData.data,
      });



      // console.log('moviess', this.state.moviesArray);
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
        {/* ---------------------------- Form ----------- */}
        <h1 style={{ textAlign: 'center', padding: '40px' }}>city explorer</h1>
        <Form onSubmit={this.getCityLocation} className="text-center">
          <Form.Control type="text" placeholder="Enter a City" name="city" style={{ width: "300px", marginLeft: '590px' }} className="text-center" />
          <br />
          <Button variant="primary" type="submit"> Explore!</Button>
        </Form>
        <br />
        {/* --------------------------------------------------- */}

        {this.state.showAll && (
          <>
            <Row>

              <Col>
                <LocationIq
                  name={this.state.cityData.display_name}
                  lat={this.state.cityData.lat}
                  lon={this.state.cityData.lon}
                />


                <Weather weatherInfo={this.state.weatherArray} />
              </Col>


              <Col>
                <img
                  src={`https://maps.locationiq.com/v3/staticmap?key=${Token}&center=${this.state.cityData.lat},${this.state.cityData.lon}&zoom=18&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>`}
                  style={{ width: '360pxpx', height: '450px' }} className="text-center" alt="map" />
              </Col>
            </Row>


            <br />
            <br />

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
