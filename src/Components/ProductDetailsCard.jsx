import React, { use } from 'react'
import { useRecoilState } from 'recoil'
import DetailsProductAtom from '../Recoils/DetailsProductAtom';

import { useEffect } from 'react';
import '../CSS/DetailProduct.css'
import { useNavigate, useLocation } from 'react-router-dom';
const ProductDetailsCard = () => {
    const [detailsProduct, setDetailsProduct] = useRecoilState(DetailsProductAtom);
    const product = detailsProduct;
    const navigate = useNavigate();
    const location = useLocation();
    const email = localStorage.getItem('email');
    const [showAlertAddSuccess, setShowAlertAddSuccess] = React.useState(false);
    const [showAlreadyInCart, setShowAlreadyInCart] = React.useState(false);
    useEffect(() => {

        if (detailsProduct === "") {
            navigate('/');
        }
    }, [detailsProduct]);

    const HandleAddToCart = (e) => {
        e.preventDefault();
        if (!email) {
            navigate("/user-login", { state: { from: location }, replace: true });
            return;
        }
        // Add to cart logic here
        const formdata = { 'user_email': email, 'product_id': product.id };
        console.log(formdata);
        fetch('http://127.0.0.1:8000/Mizanur/add_to_cart/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formdata),
        })
            .then(response => response.json())
            .then(data => {
                console.log('Success:', data);
                if (data.message === 'Product added to cart.') {
                   // alert("Product added to cart.");
                    setShowAlertAddSuccess(true);
                }
                if (data.message === "Product already in cart.") {
                    //alert("Product already in cart.");
                    setShowAlreadyInCart(true);
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (

        <> {showAlertAddSuccess && (
            <div className=" modal-overlay">
                <div className="modal">
                    <span className="alert-text"><strong>Item Added to Cart Successfully!</strong></span>
                    <button className="alert-close" onClick={() => setShowAlertAddSuccess(false)}>✕</button> </div>

            </div>
        )}
        
        {showAlreadyInCart && (
            <div className=" modal-overlay">
                <div className="modal">
                    <span className="alert-text"><strong>Item Already in Cart!</strong></span>
                    <button className="alert-close" onClick={() => setShowAlreadyInCart(false)}>✕</button> </div>

            </div>
        )}
            <div className="product-page-1">
                <div className="product-container-1">
                    {/* Image Section */}
                    <div className="product-item-container-1">
                        <div className="product-image-1">
                            <img src={"http://127.0.0.1:8000/" + product.image} alt={product.title} />
                        </div>

                        {/* Details Section */}
                        <div className="product-info-1">


                            <div className="buttons-1">
                                <button className="add-to-cart-1" onClick={HandleAddToCart}>🛒 ADD TO CART</button>
                                <button className="buy-now-1" onClick={(e) => {
                                    e.preventDefault()
                                    navigate('/buy-product')
                                }}>⚡ BUY NOW</button>
                            </div>
                        </div>
                    </div>

                    <div className='product-item-container-1'>
                        <h2 className="product-title-1">{product.title}</h2>
                        <p className="product-description-1">{product.desc}</p>
                        {/* <div className="rating-section">
                        <span className="rating">{product.rating} ★</span>
                        <span className="review-count">{product.ratings} Ratings & {product.reviews} Reviews</span>
                    </div> */}
                        <div className="price-section-1">
                            {/* <span className="price">₹{product.discountPrice}</span> */}
                            <span className="original-price-1">₹{product.price}</span>
                            {/* <span className="discount">({product.discount}% off)</span> */}
                        </div>
                        <div className="pay-section-1">Pay ₹{product.price} </div>

                        {/* <div className="coupon">💸 {product.coupon}</div> */}

                        {/* <div className="offers">
                        <h4>Available offers</h4>
                        <ul>
                            {product.offers.map((offer, index) => (
                                <li key={index}>{offer}</li>
                            ))}
                        </ul>
                    </div> */}
                    </div>
                </div>
            </div></>
    )
}

export default ProductDetailsCard