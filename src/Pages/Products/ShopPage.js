import React from 'react'
import CategoryHeader from '../../components/Category/CategoryHeader'
import SearchCount from '../../components/Uility/SearchCount'
import { Container, Row, Col} from 'react-bootstrap'
import Fliter from '../../components/Uility/Fliter'
import ProductCardContainer from '../../components/Products/ProductCardContainer'
import Pagination from '../../components/Uility/Pagination'
const ShopPage = () => {
    return (
        <div style={{minHeight:"600px"}}>
            <CategoryHeader/>
            <Container>
            <SearchCount title="400 Search Result ..."/>
            <Row className="d-flex flex-row">
            <Col sm="2" xs="2" md="2" className="d-flex">
            <Fliter/>
            </Col>
            <Col sm="10" xs="10" md="10" className="d-flex">
            <ProductCardContainer title="" bnttitle="" />
            </Col>
            </Row>
            </Container>
            <Pagination/>
        </div>
    )
}

export default ShopPage
