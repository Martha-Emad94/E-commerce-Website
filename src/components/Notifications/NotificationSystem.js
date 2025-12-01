import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Toast, ToastContainer, Badge, Button, Modal } from 'react-bootstrap';
import { FaBell, FaTimes, FaCheck, FaExclamationTriangle, FaInfoCircle } from 'react-icons/fa';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // حساب عدد الإشعارات غير المقروءة
    setUnreadCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  // إضافة إشعار جديد
  const addNotification = (type, title, message, duration = 5000) => {
    const newNotification = {
      id: Date.now(),
      type, // 'success', 'error', 'warning', 'info'
      title,
      message,
      timestamp: new Date(),
      read: false
    };

    setNotifications(prev => [newNotification, ...prev]);

    // إزالة الإشعار تلقائياً بعد المدة المحددة
    if (duration > 0) {
      setTimeout(() => {
        removeNotification(newNotification.id);
      }, duration);
    }
  };

  // إزالة إشعار
  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  // تحديد إشعار كمقروء
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  // تحديد جميع الإشعارات كمقروءة
  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  // مسح جميع الإشعارات
  const clearAllNotifications = () => {
    setNotifications([]);
  };

  // الحصول على أيقونة حسب نوع الإشعار
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return <FaCheck className="text-success" />;
      case 'error':
        return <FaTimes className="text-danger" />;
      case 'warning':
        return <FaExclamationTriangle className="text-warning" />;
      case 'info':
        return <FaInfoCircle className="text-info" />;
      default:
        return <FaBell />;
    }
  };

  // الحصول على لون حسب نوع الإشعار
  const getNotificationColor = (type) => {
    switch (type) {
      case 'success':
        return 'success';
      case 'error':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'primary';
    }
  };

  return (
    <>
      {/* زر الإشعارات */}
      <Button
        variant="outline-secondary"
        className="position-relative"
        onClick={() => setShowNotifications(true)}
      >
        <FaBell />
        {unreadCount > 0 && (
          <Badge
            bg="danger"
            className="position-absolute top-0 start-100 translate-middle"
            style={{ fontSize: '0.7rem' }}
          >
            {unreadCount}
          </Badge>
        )}
      </Button>

      {/* نافذة الإشعارات */}
      <Modal show={showNotifications} onHide={() => setShowNotifications(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>الإشعارات</Modal.Title>
          <div className="ms-auto">
            <Button
              variant="outline-primary"
              size="sm"
              onClick={markAllAsRead}
              className="me-2"
            >
              تحديد الكل كمقروء
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={clearAllNotifications}
            >
              مسح الكل
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          {notifications.length === 0 ? (
            <div className="text-center py-5">
              <FaBell size={48} className="text-muted mb-3" />
              <h5>لا توجد إشعارات</h5>
              <p className="text-muted">ستظهر هنا الإشعارات الجديدة</p>
            </div>
          ) : (
            <div className="notification-list">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`notification-item p-3 border-bottom ${
                    !notification.read ? 'bg-light' : ''
                  }`}
                  onClick={() => markAsRead(notification.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <div className="d-flex align-items-start">
                    <div className="me-3 mt-1">
                      {getNotificationIcon(notification.type)}
                    </div>
                    <div className="flex-grow-1">
                      <div className="d-flex justify-content-between align-items-start">
                        <h6 className="mb-1">{notification.title}</h6>
                        <div className="d-flex align-items-center">
                          {!notification.read && (
                            <Badge bg="primary" className="me-2">جديد</Badge>
                          )}
                          <small className="text-muted">
                            {new Date(notification.timestamp).toLocaleTimeString('ar-SA')}
                          </small>
                          <Button
                            variant="link"
                            size="sm"
                            className="text-danger p-0 ms-2"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeNotification(notification.id);
                            }}
                          >
                            <FaTimes />
                          </Button>
                        </div>
                      </div>
                      <p className="mb-0 text-muted">{notification.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Modal.Body>
      </Modal>

      {/* إشعارات منبثقة */}
      <ToastContainer position="top-end" className="p-3">
        {notifications.slice(0, 3).map((notification) => (
          <Toast
            key={notification.id}
            onClose={() => removeNotification(notification.id)}
            delay={5000}
            autohide
          >
            <Toast.Header>
              <div className="me-2">
                {getNotificationIcon(notification.type)}
              </div>
              <strong className="me-auto">{notification.title}</strong>
              <small>{new Date(notification.timestamp).toLocaleTimeString('ar-SA')}</small>
            </Toast.Header>
            <Toast.Body>{notification.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </>
  );
};

export default NotificationSystem; 