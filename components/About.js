"use client"

import { useState } from 'react';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import LeetCodeStats from './LeetCodeStats';

export default function About() {
  const [asideOpen, setAsideOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(false);

  return (
    <div className="martin-page">
      <style jsx>{`
                .martin-page {
                    min-height: 100vh;
                    background-color: #0a0a0a;
                    background-image: 
                        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
                    background-size: 40px 40px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    padding: 3rem 1.5rem;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                }

                .content-card {
                    background-color: #1a1a1a;
                    border-radius: 12px;
                    padding: 2.5rem 3rem;
                    max-width: 680px;
                    width: 100%;
                    box-shadow: 0 4px 24px rgba(0, 0, 0, 0.4);
                }

                .header-row {
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    gap: 0.5rem;
                    margin-bottom: 2rem;
                    padding-bottom: 1rem;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.08);
                }

                .name {
                    font-size: 1.1rem;
                    font-weight: 500;
                    color: #ffffff;
                }

                .nav-tab {
                    font-size: 0.9rem;
                    color: rgba(255, 255, 255, 0.6);
                    padding: 0.35rem 0.75rem;
                    border-radius: 4px;
                    transition: all 0.2s ease;
                }

                .nav-tab:hover {
                    color: rgba(255, 255, 255, 0.9);
                    background: rgba(255, 255, 255, 0.05);
                }

                .nav-tab.active {
                    color: #ffffff;
                    background: rgba(255, 255, 255, 0.08);
                }

                .bullet-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                }

                .bullet-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 0.75rem;
                    margin-bottom: 0.35rem;
                    font-size: 0.95rem;
                    line-height: 1.6;
                    color: rgba(255, 255, 255, 0.85);
                }

                .bullet-diamond {
                    color: #c9a227;
                    font-size: 0.6rem;
                    margin-top: 0.45rem;
                    flex-shrink: 0;
                }

                .bullet-arrow {
                    color: rgba(255, 255, 255, 0.4);
                    margin-left: 0.25rem;
                    margin-top: 0.45rem;
                    flex-shrink: 0;
                    font-size: 0.8rem;
                }

                .section-label {
                    font-style: italic;
                    color: rgba(255, 255, 255, 0.7);
                }

                .highlight {
                    font-weight: 600;
                    color: #ffffff;
                }

                .underline-link {
                    text-decoration: underline;
                    text-decoration-color: rgba(255, 255, 255, 0.4);
                    text-underline-offset: 2px;
                    color: #ffffff;
                    font-weight: 600;
                    transition: text-decoration-color 0.2s ease;
                }

                .underline-link:hover {
                    text-decoration-color: rgba(255, 255, 255, 0.8);
                }

                .muted {
                    color: rgba(255, 255, 255, 0.5);
                }

                .company-icon {
                    width: 16px;
                    height: 16px;
                    border-radius: 3px;
                    vertical-align: middle;
                    margin-left: 0.35rem;
                    margin-right: 0.25rem;
                    margin-top: -2px;
                }

                .leetcode-card {
                    max-width: 100%;
                    height: auto;
                    border-radius: 8px;
                    transition: transform 0.2s ease, opacity 0.2s ease;
                    opacity: 0.9;
                }

                .leetcode-card:hover {
                    transform: scale(1.02);
                    opacity: 1;
                }

                .see-work-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 0.5rem;
                    width: 100%;
                    padding: 0.9rem 1.5rem;
                    margin-top: 2rem;
                    background: transparent;
                    border: 1px solid rgba(255, 255, 255, 0.15);
                    border-radius: 8px;
                    color: rgba(255, 255, 255, 0.8);
                    font-size: 0.9rem;
                    font-family: inherit;
                    cursor: pointer;
                    transition: all 0.2s ease;
                }

                .see-work-btn:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.25);
                    color: #ffffff;
                }

                .see-work-underline {
                    text-decoration: underline;
                    text-underline-offset: 2px;
                }

                .signature {
                    font-family: 'Brush Script MT', 'Segoe Script', cursive;
                    font-size: 3.5rem;
                    color: rgba(255, 255, 255, 0.15);
                    text-align: center;
                    margin-top: 2.5rem;
                    margin-bottom: 1.5rem;
                    letter-spacing: 2px;
                }

                .footer-section {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    width: 100%;
                    max-width: 680px;
                    padding-top: 1rem;
                }

                .social-links {
                    display: flex;
                    gap: 1rem;
                    align-items: center;
                }

                .social-link {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 1.1rem;
                    transition: color 0.2s ease;
                }

                .social-link:hover {
                    color: rgba(255, 255, 255, 0.9);
                }

                .social-icon-img {
                    width: 1.1rem;
                    height: 1.1rem;
                    filter: brightness(0) invert(1) opacity(0.5);
                    transition: filter 0.2s ease;
                    vertical-align: middle;
                }

                .social-link:hover .social-icon-img {
                    filter: brightness(0) invert(1) opacity(0.9);
                }

                .webring {
                    display: flex;
                    align-items: center;
                    gap: 0.75rem;
                }

                .webring-link {
                    color: rgba(255, 255, 255, 0.5);
                    font-size: 1rem;
                    transition: color 0.2s ease;
                    text-decoration: none;
                }

                .webring-link:hover {
                    color: rgba(255, 255, 255, 0.9);
                }

                .webring-icon {
                    width: 18px;
                    height: auto;
                    opacity: 0.6;
                }

                .copyright {
                    font-size: 0.75rem;
                    color: rgba(255, 255, 255, 0.4);
                    margin-top: 1.5rem;
                    text-align: left;
                    width: 100%;
                    max-width: 680px;
                }

                .sub-bullet {
                    margin-left: 1.5rem;
                }

                .collapsible-header {
                    cursor: pointer;
                    user-select: none;
                    transition: all 0.2s ease;
                }

                .collapsible-header .section-label {
                    text-decoration: underline;
                    text-decoration-style: dotted;
                    text-decoration-color: rgba(255, 255, 255, 0.3);
                    text-underline-offset: 3px;
                }

                .collapsible-header:hover .section-label {
                    text-decoration-color: rgba(255, 255, 255, 0.7);
                    color: rgba(255, 255, 255, 0.95);
                }

                .collapsible-header:hover .toggle-arrow {
                    color: rgba(255, 255, 255, 0.8);
                }

                .toggle-arrow {
                    font-style: normal;
                    display: inline-block;
                    margin-left: 0.35rem;
                    transition: transform 0.2s ease;
                    font-size: 0.7rem;
                    color: rgba(255, 255, 255, 0.5);
                }

                .toggle-arrow.open {
                    transform: rotate(90deg);
                }

                .collapsible-content {
                    max-height: 0;
                    overflow: hidden;
                    transition: max-height 0.3s ease-out, opacity 0.2s ease;
                    opacity: 0;
                }

                .collapsible-content.open {
                    max-height: 1000px;
                    opacity: 1;
                    transition: max-height 0.4s ease-in, opacity 0.3s ease;
                }

                @media (max-width: 600px) {
                    .martin-page {
                        padding: 2rem 1rem;
                    }

                    .content-card {
                        padding: 1.75rem 1.5rem;
                    }

                    .header-row {
                        flex-direction: column;
                        gap: 1rem;
                        align-items: flex-start;
                    }

                    .signature {
                        font-size: 2.5rem;
                    }

                    .footer-section {
                        flex-direction: column;
                        gap: 1.5rem;
                        align-items: flex-start;
                    }

                    .bullet-item {
                        font-size: 0.9rem;
                    }
                }
            `}</style>

      <div className="content-card">
        <div className="header-row">
          <Image src="/assets/headshot.png" alt="Jason Hon" width={40} height={40} style={{ borderRadius: '50%', marginRight: '0.75rem' }} />
          <span className="name">Jason Hon</span>
          <li className="bullet-item">
          </li>
        </div>

        <ul className="bullet-list">
          <li className="bullet-item">
            <span className="bullet-diamond">◆</span>
            <span>
              CS & AI <Image src="https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Waterloo_seal.svg" alt="Waterloo" width={16} height={16} className="company-icon" style={{ display: 'inline', verticalAlign: 'middle' }} unoptimized /><span className="highlight"> University of Waterloo</span>
            </span>
          </li>
          {/* Currently */}
          <li className="bullet-item" style={{ marginTop: '0.5rem' }}>
            <span className="bullet-diamond">◆</span>
            <span className="section-label">currently:</span>
          </li>
          {/*
          <li className="bullet-item sub-bullet">
            <span className="bullet-arrow">↳</span>
            <span>
              incoming software engineer intern @ <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Microsoft_icon.svg/2048px-Microsoft_icon.svg.png" alt="Microsoft" width={16} height={16} className="company-icon" style={{ display: 'inline', verticalAlign: 'middle' }} unoptimized /> <a href="https://microsoft.ai/" target="_blank" rel="noopener noreferrer" className="underline-link"><span className="highlight">Microsoft AI</span></a>
            </span>
          </li>
          */}
          <li className="bullet-item sub-bullet">
            <span className="bullet-arrow">↳</span>
            <span>
              co-authoring <a href="https://syn.uwaterloo.ca/" target="_blank" rel="noopener noreferrer" className="underline-link">a ml systems paper</a> on mixed diffusion models
            </span>
          </li>

          {/* Previously */}
          <li className="bullet-item" style={{ marginTop: '0.5rem' }}>
            <span className="bullet-diamond">◆</span>
            <span className="section-label">previously:</span>
          </li>
          <li className="bullet-item sub-bullet">
            <span className="bullet-arrow">↳</span>
            <span>
              software engineer intern <Image src="https://s3-eu-west-1.amazonaws.com/tpd/logos/646cd93dece5034b1bc5c1c0/0x0.png" alt="Super.com" width={16} height={16} className="company-icon" style={{ display: 'inline', verticalAlign: 'middle' }} unoptimized /> <a href="https://www.super.com" target="_blank" rel="noopener noreferrer" className="underline-link"><span className="highlight">Super.com</span></a>
            </span>
          </li>
          <li className="bullet-item sub-bullet">
            <span className="bullet-arrow">↳</span>
            <span>
              compiler engineer intern <Image src="https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/1200px-Huawei_Standard_logo.svg.png" alt="Huawei" width={16} height={16} className="company-icon" style={{ display: 'inline', verticalAlign: 'middle' }} unoptimized /> <a href="https://support.huaweicloud.com/intl/en-us/usermanual-hce/hce_02_0051.html" target="_blank" rel="noopener noreferrer" className="underline-link"><span className="highlight">Huawei Canada</span></a>
            </span>
          </li>
          <li className="bullet-item sub-bullet">
            <span className="bullet-arrow">↳</span>
            <span>
              research assistant <Image src="https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Waterloo_seal.svg" alt="UWaterloo" width={16} height={16} className="company-icon" style={{ display: 'inline', verticalAlign: 'middle' }} unoptimized /> <a href="https://plg.uwaterloo.ca/" target="_blank" rel="noopener noreferrer" className="underline-link"><span className="highlight">Waterloo PLG</span></a>
            </span>
          </li>

          {/* What I've been building */}
          <li className="bullet-item collapsible-header" style={{ marginTop: '0.5rem' }} onClick={() => setAsideOpen(!asideOpen)}>
            <span className="bullet-diamond">◆</span>
            <span className="section-label">aside:<span className={`toggle-arrow ${asideOpen ? 'open' : ''}`}>▶</span></span>
          </li>
          <div className={`collapsible-content ${asideOpen ? 'open' : ''}`}>
            <li className="bullet-item sub-bullet">
              <span className="bullet-arrow">↳</span>
              <span>
                co-founding <a href="https://www.tryscalar.ai" target="_blank" rel="noopener noreferrer" className="underline-link">scalar</a> <span className="muted">(AI-powered interview prep)</span>
              </span>
            </li>
            <li className="bullet-item sub-bullet">
              <span className="bullet-arrow">↳</span>
              <span>
                ran a <span className="highlight">youtube channel</span> <span className="muted">(22k subs, 3M views)</span>
              </span>
            </li>
            <li className="bullet-item sub-bullet">
              <span className="bullet-arrow">↳</span>
              <span>
                love working on <span className="highlight">ml systems</span>, <span className="highlight">compilers</span>, <span className="highlight">C++</span>, and low-level stuff
              </span>
            </li>
            <li className="bullet-item sub-bullet">
              <span className="bullet-arrow">↳</span>
              <span>
                more recently, started enjoying <a href="https://leetcode.com/u/STTRAFE/" target="_blank" rel="noopener noreferrer" className="underline-link">leetcode contests</a> <span className="muted"></span>
              </span>
            </li>
            <li className="bullet-item sub-bullet" style={{ marginTop: '0.5rem' }}>
              <span className="bullet-arrow" style={{ visibility: 'hidden' }}>↳</span>
              <LeetCodeStats />
            </li>
          </div>

          {/* Resources */}
          <li className="bullet-item collapsible-header" style={{ marginTop: '0.5rem' }} onClick={() => setNotesOpen(!notesOpen)}>
            <span className="bullet-diamond">◆</span>
            <span className="section-label">typesetted notes (courses I enjoyed):<span className={`toggle-arrow ${notesOpen ? 'open' : ''}`}>▶</span></span>
          </li>
          <div className={`collapsible-content ${notesOpen ? 'open' : ''}`}>
            <li className="bullet-item sub-bullet">
              <span className="bullet-arrow">↳</span>
              <span>
                <a href="assets/CS246.pdf" target="_blank" rel="noopener noreferrer" className="underline-link">CS 246 notes</a> <span className="muted">(Object-Oriented Programming)</span>
              </span>
            </li>
            <li className="bullet-item sub-bullet">
              <span className="bullet-arrow">↳</span>
              <span>
                <a href="assets/STAT230.pdf" target="_blank" rel="noopener noreferrer" className="underline-link">STAT 230 notes</a> <span className="muted">(Probability)</span>
              </span>
            </li>
            <li className="bullet-item sub-bullet">
              <span className="bullet-arrow">↳</span>
              <span>
                <a href="assets/MATH_239.pdf" target="_blank" rel="noopener noreferrer" className="underline-link">MATH 239 notes</a> <span className="muted">(Combinatorics)</span>
              </span>
            </li>
            <li className="bullet-item sub-bullet">
              <span className="bullet-arrow">↳</span>
              <span>
                <a href="assets/MATH_136.pdf" target="_blank" rel="noopener noreferrer" className="underline-link">MATH 136 notes</a> <span className="muted">(Linear Algebra)</span>
              </span>
            </li>
            <li className="bullet-item sub-bullet">
              <span className="bullet-arrow">↳</span>
              <span>
                <a href="assets/MATH_138.pdf" target="_blank" rel="noopener noreferrer" className="underline-link">MATH 138 notes</a> <span className="muted">(Calculus II)</span>
              </span>
            </li>
          </div>
        </ul>
      </div>

      <footer className="footer-section">
        <div className="social-links">
          <a href="https://github.com/JasonH53" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://www.linkedin.com/in/jasonhonhk/" target="_blank" rel="noopener noreferrer" className="social-link">
            <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="mailto:jkhhon@uwaterloo.ca" className="social-link">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
          <a href="https://leetcode.com/STTRAFE" target="_blank" rel="noopener noreferrer" className="social-link">
            <Image src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/LeetCode_Logo_1.png/640px-LeetCode_Logo_1.png" alt="LeetCode" width={20} height={20} className="social-icon-img" unoptimized />
          </a>
        </div>

        <div className="webring">
          <a href="https://cs.uwatering.com/#https://jasonhon.com/?nav=prev" className="webring-link" aria-label="Previous site">←</a>
          <Image
            src="https://cs.uwatering.com/icon.white.svg"
            alt="CS Webring"
            width={18}
            height={18}
            className="webring-icon"
            unoptimized
          />
          <a href="https://cs.uwatering.com/#https://jasonhon.com/?nav=next" className="webring-link" aria-label="Next site">→</a>
        </div>
      </footer>

      <p className="copyright">© {new Date().getFullYear()} Jason Hon - Hong Kong & Toronto</p>
    </div >
  );
}
