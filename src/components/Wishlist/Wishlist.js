import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal } from 'react-bootstrap';
import { FaHeart, FaTrash, FaShoppingCart, FaEye } from 'react-icons/fa';

const Wishlist = () => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [showWishlist, setShowWishlist] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // إضافة منتج للمفضلة
  const addToWishlist = (product) => {
    setWishlistItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (!existingItem) {
        return [...prevItems, product];
      }
      return prevItems;
    });
  };

  // إزالة منتج من المفضلة
  const removeFromWishlist = (productId) => {
    setWishlistItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // نقل منتج من المفضلة لسلة التسوق
  const moveToCart = (product) => {
    // هنا يمكن إضافة منطق إضافة المنتج لسلة التسوق
    console.log('Moving to cart:', product);
    removeFromWishlist(product.id);
    alert('تم نقل المنتج لسلة التسوق');
  };

  // عرض تفاصيل المنتج
  const showProductDetails = (product) => {
    setSelectedItem(product);
    setShowDetails(true);
  };

  return (
    <>
      {/* زر قائمة المفضلة */}
      <Button
        variant="outline-danger"
        className="position-relative"
        onClick={() => setShowWishlist(true)}
      >
        <FaHeart />
        {wishlistItems.length > 0 && (
          <Badge
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: '0.7rem' }}
          >
            {wishlistItems.length}
          </Badge>
        )}
      </Button>

      {/* نافذة قائمة المفضلة */}
      <Modal show={showWishlist} onHide={() => setShowWishlist(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>قائمة المفضلة</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {wishlistItems.length === 0 ? (
            <div className="text-center py-5">
              <FaHeart size={48} className="text-muted mb-3" />
              <h5>قائمة المفضلة فارغة</h5>
              <p className="text-muted">أضف بعض المنتجات لقائمة المفضلة</p>
            </div>
          ) : (
            <Row>
              {wishlistItems.map((item) => (
                <Col md={6} key={item.id} className="mb-3">
                  <Card className="h-100">
                    <div className="position-relative">
                      <Card.Img
                        variant="top"
                        src={item.thumbnail}
                        alt={item.title}
                        style={{ height: '200px', objectFit: 'cover' }}
                      />
                      <div className="position-absolute top-0 end-0 p-2">
                        <Button
                          variant="danger"
                          size="sm"
                          onClick={() => removeFromWishlist(item.id)}
                        >
                          <FaTrash />
                        </Button>
                      </div>
                    </div>
                    <Card.Body>
                      <Card.Title className="h6">{item.title}</Card.Title>
                      <Card.Text className="text-muted small mb-2">
                        {item.brand} • {item.category}
                      </Card.Text>
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="fw-bold">${item.price}</span>
                        <Badge bg="success">{item.rating} ⭐</Badge>
                      </div>
                      <div className="d-flex gap-2">
                        <Button
                          variant="primary"
                          size="sm"
                          className="flex-fill"
                          onClick={() => moveToCart(item)}
                        >
                          <FaShoppingCart className="me-1" />
                          إضافة للسلة
                        </Button>
                        <Button
                          variant="outline-secondary"
                          size="sm"
                          onClick={() => showProductDetails(item)}
                        >
                          <FaEye />
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowWishlist(false)}>
            إغلاق
          </Button>
        </Modal.Footer>
      </Modal>

      {/* نافذة تفاصيل المنتج */}
      <Modal show={showDetails} onHide={() => setShowDetails(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>تفاصيل المنتج</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedItem && (
            <Row>
              <Col md={6}>
                <img
                  src={selectedItem.thumbnail}
                  alt={selectedItem.title}
                  className="img-fluid rounded"
                />
              </Col>
              <Col md={6}>
                <h4>{selectedItem.title}</h4>
                <p className="text-muted">{selectedItem.brand}</p>
                <Badge bg="secondary" className="mb-3">{selectedItem.category}</Badge>
                
                <div className="mb-3">
                  <h5 className="text-primary">${selectedItem.price}</h5>
                  <div className="d-flex align-items-center mb-2">
                    <span className="me-2">التقييم:</span>
                    <Badge bg="success">{selectedItem.rating} ⭐</Badge>
                    <span className="ms-2 text-muted">({selectedItem.stock} متوفر)</span>
                  </div>
                </div>

                <p className="mb-3">{selectedItem.description}</p>

                <div className="d-flex gap-2">
                  <Button
                    variant="primary"
                    className="flex-fill"
                    onClick={() => {
                      moveToCart(selectedItem);
                      setShowDetails(false);
                    }}
                  >
                    <FaShoppingCart className="me-2" />
                    إضافة لسلة التسوق
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => {
                      removeFromWishlist(selectedItem.id);
                      setShowDetails(false);
                    }}
                  >
                    <FaTrash />
                  </Button>
                </div>
              </Col>
            </Row>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
};

export default Wishlist; 