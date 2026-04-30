import type { ButtonHTMLAttributes, ReactNode } from 'react';

type AppButtonVariant = 'primary' | 'secondary' | 'ghost';

type AppButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
  variant?: AppButtonVariant;
};

export function AppButton({
  children,
  variant = 'primary',
  className = '',
  ...props
}: AppButtonProps) {
  return (
    <button
      className={`app-button app-button--${variant} ${className}`.trim()}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}