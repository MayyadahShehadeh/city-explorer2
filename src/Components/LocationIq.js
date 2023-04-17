import React, { Component } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

export class LocationIq extends Component {
  render() {
    return (
      <> 
      
      <Card style={{ width: '18rem', marginLeft: '110px' }}>
        <ListGroup variant="flush" >
          <ListGroup.Item>city name: {this.props.name}</ListGroup.Item>
          <ListGroup.Item>lat: {this.props.lat}</ListGroup.Item>
          <ListGroup.Item>lon: {this.props.lon}</ListGroup.Item>
        </ListGroup>
      </Card>
      <br />
    
      </>
    )
  }
}

export default LocationIq