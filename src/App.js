import HomePage from "./Pages/Home/HomePage.js";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from "./components/Uility/Header/NavBar.js";
import Footer from "./components/Uility/Footer.js";
import Login from "./Pages/Auth/LoginPage.js";
import RegisterPage from "./Pages/Auth/RegisterPage.js";
import AllCategoryPage from "./Pages/category/AllCategoryPage.js";
import AllBrandPage from "./Pages/Brands/AllBrandPage.js";
import ShopPage from "./Pages/Products/ShopPage.js";
import ReduxCart from "./components/Cart/ReduxCart.js";
import Wishlist from "./components/Wishlist/Wishlist.js";
import ReduxNotificationSystem from "./components/Notifications/ReduxNotificationSystem.js";
import Dashboard from "./components/Analytics/Dashboard.js";

function App() {
  return (
    <div className="font">
      <NavBar />
      <BrowserRouter>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path="/Login" exact Component={Login} />
          <Route path="/register" exact Component={RegisterPage} />
          <Route path="/Category" element={<AllCategoryPage />} />
          <Route path="/Brands" element={<AllBrandPage />} />
          <Route path="/Products" element={<ShopPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <Footer />
      
      {/* المكونات الجديدة */}
      <ReduxCart />
      <Wishlist />
      <ReduxNotificationSystem />
    </div>
  );
}

export default App;
