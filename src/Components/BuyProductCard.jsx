import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useState } from 'react';
import '../CSS/BuyProduct.css'

const BuyProductCard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const email = localStorage.getItem('email');
    const [formData, setFormData] = useState({
        name: '', user_email: email, phone_number: '',
        address_line1: '', address_line2: '', city: '', state: '', postal_code: '', country: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const [showNewAddressForm, setShowNewAddressForm] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [showAlertData, setShowAlertData] = useState('');

    if (!email) {
        navigate("/user-login", { state: { from: location }, replace: true });
        return;
    }

    // const [selectedAddress_4, setSelectedAddress_4] = useState(true);


    const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);

        if (formData.name === '' || formData.name === null) {
            //alert('Please enter your name');
            console.log('filling blank..')
            const emailData = { email: email };
            const gotData = await fetch('http://127.0.0.1:8000/Mizanur/get_user_name/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(emailData),
            });

            const data = await gotData.json();
            console.log(data);
            formData.name = data.name;
            console.log("Updated formData:", formData);
        }
        await fetch('http://127.0.0.1:8000/Mizanur/add_user_address/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        }).then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        }).then(data => {
            console.log("Address saved successfully:", data);
               setShowAlert(true);
       
            if(data.message==='Address saved successfully.'){
                
                setShowAlertData(data.message);
            }
            else if (data.message==='Address already exists.'){
                setShowAlertData(data.message);
            }

        })
            .catch(error => {
                console.error('There was a problem with the fetch operation:', error);
            });
    };



    return (

        <>{showAlert && (
            <div className=" modal-overlay">
                <div className="modal">
                    <span className="alert-text"><strong>{showAlertData}</strong></span>
                    <button className="alert-close" onClick={() => setShowAlert(false)}>✕</button> </div>

            </div>
        )}
            <div className="checkoutContainer_4">
                {/* Left Section */}
                <div className="leftSection_4">
                    {/* Login */}
                    <div className="loginSection_4">
                        <div className="loginHeader_4">
                            <h2>1. LOGIN</h2>
                            <button className="changeBtn_4">CHANGE</button>
                        </div>
                        <p className="loginPhone_4">+918399067036</p>
                    </div>

                    {/* Delivery Address */}
                    <div className="addressSection_4">
                        <h2>2. DELIVERY ADDRESS</h2>


                        <div className="addNewAddress_4" onClick={() => setShowNewAddressForm(!showNewAddressForm)}>+ Add a new address</div>
                        {showNewAddressForm && (<div className="signup-container_4">
                            <form className="signup-form" onSubmit={handleSubmit}>
                                <h2>Add Address</h2>

                                <label>
                                    Name
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="John Doe"
                                        value={formData.name}
                                        onChange={handleChange}

                                    />
                                </label>



                                <label>
                                    Phone Number
                                    <input
                                        type="number"
                                        name="phone_number"
                                        placeholder="12345 67890"
                                        value={formData.phone_number}
                                        onChange={handleChange}
                                        required

                                    />
                                </label>
                                <label>
                                    Address Line 1
                                    <input
                                        type="text"
                                        name="address_line1"
                                        placeholder="123, Main Street"
                                        value={formData.address_line1}
                                        onChange={handleChange}
                                        required

                                    />
                                </label>
                                <label>
                                    Address Line 2
                                    <input
                                        type="text"
                                        name="address_line2"
                                        placeholder="Apt 4B"
                                        value={formData.address_line2}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    City
                                    <input
                                        type="text"
                                        name="city"
                                        placeholder="City"
                                        value={formData.city}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    State
                                    <input
                                        type="text"
                                        name="state"
                                        placeholder="State"
                                        value={formData.state}
                                        onChange={handleChange}
                                    />
                                </label>
                                <label>
                                    Postal Code
                                    <input
                                        type="text"
                                        name="postal_code"
                                        placeholder="Postal Code"
                                        value={formData.postal_code}
                                        onChange={handleChange}
                                        required
                                    />
                                </label>
                                <label>
                                    Country
                                    <input
                                        type="text"
                                        name="country"
                                        placeholder="Country"
                                        value={formData.country}
                                        onChange={handleChange}
                                    />
                                </label>

                                <button type="submit">Save Address</button>

                                {submitted && <p className="success-msg">Address Saved Successfully! 🎉</p>}


                            </form>
                        </div>)}

                    </div>
                </div>

                {/* Right Section */}
                <div className="rightSection_4">
                    <h2>PRICE DETAILS</h2>
                    <div className="priceRow_4">
                        <span>Price (1 item)</span>
                        <span>₹29,999</span>
                    </div>
                    <div className="priceRow_4">
                        <span>Protect Promise Fee</span>
                        <span>₹79</span>
                    </div>
                    <hr />
                    <div className="priceTotal_4">
                        <span>Total Payable</span>
                        <span>₹30,078</span>
                    </div>
                    <p className="savingsText_4">
                        Your Total Savings on this order ₹10,921
                    </p>

                    <div className="safetyNote_4">
                        ✅ Safe and Secure Payments. Easy returns. 100% Authentic products.
                    </div>
                    <p className="termsText_4">
                        By continuing with the order, you confirm that you are above 18 years
                        of age, and you agree to the Flipkart’s{" "}
                        <span className="link_4">Terms of Use</span> and{" "}
                        <span className="link_4">Privacy Policy</span>.
                    </p>
                </div>
            </div>
        </>
    );
}

export default BuyProductCard