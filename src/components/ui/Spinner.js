import React from 'react';

const Spinner = ({ size = 'sm', className = '' }) => {
  const sizes = {
    xs: 12,
    sm: 16, 
    md: 24,
    lg: 32
  };

  const spinnerSize = sizes[size];

  return (
    <div 
      className={className}
      style={{
        width: spinnerSize,
        height: spinnerSize,
        position: 'relative'
      }}
    >
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid #e5e7eb',
          width: '100%',
          height: '100%'
        }}
      ></div>
      <div 
        style={{
          position: 'absolute',
          inset: 0,
          borderRadius: '50%',
          border: '2px solid transparent',
          borderTopColor: 'currentColor',
          width: '100%',
          height: '100%',
          animation: 'spin 1s linear infinite'
        }}
      ></div>
      <style jsx>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Spinner;