export default function Button({
  children,
  onClick,
  disabled = false,
  variant = 'primary',
  type = 'button',
  ...props
}) {
  const baseStyles =
    'px-4 py-2 rounded font-medium transition-colors duration-200';
  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 disabled:bg-gray-400',
    secondary:
      'bg-gray-200 text-gray-800 hover:bg-gray-300 disabled:bg-gray-100',
    danger: 'bg-red-600 text-white hover:bg-red-700 disabled:bg-gray-400',
  };

  const buttonClass = `${baseStyles} ${variantStyles[variant] || variantStyles.primary}`;

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClass}
      {...props}
    >
      {children}
    </button>
  );
}
