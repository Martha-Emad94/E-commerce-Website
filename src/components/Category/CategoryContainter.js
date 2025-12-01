import { useEffect, useState } from 'react'
import { Container, Row, Col, Spinner } from 'react-bootstrap'
import CategoryCard from './CategoryCard';
import instanceAxios from '../../axios/instanceaxios';

const CategoryContainter = () => {
 const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [loading, setLoading] = useState(true);

 useEffect(() => {
  setLoading(true);
  instanceAxios.get('/products/categories')
    .then(res => {
      setCategories(res.data);
      res.data.forEach(cat => {
        instanceAxios.get(`/products/category/${cat.slug}`)
          .then(prodRes => {
            const firstProduct = prodRes.data.products[0];
            setCategoryProducts(prev => {
         
              if (prev.some(item => item.name === cat.name)) {
                return prev; 
              }
              return [
                ...prev,
                {
                  name: cat.name,
                  product: firstProduct
                }
              ];
            });
          })
          .catch(err => console.error(`Error loading products for ${cat.name}`, err));
      });
    })
    .catch(err => console.error('Error loading categories', err))
    .finally(() => setLoading(false));
}, []);



if (loading) {
  return (
    <Container className="py-5">
      <div className="text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">جاري تحميل الفئات...</p>
      </div>
    </Container>
  );
}

  return (
      <Container>
         <Row className="d-flex justify-content-around m-2" style={{
           display: 'flex',
           whiteSpace: 'nowrap',
           gap: '10px',
           paddingBottom: '10px'
         }}>
           {categoryProducts.map((catProd, index) => (
             <CategoryCard
               key={index}
               title={catProd.name}
               img={catProd.product && catProd.product.images.length > 0 ? catProd.product.images[0] : ''}
            
             />
           ))}
         </Row>
    
      
      {categoryProducts.length === 0 && !loading && (
        <div className="text-center py-5">
          <h5>لا توجد فئات متاحة</h5>
          <p className="text-muted">جاري تحميل الفئات...</p>
        </div>
      )}
    </Container>
  );
};

export default CategoryContainter
