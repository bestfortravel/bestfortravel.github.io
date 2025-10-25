'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from '@/components/Button/Button';
import '@/styles/Home.scss';
import Cookies from 'js-cookie';

export default function HomePage() {
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [requirements, setRequirements] = useState({
    length: false,
    capital: false,
    number: false,
    spaces: true,
  });

  // Password validation rules
  const validatePasswordRules = (value: string) => {
    setRequirements({
      length: value.length >= 6 && value.length <= 12,
      capital: /[A-Z]/.test(value),
      number: /[0-9]/.test(value),
      spaces: !/\s/.test(value),
    });
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError('');

    if (!validateForm()) return;

    // Hardcoded credentials
    const VALID_EMAIL = 'bft@gmail.com';
    const VALID_PASSWORD = 'Password1';

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
			Cookies.set('token', 'fake-jwt-token', { expires: 7 });
      router.push('/profile')
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  return (
    <div className='auth-container'>
      <div className='auth-card'>
        <div className='auth-logo'>
          <img src='/icons/Logo.svg' alt='Feed' />
          <p className='auth-title'>Start Your Journey</p>
          <p className='auth-subtitle'>Create a free account or log in</p>
        </div>

        <form className='auth-form' onSubmit={handleSubmit} noValidate>
          {/* EMAIL */}
          <div className='input-field-wrapper'>
            <input
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`input-field ${errors.email ? 'invalid' : ''}`}
            />
          </div>
          {errors.email && <p className='error-text'>{errors.email}</p>}

          {/* PASSWORD */}
          <div className={`password-wrapper ${showPassword ? 'show' : ''}`}>
            <input
              type={showPassword ? 'text' : 'password'}
              placeholder='Password'
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                validatePasswordRules(e.target.value);
              }}
              onFocus={() => setPasswordFocused(true)}
              onBlur={() => setPasswordFocused(false)}
              className={`input-field ${errors.password ? 'invalid' : ''}`}
            />
            <span
              className='toggle-password'
              onClick={() => setShowPassword((prev) => !prev)}
            ></span>

            {/* PASSWORD REQUIREMENTS */}
            <div
              className={`password-rules ${passwordFocused ? 'visible' : ''}`}
            >
              <p className='password-rules-title'>Password must include:</p>
              <ul>
                <li
                  className={`password-rules-item ${
                    requirements.length ? 'valid' : 'invalid'
                  }`}
                >
                  <span className="password-rules-icon"></span> 6–12 Characters
                </li>
                <li
                  className={`password-rules-item ${
                    requirements.capital ? 'valid' : 'invalid'
                  }`}
                >
                  <span className="password-rules-icon"></span> At least one capital letter
                </li>
                <li
                  className={`password-rules-item ${
                    requirements.number ? 'valid' : 'invalid'
                  }`}
                >
                  <span className="password-rules-icon"></span> At least one number
                </li>
                <li
                  className={`password-rules-item ${
                    requirements.spaces ? 'valid' : 'invalid'
                  }`}
                >
                  <span className="password-rules-icon"></span> No spaces
                </li>
              </ul>
            </div>
          </div>

          {loginError && <p className='error-text'>{loginError}</p>}

          <div className='continue-button'>
            <Button color='primary' type='submit'>
              Continue
            </Button>
          </div>

          <div className='divider'>
            <span>or</span>
          </div>

          <button
            className='google-button'
            onClick={handleGoogleSignIn}
            type='button'
          >
            <div className='google-icon'>
            {/* Google Icon */}
            <svg width='24' height='25' viewBox='0 0 24 25' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path opacity='0.987' fillRule='evenodd' clipRule='evenodd' d='M10.8134 2.09113C11.9009 1.96962 12.5444 1.96962 13.7129 2.09113C15.7813 2.39727 17.6987 3.35335 19.1879 4.82113C18.1816 5.77233 17.1885 6.73742 16.2089 7.71612C14.3329 6.12612 12.2389 5.75913 9.92687 6.61513C8.23087 7.39513 7.04987 8.65913 6.38387 10.4071C5.29554 9.59687 4.22137 8.76774 3.16188 7.92012C3.08824 7.88137 3.00415 7.86718 2.92188 7.87962C4.60487 4.63462 7.23487 2.70462 10.8119 2.08962' fill='#F44336'/>
                <path opacity='0.997' fillRule='evenodd' clipRule='evenodd' d='M2.91938 7.87978C3.00438 7.86678 3.08488 7.88028 3.16088 7.92028C4.22038 8.7679 5.29454 9.59703 6.38288 10.4073C6.21162 11.0884 6.10366 11.7838 6.06038 12.4848C6.09738 13.1628 6.20488 13.8283 6.38288 14.4813L3.00038 17.1738C1.52738 14.0958 1.50038 10.9978 2.91938 7.87978Z' fill='#FFC107'/>
                <path opacity='0.999' fillRule='evenodd' clipRule='evenodd' d='M19.0281 20.4341C17.9749 19.5053 16.8723 18.634 15.7251 17.8241C16.8751 17.0121 17.5731 15.8981 17.8191 14.4821H12.1836V10.5686C15.4336 10.5416 18.6821 10.5691 21.9291 10.6511C22.5451 13.9961 21.8336 17.0121 19.7946 19.6991C19.5521 19.9569 19.2953 20.2022 19.0281 20.4341Z' fill='#448AFF'/>
                <path opacity='0.993' fillRule='evenodd' clipRule='evenodd' d='M6.3825 14.4824C7.6125 17.5394 9.8675 18.9664 13.1475 18.7634C14.0682 18.6568 14.951 18.3352 15.7245 17.8244C16.8725 18.6364 17.9735 19.5064 19.0275 20.4344C17.3575 21.9351 15.2282 22.8255 12.987 22.9604C12.4778 23.0011 11.9662 23.0011 11.457 22.9604C7.639 22.5104 4.82 20.5814 3 17.1734L6.3825 14.4824Z' fill='#43A047'/>
            </svg>
            </div>
            <span>Continue with Google</span>
          </button>

          <div className='terms-text'>
            By creating an account, you agree to our{' '}
            <a href='/terms' className='terms-link'>
              Terms of Service
            </a>{' '}
            and have read and understood the{' '}
            <a href='/privacy' className='terms-link'>
              Privacy Policy
            </a>.
          </div>
        </form>
      </div>
    </div>
  );
}
