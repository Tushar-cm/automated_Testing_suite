import React from 'react';

export default function Card({
  title,
  description,
  children,
  image,
  footer,
  ...props
}) {
  return (
    <div
      className='rounded-lg border border-gray-200 bg-white shadow-sm overflow-hidden hover:shadow-md transition-shadow'
      data-testid='card-container'
      {...props}
    >
      {image && (
        <div className='w-full h-48 overflow-hidden bg-gray-100'>
          <img
            src={image}
            alt='Card visual'
            className='w-full h-full object-cover'
          />
        </div>
      )}

      <div className='p-4'>
        {title && (
          <h3 className='text-lg font-semibold text-gray-900 mb-2'>
            {title}
          </h3>
        )}

        {description && (
          <p className='text-sm text-gray-600 mb-4'>{description}</p>
        )}

        {children && <div className='mb-4'>{children}</div>}
      </div>

      {footer && (
        <div className='px-4 py-3 border-t border-gray-200 bg-gray-50'>
          {footer}
        </div>
      )}
    </div>
  );
}
