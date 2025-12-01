import { useEffect, useState, useMemo } from 'react';
import BrandCard from './BrandCard';
import { Container, Row, Spinner } from 'react-bootstrap';
import Subtitle from '../Uility/SubTitle';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';

const BrandFeature = ({ title, bnttitle }) => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        setLoading(true);
        const response = await fetch("https://dummyjson.com/products");
        if (!response.ok) {
          throw new Error('فشل في جلب البيانات');
        }
        const data = await response.json();
        const products = data.products;

        // 1. إزالة المنتجات اللي مالهاش براند
        const filtered = products.filter((p) => p.brand && p.brand.trim() !== '');

        // 2. إزالة التكرار
        const uniqueBrands = [...new Set(filtered.map((p) => p.brand))];

        setBrands(uniqueBrands);
        console.log('✅ Showing brand:', uniqueBrands);
      } catch (err) {
        console.error("Error fetching products", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  // خريطة الصور
  const brandImages = [
    { brand: "Essence", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ-fABRxbmhKmTMsc81RVzAuBxzdSPNTJt7Uw&s" },
    { brand: "Glamour Beauty", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdETsYdTT765D3ebKnh54DzmQqkWRBfLn73g&s" },
    { brand: "Velvet Touch", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRsIyZgUIEXqidjuBmCWrPxo0849L0yTQvVAmdQ2gIr2G3K0iFUUJAzREE&s" },
    { brand: "Chic Cosmetics", logo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANgAAACUCAMAAADGZBfIAAAAaVBMVEX///85ODb6+vrHx8fq6ur29vYyMS8fHhonJiOampnw8PDn5+dwcG+lpaRzc3ItLCq0tLTPz88AAACPjo3c3NzBwcHV1dUUEw6UlJRAQD57e3poZ2arq6pbWllgYF9PT02GhoUMCgBIR0YnIWyiAAAFC0lEQVR4nO2Za3erKhCGFcQLRIUEvCS2mvz/H7kZNF5IT9rVNu61zp7nQ9O8GcYZ5CJjECAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAI8k/DlaGKSmkqfpeI0FqMRML+P/7AZ3FUSRAwT2Keb1aBb2N9R3umBNBm6IyqlMnf+nNWTfEo0x1GiveGUu1UYUxzmeRDTpVNjFOaz1JmzDb8KiusWWV77dIWDd0zLVWEBzV2MxHvadk3480hLFJxWlqOuWCMTCITGWhlGpqIuWaMRXKU4sVwRA+3Vk2DQJyO5e3s38/XcYqTw9LJIgnj9Dx/P5VhGJYHvm3yFls1yVYZsFNqpfjg+ZZt2urF96WMy9uvBv/fkEsS99VKGGyE9RwzTSCFnGwbDZBYuhlWEgzjfOv7VMfp2rexRunl94J/AivKMG7WirraAG9i+vZxYu4+fp7YcAzTZj30qpvtkUQEr4c0NsR2cyV2hMH3SWLujpm19EFiEjyptWLHom23kV6EaeOHiWGvXb7dJ9kPEtMxzM5Np3EY56U3YV9BdLYXSrut2MJ693yOjUPxk8TOcHeyTUt2StLau9xLoBBgorfiWzvQOZzvJ6ZauK1y04404Zl6vl4Bg5ERJp7K+Wq+fz8xGK5x723IjO+yjYkQLv50Y/l2Ym6diN+90bATtIYFsHhq8t3EzO2jnX0nTsc0TY/DMxPqTB426Nqq121iYJgsieVgUh/2e4DaBNNkWfb8uVQ7E+UlZjJQN8OsAsNs2aKoa7hdOxDkX2M8TfFomUEkAIm43YYE3syahPVWxKZj9Sjx0cqZkYi7v2SULFHgt34V5CRh/g9uaWADSDSCBx7WwVlDy2oOIoMoNTUczsvdfBIRnYT/lXSSMdRZaek0kKIc/koGPk3nnO7wREUyd/EB6hZ2oYPHVcXdOqahd5mcl72og3CEhPy4COg94W68S11ApEsJ3FWdzF1i0JpUYkpMaWcq6A7FASIriCSDxIikLja1JEbEvLsq6hKLOg6lGaXvY1SrCsJXVoLfNVhV1HmqjJgTg47gRsFewIW/J74C4SJ0lSbC3RwgLqVgLFssxQsecKhGEacIvYSm9eqDuwoXY8R9aDH7cB0UuYFN9B7HTARBXgyPgGcWRICFv6mO7ban/sgz5L6wI8RciqI4PDsMVmBxMd4S3R2g3bpiGFAwLFZP8wa+Fyb4K6gwLcs6f9D5UvO4QoU7889jiVVr7zwGJe6VK92C7+Zh12J7nD1Jk9pj72NptsvvQ+gH5TcoWXrlN+dxl0qwfnsomFr4+bO64lfKbwzKVPHDE9T5uku5wFVMT56o4rlW8YPEAnG0RoOXRtSmOzxTWbowjm/bojMfjvMiMCbmz7GvlbgDk8Zh4t2yoR5+IeqvIG9pWWyWfFkv3ZxD5bEcvFX74F4jrQsaJHOJDVs705dlv1l0TdzvtgOoIqzPy9VJFw/zpOPuTVgYbrtdQWktLC+ruamcYdx7W0d1bq9vy3ggpn+6ufwy3Axhn1VuuEXmVMjxfsGr2kudANc2M2Z6kDcyayf1khvqXtWarL86qe7z7ata8F024ztNbppzt2+hkWuTNVneSYu6x0UqRe8Yo6rx/gil7El5UmkF3WFPaNTMpkpx33dzmpzTv3BmIfAIxDl/xZL1St8IgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgiAIgvz/+ANMBEWBUERSDgAAAABJRU5ErkJggg==" },
    { brand: "Nail Couture", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRn8CwqP42bw0lbEu1xnkFbbQP-xiglnlv3B8_uWXKf4Vas4FNovOS5uMA&s" },
    { brand: "Calvin Klein", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmH-i0iJMEb2u5k2_uqnIX9_9l67-TEXESdBcH95fSz5t5tclXapvfEZU&s" },
    { brand: "Chanel", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOO_d_FsWJjRjKGXV58e_uBgcvccNm0UE_65k-JWtVOruyGlmqUOCWE1E&s" },
    { brand: "Dior", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRu7K4tEL8pj8-_DVcAQQCBb3GC3kYVgrLO9NalPmOFqUnrJXVT69jZ1EM&s" },
    { brand: "Dolce & Gabbana", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_00SdwN3U-Lbfu5FT-MbY2hJp-tsYmni547KIiSgDHWZGoiAWk5Qxe9M&s" },
    { brand: "Gucci", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTr14qhC4o428er9Bwm4O2rfhCGHkFksI68wRNxypohf6TSO6SHPVCzUWg&s" },
    { brand: "Annibale Colombo", logo: "data:image/png;base64,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" },
    { brand: "Furniture Co.", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT56ZreMh7judGagMK4EumPUIJo9gO2YA0l4w&s" },
    { brand: "Knoll", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9WNNZTnIEoloaG9kAnXf7FPhQotMfqGVfnw&s" },
    { brand: "Bath Trends", logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi58VHJs0MUjqqqrraGUDCk1NKn9344byKVflzKkfYBAe_3ylyBD7uqOw&s" },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 4000, min: 1024 },
      items: 5,
      slidesToSlide: 1,
    },
    tablet: {
      breakpoint: { max: 1024, min: 768 },
      items: 4,
      slidesToSlide: 1,
    },
    mobile: {
      breakpoint: { max: 768, min: 0 },
      items: 2,
      slidesToSlide: 1,
    },
  };

  // تحسين الأداء باستخدام useMemo
  const normalizedBrands = useMemo(() => {
    return brands.map((brand) => {
      const normalize = (str) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
      const brandObj = brandImages.find(
        (b) => normalize(b.brand) === normalize(brand)
      );
      const logo =
        brandObj?.logo ||
        'https://cdn.logojoy.com/wp-content/uploads/20250311113941/02-11-25_Logo-Maker-Page-Graphics_IMG-1.webp';

      return { brand, logo };
    });
  }, [brands]);

  if (loading) {
    return (
      <Container fluid>
        <Subtitle title={title} bnttitle={bnttitle} text="/Brands" />
        <Row className="justify-content-center">
          <div className="text-center py-5">
            <Spinner animation="border" variant="primary" />
            <p className="mt-3">جاري تحميل العلامات التجارية...</p>
          </div>
        </Row>
      </Container>
    );
  }

  if (error) {
    return (
      <Container fluid>
        <Subtitle title={title} bnttitle={bnttitle} text="/Brands" />
        <Row className="justify-content-center">
          <div className="text-center py-5">
            <div className="alert alert-danger">
              <h5>خطأ في التحميل</h5>
              <p>{error}</p>
              <button 
                className="btn btn-primary"
                onClick={() => window.location.reload()}
              >
                إعادة المحاولة
              </button>
            </div>
          </div>
        </Row>
      </Container>
    );
  }

  return (
    <Container fluid>
      <Subtitle title={title} bnttitle={bnttitle} text="/Brands" />
      <Row className="justify-content-center">
        {brands.length === 0 ? (
          <div className="text-center py-5">
            <p>لا توجد علامات تجارية متاحة</p>
          </div>
        ) : (
          <Carousel
            className="w-100"
            swipeable={true}
            draggable={true}
            autoPlay={true}
            autoPlaySpeed={2000}
            showDots={false}
            ssr={true}
            renderDotsOutside={false}
            arrows={false}
            infinite={true}
            responsive={responsive}
            partialVisible={false}
            centerMode={false}
            itemClass="px-2"
          >
            {normalizedBrands.map(({ brand, logo }) => (
              <BrandCard key={brand} img={logo} />
            ))}
          </Carousel>
        )}
      </Row>
    </Container>
  );
};

export default BrandFeature;