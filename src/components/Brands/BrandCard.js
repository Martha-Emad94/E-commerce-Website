import React from 'react'
import { Col } from 'react-bootstrap'

const BrandCard = ({img}) => {
    return (
        <Col xs="6" sm="6" md="4" lg="2" className="d-flex justify-content-around my-4 ">
            <div className="Card">
            <img src={img} className="Card-img"/>
            </div>
        </Col>
    )
}

export default BrandCard

