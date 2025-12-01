import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ProgressBar, Badge } from 'react-bootstrap';
import { 
  FaUsers, 
  FaShoppingCart, 
  FaDollarSign, 
  FaChartLine,
  FaEye,
  FaHeart,
  FaStar
} from 'react-icons/fa';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalOrders: 0,
    totalRevenue: 0,
    totalProducts: 0,
    topProducts: [],
    recentOrders: [],
    categoryStats: []
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // جلب بيانات المنتجات
      const productsResponse = await fetch('https://dummyjson.com/products');
      const productsData = await productsResponse.json();
      
      // جلب بيانات المستخدمين
      const usersResponse = await fetch('https://dummyjson.com/users');
      const usersData = await usersResponse.json();

      // حساب الإحصائيات
      const totalProducts = productsData.products.length;
      const totalUsers = usersData.users.length;
      
      // حساب إجمالي المبيعات (محاكاة)
      const totalRevenue = productsData.products.reduce((sum, product) => {
        return sum + (product.price * Math.floor(Math.random() * 100));
      }, 0);

      // حساب الطلبات (محاكاة)
      const totalOrders = Math.floor(totalRevenue / 50);

      // المنتجات الأكثر مبيعاً
      const topProducts = productsData.products
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 5);

      // إحصائيات الفئات
      const categoryStats = productsData.products.reduce((acc, product) => {
        if (!acc[product.category]) {
          acc[product.category] = 0;
        }
        acc[product.category]++;
        return acc;
      }, {});

      // الطلبات الحديثة (محاكاة)
      const recentOrders = productsData.products.slice(0, 5).map((product, index) => ({
        id: index + 1,
        product: product.title,
        customer: usersData.users[Math.floor(Math.random() * usersData.users.length)].firstName,
        amount: product.price,
        status: ['مكتمل', 'قيد المعالجة', 'معلق'][Math.floor(Math.random() * 3)],
        date: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toLocaleDateString('ar-SA')
      }));

      setStats({
        totalUsers,
        totalOrders,
        totalRevenue,
        totalProducts,
        topProducts,
        recentOrders,
        categoryStats
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'مكتمل':
        return <Badge bg="success">{status}</Badge>;
      case 'قيد المعالجة':
        return <Badge bg="warning">{status}</Badge>;
      case 'معلق':
        return <Badge bg="danger">{status}</Badge>;
      default:
        return <Badge bg="secondary">{status}</Badge>;
    }
  };

  if (loading) {
    return (
      <Container className="py-5">
        <div className="text-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">جاري التحميل...</span>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">لوحة التحكم</h2>
      
      {/* إحصائيات عامة */}
      <Row className="mb-4">
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaUsers size={32} className="text-primary mb-3" />
              <h3>{stats.totalUsers.toLocaleString()}</h3>
              <p className="text-muted">إجمالي المستخدمين</p>
              <ProgressBar now={75} variant="primary" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaShoppingCart size={32} className="text-success mb-3" />
              <h3>{stats.totalOrders.toLocaleString()}</h3>
              <p className="text-muted">إجمالي الطلبات</p>
              <ProgressBar now={60} variant="success" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaDollarSign size={32} className="text-warning mb-3" />
              <h3>${stats.totalRevenue.toLocaleString()}</h3>
              <p className="text-muted">إجمالي المبيعات</p>
              <ProgressBar now={85} variant="warning" />
            </Card.Body>
          </Card>
        </Col>
        <Col md={3}>
          <Card className="text-center h-100">
            <Card.Body>
              <FaChartLine size={32} className="text-info mb-3" />
              <h3>{stats.totalProducts.toLocaleString()}</h3>
              <p className="text-muted">إجمالي المنتجات</p>
              <ProgressBar now={90} variant="info" />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* المنتجات الأكثر مبيعاً */}
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">
                <FaStar className="me-2" />
                المنتجات الأكثر تقييماً
              </h5>
            </Card.Header>
            <Card.Body>
              {stats.topProducts.map((product, index) => (
                <div key={product.id} className="d-flex align-items-center mb-3">
                  <img
                    src={product.thumbnail}
                    alt={product.title}
                    className="rounded me-3"
                    style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                  />
                  <div className="flex-grow-1">
                    <h6 className="mb-1">{product.title}</h6>
                    <div className="d-flex align-items-center">
                      <Badge bg="warning" className="me-2">
                        {product.rating} ⭐
                      </Badge>
                      <span className="text-muted">${product.price}</span>
                    </div>
                  </div>
                  <Badge bg="primary">#{index + 1}</Badge>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>

        {/* الطلبات الحديثة */}
        <Col md={6}>
          <Card className="h-100">
            <Card.Header>
              <h5 className="mb-0">
                <FaShoppingCart className="me-2" />
                الطلبات الحديثة
              </h5>
            </Card.Header>
            <Card.Body>
              {stats.recentOrders.map((order) => (
                <div key={order.id} className="d-flex justify-content-between align-items-center mb-3">
                  <div>
                    <h6 className="mb-1">{order.product}</h6>
                    <small className="text-muted">
                      {order.customer} • {order.date}
                    </small>
                  </div>
                  <div className="text-end">
                    <div className="fw-bold">${order.amount}</div>
                    {getStatusBadge(order.status)}
                  </div>
                </div>
              ))}
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* إحصائيات الفئات */}
      <Row className="mt-4">
        <Col md={12}>
          <Card>
            <Card.Header>
              <h5 className="mb-0">
                <FaChartLine className="me-2" />
                إحصائيات الفئات
              </h5>
            </Card.Header>
            <Card.Body>
              <Row>
                {Object.entries(stats.categoryStats).map(([category, count]) => (
                  <Col md={3} key={category} className="mb-3">
                    <div className="text-center">
                      <h6>{category}</h6>
                      <h4 className="text-primary">{count}</h4>
                      <ProgressBar 
                        now={(count / stats.totalProducts) * 100} 
                        variant="primary" 
                      />
                    </div>
                  </Col>
                ))}
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard; 