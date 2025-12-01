import SubTitle from '../../Uility/SubTitle';
import { Container, Row } from 'react-bootstrap';
import CategoryCard from '../../Category/CategoryCard';
import { useState, useEffect } from 'react';
import instanceAxios from '../../../axios/instanceaxios';

const HomeCategory = () => {
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);

  useEffect(() => {
    instanceAxios.get('/products/categories')
      .then(res => {
        setCategories(res.data);
        // لكل category، اطلبي أول منتج من url بتاعها
        res.data.forEach(cat => {
          instanceAxios.get(`/products/category/${cat.slug}`)
            .then(prodRes => {
              const firstProduct = prodRes.data.products[0];
              setCategoryProducts(prev => [
                ...prev,
                {
                  name: cat.name,
                  product: firstProduct
                }
              ]);
            });
        });
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <Container>
      <SubTitle title="Category" bnttitle="more" text="/Category" />
      <Row className="d-flex justify-content-around m-2" style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        gap: '10px',
        paddingBottom: '10px'
      }}>
        {categoryProducts.slice(0,5).map((catProd, index) => (
          <CategoryCard
            key={index}
            title={catProd.name}
            img={catProd.product && catProd.product.images.length > 0 ? catProd.product.images[0] : ''}
            background="#034fff"
          />
        ))}
      </Row>
    </Container>
  );
};

export default HomeCategory;
