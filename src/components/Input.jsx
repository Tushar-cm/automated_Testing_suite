import React, { useState } from 'react';

export default function Input({
  label,
  placeholder,
  type = 'text',
  required = false,
  disabled = false,
  error,
  value,
  onChange,
  onBlur,
  ...props
}) {
  const [focused, setFocused] = useState(false);

  const handleFocus = () => setFocused(true);
  const handleBlur = (e) => {
    setFocused(false);
    if (onBlur) onBlur(e);
  };

  const borderColor = error
    ? 'border-red-500'
    : focused
      ? 'border-blue-500'
      : 'border-gray-300';

  return (
    <div className='w-full mb-4'>
      {label && (
        <label className='block text-sm font-medium text-gray-700 mb-2'>
          {label}
          {required && <span className='text-red-500 ml-1'>*</span>}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        value={value}
        onChange={onChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-0 transition-colors ${borderColor} ${
          disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'
        }`}
        {...props}
      />

      {error && <p className='mt-1 text-sm text-red-500'>{error}</p>}
    </div>
  );
}
