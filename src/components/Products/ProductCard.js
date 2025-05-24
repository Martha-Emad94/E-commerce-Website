import React from 'react'
import { Card, Col } from 'react-bootstrap'
import labtop from "../../images/labtop.png";
import favoff from "../../images/fav-off.png";
import favon from "../../images/fav-on.png";
import rate from "../../images/rate.png";
const ProductCard = () => {
    return (
    <Col xs="6" sm="6" md="4" lg="3" className="d-flex my-4 ">
        <Card className=" my-2 product">
        <div className="productcard">
          <img src={labtop} className="product-img"/>
          <div className="d-flex justify-content-between m-2">
          <div className="title">Labtop</div>
          <img className="favoff" src={favoff}/>
          </div>
          <p>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <div className="d-flex justify-content-between m-2">
          <div  className="d-flex">
          <img className="rate mt-1" src={rate}/>
          <p className="productrate mx-1">4.5</p>
          </div>
          
          <p className="productprice">800$</p>
          </div>
        </div>
      </Card>
      </Col>
    )
}

export default ProductCard
