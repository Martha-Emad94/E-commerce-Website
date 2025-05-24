import React from 'react'
import { Container, Row } from 'react-bootstrap'
import CategoryCard from '../Category/CategoryCard'
import clothe from "../../images/clothe.png";
import labtop from "../../images/labtop.png";
import pic from "../../images/pic.png";
import mobile from "../../images/mobile.png";
const CategoryContainter = () => {
    return (
        <Container>
            <Row className=" d-flex justify-content-around m-2">
                <div className="sub-title m-4">Category</div>
                <CategoryCard title="Houseware" img={clothe} background="#034fff"/>
                <CategoryCard title="Houseware" img={labtop} background="#034fff"/>
                <CategoryCard title="Houseware" img={pic} background="#034fff"/>
                <CategoryCard title="Houseware" img={mobile} background="#034fff"/>
                <CategoryCard title="Houseware" img={clothe} background="#034fff"/>
                <CategoryCard title="Houseware" img={pic} background="#034fff"/>
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

export default CategoryContainter
