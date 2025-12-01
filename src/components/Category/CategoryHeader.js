import { Container, Row, Col } from 'react-bootstrap'

const CategoryHeader = () => {
    return (
        <div className="Cat-header">
            <Container>
            <Row>
            <Col className="d-flex justify-content-start py-2 f-wrap">
            <div className="Category-header mx-1 ">All</div>
            <div className="Category-header mx-1">Electronics</div>
            <div className="Category-header mx-1">clothes</div>
            <div className="Category-header mx-1">Electrical devices</div>
            <div className="Category-header mx-1">clothes</div>
            <div className="Category-header mx-1">Electrical devices</div>
            <div className="Category-header mx-1">More</div>
            </Col>
            </Row>
            </Container>
        </div>
    )
}

export default CategoryHeader
