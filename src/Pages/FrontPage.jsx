import React from 'react'
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import Home from './Home'

import UserSignUpPage from './UserSignUpPage';
import UserLoginPage from './UserLoginPage';
import SellerSignUpPage from './SellerSignUpPage';
import SellerLoginPage from './SellerLoginPage';
import UploadProductPage from './UploadProductPage';
import HomeCategoryPage from './HomeCategoryPage';
import ProductDetails from './ProductDetails';
import UserCart from './UserCart';
const FrontPage = () => {
    return (
        <div>
            <Router>
                <Routes>


                    <Route path="/" element={<Home />} />
                    <Route path="/user-signup" element={<UserSignUpPage />} />
                    <Route path="/user-login" element={<UserLoginPage/>} />
                    <Route path="/seller-signup" element={<SellerSignUpPage />} />
                    <Route path="/seller-login" element={<SellerLoginPage />} />
                    <Route path="/upload-product" element={<UploadProductPage />} />
                    <Route path="/home-category" element={<HomeCategoryPage />} />
                    <Route path="/product-details" element={<ProductDetails />} />
                    <Route path="/user-cart" element={<UserCart />} />
                    {/* Add more routes as needed */}


                </Routes>
            </Router>
        </div>
    )
}

export default FrontPage;