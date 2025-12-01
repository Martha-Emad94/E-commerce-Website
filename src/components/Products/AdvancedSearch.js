import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Badge } from 'react-bootstrap';
import { FaSearch, FaFilter, FaTimes } from 'react-icons/fa';

const AdvancedSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [sortBy, setSortBy] = useState('name');
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    // جلب الفئات والعلامات التجارية
    fetchCategories();
    fetchBrands();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchBrands = async () => {
    try {
      const response = await fetch('https://dummyjson.com/products');
      const data = await response.json();
      const uniqueBrands = [...new Set(data.products.map(p => p.brand).filter(Boolean))];
      setBrands(uniqueBrands);
    } catch (error) {
      console.error('Error fetching brands:', error);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filters = {
      searchTerm,
      category: selectedCategory,
      brand: selectedBrand,
      priceRange,
      sortBy
    };
    onSearch(filters);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('');
    setSelectedBrand('');
    setPriceRange({ min: '', max: '' });
    setSortBy('name');
  };

  const hasActiveFilters = searchTerm || selectedCategory || selectedBrand || priceRange.min || priceRange.max;

  return (
    <Container fluid className="mb-4">
      <Card className="shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSearch}>
            <Row>
              <Col md={8}>
                <Form.Group className="mb-3">
                  <div className="input-group">
                    <span className="input-group-text">
                      <FaSearch />
                    </span>
                    <Form.Control
                      type="text"
                      placeholder="ابحث عن المنتجات..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </Form.Group>
              </Col>
              <Col md={4}>
                <div className="d-flex gap-2">
                  <Button 
                    variant="outline-secondary" 
                    onClick={() => setShowFilters(!showFilters)}
                    className="flex-fill"
                  >
                    <FaFilter className="me-2" />
                    الفلاتر
                  </Button>
                  <Button type="submit" variant="primary" className="flex-fill">
                    بحث
                  </Button>
                </div>
              </Col>
            </Row>

            {showFilters && (
              <Row className="mt-3">
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>الفئة</Form.Label>
                    <Form.Select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                    >
                      <option value="">جميع الفئات</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>العلامة التجارية</Form.Label>
                    <Form.Select
                      value={selectedBrand}
                      onChange={(e) => setSelectedBrand(e.target.value)}
                    >
                      <option value="">جميع العلامات</option>
                      {brands.map((brand) => (
                        <option key={brand} value={brand}>
                          {brand}
                        </option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>السعر</Form.Label>
                    <Row>
                      <Col>
                        <Form.Control
                          type="number"
                          placeholder="من"
                          value={priceRange.min}
                          onChange={(e) => setPriceRange({...priceRange, min: e.target.value})}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          type="number"
                          placeholder="إلى"
                          value={priceRange.max}
                          onChange={(e) => setPriceRange({...priceRange, max: e.target.value})}
                        />
                      </Col>
                    </Row>
                  </Form.Group>
                </Col>
                <Col md={3}>
                  <Form.Group className="mb-3">
                    <Form.Label>ترتيب حسب</Form.Label>
                    <Form.Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                    >
                      <option value="name">الاسم</option>
                      <option value="price-asc">السعر: من الأقل للأعلى</option>
                      <option value="price-desc">السعر: من الأعلى للأقل</option>
                      <option value="rating">التقييم</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>
            )}

            {hasActiveFilters && (
              <Row className="mt-3">
                <Col>
                  <div className="d-flex align-items-center gap-2 flex-wrap">
                    <span className="text-muted">الفلاتر النشطة:</span>
                    {searchTerm && (
                      <Badge bg="primary" className="d-flex align-items-center gap-1">
                        البحث: {searchTerm}
                        <FaTimes 
                          className="cursor-pointer" 
                          onClick={() => setSearchTerm('')}
                        />
                      </Badge>
                    )}
                    {selectedCategory && (
                      <Badge bg="success" className="d-flex align-items-center gap-1">
                        الفئة: {selectedCategory}
                        <FaTimes 
                          className="cursor-pointer" 
                          onClick={() => setSelectedCategory('')}
                        />
                      </Badge>
                    )}
                    {selectedBrand && (
                      <Badge bg="info" className="d-flex align-items-center gap-1">
                        العلامة: {selectedBrand}
                        <FaTimes 
                          className="cursor-pointer" 
                          onClick={() => setSelectedBrand('')}
                        />
                      </Badge>
                    )}
                    {(priceRange.min || priceRange.max) && (
                      <Badge bg="warning" className="d-flex align-items-center gap-1">
                        السعر: {priceRange.min || 0} - {priceRange.max || '∞'}
                        <FaTimes 
                          className="cursor-pointer" 
                          onClick={() => setPriceRange({min: '', max: ''})}
                        />
                      </Badge>
                    )}
                    <Button 
                      variant="outline-danger" 
                      size="sm"
                      onClick={clearFilters}
                    >
                      مسح الكل
                    </Button>
                  </div>
                </Col>
              </Row>
            )}
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default AdvancedSearch; 