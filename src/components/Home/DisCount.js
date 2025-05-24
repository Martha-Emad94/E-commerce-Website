import React from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import laptops from "../../images/laptops.png";
const DisCount = () => {
    return (
    <Container>
      <Row className="discount d-flex text-center align-items-center">
            <Col sm="6">
            <img className="discount-img" src={laptops}/>
            </Col>
            <Col sm="6">
            <p className="discount-text" >There is a discount on laptops of up to 50 %.</p>
            </Col>
      </Row>
    </Container>
    )
}

export default DisCount
