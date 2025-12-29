"use client"

import { useEffect } from 'react';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
});

function RootLayout({ children }) {
  useEffect(() => {
    const cursor = document.querySelector('.cursor');
    const progress = document.querySelector('.scroll-progress');

    // Cursor tracking animation + parallax tilt on project cards
    const handleMouseMove = (e) => {
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
        if (rect.left <= e.clientX && e.clientX <= rect.right && rect.top <= e.clientY && e.clientY <= rect.bottom) {
          card.style.transform = `perspective(800px) rotateY(${(x - rect.width / 2) / 50}deg) rotateX(${-(y - rect.height / 2) / 50}deg) translateZ(10px)`;
        }
      });
    };

    // Top scroll progress bar update
    const handleScroll = () => {
      if (!progress) return;
      const scrollTop = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      progress.style.width = `${pct}%`;
    };

    // Cursor hover intent on interactive elements
    const onEnterInteractive = () => cursor && cursor.classList.add('cursor-grow');
    const onLeaveInteractive = () => cursor && cursor.classList.remove('cursor-grow');
    const interactive = document.querySelectorAll('a, button, .project-card');

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('scroll', handleScroll, { passive: true });
    interactive.forEach((el) => {
      el.addEventListener('mouseenter', onEnterInteractive);
      el.addEventListener('mouseleave', onLeaveInteractive);
    });

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('scroll', handleScroll);
      interactive.forEach((el) => {
        el.removeEventListener('mouseenter', onEnterInteractive);
        el.removeEventListener('mouseleave', onLeaveInteractive);
      });
    };
  }, []);

  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body>
        {/* Scroll progress bar */}
        <div className="scroll-progress" aria-hidden="true"></div>
        {/* Custom cursor */}
        <div className="cursor"></div>
        {children}
      </body>
    </html>
  );
}

export default RootLayout;