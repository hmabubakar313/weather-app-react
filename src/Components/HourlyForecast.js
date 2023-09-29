import React from 'react';
import {Card,Row,Col,Container} from 'react-bootstrap'
const HourlyForecastCard = ({ hour, temperature, icon }) => {
  return (
    <Row>
        <Col>
        <Card className="hourly-forecast-card bg-light m-2 " style={{width:"max-content"}}>
      <Card.Body className='' >
        <Card.Title>{hour}</Card.Title>
        <Card.Text>{temperature}&deg;C</Card.Text>
        <Card.Img src={icon} alt="Weather Icon" />
      </Card.Body>
    </Card>
        </Col>
    </Row>

  );
}



export default HourlyForecastCard;
