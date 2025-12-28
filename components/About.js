"use client"

import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';

export default function About() {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const experiences = [
        {
            companyLogo: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Microsoft_icon.svg/2048px-Microsoft_icon.svg.png",
            companyName: "Microsoft AI",
            role: "Software Engineer Intern",
            date: "Incoming"
        },
        {
            companyLogo: "https://s3-eu-west-1.amazonaws.com/tpd/logos/646cd93dece5034b1bc5c1c0/0x0.png",
            companyName: "Super.com",
            role: "Software Engineer Intern",
            date: "Sep 2025 - Dec 2025"
        },
        {
            companyLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/1200px-Huawei_Standard_logo.svg.png",
            companyName: "Huawei Canada",
            role: "Compiler Engineer Intern",
            date: "Jan 2025 - Apr 2025"
        },
        {
            companyLogo: "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Waterloo_seal.svg",
            companyName: "University of Waterloo",
            role: "Undergraduate Research Assistant",
            date: "May 2025 - Present"
        },
        {
            companyLogo: "https://www.tryscalar.ai/favicon.ico",
            companyName: "Scalar",
            role: "CTO, Co-Founder",
            date: "2025 - Present"
        }
    ];

    const education = [
        {
            institutionLogo: "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Waterloo_seal.svg",
            institution: "University of Waterloo",
            degree: "Bachelors of Computer Science (90.3% CAV)",
            date: "2023 - 2027"
        }
    ];

    return (
        <div className="minimal-page">
            <style jsx>{`
        .minimal-page {
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 3rem 2rem;
          max-width: 700px;
          margin: 0 auto;
          font-family: 'Minecraftia', monospace;
          font-weight: 400;
          font-style: normal
        }

        .header-section {
          width: 100%;
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
          gap: 2rem;
        }

        .intro-content {
          flex: 1;
        }

        .name {
          font-size: 3rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
          font-family: 'Minecraftia', monospace;
        }

        .minimal-page section::before {
          display: none;
        }

        .tagline {
          font-size: 0.95rem;
          color: #6ec8e4;
          margin-bottom: 1.5rem;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pronouns {
          font-size: 0.75rem;
          background: rgba(255, 255, 255, 0.1);
          padding: 0.15rem 0.5rem;
          border-radius: 4px;
          color: rgba(255, 255, 255, 0.7);
        }

        .bio {
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 1rem;
        }

        .profile-image {
          width: 160px;
          height: 160px;
          border-radius: 8px;
          object-fit: cover;
          filter: sepia(30%) saturate(150%) hue-rotate(150deg);
          flex-shrink: 0;
        }

        .section-title {
          font-size: 1.3rem;
          font-weight: 600;
          margin-bottom: 0rem;
          margin-top: 1.5rem;
          color: rgba(255, 255, 255, 0.9);
          font-family: 'Minecraftia', monospace;
        }

        .experience-list {
          width: 100%;
        }

        .experience-item {
          display: flex;
          align-items: center;
          padding: 0.2rem 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          transition: background 0.2s ease;
        }

        .experience-item:hover {
          background: rgba(255, 255, 255, 0.02);
        }

        .company-logo {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          object-fit: contain;
          margin-right: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 3px;
        }

        .experience-info {
          flex: 1;
        }

        .company-name {
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
        }

        .role {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .date {
          font-size: 0.95rem;
          color: #6ec8e4;
          text-align: right;
          white-space: nowrap;
        }

        .education-item {
          display: flex;
          align-items: center;
          padding: 0.4rem 0;
        }

        .institution-logo {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          object-fit: contain;
          margin-right: 0.75rem;
          background: rgba(255, 255, 255, 0.05);
          padding: 3px;
        }

        .institution-info {
          flex: 1;
        }

        .institution-name {
          font-size: 1.1rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.95);
        }

        .degree {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.5);
        }

        .footer-section {
          width: 100%;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .webring {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .webring-link {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.25rem;
          transition: color 0.2s ease;
          text-decoration: none;
        }

        .webring-link:hover {
          color: rgba(255, 255, 255, 0.9);
        }

        .webring-icon {
          width: 20px;
          height: auto;
          opacity: 0.6;
        }

        .social-links {
          display: flex;
          gap: 1.25rem;
          margin-top: 0.5rem;
        }

        .social-link {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1.25rem;
          transition: color 0.2s ease;
        }

        .social-link:hover {
          color: rgba(255, 255, 255, 0.9);
        }

        .social-icon-img {
          width: 1.25rem;
          height: 1.25rem;
          filter: brightness(0) invert(1) opacity(0.5);
          transition: filter 0.2s ease;
        }

        .social-link:hover .social-icon-img {
          filter: brightness(0) invert(1) opacity(0.9);
        }

        .copyright {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          margin-top: 1.5rem;
          text-align: center;
          width: 100%;
        }

        @media (max-width: 600px) {
          .header-section {
            flex-direction: column-reverse;
            align-items: center;
            text-align: center;
          }

          .profile-image {
            margin-bottom: 1.5rem;
          }

          .name {
            font-size: 2.5rem;
          }

          .tagline {
            justify-content: center;
          }

          .footer-section {
            flex-direction: column;
            gap: 1.5rem;
          }
        }
      `}</style>

            <header className="header-section">
                <div className="intro-content">
                    <h1 className="name">Jason Hon</h1>
                    {/* <p className="tagline">
                        CS @ Waterloo
                    </p> */}
                    <p className="bio">
                        Hiya! I&apos;m an engineer studying Computer Science. Previously ran a YouTube channel with 23k subscribers and 1M views...
                    </p>
                    <p className="bio">
                        I love building ML systems, compilers, anything low level, and more recently, coding contests!
                    </p>
                    <p className="bio">
                        If you are looking for CS 246 notes, you can find it <a href="assets/CS246.pdf" target="_blank" rel="noopener noreferrer">here</a>.
                    </p>
                    <div className="social-links">
                        <a href="https://github.com/JasonH53" target="_blank" rel="noopener noreferrer" className="social-link">
                            <FontAwesomeIcon icon={faGithub} />
                        </a>
                        <a href="https://www.linkedin.com/in/jasonhonhk/" target="_blank" rel="noopener noreferrer" className="social-link">
                            <FontAwesomeIcon icon={faLinkedin} />
                        </a>
                        <a href="https://leetcode.com/STTRAFE" target="_blank" rel="noopener noreferrer" className="social-link">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8e/LeetCode_Logo_1.png/640px-LeetCode_Logo_1.png" alt="LeetCode" className="social-icon-img" />
                        </a>
                        <a href="mailto:jkhhon@uwaterloo.ca" className="social-link">
                            <FontAwesomeIcon icon={faEnvelope} />
                        </a>
                    </div>
                </div>
                {/* <img
                    src="https://avatars.githubusercontent.com/u/62577879"
                    alt="Profile"
                    className="profile-image"
                /> */}
            </header>

            <section className="experience-list">
                <h2 className="section-title">My Experience</h2>
                {experiences.map((exp, index) => (
                    <div key={index} className="experience-item">
                        <img src={exp.companyLogo} alt={exp.companyName} className="company-logo" />
                        <div className="experience-info">
                            <div className="company-name">{exp.companyName}</div>
                            <div className="role">{exp.role}</div>
                        </div>
                        <div className="date">{exp.date}</div>
                    </div>
                ))}
            </section>

            <section className="experience-list">
                <h2 className="section-title">Education</h2>
                {education.map((edu, index) => (
                    <div key={index} className="education-item">
                        <img src={edu.institutionLogo} alt={edu.institution} className="institution-logo" />
                        <div className="institution-info">
                            <div className="institution-name">{edu.institution}</div>
                            <div className="degree">{edu.degree}</div>
                        </div>
                        <div className="date">{edu.date}</div>
                    </div>
                ))}
            </section>

            <footer className="footer-section">
                <div className="webring">
                    <a href="https://cs.uwatering.com/#https://jasonhon.com/?nav=prev" className="webring-link" aria-label="Previous site">←</a>
                    <img
                        src='https://cs.uwatering.com/icon.white.svg'
                        alt='CS Webring'
                        className="webring-icon"
                    />
                    <a href="https://cs.uwatering.com/#https://jasonhon.com/?nav=next" className="webring-link" aria-label="Next site">→</a>
                </div>
            </footer>

            <p className="copyright">© {new Date().getFullYear()} Jason Hon</p>
        </div>
    );
}
