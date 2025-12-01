import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { updateFilters, applyFilters } from '../../redux/slices/productsSlice'
import { addNotification as addNotificationAction } from '../../redux/slices/notificationsSlice'
import './Brands.css'

const BrandCard = ({img, title}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleBrandClick = () => {
        try {
            // إضافة إشعار للمستخدم
            dispatch(addNotificationAction({
                id: Date.now(),
                type: 'info',
                title: 'تم اختيار العلامة التجارية',
                message: `جاري عرض منتجات علامة: ${title}`,
                duration: 3000
            }));

            // التنقل إلى صفحة المنتجات
            navigate('/Products', { state: { selectedBrand: title } });
        } catch (error) {
            console.error('Error navigating to brand:', error);
            // في حالة حدوث خطأ، نذهب للصفحة بدون state
            navigate('/Products');
        }
    };

    return (
        <div className="Card-brands" onClick={handleBrandClick} style={{ cursor: 'pointer' }}>
            <img src={img} className="Card-img" alt={title}/>
            <h5 className="Card-title">{title}</h5>
        </div>
    )
}

export default BrandCard

