import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../../redux/slices/cartSlice';
import { addToWishlist, removeFromWishlist } from '../../redux/slices/wishlistSlice';
import { addNotification } from '../../redux/slices/notificationsSlice';
import { updateFilters, applyFilters } from '../../redux/slices/productsSlice';
import './ProductCard.css';

const ReduxProductCard = ({ product }) => {
  console.log('🧪 Product:', product);
  console.log("Brand:", product.brand);
  console.log("Category:", product.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const wishlistItems = useSelector((state) => state.wishlist.items);
  const isInWishlist = wishlistItems.some(item => item.id === product.id);
  const isOutOfStock = product.stock === 0;

  const handleAddToCart = () => {
    if (isOutOfStock) return;

    try {
      dispatch(addToCart(product));
      dispatch(addNotification({
        type: 'success',
        title: 'تم الإضافة بنجاح',
        message: `تم إضافة ${product.title} لسلة التسوق`,
        duration: 3000
      }));
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
  };

  const handleWishlistToggle = () => {
    try {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product.id));
        dispatch(addNotification({
          type: 'info',
          title: 'تم الإزالة',
          message: `تم إزالة ${product.title} من المفضلة`,
          duration: 3000
        }));
      } else {
        dispatch(addToWishlist(product));
        dispatch(addNotification({
          type: 'success',
          title: 'تم الإضافة',
          message: `تم إضافة ${product.title} للمفضلة`,
          duration: 3000
        }));
      }
    } catch (error) {
      console.error('Error toggling wishlist:', error);
    }
  };

  const handleCategoryClick = () => {
    if (!product?.category) return;

    try {
      dispatch(updateFilters({ category: product.category }));
      dispatch(applyFilters());
      navigate('/Products', { state: { selectedCategory: product.category } });
    } catch (error) {
      console.error('Error navigating to category:', error);
      navigate('/Products');
    }
  };

  const handleBrandClick = () => {
    if (!product?.brand) return;

    try {
      dispatch(updateFilters({ brand: product.brand }));
      dispatch(applyFilters());
      navigate('/Products', { state: { selectedBrand: product.brand } });
    } catch (error) {
      console.error('Error navigating to brand:', error);
      navigate('/Products');
    }
  };

  return (
    <Card className={`h-100 product-card ${isOutOfStock ? 'disabled' : ''}`}>
      <div className="position-relative">
        <Card.Img
          variant="top"
          src={product.thumbnail}
          alt={product.title}
          style={{ height: '200px', objectFit: 'cover' }}
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x200?text=No+Image';
          }}
        />
        <div className="position-absolute top-0 end-0 p-2">
          <Button
            variant={isInWishlist ? "danger" : "outline-danger"}
            size="sm"
            onClick={handleWishlistToggle}
            disabled={isOutOfStock}
          >
            {isInWishlist ? '❤️' : '🤍'}
          </Button>
        </div>
        {product.discountPercentage > 0 && (
          <Badge
            bg="danger"
            className="position-absolute top-0 start-0 m-2"
          >
            -{Math.round(product.discountPercentage)}%
          </Badge>
        )}
        {isOutOfStock && (
          <div className="position-absolute top-50 start-50 translate-middle">
            <Badge bg="dark" className="fs-6 px-3 py-2">
              نفذ المخزون
            </Badge>
          </div>
        )}
      </div>

      <Card.Body className="d-flex flex-column">
        <Card.Title className="h6 mb-2">{product.title}</Card.Title>

        {/* معلومات الفئة والعلامة التجارية */}
        <div className="mb-2">
          <div className="d-flex flex-wrap gap-1 mb-1">
            <Badge
              bg="info"
              className="cursor-pointer"
              onClick={handleCategoryClick}
              style={{ cursor: 'pointer' }}
            >
              📂 {product.category ?? 'غير محدد'}
            </Badge>
            <Badge
              bg="secondary"
              className="cursor-pointer"
              onClick={handleBrandClick}
              style={{ cursor: 'pointer' }}
            >🏷️ {product.brand ?? 'غير محدد'}
            </Badge>
          </div>
        </div>

        <div className="d-flex justify-content-between align-items-center mb-3">
          <div>
            {product.discountPercentage > 0 ? (
              <div>
                <span className="text-decoration-line-through text-muted me-2">
                  ${product.price}
                </span>
                <span className="fw-bold text-danger">
                  ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="fw-bold">${product.price}</span>
            )}
          </div>
          <Badge bg="success">{product.rating} ⭐</Badge>
        </div>

        <Card.Text className="small text-muted mb-3">
          {product.description.length > 100
            ? `${product.description.substring(0, 100)}...`
            : product.description
          }
        </Card.Text>

        <div className="mt-auto">
          <div className="d-flex gap-2">
            <Button
              variant={isOutOfStock ? "secondary" : "primary"}
              size="sm"
              className="flex-fill"
              onClick={handleAddToCart}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? 'نفذ المخزون' : '🛒 إضافة للسلة'}
            </Button>
          </div>

          {!isOutOfStock && (
            <small className="text-muted d-block mt-1">
              متوفر: {product.stock} قطعة
            </small>
          )}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ReduxProductCard;
