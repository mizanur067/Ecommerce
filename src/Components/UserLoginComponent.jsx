import React from 'react'
import { useState } from 'react';
import '../CSS/SellerSignUpComponent.css'
import { useNavigate,useLocation } from 'react-router-dom';
const UserLoginComponent = () => {
     const [formData, setFormData] = useState({  email: '', password: '' });
      const [showPassword, setShowPassword] = useState(false);
      const [submitted, setSubmitted] = useState(false);
      const navigate = useNavigate();
      const location = useLocation();

      const handleChange = (e) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if ( !formData.email || !formData.password) {
          alert("Please fill all fields.");
          return;
        }
        setSubmitted(true);
        console.log("Form submitted:", formData);
        fetch('http://127.0.0.1:8000/Mizanur/user_login/', {
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
            console.log( data);
            localStorage.setItem('email', formData.email);
             
            console.log(localStorage.getItem('email'));
            navigate(location.state?.from || '/'); // Redirect to the previous page or home
          })
          .catch(error => {
            console.error("Error during login:", error);
          });
      };
  return (
     <div>
        <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <h2>Sign In</h2>

       

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

   
      </form>
    </div>

    </div>
        
    
  )
}

export default UserLoginComponent