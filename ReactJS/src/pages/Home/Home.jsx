import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/Button';
import './Home.scss';

function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // Individual field validation
  const validateField = (name, value) => {
    let message = '';

    if (name === 'email') {
      if (!value.trim()) {
        message = 'Email is required';
      } else if (!/\S+@\S+\.\S+/.test(value)) {
        message = 'Please enter a valid email address';
      }
    }

    if (name === 'password') {
      if (!value.trim()) {
        message = 'Password is required';
      } else if (value.length < 6) {
        message = 'Password must be at least 6 characters';
      }
    }

    setErrors((prev) => ({ ...prev, [name]: message }));
  };

  // Full form validation on submit
  const validateForm = () => {
    const newErrors = {};

    if (!email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoginError('');

    if (!validateForm()) return;

    // Hardcoded credentials
    const VALID_EMAIL = "test@email.com";
    const VALID_PASSWORD = "MyPassword";

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      localStorage.setItem("token", "fake-jwt-token");
      window.location.href = "/profile";
    } else {
      setLoginError("Invalid email or password");
    }

    // try {
    //   const response = await fetch('/api/login', {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify({ email, password }),
    //   });

    //   if (response.ok) {
    //     const data = await response.json();
    //     localStorage.setItem('token', data.token);
    //     navigate('/profile');
    //   } else {
    //     const err = await response.json();
    //     setLoginError(err.message);
    //   }
    // } catch (error) {
    //   console.error("Error:", error);
    //   setLoginError("Server not reachable");
    // }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-logo">
          <img src="./icons/Logo.svg" alt="Feed" />
          <p className="auth-title">Start Your Journey</p>
          <p className="auth-subtitle">Create a free account or log in</p>
        </div>

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="form-section">

            {/* EMAIL FIELD */}
            <div className="email-input">
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onBlur={(e) => validateField('email', e.target.value)} // ✅ validate on focusout
                className={`email-field ${errors.email ? 'invalid' : ''}`}
              />
            </div>
            {errors.email && <p className="error-text">{errors.email}</p>}

            {/* PASSWORD FIELD */}
            <div className="email-input">
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onBlur={(e) => validateField('password', e.target.value)} // ✅ validate on focusout
                className={`email-field ${errors.password ? 'invalid' : ''}`}
              />
            </div>
            {errors.password && <p className="error-text">{errors.password}</p>}

            {loginError && <p className="error-text">{loginError}</p>}

            <div className="continue-button">
              <Button color="primary" type="submit">
                Continue
              </Button>
            </div>
          </div>

          <div className="divider">
            <span>or</span>
          </div>

          <button className="google-button" onClick={handleGoogleSignIn} type="button">
            <div className="google-icon">
              {/* Google Icon */}
              <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.987" fillRule="evenodd" clipRule="evenodd" d="M10.8134 2.09113C11.9009 1.96962 12.5444 1.96962 13.7129 2.09113C15.7813 2.39727 17.6987 3.35335 19.1879 4.82113C18.1816 5.77233 17.1885 6.73742 16.2089 7.71612C14.3329 6.12612 12.2389 5.75913 9.92687 6.61513C8.23087 7.39513 7.04987 8.65913 6.38387 10.4071C5.29554 9.59687 4.22137 8.76774 3.16188 7.92012C3.08824 7.88137 3.00415 7.86718 2.92188 7.87962C4.60487 4.63462 7.23487 2.70462 10.8119 2.08962" fill="#F44336"/>
                <path opacity="0.997" fillRule="evenodd" clipRule="evenodd" d="M2.91938 7.87978C3.00438 7.86678 3.08488 7.88028 3.16088 7.92028C4.22038 8.7679 5.29454 9.59703 6.38288 10.4073C6.21162 11.0884 6.10366 11.7838 6.06038 12.4848C6.09738 13.1628 6.20488 13.8283 6.38288 14.4813L3.00038 17.1738C1.52738 14.0958 1.50038 10.9978 2.91938 7.87978Z" fill="#FFC107"/>
                <path opacity="0.999" fillRule="evenodd" clipRule="evenodd" d="M19.0281 20.4341C17.9749 19.5053 16.8723 18.634 15.7251 17.8241C16.8751 17.0121 17.5731 15.8981 17.8191 14.4821H12.1836V10.5686C15.4336 10.5416 18.6821 10.5691 21.9291 10.6511C22.5451 13.9961 21.8336 17.0121 19.7946 19.6991C19.5521 19.9569 19.2953 20.2022 19.0281 20.4341Z" fill="#448AFF"/>
                <path opacity="0.993" fillRule="evenodd" clipRule="evenodd" d="M6.3825 14.4824C7.6125 17.5394 9.8675 18.9664 13.1475 18.7634C14.0682 18.6568 14.951 18.3352 15.7245 17.8244C16.8725 18.6364 17.9735 19.5064 19.0275 20.4344C17.3575 21.9351 15.2282 22.8255 12.987 22.9604C12.4778 23.0011 11.9662 23.0011 11.457 22.9604C7.639 22.5104 4.82 20.5814 3 17.1734L6.3825 14.4824Z" fill="#43A047"/>
              </svg>
            </div>
            <span>Continue with Google</span>
          </button>

          <div className="terms-text">
            By creating an account, you agree to our{' '}
            <a href="/terms" className="terms-link">Terms of Service</a>{' '}
            and have read and understood the{' '}
            <a href="/privacy" className="terms-link">Privacy Policy</a>.
          </div>
        </form>
      </div>
    </div>
  );
}

export default Home;
