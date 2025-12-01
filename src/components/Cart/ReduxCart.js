import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Button, Badge, Modal, Form } from 'react-bootstrap';
import { 
  addToCart, 
  removeFromCart, 
  updateQuantity, 
  clearCart,
  increaseQuantity,
  decreaseQuantity
} from '../../redux/slices/cartSlice';
import { addNotification } from '../../redux/slices/notificationsSlice';

const ReduxCart = () => {
  const dispatch = useDispatch();
  const { items, total, itemCount } = useSelector((state) => state.cart);
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

  // إضافة منتج للسلة
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    dispatch(addNotification({
      type: 'success',
      title: 'تم الإضافة بنجاح',
      message: `تم إضافة ${product.title} لسلة التسوق`,
      duration: 3000
    }));
  };

  // إزالة منتج من السلة
  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
    dispatch(addNotification({
      type: 'info',
      title: 'تم الإزالة',
      message: 'تم إزالة المنتج من سلة التسوق',
      duration: 3000
    }));
  };

  // تحديث كمية المنتج
  const handleUpdateQuantity = (productId, newQuantity) => {
    dispatch(updateQuantity({ productId, quantity: newQuantity }));
  };

  // زيادة كمية المنتج
  const handleIncreaseQuantity = (productId) => {
    dispatch(increaseQuantity(productId));
  };

  // تقليل كمية المنتج
  const handleDecreaseQuantity = (productId) => {
    dispatch(decreaseQuantity(productId));
  };

  // إتمام الطلب
  const handleCheckout = (e) => {
    e.preventDefault();
    dispatch(addNotification({
      type: 'success',
      title: 'تم إرسال الطلب',
      message: 'تم إرسال طلبك بنجاح! سنتواصل معك قريباً.',
      duration: 5000
    }));
    dispatch(clearCart());
    setShowCheckout(false);
    setShowCart(false);
    setCheckoutForm({
      name: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      zipCode: ''
    });
  };

  return (
    <>
      {/* زر سلة التسوق */}
      <Button
        variant="outline-primary"
        className="position-relative"
        onClick={() => setShowCart(true)}
      >
        🛒
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
          {items.length === 0 ? (
            <div className="text-center py-5">
              <h5>سلة التسوق فارغة</h5>
              <p className="text-muted">أضف بعض المنتجات لتبدأ التسوق</p>
            </div>
          ) : (
            <>
              {items.map((item) => (
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
                            onClick={() => handleDecreaseQuantity(item.id)}
                          >
                            -
                          </Button>
                          <span className="mx-2">{item.quantity}</span>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => handleIncreaseQuantity(item.id)}
                          >
                            +
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
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          🗑️
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
                      💳 إتمام الطلب
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

export default ReduxCart; 