import { Container, Row, Col } from 'react-bootstrap'
import phone from '../../images/phone.png'
import facebook from '../../images/facebook.png'
import instagram from '../../images/instagram.png'
import twitter from '../../images/twitter.png'
const Footer = () => {
    return (
        <div className="Footer mt-4 pt-2">
            <Container>
            <Row className="d-flex justify-content-between align-text-center">
            <Col sm="6" className="d-flex align-text-center">
            <div className="footer-shoort">Terms/Conditions</div>
            <div className="footer-shoort mx-2">Privacy Policy</div>
            <div className="footer-shoort ">Call Us</div>
            </Col>
            <Col sm="6" className="d-flex justify-content-end align-text-center">
            <div className="footer-phone d-flex mx-2 ">
            <img width="22px" height="22px" src={phone} alt=""/>01277784569
            </div>
            <div style={{cursor:"pointer"}}>
            <img width="22px" height="22px" src={facebook} alt=''/>
            </div>
            <div style={{cursor:"pointer"}}>
            <img width="22px" height="22px" src={instagram} alt=''/>
            </div>
            <div style={{cursor:"pointer"}}>
            <img width="22px" height="22px" src={twitter} alt=''/>
            </div>
            </Col>
            </Row>
            </Container>
        </div>
    )
}

export default Footer
