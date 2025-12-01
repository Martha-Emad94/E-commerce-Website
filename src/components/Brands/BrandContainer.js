import BrandCard from './BrandCard'
import brand1 from "../../images/brand1.png";
import { Container,Row } from 'react-bootstrap';
const BrandContainer = () => {
    return (
        <Container>
            <Row className="d-flex justify-content-center align-items-center flex-column">
            <div className="sub-title m-4">Brands</div>
              <BrandCard img={brand1}/>
            </Row>
          
          
           
            </Container>   
        
    )
}

export default BrandContainer
