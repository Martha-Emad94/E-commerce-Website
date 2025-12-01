import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Modal, Form } from 'react-bootstrap';
import { FaShoppingCart, FaTrash, FaMinus, FaPlus, FaCreditCard } from 'react-icons/fa';

const ShoppingCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutForm, setCheckoutForm] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: ''
  });

  // حساب إجمالي السلة
  const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  // إضافة منتج للسلة
  const addToCart = (product) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === product.id);
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  // إزالة منتج من السلة
  const removeFromCart = (productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  };

  // تحديث كمية المنتج
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  // إتمام الطلب
  const handleCheckout = (e) => {
    e.preventDefault();
    // هنا يمكن إضافة منطق إرسال الطلب للخادم
    console.log('Order submitted:', { items: cartItems, total, customerInfo: checkoutForm });
    alert('تم إرسال طلبك بنجاح!');
    setCartItems([]);
    setShowCheckout(false);
    setShowCart(false);
  };

  return (
    <>
      {/* زر سلة التسوق */}
      <Button
        variant="outline-primary"
        className="position-relative"
        onClick={() => setShowCart(true)}
      >
        <FaShoppingCart />
        {itemCount > 0 && (
          <Badge
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: '0.7rem' }}
          >
            {itemCount}
          </Badge>
        )}
      </Button>

      {/* نافذة سلة التسوق */}
      <Modal show={showCart} onHide={() => setShowCart(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>سلة التسوق</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartItems.length === 0 ? (
            <div className="text-center py-5">
              <FaShoppingCart size={48} className="text-muted mb-3" />
              <h5>سلة التسوق فارغة</h5>
              <p className="text-muted">أضف بعض المنتجات لتبدأ التسوق</p>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <Card key={item.id} className="mb-3">
                  <Card.Body>
                    <Row className="align-items-center">
                      <Col md={2}>
                        <img
                          src={item.thumbnail}
                          alt={item.title}
                          className="img-fluid rounded"
                          style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                        />
                      </Col>
                      <Col md={4}>
                        <h6 className="mb-1">{item.title}</h6>
                        <p className="text-muted mb-0">{item.brand}</p>
                        <Badge bg="secondary">{item.category}</Badge>
                      </Col>
                      <Col md={2}>
                        <div className="d-flex align-items-center">
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <FaMinus />
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <FaPlus />
                          </Button>
                        </div>
                      </Col>
                      <Col md={2}>
                        <h6 className="mb-0">${item.price}</h6>
                        <small className="text-muted">
                          الإجمالي: ${(item.price * item.quantity).toFixed(2)}
                        </small>
                      </Col>
                      <Col md={2}>
                        <Button
                          variant="outline-danger"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <FaTrash />
                        </Button>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              ))}

              <div className="border-top pt-3">
                <Row>
                  <Col md={6}>
                    <h5>ملخص الطلب</h5>
                    <div className="d-flex justify-content-between">
                      <span>عدد المنتجات:</span>
                      <span>{itemCount}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>إجمالي السعر:</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                    <div className="d-flex justify-content-between">
                      <span>الشحن:</span>
                      <span>مجاني</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <strong>الإجمالي النهائي:</strong>
                      <strong>${total.toFixed(2)}</strong>
                    </div>
                  </Col>
                  <Col md={6}>
                    <Button
                      variant="primary"
                      className="w-100 mb-2"
                      onClick={() => {
                        setShowCart(false);
                        setShowCheckout(true);
                      }}
                    >
                      <FaCreditCard className="me-2" />
                      إتمام الطلب
                    </Button>
                    <Button
                      variant="outline-secondary"
                      className="w-100"
                      onClick={() => setShowCart(false)}
                    >
                      متابعة التسوق
                    </Button>
                  </Col>
                </Row>
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>

      {/* نافذة إتمام الطلب */}
      <Modal show={showCheckout} onHide={() => setShowCheckout(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>إتمام الطلب</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleCheckout}>
            <Row>
              <Col md={6}>
                <h6>معلومات العميل</h6>
                <Form.Group className="mb-3">
                  <Form.Label>الاسم الكامل</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={checkoutForm.name}
                    onChange={(e) => setCheckoutForm({...checkoutForm, name: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>البريد الإلكتروني</Form.Label>
                  <Form.Control
                    type="email"
                    required
                    value={checkoutForm.email}
                    onChange={(e) => setCheckoutForm({...checkoutForm, email: e.target.value})}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>رقم الهاتف</Form.Label>
                  <Form.Control
                    type="tel"
                    required
                    value={checkoutForm.phone}
                    onChange={(e) => setCheckoutForm({...checkoutForm, phone: e.target.value})}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <h6>عنوان التوصيل</h6>
                <Form.Group className="mb-3">
                  <Form.Label>العنوان</Form.Label>
                  <Form.Control
                    type="text"
                    required
                    value={checkoutForm.address}
                    onChange={(e) => setCheckoutForm({...checkoutForm, address: e.target.value})}
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>المدينة</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={checkoutForm.city}
                        onChange={(e) => setCheckoutForm({...checkoutForm, city: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>الرمز البريدي</Form.Label>
                      <Form.Control
                        type="text"
                        required
                        value={checkoutForm.zipCode}
                        onChange={(e) => setCheckoutForm({...checkoutForm, zipCode: e.target.value})}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Col>
            </Row>

            <div className="border-top pt-3">
              <h6>ملخص الطلب</h6>
              <div className="d-flex justify-content-between">
                <span>إجمالي المنتجات:</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>الشحن:</span>
                <span>مجاني</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between">
                <strong>الإجمالي النهائي:</strong>
                <strong>${total.toFixed(2)}</strong>
              </div>
            </div>

            <div className="d-flex gap-2 mt-3">
              <Button type="submit" variant="primary" className="flex-fill">
                تأكيد الطلب
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => setShowCheckout(false)}
                className="flex-fill"
              >
                إلغاء
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ShoppingCart; 