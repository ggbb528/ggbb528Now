import React from 'react';

function Marquee({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex overflow-x-hidden">
      <div className="w-full animate-marquee px-2">{children}</div>
      <div className="absolute w-full animate-marquee2 px-2">{children}</div>
    </div>
  );
}

export default Marquee;
