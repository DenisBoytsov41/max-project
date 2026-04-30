import type { InputHTMLAttributes } from 'react';

type AppInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function AppInput({ label, id, className = '', ...props }: AppInputProps) {
  const inputId = id ?? props.name ?? label;

  return (
    <label className="form-field" htmlFor={inputId}>
      <span className="form-field__label">{label}</span>
      <input
        id={inputId}
        className={`form-field__control ${className}`.trim()}
        {...props}
      />
    </label>
  );
}