import { useState, useEffect } from 'react';
import Link from 'next/link';

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      const offset = window.scrollY;
      setScrolled(offset > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
  }, [menuOpen]);

  // Close menu when clicking outside or on links
  const closeMenu = () => setMenuOpen(false);

  return (
    <>
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
          
          {/* <div className="navbar-contact">
            <a href="/assets/resume.pdf" className="nav-link">Resume</a>
          </div> */}
          
          <button 
            className="menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle navigation menu"
          >
            {menuOpen ? 'Menu' : 'Menu'}
          </button>
        </div>
      </nav>
      
      <div className={`full-menu ${menuOpen ? 'active' : ''}`}>
        <div className="menu-content">
          <div className="menu-links">
            <a href="#about" className="menu-link" onClick={closeMenu}>
              <span className="menu-letter">E</span>xperiences
            </a>
            <a href="#work" className="menu-link" onClick={closeMenu}>
              <span className="menu-letter">P</span>rojects
            </a>
            <a href="/assets/resume.pdf" className="menu-link" onClick={closeMenu}>
              <span className="menu-letter">R</span>esume
            </a>
          </div>
          
          <div className="menu-social">
            <h3>
              <span className="menu-letter">S</span>ocial
            </h3>
            <div className="menu-social-links">
              <a href="https://www.linkedin.com/in/jasonhonhk/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href="https://github.com/JasonH53" target="_blank" rel="noopener noreferrer">GitHub</a>
              <a href="https://medium.com/@jasonh53" target="_blank" rel="noopener noreferrer">Medium</a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;