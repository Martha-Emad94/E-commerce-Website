import React from 'react'
import BrandCard from './BrandCard'
import brand1 from "../../images/brand1.png";
import brand2 from "../../images/brand2.png";
import brand3 from "../../images/brand3.png";
import { Container,Row } from 'react-bootstrap';
import Subtitle from '../Uility/SubTitle'
const BrandFeature = ({title,bnttitle,text}) => {
    return (
   
        <Container>
        <Subtitle title={title} bnttitle={bnttitle} text="/Brands" />
        <Row className=" d-flex justify-content-around m-2">
            <BrandCard img={brand1}/>
            <BrandCard img={brand2}/>
            <BrandCard img={brand3}/>
            <BrandCard img={brand1}/>
            <BrandCard img={brand2}/>
            <BrandCard img={brand3}/>
            </Row>
            </Container>   
        
    )
}

export default BrandFeature
