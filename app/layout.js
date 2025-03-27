"use client"

import { useEffect } from 'react';
import './globals.css';

function RootLayout({ children }) {
  useEffect(() => {
    // Cursor tracking animation
    const handleMouseMove = (e) => {
      const cursor = document.querySelector('.cursor');
      if (cursor) {
        cursor.style.left = `${e.clientX}px`;
        cursor.style.top = `${e.clientY}px`;
      }
      
      // Parallax effect for project cards
      const cards = document.querySelectorAll('.project-card');
      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (rect.left <= e.clientX && e.clientX <= rect.right &&
            rect.top <= e.clientY && e.clientY <= rect.bottom) {
          card.style.transform = `perspective(800px) rotateY(${(x - rect.width / 2) / 50}deg) rotateX(${-(y - rect.height / 2) / 50}deg) translateZ(10px)`;
        }
      });
    };

    document.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="cursor"></div>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;