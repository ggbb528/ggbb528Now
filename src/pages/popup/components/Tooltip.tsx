import React from 'react';

function Tooltip({
  message,
  children,
  position = 'top',
}: {
  message?: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}) {
  if (!message)
    return (
      <div className="group relative inline-flex justify-center">
        <div className="cursor-default">{children}</div>
      </div>
    );

  return (
    <div className="group relative inline-flex justify-center">
      {position === 'top' && (
        <span className="absolute z-20 -top-10 scale-0 whitespace-nowrap transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 after:content-['_'] after:absolute after:top-full after:left-1/2 after:border-4 after:border-transparent after:border-t-gray-800 ">
          {message}
        </span>
      )}
      <div className="cursor-default">{children}</div>
      {position === 'bottom' && (
        <span className="absolute z-20 -bottom-10 scale-0 whitespace-nowrap transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100 before:content-['_'] before:absolute before:bottom-full before:left-1/2 before:border-4 before:border-transparent before:border-b-gray-800 ">
          {message}
        </span>
      )}
    </div>
  );
}

export default Tooltip;
