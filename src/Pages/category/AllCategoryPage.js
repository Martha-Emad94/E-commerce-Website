import { useNavigate } from 'react-router-dom'
import { Button, Container, Row, Col, Card } from 'react-bootstrap'
import CategoryContainter from '../../components/Category/CategoryContainter'


const AllCategoryPage = () => {
    const navigate = useNavigate();

    const handleViewAllProducts = () => {
        navigate('/Products');
    };

    return (
        <div style={{
            minHeight: "100vh", 
            background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
            padding: '2rem 0'
        }}>
            <Container className="py-4">
                <Row className="mb-5">
                    <Col className="text-center">
                        <Card className="border-0 shadow-lg" style={{
                            background: 'rgba(255, 255, 255, 0.9)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '20px'
                        }}>
                            <Card.Body className="py-5">
                                <h2 className="text-primary mb-4">🛍️ تصفح الفئات</h2>
                                <p className="text-muted mb-4 fs-5">
                                    اكتشف مجموعتنا المتنوعة من المنتجات من خلال تصفح الفئات المختلفة
                                </p>
                                <div className="d-flex justify-content-center gap-3 flex-wrap">
                                    <Button 
                                        variant="primary" 
                                        size="lg"
                                        onClick={handleViewAllProducts}
                                        className="px-4 py-2"
                                        style={{
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 12px rgba(0, 123, 255, 0.3)'
                                        }}
                                    >
                                        📋 عرض جميع المنتجات
                                    </Button>
                                    <Button 
                                        variant="outline-primary" 
                                        size="lg"
                                        onClick={() => navigate('/Brands')}
                                        className="px-4 py-2"
                                        style={{
                                            borderRadius: '12px',
                                            borderWidth: '2px'
                                        }}
                                    >
                                        🏷️ تصفح العلامات التجارية
                                    </Button>
                                </div>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
            <CategoryContainter/>
        </div>
    )
}

export default AllCategoryPage
