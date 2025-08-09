import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="navbar-container">
        <div className="navbar-logo">
          <h1>
            <Link href="/">
              <span className="logo-letter">J</span>ason
            </Link>
          </h1>
          <div className="time">
            {new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })} EST
          </div>
        </div>
        
        <div className="navbar-links">
          <Link href="#about" className="nav-link">Experiences</Link>
          <Link href="#work" className="nav-link">Projects</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;