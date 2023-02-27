import React from 'react';

function Tooltip({
  message,
  children,
  position = 'top',
}: {
  message: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom';
}) {
  return (
    <div className="group relative inline-flex justify-center">
      {position === 'top' && (
        <span className="absolute z-20 -top-10 scale-0 whitespace-nowrap transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
          {message}
        </span>
      )}
      <div className="cursor-default">{children}</div>
      {position === 'bottom' && (
        <span className="absolute z-20 -bottom-10 scale-0 whitespace-nowrap transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">
          {message}
        </span>
      )}
    </div>
  );
}

export default Tooltip;
