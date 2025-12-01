import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Toast, ToastContainer, Badge, Button, Modal } from 'react-bootstrap';
import { 
  markAsRead, 
  markAllAsRead, 
  clearAllNotifications, 
  removeNotification 
} from '../../redux/slices/notificationsSlice';

const ReduxNotificationSystem = () => {
  const dispatch = useDispatch();
  const { notifications, unreadCount } = useSelector((state) => state.notifications);
  const [showNotifications, setShowNotifications] = useState(false);

  // الحصول على أيقونة حسب نوع الإشعار
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '🔔';
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
        🔔
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
              onClick={() => dispatch(markAllAsRead())}
              className="me-2"
            >
              تحديد الكل كمقروء
            </Button>
            <Button
              variant="outline-danger"
              size="sm"
              onClick={() => dispatch(clearAllNotifications())}
            >
              مسح الكل
            </Button>
          </div>
        </Modal.Header>
        <Modal.Body>
          {notifications.length === 0 ? (
            <div className="text-center py-5">
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
                  onClick={() => dispatch(markAsRead(notification.id))}
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
                              dispatch(removeNotification(notification.id));
                            }}
                          >
                            ❌
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
            onClose={() => dispatch(removeNotification(notification.id))}
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

export default ReduxNotificationSystem; 