import axios from "axios";
import React, { Component } from "react";
let Token = process.env.REACT_APP_LOCATIONIQ_KEY;
export class CityExplorer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cityData: {},
      searchCity: "",
      showLonLat:false,
      showMap: false
    };
  }

  getCityLocation = async (e) => {
    e.preventDefault();
    console.log("hii");

   await this.setState({
      searchCity: e.target.city.value,
    });
    let locaUrl = `https://eu1.locationiq.com/v1/search?key=${Token}&q=${this.state.searchCity}&format=json`;
    let locData = await axios.get(locaUrl);

    this.setState({
      cityData: locData.data[0],
      showLonLat:true,
      showMap:true
    });
    console.log("data:::", cityData);

  };

  render() {
    return (
      <>
      <h1>city explorer</h1>
        <form onSubmit={this.getCityLocation}>
          <input type="text" placeholder="Enter a City" name="city" />
          <button>Explore!</button>
        </form>
{this.state.showLonLat && 
        <p>
          {this.state.cityData.display_name}lat: {this.state.cityData.lat} lon:
          {this.state.cityData.lon}
        </p>

}
{
    this.state.showMap &&
        <img
        src={
            "https://maps.locationiq.com/v3/staticmap?key=" +
            Token +
            "&center=" +
            this.state.cityData.lat +
            "," +
            this.state.cityData.lon +
            "&zoom=18&size=<width>x<height>&format=<format>&maptype=<MapType>&markers=icon:<icon>|<latitude>,<longitude>&markers=icon:<icon>|<latitude>,<longitude>"
        }
        />
    }
      </>
    );
  }
}

export default CityExplorer;
