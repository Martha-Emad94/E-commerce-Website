import { Card, Col, Row } from 'react-bootstrap';
import favoff from "../../images/fav-off.png";
import rate from "../../images/rate.png";
import { useEffect, useState } from 'react';
import instanceAxios from '../../axios/instanceaxios';
import './ProductCard.css';

const ProductCard = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    instanceAxios.get('/products')
      .then(res => setProducts(res.data.products))
      .catch(err => console.error(err));
  }, []);

  return (
    <Row className="g-4 p-3">
      {
        products.slice(0,4).map((product, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3}>
            <Card className="product h-100">
              <img 
                src={product.images[0]} 
                alt={product.title} 
                className="product-img"
              />
              <div className="productcard">
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div className="title">{product.title}</div>
                  <img className="favoff" src={favoff} alt="favorite icon" />
                </div>
                <p className="product-description">{product.description}</p>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <div className="d-flex align-items-center">
                    <img className="rate" src={rate} alt="rate icon" />
                    <p className="productrate mb-0 ms-1">{product.rating}</p>
                  </div>
                  <p className="productprice mb-0">{product.price}$</p>
                </div>
              </div>
            </Card>
          </Col>
        ))
      }
    </Row>
  )
}

export default ProductCard;
