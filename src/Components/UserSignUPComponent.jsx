import React from 'react'
import '../CSS/SellerSignUpComponent.css'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
const UserSignUpComponent = () => {
    const [formData, setFormData] = useState({ name: '', email: '', password: '' });
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
    fetch('http://127.0.0.1:8000/Mizanur/user_signup/', {
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
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        navigate('/user-login'); // Change to your actual sign-in route
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [submitted, navigate]);
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

export default UserSignUpComponent