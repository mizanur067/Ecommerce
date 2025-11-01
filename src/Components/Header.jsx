import React from 'react';
import { useRecoilState } from 'recoil';
import sidebarOpenRecoil from '../Recoils/sidebarOpenRecoil'; // Assuming you have a Recoil state for sidebar open/close
import '../CSS/Header.css'; // Assuming you have a CSS file for styling
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TestAtom from '../Recoils/TestAtom'; // Assuming you have a Recoil state for products
import { useEffect } from 'react';
const Header = () => {
    const [sidebarOpen, setSidebarOpen] = useRecoilState(sidebarOpenRecoil); // Assuming you have a Recoil state for sidebar open/close
    //const [sidebarOpen, setSidebarOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    //number of items in cart
    const [cartCount, setCartCount] = useState(0);
    const navigate = useNavigate();

    //search fiter
     const [products, setProducts] = useRecoilState(TestAtom);
    const handleSearch = (e) => {
        e.preventDefault();
        const searchInput = e.target
        console.log(searchQuery.trim())
        const FilteredValue={'search': searchQuery.trim()}
       fetch('http://127.0.0.1:8000/Mizanur/get_product_by_filtered_value/', {
           method: 'POST',
           headers: {
               'Content-Type': 'application/json',
           },
           body: JSON.stringify(FilteredValue),
       })
            .then(response => {
                if (!response.ok) throw new Error("Failed to fetch products");
                return response.json();
            })
            .then(data => {
                setProducts(data);
              
                console.log(data)
            })
            .catch(error => {
                console.error("Error fetching products:", error);
                
            });
    }
    useEffect(() => {
        const email = localStorage.getItem('email');
        const formData = { user_email: email };
        if (email) {
            fetch(`http://127.0.0.1:8000/Mizanur/number_of_items_in_cart_user/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            })
                .then(response => response.json())
                .then(data => {
                    setCartCount(data.count);
                    console.log('Cart count:', data.count);
                })
                .catch(error => {
                    console.error("Error fetching cart count:", error);
                });

        }
    }, []);

    return (
        <>
            <header className="header">
                <div className="left-section">
                    <div className='left-section-div'>
                        <button className="hamburger" onClick={() => setSidebarOpen(true)}>
                            ☰
                        </button>
                        <img
                            src="https://pngimg.com/uploads/amazon/amazon_PNG.png"
                            alt="MR Store"
                            className="logo" onClick={() => {
                                console.log("first")
                                navigate('/')}}
                        />

                    </div>
                    <div className="cart1" onClick={() => navigate('/user-cart')}>
                        🛒 <span className="cart-count">{cartCount}</span> Cart
                    </div>
                    <div className="location">
                        <span className="small-text">Deliver to Bengaluru 562130</span>
                        <span className="bold-text">Update location</span>
                    </div>
                </div>

                <div className="search-section">
                    <select className="search-dropdown">
                        <option>All</option>
                    </select>
                    <input type="text" className="search-input" placeholder="SearchMR Store" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
                    <button className="search-button" onClick={handleSearch}>🔍</button>
                </div>

                <div className="right-section">
                    <div className='right-section-not-card'>
                        <div className="account">
                            <span className="small-text">Hello, sign in</span>
                            <span className="bold-text"  onClick={() => navigate('/usersignup')}>Account & Lists ▾</span>
                        </div>
                        <div className="orders">
                            <span className="small-text">Returns</span>
                            <span className="bold-text">& Orders</span>
                        </div>

                    </div>
                    <div className="cart" onClick={() => navigate('/user-cart')}>
                        🛒 <span className="cart-count">{cartCount}</span> Cart
                    </div>


                </div>
            </header>

            {/* Sidebar */}
            {sidebarOpen && (
                <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)}>
                    <div className="sidebar" onClick={(e) => e.stopPropagation()}>
                        <button className="close-btn" onClick={() => setSidebarOpen(false)}>×</button>
                        <div className="sidebar-header">
                            <span>Sign in</span>
                        </div>
                        <ul>
                            <li>🏠 Amazon Home</li>
                            <li><strong>Trending</strong></li>
                            <li>Bestsellers</li>
                            <li>New Releases</li>
                            <li>Movers and Shakers</li>
                            <li><strong>Top Categories</strong></li>
                            <li>Mobiles</li>
                            <li>Computers</li>
                            <li>Books</li>
                            <li>Fashion</li>
                            <li>See All Categories</li>
                        </ul>
                    </div>
                </div>
            )}
        </>
    );
};

export default Header;
