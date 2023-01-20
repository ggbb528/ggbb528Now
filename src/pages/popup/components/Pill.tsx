import React from 'react';

interface PillProps {
  className?: string;
  children?: React.ReactNode;
  bgColor?: string;
}
export default function Pill({
  className = '',
  children,
  bgColor = 'bg-blue-600',
}: PillProps) {
  return (
    <span
      className={`inline-block py-1 px-2.5 leading-none text-center whitespace-nowrap align-baseline font-bold text-black rounded-full 
        ${className} ${bgColor}`}
    >
      {children}
    </span>
  );
}
