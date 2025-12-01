import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Spinner, Alert, Button, Badge } from 'react-bootstrap';
import { fetchAllProducts, fetchCategories, clearFilters } from '../../redux/slices/productsSlice';
import ReduxProductCard from './ReduxProductCard';

const ReduxProductsContainer = () => {
  const dispatch = useDispatch();
  const { 
    filteredProducts, 
    categories, 
    loading, 
    error,
    filters,
    allProducts
  } = useSelector((state) => state.products);

  useEffect(() => {
    // جلب المنتجات والفئات عند تحميل المكون
    try {
      dispatch(fetchAllProducts());
      dispatch(fetchCategories());
    } catch (error) {
      console.error('Error dispatching initial actions:', error);
    }
  }, [dispatch]);

  const handleClearFilters = () => {
    try {
      dispatch(clearFilters());
    } catch (error) {
      console.error('Error clearing filters:', error);
    }
  };

  const getActiveFiltersText = () => {
    try {
      const activeFilters = [];
      if (filters.category) activeFilters.push(`فئة: ${filters.category}`);
      if (filters.brand) activeFilters.push(`علامة: ${filters.brand}`);
      if (filters.priceRange.min || filters.priceRange.max) {
        const min = filters.priceRange.min || '0';
        const max = filters.priceRange.max || '∞';
        activeFilters.push(`سعر: ${min} - ${max}`);
      }
      return activeFilters.join(' • ');
    } catch (error) {
      console.error('Error getting active filters text:', error);
      return '';
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p className="mt-3">جاري تحميل المنتجات...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5">
        <Alert variant="danger">
          <Alert.Heading>خطأ في التحميل</Alert.Heading>
          <p>{error}</p>
          <Button 
            variant="outline-danger" 
            onClick={() => {
              try {
                dispatch(fetchAllProducts());
                dispatch(fetchCategories());
              } catch (error) {
                console.error('Error retrying:', error);
              }
            }}
          >
            🔄 إعادة المحاولة
          </Button>
        </Alert>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      {/* عرض عنوان الفئة أو العلامة التجارية المحددة */}
      {(filters.category || filters.brand) && (
        <div className="mb-4">
          <Row className="align-items-center">
            <Col>
              {filters.category && (
                <h4 className="text-primary mb-0">
                  📂 منتجات فئة: {filters.category}
                </h4>
              )}
              {filters.brand && (
                <h4 className="text-primary mb-0">
                  🏷️ منتجات علامة: {filters.brand}
                </h4>
              )}
              <p className="text-muted mb-0">
                تم العثور على {filteredProducts.length} منتج من أصل {allProducts.length}
              </p>
              {getActiveFiltersText() && (
                <small className="text-info">
                  الفلاتر النشطة: {getActiveFiltersText()}
                </small>
              )}
            </Col>
            <Col xs="auto">
              <Button 
                variant="outline-secondary" 
                size="sm"
                onClick={handleClearFilters}
              >
                🗑️ مسح الفلاتر
              </Button>
            </Col>
          </Row>
        </div>
      )}
      
      <Row>
        {filteredProducts.map((product) => (
          <Col key={product.id} lg={3} md={4} sm={6} className="mb-4">
            <ReduxProductCard product={product} />
          </Col>
        ))}
      </Row>

      {filteredProducts.length === 0 && !loading && (
        <div className="text-center py-5">
          <div className="mb-4">
            <h5>🔍 لا توجد منتجات</h5>
            <p className="text-muted">
              {filters.category
                ? `لا توجد منتجات في فئة "${filters.category}"`
                : filters.brand
                ? `لا توجد منتجات لعلامة "${filters.brand}"`
                : "جرب تغيير الفلاتر أو البحث عن منتجات أخرى"
              }
            </p>
          </div>

          {(filters.category || filters.brand) && (
            <div className="d-flex justify-content-center gap-2">
              <Button
                variant="primary"
                onClick={handleClearFilters}
                className="me-2"
              >
                📋 عرض جميع المنتجات
              </Button>
              <Button
                variant="outline-info"
                onClick={() => window.history.back()}
              >
                ↩️ العودة للصفحة السابقة
              </Button>
            </div>
          )}
        </div>
      )}

      {/* رسالة عند عدم وجود فلاتر نشطة */}
      {filteredProducts.length > 0 && filteredProducts.length === allProducts.length && (
        <div className="text-center mt-4">
          <Badge bg="light" text="dark" className="p-2">
            💡 تلميح: استخدم الفلاتر على اليسار لتصفية النتائج
          </Badge>
        </div>
      )}
    </Container>
  );
};

export default ReduxProductsContainer; 