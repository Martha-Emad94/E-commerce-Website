import HomePage from "./Pages/Home/HomePage.js";
import{BrowserRouter,Route,Routes} from 'react-router-dom'
import NavBar from "./components/Uility/NavBar.js";
import Footer from "./components/Uility/Footer.js";
import Login from "./Pages/Auth/LoginPage.js";
import RegisterPage from "./Pages/Auth/RegisterPage.js";
import AllCategoryPage from "./Pages/category/AllCategoryPage.js";
import AllBrandPage from "./Pages/Brands/AllBrandPage.js";
import ShopPage from "./Pages/Products/ShopPage.js";
function App() {
  return (
    <div className="font" style={{minWidth:'100vw'}}>
    <NavBar/>
    <BrowserRouter>
    <Routes>
    <Route index element={<HomePage/>}/>
    <Route path="/Login" element={<Login/>}/> 
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/Category" element={<AllCategoryPage/>}/>
    <Route path="/Brands" element={<AllBrandPage/>}/>
    <Route path="/Products" element={<ShopPage/>}/>
      </Routes> 
    </BrowserRouter>
    <Footer/>
    </div>
  );
}

export default App;
