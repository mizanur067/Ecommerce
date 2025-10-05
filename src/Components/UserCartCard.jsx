import React, { useEffect } from 'react'
import '../CSS/UserCart.css'
import { useRecoilState } from 'recoil';
import DetailsProductAtom from '../Recoils/DetailsProductAtom';
import { useNavigate, useLocation } from 'react-router-dom';

const UserCartCard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [detailsProduct, setDetailsProduct] = useRecoilState(DetailsProductAtom);
    const email = localStorage.getItem('email');
    const cartItems = [];
    const [cartData, setCartData] = React.useState([]);
    const [showAlert, setShowAlert] = React.useState(false);



    useEffect(() => {
        async function fetchCartItems() {
            if (!email) {
                navigate("/user-login", { state: { from: location }, replace: true });
                return;
            }

            try {
                const formdata = { user_email: email };
                const response = await fetch(`http://127.0.0.1:8000/Mizanur/get_cart_items/`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(formdata),
                });

                const data = await response.json();

                if (data.message === "Cart items retrieved successfully") {
                    // Fetch all product details in parallel
                    const productPromises = data.data.map(async (item) => {
                        const res = await fetch(`http://127.0.0.1:8000/Mizanur/get_user_cart_products/`, {
                            method: "POST",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({ product_id: item.Product_id }),
                        });
                        const productData = await res.json();
                        // console.log(productData);
                        const status_value = productData[0].available_quantity
                            > 0 ? "In Stock" : "Out Of Stock";
                        return {
                            id: productData[0].id,
                            name: productData[0].title,
                            price: productData[0].price,
                            image: productData[0].image,
                            status: status_value,
                            desc: productData[0].desc,
                        };
                    });

                    const cartItems = await Promise.all(productPromises);

                    console.log("Final Cart Items:", cartItems);
                    setCartData(cartItems); // ✅ set state once
                }
            } catch (error) {
                console.error("Error fetching cart:", error);
            }
        }

        fetchCartItems();
    }, [email, navigate, location]);

    const handleRemoveCartItem = (productId) => async (e) => {
        e.preventDefault();
        try {
            const formdata = { user_email: email, Product_id: productId };
            console.log("formdata", formdata);
            const response = await fetch('http://127.0.0.1:8000/Mizanur/remove_from_cart/', {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formdata),
            });
            const data = await response.json();
            console.log("response data:", data);
            if (data.message === "Product removed from cart.") {
                // Update cartData state to remove the item
                //alert("Item removed from cart");
                setShowAlert(true);
                setCartData((prevCartData) => prevCartData.filter(item => item.id !== productId));

            }
        } catch (error) {
            console.error("Error removing cart item:", error);
        }
    };

    return (
        <>
            {showAlert && (
        <div className="alert-success">
          <span className="alert-text"><strong>Item removed successfully!</strong></span>
          <button className="alert-close" onClick={() => setShowAlert(false)}>✕</button>
        </div>
      )}
            <div className="cart-page-2">
                <div className="cart-left-2">
                    {cartData.map((item) => (
                        <div className="cart-card-2" key={item.id}>
                            <img src={"http://127.0.0.1:8000/" + item.image} alt={item.name} className="product-image-2" onClick={() => {
                                setDetailsProduct(item);
                                navigate('/product-details');
                            }} />
                            <div className="cart-details-2">
                                <div className="product-name-2">{item.name}</div>
                                <div className="product-name-3">{item.desc}</div>
                                <div className="variant-2">₹ {item.price}</div>
                                <div className="stock-status-2">{item.status}</div>
                                <div className="cart-buttons-2">
                                    <button className="save-btn-2">BUY NOW</button>
                                    <button className="remove-btn-2" onClick={handleRemoveCartItem(item.id)}>REMOVE</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="cart-right-2">
                    <div className="price-details-2">
                        <div className="price-line-2">
                            <span>Price ({cartData.length} items)</span>
                            <span>₹{cartData.reduce((total, item) => total + item.price, 0)}</span>
                        </div>
                        <div className="price-line-2">
                            <span>Discount</span>
                            <span className="green-2">− ₹22,492</span>
                        </div>
                        <div className="price-line-2">
                            <span>Coupons for you</span>
                            <span className="green-2">− ₹141</span>
                        </div>
                        <div className="price-line-2">
                            <span>Protect Promise Fee</span>
                            <span>₹38</span>
                        </div>
                        <hr />
                        <div className="total-amount-2">
                            <span>Total Amount</span>
                            <span>₹{cartData.reduce((total, item) => total + item.price, 0) - 22492 - 141 + 38}</span>
                        </div>
                        <div className="savings-2 green-2">
                            You will save ₹{22492 + 141} on this order
                        </div>
                    </div>
                    <button className="place-order-btn-2">PLACE ORDER</button>
                </div>
            </div>
            
        </>
    )
}

export default UserCartCard
