import React from 'react'
import SubTitle from '../Uility/SubTitle'
import { Container, Row } from 'react-bootstrap'
import CategoryCard from '../Category/CategoryCard'
import clothe from "../../images/clothe.png";
import labtop from "../../images/labtop.png";
import pic from "../../images/pic.png";
import mobile from "../../images/mobile.png";
const HomeCategory = () => {
    return (
       <Container>

            <SubTitle title="Category" bnttitle="more" text="/Category"/>
            <Row className=" d-flex justify-content-around m-2">
            <CategoryCard title="Houseware" img={clothe} background="#034fff"/>
            <CategoryCard title="Houseware" img={labtop} background="#034fff"/>
            <CategoryCard title="Houseware" img={pic} background="#034fff"/>
            <CategoryCard title="Houseware" img={mobile} background="#034fff"/>
            <CategoryCard title="Houseware" img={clothe} background="#034fff"/>
            <CategoryCard title="Houseware" img={pic} background="#034fff"/>
            </Row>
       </Container>
    )
}

export default HomeCategory
