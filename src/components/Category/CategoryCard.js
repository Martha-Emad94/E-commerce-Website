import { Col } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNotification } from '../../redux/slices/notificationsSlice';
import './CategoryCard.css';

const CategoryCard = ({ img, title, background }) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleCategoryClick = () => {
        try {
            // إضافة إشعار للمستخدم
            dispatch(addNotification({
                id: Date.now(),
                type: 'info',
                title: 'تم اختيار الفئة',
                message: `جاري عرض منتجات فئة: ${title}`,
                duration: 3000
            }));

            // التنقل إلى صفحة المنتجات مع تمرير اسم الفئة
            navigate('/Products', { state: { selectedCategory: title } });
        } catch (error) {
            console.error('Error navigating to category:', error);
            // في حالة حدوث خطأ، نذهب للصفحة بدون state
            navigate('/Products');
        }
    };

    return (
        <Col
            xs="6"
            sm="4"
            md="3"
            lg="2"
            className="d-flex justify-content-around my-4"
            onClick={handleCategoryClick}
            style={{ cursor: 'pointer' }}
        >
            <div className="Card">
                <div
                    className="category-card mx-4 px-3"
                    style={{ backgroundColor: background }}
                ></div>
              
                <img src={img} className="Card-img" alt={title} />
                   <div className="Card-title">{title}</div>
            </div>
        </Col>
    );
};

export default CategoryCard;
