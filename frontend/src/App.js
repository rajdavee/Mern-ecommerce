import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import WebFont from 'webfontloader';
import Header from './component/layout/Header/Header';
import Footer from './component/layout/Footer/Footer';
import Home from './component/Home/Home';
import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import Profile from './component/User/Profile';
import UserOptions from './component/layout/Header/UserOptions';
import ProtectedRoute from './component/Route/ProtectedRoute';
import store from './store';
import { loadUser } from './actions/userAction';
import './App.css';
import UpdateProfile from './component/User/UpdateProfile';
import UpdatePassword from './component/User/UpdatePassword';
import ForgotPassword from './component/User/ForgotPassword';
import ResetPassword from './component/User/ResetPassword';
import Cart from './component/Cart/Cart';
import Shipping from './component/Cart/Shipping';
import ConfirmOrder from './component/Cart/ConfirmOrder';
import axios from 'axios';
import Payment from './component/Cart/Payment';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import OrderSuccess from './component/Cart/OrderSuccess';
import MyOrders from './component/Order/MyOrders'; 
import OrderDetails from './component/Order/OrderDetails';
import Dashboard from './component/Admin/Dashboard.js';
import ProductList from './component/Admin/ProductList';
import NewProduct from './component/Admin/NewProduct.js';
import UpdateProduct from './component/Admin/UpdateProduct';
import OrderList from './component/Admin/OrderList';
import ProcessOrder from './component/Admin/ProcessOrder';
import UsersList from './component/Admin/UsersList';
import UpdateUser from './component/Admin/UpdateUser';
import ProductReviews from './component/Admin/ProductReviews';
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/Not Found/NotFound";

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripeApiKey, setStripeApiKey] = useState("");

  // async function getStripeApiKey() {
    
  //   const { data } = await axios.get("/api/v1/stripeapikey");
  //   setStripeApiKey(data.stripeApiKey);
  // }
  async function getStripeApiKey() {
    const config = {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`, // Adjust the token key as per your implementation
      },
    };
  
    try {
      const { data } = await axios.get("/api/v1/stripeapikey", config);
      setStripeApiKey(data.stripeApiKey);
    } catch (error) {
      console.error("Failed to fetch Stripe API key", error);
    }
  }
  

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto', 'Droid Sans', 'Chilanka'],
      },
    });
    store.dispatch(loadUser());
    getStripeApiKey();
  }, []);

  window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOptions user={user} />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route exact path="/contact" element={<Contact/>} />
        <Route exact path="/about" element={<About/>} /> 
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/search" element={<Search />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/account" element={<ProtectedRoute element={Profile} />} />
        <Route path="/me/update" element={<ProtectedRoute element={UpdateProfile} />} />
        <Route path="/password/update" element={<ProtectedRoute element={UpdatePassword} />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shipping" element={<ProtectedRoute element={Shipping} />} />
        <Route path="/order/confirm" element={<ProtectedRoute element={ConfirmOrder} />} />
        {stripeApiKey && (
          <Route
            path="/process/payment"
            element={
              <Elements stripe={loadStripe(stripeApiKey)}>
                <ProtectedRoute element={Payment} />
              </Elements>
            }
          />
        )}
        <Route path="/success" element={<ProtectedRoute element={OrderSuccess} />} />
        <Route path="/orders" element={<ProtectedRoute element={MyOrders} />} />
        <Route path="/order/:id" element={<ProtectedRoute element={OrderDetails} />} />
        <Route path="/admin/dashboard" element={<ProtectedRoute element={Dashboard} isAdmin />} />
        <Route path="/admin/products" element={<ProtectedRoute element={ProductList} isAdmin />} />
        <Route path="/admin/product" element={<ProtectedRoute element={NewProduct} isAdmin />} />
        <Route path="/admin/product/:id" element={<ProtectedRoute element={UpdateProduct} isAdmin />} />
        <Route path="/admin/orders" element={<ProtectedRoute element={OrderList} isAdmin />} />
        <Route path="/admin/order/:id" element={<ProtectedRoute element={ProcessOrder}isAdmin />} />
        <Route path="/admin/users" element={<ProtectedRoute element={UsersList} isAdmin />} />
        <Route path="/admin/user/:id" element={<ProtectedRoute element={UpdateUser} isAdmin/>} />
        <Route path="/admin/reviews" element={<ProtectedRoute element={ProductReviews} isAdmin/>} />


        


        <Route
          path="*"
          element={
            window.location.pathname === "/process/payment" ? null : <NotFound />
          }
        />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
