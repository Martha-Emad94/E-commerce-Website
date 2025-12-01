import { Container, Row } from 'react-bootstrap'
import Subtitle from '../Uility/SubTitle'
const ProductCardContainer = ({ title, bnttitle, text, children }) => {
    return (
        <Container>
            <Subtitle title={title} bnttitle={bnttitle} text={text} />
            <Row className=" d-flex justify-content-around m-2">
                {children}
            </Row>
        </Container>
    )
}

export default ProductCardContainer
