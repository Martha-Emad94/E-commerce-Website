import React from 'react'
import { Col, Row } from 'react-bootstrap'

const CategoryCard = ({img ,title,background}) => {
    return (
        
            <Col xs="6" sm="6" md="4" lg="2" className="d-flex justify-content-around my-4 ">
            <div className="Card">
            <div className="categoty-card "
            style={{ backgroundColor: `${background}` }}></div>
            <img src={img} className="Card-img"/>
            <p className="Card-title mt-2">{title}</p>
            </div>
            </Col>

    );
}

export default CategoryCard
