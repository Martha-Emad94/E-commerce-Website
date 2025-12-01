
import { useSelector, useDispatch } from 'react-redux'
import { updateFilters, applyFilters } from '../../redux/slices/productsSlice'
import UnopDropdown from "unop-react-dropdown";
import { Badge, Button } from 'react-bootstrap'
import sort from '../../images/sort.png'

const SearchCount = ({title}) => {
    const dispatch = useDispatch();
    const { filteredProducts, filters, allProducts } = useSelector((state) => state.products);

    const handleSort = (sortType) => {
        try {
            dispatch(updateFilters({ sortBy: sortType }));
            dispatch(applyFilters());
        } catch (error) {
            console.error('Error sorting products:', error);
        }
    };

    const getSortLabel = (sortBy) => {
        try {
            switch (sortBy) {
                case 'price-asc': return 'السعر: من الأقل للأعلى';
                case 'price-desc': return 'السعر: من الأعلى للأقل';
                case 'rating': return 'الأعلى تقييماً';
                case 'name':
                default: return 'الاسم: أ-ي';
            }
        } catch (error) {
            console.error('Error getting sort label:', error);
            return 'الاسم: أ-ي';
        }
    };

    const getActiveFiltersCount = () => {
        try {
            let count = 0;
            if (filters.category) count++;
            if (filters.brand) count++;
            if (filters.priceRange.min || filters.priceRange.max) count++;
            return count;
        } catch (error) {
            console.error('Error getting active filters count:', error);
            return 0;
        }
    };

    return (
        <div className="d-flex justify-content-between pt-3 px-2 mx-5">
            <div className="d-flex align-items-center">
                <div className="sub-tile me-3">
                    {title || `تم العثور على ${filteredProducts.length} منتج`}
                </div>
                {getActiveFiltersCount() > 0 && (
                    <Badge bg="warning" text="dark" className="me-2">
                        {getActiveFiltersCount()} فلتر نشط
                    </Badge>
                )}
                {filteredProducts.length !== allProducts.length && (
                    <Badge bg="info" className="me-2">
                        {Math.round((filteredProducts.length / allProducts.length) * 100)}% من النتائج
                    </Badge>
                )}
            </div>
            <div className="search-count-text d-flex">
                <UnopDropdown
                    trigger={
                        <Button
                            variant="outline-primary"
                            size="sm"
                            className="d-flex align-items-center"
                        >
                            <span className="me-2">{getSortLabel(filters.sortBy)}</span>
                            <img
                                width="16px"
                                height="16px"
                                src={sort}
                                alt="ترتيب"
                            />
                        </Button>
                    }
                    delay={0}
                    align="CENTER"
                    hover>
                    <div className="card-filter">
                        <div
                            className="border-bottom card-filter-item d-flex justify-content-center"
                            onClick={() => handleSort('name')}
                        >
                            📝 الاسم: أ-ي
                        </div>
                        <div
                            className="border-bottom card-filter-item d-flex justify-content-center"
                            onClick={() => handleSort('rating')}
                        >
                            ⭐ الأعلى تقييماً
                        </div>
                        <div
                            className="border-bottom card-filter-item d-flex justify-content-center"
                            onClick={() => handleSort('price-asc')}
                        >
                            💰 السعر: من الأقل للأعلى
                        </div>
                        <div
                            className="card-filter-item d-flex justify-content-center"
                            onClick={() => handleSort('price-desc')}
                        >
                            💰 السعر: من الأعلى للأقل
                        </div>
                    </div>
                </UnopDropdown>
            </div>
        </div>
    )
}

export default SearchCount
