import Slider from '../../components/Home/slider/Slider'
import HomeCategory from '../../components/Home/Home_category/HomeCategory'
import ProductCardContainer from '../../components/Products/ProductCardContainer'
import DisCount from '../../components/Home/DisCount/DisCount'
import BrandFeature from '../../components/Brands/BrandFeature'
import BestSeller from '../../components/Best_seller/best_seller'
import BestRating from '../../components/Best_rating/best_rating'
const HomePage = () => {
    return (
        <div className="font " style={{ minHeight: '670px', minWidth: '100vw' }}>

            <Slider />
            <div className='container'>
                <HomeCategory />
                    <ProductCardContainer title="Best Seller"  text="/Products">
          <BestSeller />
        </ProductCardContainer>
                <DisCount />
          
        <ProductCardContainer title="Best Rating"  text="/Products">
         <BestRating/>
        </ProductCardContainer>
                <BrandFeature title="The Most Famous Brands" />
            </div>


        </div>
    )
}

export default HomePage;
