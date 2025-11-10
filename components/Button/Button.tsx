import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary';
}

const baseClasses =
  'inline-flex h-12 px-6 justify-center items-center gap-2 rounded-[32px] text-base font-medium transition-colors focus:outline-none';

const variantClasses: Record<'primary' | 'secondary', string> = {
  primary:
    // bg 002FFF + hover + disabled
    'bg-[#002FFF] text-white hover:bg-[#0028D9] focus:bg-[#0021B5] disabled:bg-[#64748B] disabled:cursor-not-allowed',
  secondary:
    // transparent + border + color
    'bg-transparent text-[#002FFF] border border-[#002FFF] hover:text-[#0028D9] hover:border-[#0028D9] focus:text-[#0021B5] focus:border-[#0021B5] disabled:text-[#64748B] disabled:border-[#64748B] disabled:cursor-not-allowed',
};

const Button: React.FC<ButtonProps> = ({
  color = 'primary',
  className = '',
  children,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`${baseClasses} ${variantClasses[color]} ${className}`.trim()}
    >
      {children}
    </button>
  );
};

export default Button;
