import React, { Component } from "react";
import { Card,Col} from "react-bootstrap";

export class Movies extends Component {
  render() {
    return (
      <>
      <Col>
        <Card style={{ width: "14rem" }}>
          <Card.Img variant="top" src={this.props.movieImg} />
          <Card.Body>
            <Card.Title>{this.props.movieTitle}</Card.Title>
            <Card.Text>
              {this.props.movieOverview}
            </Card.Text>
          </Card.Body>
        </Card>
        </Col>
      </>
    );
  }
}

export default Movies;
