
import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateFilters, applyFilters } from '../../redux/slices/productsSlice'
import CategoryHeader from '../../components/Category/CategoryHeader'
import SearchCount from '../../components/Uility/SearchCount'
import { Container, Row, Col} from 'react-bootstrap'
import Fliter from '../../components/Uility/Fliter'
import ReduxProductsContainer from '../../components/Products/ReduxProductsContainer'
import Pagination from '../../components/Uility/Pagination'

const ShopPage = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    
    useEffect(() => {
        
        if (location.state?.selectedCategory) {
            const selectedCategory = location.state.selectedCategory;
            
     
            dispatch(updateFilters({ category: selectedCategory }));
            dispatch(applyFilters());
            
   
            window.history.replaceState({}, document.title);
        }
        

        if (location.state?.selectedBrand) {
            const selectedBrand = location.state.selectedBrand;
            
       
            dispatch(updateFilters({ brand: selectedBrand }));
            dispatch(applyFilters());
            
       
            window.history.replaceState({}, document.title);
        }
    }, [location.state, dispatch]);
    
    return (
        <div style={{minHeight:"600px"}}>
            <Container>
            <SearchCount />
            <Row className="d-flex flex-row">
            <Col sm="2" xs="2" md="2" className="d-flex">
            <Fliter/>
            </Col>
            <Col sm="10" xs="10" md="10" className="d-flex">
            <ReduxProductsContainer />
            </Col>
            </Row>
            </Container>
            <Pagination/>
        </div>
    )
}

export default ShopPage
