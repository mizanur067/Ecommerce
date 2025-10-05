import React from 'react'
import '../CSS/SellerSignUpComponent.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SellerSignUpCard = () => {
        const [formData, setFormData] = useState({ name: '', email: '',shopname:'', shop_description:'',phone_number:'',address:'', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      alert("Please fill all fields.");
      return;
    }
    setSubmitted(true);
    console.log("Form submitted:", formData);
    fetch('http://127.0.0.1:8000/Mizanur/seller_signup/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log("Signup successful:", data);
      })
      .catch(error => {
        console.error("Error during signup:", error);
      });

    
  }
    return (
        <div>
            <div className="signup-container">
                <form className="signup-form" onSubmit={handleSubmit}>
                    <h2>Create Account</h2>

                    <label>
                        Name
                        <input
                            type="text"
                            name="name"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>

                    <label>
                        Email
                        <input
                            type="email"
                            name="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Shop Name
                        <input
                            type="text"
                            name="shopname"
                            placeholder="My Shop Name"
                            value={formData.shopname}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    
                     <label>
                        Shop Description
                        <input
                            type="text"
                            name="shop_description"
                            placeholder="My Shop Description"
                            value={formData.shop_description}
                            onChange={handleChange}
                            
                        />
                    </label>

                     <label>
                        Phone Number
                        <input
                            type="text"
                            name="phone_number"
                            placeholder="123-456-7890"
                            value={formData.phone_number}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Address
                        <input
                            type="text"
                            name="address"
                            placeholder="123 Main St"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        Password
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                name="password"
                                placeholder="********"
                                value={formData.password}
                                minLength={6}
                                onChange={handleChange}
                                required
                            />
                            <span
                                className="toggle-password"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Hide' : 'Show'}
                            </span>
                        </div>
                    </label>

                    <button type="submit">Sign In</button>

                    {submitted && <p className="success-msg">Signup Successful! 🎉</p>


                    }


                </form>
            </div>

        </div>
    )
}

export default SellerSignUpCard