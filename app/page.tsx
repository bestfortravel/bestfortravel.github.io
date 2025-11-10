'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Button from '@/components/Button/Button';

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

    const VALID_EMAIL = 'bft@gmail.com';
    const VALID_PASSWORD = 'Password1';

    if (email === VALID_EMAIL && password === VALID_PASSWORD) {
      Cookies.set('token', 'fake-jwt-token', { expires: 7 });
      router.push('/profile');
    } else {
      setLoginError('Invalid email or password');
    }
  };

  const handleGoogleSignIn = () => {
    console.log('Google sign in clicked');
  };

  return (
    <div
      className="min-h-screen flex flex-col justify-center items-center gap-8 px-4 py-5 bg-[url('/images/backgroundLogin.png')] bg-no-repeat bg-cover"
    >
      <div
        className="
          flex flex-col items-center gap-4
          w-[535px] rounded-[32px] bg-white shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-1px_rgba(0,0,0,0.06)]
          px-16 py-16
          max-[991px]:w-[90%] max-[991px]:max-w-[500px] max-[991px]:px-8 max-[991px]:py-12
          max-[640px]:w-[95%] max-[640px]:max-w-[90%] max-[640px]:px-6 max-[640px]:py-8 max-[640px]:rounded-[24px]
        "
      >
        {/* logo / title */}
        <div className='flex flex-col items-center pb-4'>
          <img src='/icons/Logo.svg' alt='Feed' className='mb-4 h-12' />
          <p className='text-[#1E293B] text-[32px] font-semibold leading-none mb-0'>
            Start Your Journey
          </p>
          <p className='m-0 text-[#475569] text-[16px] leading-[26px]'>
            Create a free account or log in
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          noValidate
          className='flex flex-col items-stretch w-full'
        >
          {/* EMAIL */}
          <div className='mb-2'>
            <input
              type='email'
              placeholder='Email Address'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-6 py-4 rounded-[24px] border text-[#64748b] bg-white text-sm outline-none transition
                ${errors.email ? 'border-[#EA081B] shadow-[0_0_0_4px_#FFF5F5]' : 'border-[#CBD5E1] focus:border-[#475569] focus:shadow-[0_0_0_4px_#E2E8F0]'}
              `}
            />
            {errors.email && (
              <p className='text-[#475569] text-[12px] leading-5 mt-0 mb-4'>
                {errors.email}
              </p>
            )}
          </div>

          {/* PASSWORD */}
          <div className='relative mb-2'>
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
              className={`w-full px-6 py-4 rounded-[24px] border text-[#64748b] bg-white text-sm outline-none transition
                ${errors.password ? 'border-[#EA081B] shadow-[0_0_0_4px_#FFF5F5]' : 'border-[#CBD5E1] focus:border-[#475569] focus:shadow-[0_0_0_4px_#E2E8F0]'}
              `}
            />

            {/* toggle password icon */}
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className={`
                absolute right-6 top-1/2 -translate-y-1/2 w-6 h-6 cursor-pointer opacity-70 hover:opacity-100
                bg-no-repeat bg-contain
                ${showPassword ? "bg-[url('/icons/eye-slash.svg')]" : "bg-[url('/icons/eye.svg')]"}
              `}
            />

            {/* PASSWORD RULES */}
            <div
              className={`
                absolute left-0 right-0 mt-2 bg-white border border-[#CBD5E1] rounded-[24px] px-6 py-4 text-[14px] leading-[22px] text-[#475569]
                shadow-[0_25px_50px_rgba(0,0,0,0.05)]
                transition-all duration-200
                ${passwordFocused ? 'opacity-100 max-h-[250px] translate-y-2' : 'opacity-0 max-h-0 overflow-hidden'}
              `}
            >
              <p className='text-[12px] leading-5 mb-2'>Password must include:</p>
              <ul className='list-none p-0 m-0 space-y-1'>
                <li className='flex items-center gap-2 text-sm'>
                  <span
                    className={`w-5 h-5 flex-shrink-0 bg-no-repeat bg-contain
                      ${requirements.length ? "bg-[url('/icons/check-green.svg')]" : "bg-[url('/icons/close-red.svg')]"}
                    `}
                  />
                  6–12 Characters
                </li>
                <li className='flex items-center gap-2 text-sm'>
                  <span
                    className={`w-5 h-5 flex-shrink-0 bg-no-repeat bg-contain
                      ${requirements.capital ? "bg-[url('/icons/check-green.svg')]" : "bg-[url('/icons/close-red.svg')]"}
                    `}
                  />
                  At least one capital letter
                </li>
                <li className='flex items-center gap-2 text-sm'>
                  <span
                    className={`w-5 h-5 flex-shrink-0 bg-no-repeat bg-contain
                      ${requirements.number ? "bg-[url('/icons/check-green.svg')]" : "bg-[url('/icons/close-red.svg')]"}
                    `}
                  />
                  At least one number
                </li>
                <li className='flex items-center gap-2 text-sm'>
                  <span
                    className={`w-5 h-5 flex-shrink-0 bg-no-repeat bg-contain
                      ${requirements.spaces ? "bg-[url('/icons/check-green.svg')]" : "bg-[url('/icons/close-red.svg')]"}
                    `}
                  />
                  No spaces
                </li>
              </ul>
            </div>
          </div>

          {loginError && (
            <p className='text-[#475569] text-[12px] leading-5 mt-0 mb-4'>
              {loginError}
            </p>
          )}

          {/* continue button */}
          <div className='mt-5 mb-4'>
            <Button color='primary' className='w-full h-[54px] max-[640px]:h-12 text-[15px]'>
              Continue
            </Button>
          </div>

          {/* divider */}
          <div className='flex items-center gap-2 my-4'>
            <div className='flex-1 h-px bg-[#CBD5E1]' />
            <span className='text-[#475569] text-[14px] text-center'>or</span>
            <div className='flex-1 h-px bg-[#CBD5E1]' />
          </div>

          {/* google */}
          <button
            type='button'
            onClick={handleGoogleSignIn}
            className='flex items-center justify-center gap-2 w-full py-4 px-6 rounded-[24px] border border-[#CBD5E1] bg-white text-[#1E293B] text-[16px] font-medium hover:bg-[#F8FAFC] hover:border-[#94A3B8] transition'
          >
            <span className='w-6 h-6'>
              <img src='/icons/google.svg' alt='Google' className='w-6 h-6' />
            </span>
            <span>Continue with Google</span>
          </button>

          <div className='text-center text-[#64748B] text-[14px] leading-[22px] mt-4'>
            By creating an account, you agree to our{' '}
            <a href='/terms' className='underline text-[#64748B] hover:text-[#475569]'>
              Terms of Service
            </a>{' '}
            and have read and understood the{' '}
            <a href='/privacy' className='underline text-[#64748B] hover:text-[#475569]'>
              Privacy Policy
            </a>.
          </div>
        </form>
      </div>
    </div>
  );
}
