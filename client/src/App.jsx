
import { Routes, Route, Navigate } from "react-router-dom";
import 'primeicons/primeicons.css';
import './App.css';

import NavBar from "./components/NavBar/NavBar.jsx";
import LoginPage from './components/login/login.jsx';
import CatogryBtns from "./components/ScrollDiv/CatogryBtns.jsx";
import Signup from './components/signup/signup.jsx';
import Footer from "./components/footer/footer.jsx";
import Cart from "./components/cartlist/Cart.jsx";
import ProductDesc from "./components/product/ProductDesc.jsx";
import Home from "./pages/home/Home.jsx";
import HomeDiv from "./components/HomeDiv/HomeDiv.jsx";
import WishList from "./components/wishList/WishList.jsx";
import Office from "./pages/office/office.jsx";
import User from "./pages/User/User.jsx"
import Address from "./components/address/Address.jsx";
import Payment from "./components/Payment/Payment.jsx";
import Community from "./pages/Community/Community.jsx";
import VoiceAssits from "./components/VoiceAssist/VoiceAssits.jsx";
import ForgotPassword from "./components/login/ForgotPassword.jsx";
import ResetPassword from "./components/login/ResetPassword.jsx";
import SearchResult from "./components/SearchResult/SearchResult.jsx";

function App() {

return (
    <>
      <NavBar/>
        <Routes>
        <Route
            path="/"
            element={<Home/>}
          />
        <Route
            path="/home"
            element={<Home/>}
          />

          {/* Updated route for dynamic query parameters */}
          <Route
            path="/search-results"
            element={<SearchResult/>}
          />

          <Route
            path="/login"
            element={<LoginPage id="LoginPage"/>}
          />
          <Route
            path="/forgot-password"
            element={<ForgotPassword/>}
          />
          <Route
            path="/reset-password/:token"
            element={<ResetPassword/>}
          />
          <Route
            path="/signup"
            element={<Signup/>}
          /> 
          <Route
            path="home/house/:category"
            element={<CatogryBtns/>}
          /> 
          {/* <Route
            path="home/house/kitchen"
            element={<CatogryBtns category="kitchen"/>}
          /> 
          <Route
            path="home/house/bedroom"
            element={<CatogryBtns category="bedroom"/>}
          /> 
          <Route
            path="home/house/bathroom"
            element={<CatogryBtns category="bathroom"/>}
          />  */}
          <Route
            path="home/office/:category"
            element={<Office />}
          />
          <Route
            path="home/cart"
            element={<Cart/> }
          />
          <Route
            path="/home/cart/address/:addressId" 
            element={<Address/> }
          />
          <Route
            path="/home/cart/address" 
            element={<Address/> }
          />
          <Route
            path="home/cart/address/:addressId/payment"
            element={<Payment/> }
          />
          <Route
            path="home/wishlist"
            element={<WishList/> }
          />
          <Route path={"/product"} element={<ProductDesc/> }>
            <Route path=':productId' element={<ProductDesc/>}/>
         </Route>
          <Route
            path="home/UserProfile"
            element={
              localStorage.getItem('auth-token') !== null 
              ? <User/> 
              : <Navigate to="/login"/>
            }
        />
          <Route
            path="/community"
            element={<Community/>}
          />
          <Route
            path="/community/house"
            element={<Community/>}
          />
          <Route
            path="/community/office"
            element={<Community/>}
          /> 
          <Route
            path="/community/medical"
            element={<Community/>}
          />
          <Route
            path="/community/others"
            element={<Community/>}
          /> 
        </Routes>
        <VoiceAssits/>
        {/* <Footer id="foot"/> */}
    </>     
  )
}

export default App;
