import React from 'react'
import { Container, Row } from 'react-bootstrap'
import ProductCard from './ProductCard'
import Subtitle from '../Uility/SubTitle'

const ProductCardContainer = ({title,bnttitle ,text}) => {
    return (
        <Container>
        <Subtitle title={title} bnttitle={bnttitle} text={text}/>
        <Row className=" d-flex justify-content-around m-2">
       <ProductCard/>
       <ProductCard/>
       <ProductCard/>
       <ProductCard/>
        </Row>
        </Container>
    )
}

export default ProductCardContainer
