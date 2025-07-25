"use client"

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import chessImage from '../public/assets/chess.png';
import voicelensImage from '../public/assets/voicelens.png';
import uwcompassImage from '../public/assets/uwcompass.png';
import uwschedulerImage from '../public/assets/uwscheduler.png';
import slmodImage from '../public/assets/slmod.png';
import scalaIcon from '../public/assets/scala-icon.png';

export default function Home() {
  const [activeProject, setActiveProject] = useState(null);
  const projectsRef = useRef(null);
  const experiencesRef = useRef(null);
  const aboutRef = useRef(null);
  const notesRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const projects = [
    {
      name: 'VoiceLens',
      description: 'Empowering mute individuals with real-time lip reading and translation. Transcribes your lips into audible words in 5+ languages!',
      link: 'https://www.youtube.com/watch?v=dIAzoDg1DZA&t=1s',
      image: voicelensImage,
      year: '2024',
      skills: ['React', 'JavaScript', 'AI', 'Computer Vision', 'Hack The North 2024']
    },
    {
      name: 'Lacs Compiler',
      description: 'A compiler for a Scala-type language with garbage collection, dynamic memory allocation and more. Coursework for an enriched compilers course, CS 241E.',
      link: 'https://github.com/JasonH53/LacsCompiler',
      image: scalaIcon,
      year: '2024',
      skills: ['Compilers', 'Scala']
    },
    {
      name: 'UWCompass',
      description: 'Degree requirement tracker that parses your transcript to identify what courses you need to graduate. Simplifies your course planning process!',
      link: 'https://jasonh53.github.io/UWCompass/',
      image: uwcompassImage,
      year: '2024',
      skills: ['React', 'JavaScript']
    },
    {
      name: 'Chess Engine',
      description: 'Chess Engine with 5 levels of AI opponents based on various advanced decision-making algorithms.',
      link: 'https://github.com/pacman-ty/chess-engine',
      image: chessImage,
      year: '2023',
      skills: ['C++', 'AI', 'OOP']
    },
    // {
    //   name: 'UWScheduler',
    //   description: 'Assignment Planner and Scheduler designed for UWaterloo students, built with MEAN stack.',
    //   link: 'https://github.com/JasonH53/UWAssignmentPlanner',
    //   image: uwschedulerImage,
    //   year: '2023',
    //   skills: ['Angular', 'MongoDB', 'Express', 'TypeScript']
    // },
    {
      name: 'SLMod',
      description: 'Utility game modification for Minecraft Hypixel Skyblock with 20+ features to ease your gameplay experience',
      link: 'https://github.com/JasonH53/SLM',
      image: slmodImage,
      year: '2023',
      skills: ['Java', 'Flask', 'MongoDB']
    }
  ];

  const experiences = [
    {
      companyLogo: "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Waterloo_seal.svg",
      companyName: "University of Waterloo",
      role: "Undergraduate Research Assistant",
      date: "May 2025 - Aug 2025",
      description: "Safe Object Initialization, mentored by Dr. Ondřej Lhoták"
    },
    {
      companyLogo: "https://upload.wikimedia.org/wikipedia/en/thumb/0/04/Huawei_Standard_logo.svg/1200px-Huawei_Standard_logo.svg.png",
      companyName: "Huawei Canada",
      role: "Software Engineer Intern (Compilers)",
      date: "Jan 2025 - Apr 2025",
      description: "Working on Huawei's ML Compiler to improve inference performance on various LLMs"
    },
    {
      companyLogo: "https://wusa.ca/wp-content/uploads/2022/05/imageedit_10_9542891170.png.webp",
      companyName: "UW Computer Science Club",
      role: "Software Developer",
      date: "Aug 2024 - Present",
      description: "Building CodeyBot used in UWCSC's Discord server, used for mock interviewing, suggestions and other features"
    },
    {
      companyLogo: "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Waterloo_seal.svg",
      companyName: "University of Waterloo",
      role: "STAT 230 Teaching Assistant",
      date: "Sept 2024 - Dec 2024",
    },
    {
      companyLogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAbFBMVEVHcEwwfQovfQkwfQoofHIdergwfQkvfQkdergdergdergcerkvfQwdergaetQvfQgder4cerwpfDMvfQwbesMne2UvfQgdergnfEQderUYed8aetMrfVUderkufQwvfQwbesItfCQvfQwvfQwQQfQsAAAAJHRSTlMAE7mLCSeW/3Dv/z8uy4Fjqf7o3P/+64yd///5uLsgsEdTxU/BnGAFAAAAq0lEQVR4Ac3QBQKDQAwAwVACKSd1w+3/b6zgkLovzqAHf5JhXLGRicBCq9jYxBHHjnAkgEmkhmZpcWoyJbLZfbPC5vMFLRVDXeJqvZkCw22Nzdfwd652BvDkTAhXeDM406y4TSyAh5Yo8gPgybAw1w+R41aU6K3tiOHYKdVfUMwUk8LmSUqUKXZvEmo9k4AjaoaPhzbRJoJLTZcUX1YVt2PPi8z8MmJkwIsdAGKTCa5gqFMdAAAAAElFTkSuQmCC",
      companyName: "Bonumcare",
      role: "Freelance Software Developer",
      date: "Jun 2023 - Aug 2023",
      description: "Engineered Conversation Buddy to chat with lonely elderlies"
    }
  ];

  const education = [
    {
      institutionLogo: "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Waterloo_seal.svg",
      institution: "University of Waterloo",
      degree: "Bachelors of Computer Science, Artificial Intelligence Specialization",
      date: "GPA: 4.0 / 4.0",
      description: "Focusing on Machine Learning and Compilers"
    }
  ];

  useEffect(() => {
    // Reveal animations on scroll
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    document.querySelectorAll('.reveal-item').forEach(el => {
      observer.observe(el);
    });

    return () => {
      document.querySelectorAll('.reveal-item').forEach(el => {
        observer.unobserve(el);
      });
    };
  }, []);

  return (
    <div className="container">
      <Navbar />

      <header className="hero">
        <div className="video-background">
          <video autoPlay muted loop playsInline className="background-video">
            <source src="https://cdn.prod.website-files.com/630534398d9471ade12fc55f/663bd1303af50b30413aaa1f_Hero%20with%20Post-transcode.mp4" type="video/mp4" />
          </video>
          <div className="video-overlay"></div>
        </div>
        <div className="hero-content">
          <h1 className="reveal-item">
            <span className="hero-letter">J</span>ason
          </h1>
          <div className="hero-subtitle reveal-item">
            Software Developer
          </div>
          <p className="hero-description reveal-item">
            Hi! I am Jason, a software developer with a background in Computer Science and AI.
            I am very passionate about machine learning, compilers and anything that intersect it.
            I am also looking for Winter & Summer 26&apos; internships!
          </p>
          <div className="hero-cta reveal-item">
            <a href="#about" className="cta-button">
              See my experiences <FontAwesomeIcon icon={faArrowRight} />
            </a>
          </div>
        </div>
      </header>

      <section id="about" className="section" ref={aboutRef}>
        <div className="section-header">
          <h2 className="section-title reveal-item">
            <span className="section-letter">E</span>xperiences
          </h2>
        </div>

        <div className="timeline-container reveal-item">
          {experiences.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div className="timeline-dot"></div>
              <div className="timeline-content">
                <div className="timeline-card">
                  <div className="timeline-header">
                    <div className="company-logo">
                      <img src={exp.companyLogo} alt={`${exp.companyName} logo`} />
                    </div>
                    <div className="company-info">
                      <h3>{exp.companyName}</h3>
                      <h4>{exp.role}</h4>
                      <span className="timeline-date">{exp.date}</span>
                    </div>
                  </div>
                  <p className="timeline-description">{exp.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="section-header" style={{ marginTop: '6rem' }}>
          <h2 className="section-title reveal-item">
            <span className="section-letter">E</span>ducation
          </h2>
        </div>

        <div className="education-container reveal-item">
          {education.map((edu, index) => (
            <div key={index} className="education-card">
              <div className="education-header">
                <div className="education-logo">
                  <img src={edu.institutionLogo} alt={`${edu.institution} logo`} />
                </div>
                <div className="education-info">
                  <h3>{edu.institution}</h3>
                  <h4>{edu.degree}</h4>
                  <span className="education-date">{edu.date}</span>
                </div>
              </div>
              <p className="education-description">{edu.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="work" className="section" ref={projectsRef}>
        <div className="section-header">
          <h2 className="section-title reveal-item">
            <span className="section-letter">P</span>rojects
          </h2>
        </div>

        <div className="projects-masonry reveal-item">
          {projects.map((project, index) => (
            <a
              key={index}
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="project-item"
              onMouseEnter={() => setActiveProject(index)}
              onMouseLeave={() => setActiveProject(null)}
            >
              <div className="project-card">
                <div className="project-image-container">
                  <Image
                    src={project.image}
                    alt={project.name}
                    fill
                    className="project-image"
                    style={{ objectFit: 'cover' }}
                  />
                  <div className={`project-overlay ${activeProject === index ? 'active' : ''}`}>
                    <div className="project-details">
                      <p>{project.description}</p>
                    </div>
                  </div>
                </div>
                <div className="project-content">
                  <h3 className="project-title">{project.name}</h3>
                  <span className="project-year">{project.year}</span>
                  <div className="project-skills">
                    {project.skills.map((skill, i) => (
                      <span key={i} className="project-skill">{skill}</span>
                    ))}
                  </div>
                </div>
              </div>
            </a>
          ))}
        </div>
      </section>

      <footer className="footer">
        <div className="footer-content">
          <div className="footer-left">
            <div className="webring">
              <a href="https://cs.uwatering.com/#https://jasonhon.com/?nav=prev" className="webring-link" aria-label="Previous site">←</a>
              <img
                src='https://cs.uwatering.com/icon.white.svg'
                alt='CS Webring'
                style={{ width: '24px', height: 'auto', opacity: 0.8 }}
              />
              <a href="https://cs.uwatering.com/#https://jasonhon.com/?nav=next" className="webring-link" aria-label="Next site">→</a>
            </div>
          </div>

          <div className="social-links-container">
            <div className="social-links">
              <a href="https://www.linkedin.com/in/jasonhonhk/" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faLinkedin} size="lg" />
              </a>
              <a href="https://github.com/JasonH53" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faGithub} size="lg" />
              </a>
              <a href="https://medium.com/@jasonh53" target="_blank" rel="noopener noreferrer" className="social-link">
                <FontAwesomeIcon icon={faMedium} size="lg" />
              </a>
              <a href="mailto:jason@example.com" className="social-link">
                <FontAwesomeIcon icon={faEnvelope} size="lg" />
              </a>
            </div>
          </div>

          <div className="footer-right">
            <div className="footer-location">Hong Kong & Toronto</div>
            <div className="footer-copyright">©{new Date().getFullYear()} Jason</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
