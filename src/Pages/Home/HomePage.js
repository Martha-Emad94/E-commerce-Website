import React from 'react'
import NavBar from '../../components/Uility/NavBar'
import Slider from '../../components/Home/Slider'
import HomeCategory from '../../components/Home/HomeCategory'
import ProductCardContainer from '../../components/Products/ProductCardContainer'
import DisCount from '../../components/Home/DisCount'
import BrandFeature from '../../components/Brands/BrandFeature'
import Footer from '../../components/Uility/Footer'

const HomePage = () => {
    return (
        <div className="font" style={{ minHeight: '670px', minWidth:'100vw'}}>
            
            <Slider/>
            <HomeCategory/>
            <ProductCardContainer title="Best Seller" bnttitle="more" text="/Products"/>
            <DisCount/>
            <ProductCardContainer title="Best Rating" bnttitle="more" text="/Products"/>
            <BrandFeature title="The Most Famous Brands" bnttitle="more"/>
            
        </div>
    )
}

export default HomePage;
