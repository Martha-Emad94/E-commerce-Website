import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Button, Form, Card, Badge } from 'react-bootstrap'
import { updateFilters, applyFilters, clearFilters } from '../../redux/slices/productsSlice'

const Fliter = () => {
    const dispatch = useDispatch();
    const { categories, filters, allProducts } = useSelector((state) => state.products);
    
    const [localFilters, setLocalFilters] = useState({
        category: filters.category || '',
        brand: filters.brand || '',
        priceRange: {
            min: filters.priceRange?.min || '',
            max: filters.priceRange?.max || ''
        }
    });

    // استخراج العلامات التجارية الفريدة
    const uniqueBrands = [...new Set(allProducts.map(product => product.brand).filter(Boolean))];

    useEffect(() => {
        try {
            setLocalFilters({
                category: filters.category || '',
                brand: filters.brand || '',
                priceRange: {
                    min: filters.priceRange?.min || '',
                    max: filters.priceRange?.max || ''
                }
            });
        } catch (error) {
            console.error('Error setting local filters:', error);
        }
    }, [filters]);

    const handleFilterChange = (filterType, value) => {
        try {
            const newFilters = { ...localFilters };
            
            if (filterType === 'priceRange') {
                newFilters.priceRange = { ...newFilters.priceRange, ...value };
            } else {
                newFilters[filterType] = value;
            }
            
            setLocalFilters(newFilters);
            
            // تطبيق الفلاتر
            dispatch(updateFilters(newFilters));
            dispatch(applyFilters());
        } catch (error) {
            console.error('Error changing filter:', error);
        }
    };

    const handleClearFilters = () => {
        try {
            dispatch(clearFilters());
            setLocalFilters({
                category: '',
                brand: '',
                priceRange: { min: '', max: '' }
            });
        } catch (error) {
            console.error('Error clearing filters:', error);
        }
    };

    // حساب عدد المنتجات المفلترة
    const getFilteredCount = () => {
        try {
            let count = allProducts.length;
            if (localFilters.category) count = allProducts.filter(p => p.category === localFilters.category).length;
            if (localFilters.brand) count = allProducts.filter(p => p.brand === localFilters.brand).length;
            return count;
        } catch (error) {
            console.error('Error calculating filtered count:', error);
            return 0;
        }
    };

    return (
        <div className="mt-3">
            <Card className="border-0 shadow-sm">
                <Card.Header className="bg-primary text-white">
                    <h6 className="mb-0">🔍 فلاتر البحث</h6>
                </Card.Header>
                <Card.Body>
                    <Row>
                        {/* قسم الفئات */}
                        <div className="d-flex flex-column mt-2">
                            <div className="filter-title d-flex justify-content-start mb-3">
                                <span className="fw-bold">📂 الفئات</span>
                                <Badge bg="info" className="ms-2">{categories.length}</Badge>
                            </div>
                            <div className="d-flex mt-2">
                                <Form.Check
                                    type="radio"
                                    name="category"
                                    checked={localFilters.category === ''}
                                    onChange={() => handleFilterChange('category', '')}
                                    className="me-2"
                                />
                                <div className="filter-sub">جميع الفئات</div>
                            </div>
                            {categories.map((category) => (
                                <div key={category} className="d-flex mt-2">
                                    <Form.Check
                                        type="radio"
                                        name="category"
                                        checked={localFilters.category === category}
                                        onChange={() => handleFilterChange('category', category)}
                                        className="me-2"
                                    />
                                    <div className="filter-sub">{category}</div>
                                </div>
                            ))}
                        </div>

                        {/* قسم العلامات التجارية */}
                        <div className="d-flex flex-column mt-4">
                            <div className="filter-title mt-3 d-flex justify-content-start mb-3">
                                <span className="fw-bold">🏷️ العلامات التجارية</span>
                                <Badge bg="secondary" className="ms-2">{uniqueBrands.length}</Badge>
                            </div>
                            <div className="d-flex mt-2">
                                <Form.Check
                                    type="radio"
                                    name="brand"
                                    checked={localFilters.brand === ''}
                                    onChange={() => handleFilterChange('brand', '')}
                                    className="me-2"
                                />
                                <div className="filter-sub">جميع العلامات</div>
                            </div>
                            {uniqueBrands.slice(0, 10).map((brand) => (
                                <div key={brand} className="d-flex mt-2">
                                    <Form.Check
                                        type="radio"
                                        name="brand"
                                        checked={localFilters.brand === brand}
                                        onChange={() => handleFilterChange('brand', brand)}
                                        className="me-2"
                                    />
                                    <div className="filter-sub">{brand}</div>
                                </div>
                            ))}
                            {uniqueBrands.length > 10 && (
                                <small className="text-muted mt-2">
                                    +{uniqueBrands.length - 10} علامة أخرى
                                </small>
                            )}
                        </div>

                        {/* قسم السعر */}
                        <div className="filter-title my-4 d-flex justify-content-start mb-3">
                            <span className="fw-bold">💰 نطاق السعر</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                            <span className="filter-sub me-2">من:</span>
                            <Form.Control
                                className="text-center"
                                type="number"
                                style={{ width: "80px", height: "30px" }}
                                value={localFilters.priceRange.min}
                                onChange={(e) => handleFilterChange('priceRange', { min: e.target.value })}
                                placeholder="0"
                            />
                        </div>
                        <div className="d-flex align-items-center mb-3">
                            <span className="filter-sub me-2">إلى:</span>
                            <Form.Control
                                className="text-center"
                                type="number"
                                style={{ width: "80px", height: "30px" }}
                                value={localFilters.priceRange.max}
                                onChange={(e) => handleFilterChange('priceRange', { max: e.target.value })}
                                placeholder="∞"
                            />
                        </div>

                        {/* معلومات الفلتر */}
                        {(localFilters.category || localFilters.brand || localFilters.priceRange.min || localFilters.priceRange.max) && (
                            <div className="mt-3 p-2 bg-light rounded">
                                <small className="text-muted">
                                    تم العثور على <strong>{getFilteredCount()}</strong> منتج
                                </small>
                            </div>
                        )}

                        {/* زر مسح الفلاتر */}
                        <div className="mt-3">
                            <Button
                                variant="outline-secondary"
                                size="sm"
                                onClick={handleClearFilters}
                                className="w-100"
                            >
                                🗑️ مسح جميع الفلاتر
                            </Button>
                        </div>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    )
}

export default Fliter
