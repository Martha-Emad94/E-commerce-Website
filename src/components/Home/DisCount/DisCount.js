import {   Container} from 'react-bootstrap'
import laptop from '../../../images/laptops.png';

import home from '../../../images/fr.png';
import beauty from '../../../images/1.webp';
import Carousel from 'react-bootstrap/Carousel';
import './DisCount.css'; // Assuming you have a CSS file for styling

const DisCount = () => {
  const discountData = [
  {
    img: laptop,
    text: "There is a discount on laptops of up to 50 %."
  },
  {
    img: home,
    text: "Special offer: Free shipping on orders over $500."
  },
  {
    img: beauty,
    text: "Buy one get one free on accessories."
  }
];
  return (
    <Container>
      <Carousel className='discount'>
        {discountData.map((item, index) => (
          <Carousel.Item key={index} className="discount-item">
            <Carousel.Caption >
               <img className=" discount-img" src={item.img} alt={`Slide ${index}`} />
            </Carousel.Caption>
           
            <Carousel.Caption >
              <p className="discount-text">{item.text}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
}

export default DisCount
