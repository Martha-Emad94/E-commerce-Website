import React, { useState } from 'react'
import slider1 from "../../images/slider1.png";
import slider4 from "../../images/slider4.png";
import prod3 from "../../images/prod3.png";
import prod4 from "../../images/prod4.png";
import { Carousel} from 'react-bootstrap'

const Slider = () => {
   
        const [index, setIndex] = useState(0);
      
        const handleSelect = (selectedIndex) => {
          setIndex(selectedIndex);
        };
    
    return (
        <div>
        <Carousel activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item className="slide-bg1" interval={1000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img className="slide-img" src={slider1} />
          <Carousel.Caption >
          <div>
            <h3 className="slide-label">There is a big discount</h3>
            <p className="slide-text">Up to 50 % discount.</p>
            </div>
          </Carousel.Caption>
          </div>
        </Carousel.Item>

        <Carousel.Item className="slide-bg2" interval={1000}>
        <div className="d-flex flex-row justify-content-center align-items-center slide">
          <img className="slide-img" src={slider4} />
          <Carousel.Caption >
          <div>
            <h3 className="slide-label">There is a big discount</h3>
            <p className="slide-text">Up to 50 % discount.</p>
            </div>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        
        
        <Carousel.Item className="slide-bg3" interval={1000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img className="slide-img"  src={prod3}/>
          <Carousel.Caption >
          <div>
            <h3 className="slide-label">There is a big discount</h3>
            <p className="slide-text">
            Up to 50 % discount.
            </p>
            </div>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        
        
        <Carousel.Item className="slide-bg4" interval={1000}>
        <div className="d-flex flex-row justify-content-center align-items-center">
          <img className="slide-img" src={prod4}/>
          <Carousel.Caption >
          <div>
            <h3 className="slide-label">There is a big discount</h3>
            <p className="slide-text">
            Up to 50 % discount.
            </p>
            </div>
          </Carousel.Caption>
          </div>
        </Carousel.Item>
        
        
      </Carousel>
        </div>
    )

}

export default Slider;
