
import React from 'react';

const FloatingElements = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Large floating orbs */}
      <div className="floating-orb w-64 h-64 bg-blue-300 top-10 -left-32" style={{ animationDelay: '0s' }} />
      <div className="floating-orb w-48 h-48 bg-green-300 top-1/3 -right-24" style={{ animationDelay: '2s' }} />
      <div className="floating-orb w-32 h-32 bg-purple-300 bottom-20 left-1/4" style={{ animationDelay: '4s' }} />
      <div className="floating-orb w-40 h-40 bg-pink-300 bottom-1/3 right-1/3" style={{ animationDelay: '1s' }} />
      
      {/* Small floating particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <div
          key={i}
          className="floating-orb bg-blue-200"
          style={{
            width: `${Math.random() * 12 + 8}px`,
            height: `${Math.random() * 12 + 8}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
            animationDuration: `${Math.random() * 4 + 4}s`
          }}
        />
      ))}
    </div>
  );
};

export default FloatingElements;
