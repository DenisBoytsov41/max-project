import type { TextareaHTMLAttributes } from 'react';

type AppTextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  hint?: string;
};

export function AppTextarea({
  label,
  hint,
  id,
  className = '',
  ...props
}: AppTextareaProps) {
  const textareaId = id ?? props.name ?? label;

  return (
    <label className="form-field" htmlFor={textareaId}>
      <span className="form-field__label">{label}</span>
      <textarea
        id={textareaId}
        className={`form-field__control form-field__textarea ${className}`.trim()}
        {...props}
      />
      {hint ? <span className="form-field__hint">{hint}</span> : null}
    </label>
  );
}