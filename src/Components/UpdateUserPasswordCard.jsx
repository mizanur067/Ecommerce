import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import '../CSS/SellerSignUpComponent.css'
const UpdateUserPasswordCard = () => {
  const email = localStorage.getItem("email");
  const navigate = useNavigate();
  const location = useLocation();
  const [showPassword, setShowPassword] = React.useState(false);
  const [formData, setFormData] = React.useState({email:"", password: '', confirmPassword: '' });
  const [showSubmitStatus, setShowSubmitStatus] = React.useState(false);
  const [SubmitData, setSubmitData] = React.useState(null);


  if (!email) {
    navigate('/user-login', { state: { from: location } })
  }
  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)
    if (formData.password !== formData.confirmPassword) {
      setSubmitData("Password and Confirm Password do not match");
      setShowSubmitStatus(true);
      return;
    }
    formData.email=email;
    fetch('http://127.0.0.1:8000/Mizanur/update_user_password/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    }).then(response => response.json())
      .then(data => {
        console.log('Success:', data);
        setSubmitData(data.message);
        setShowSubmitStatus(true);
      })
      .catch((error) => {
        console.error('Error:', error);
        setSubmitData("An error occurred. Please try again.");
        setShowSubmitStatus(true);
      });
  }
  return (
    <div>
      {showSubmitStatus && <div className=" modal-overlay">
        <div className="modal">
          <span className="alert-text"><strong>{SubmitData}</strong></span>
          <button className="alert-close" onClick={() => setShowSubmitStatus(false)}>✕</button> </div>

      </div>}
      <div className="signup-container">
        <form className="signup-form" onSubmit={handleSubmit}>
          <h2>Password Update</h2>



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
          <label>
            Confirm Password
            <div className="password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                placeholder="********"
                value={formData.confirmPassword}
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

          <button type="submit">Update Password</button>


        </form>
      </div>

    </div>

  )
}

export default UpdateUserPasswordCard