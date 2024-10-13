import Image from 'next/image';
import headshot from '../public/assets/headshot.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faGithub, faMedium } from '@fortawesome/free-brands-svg-icons';
import { faFileAlt } from '@fortawesome/free-solid-svg-icons';

const About = () => {
    const workExperiences = [
      {
        companyLogo: "https://static.cdnlogo.com/logos/h/67/huawei-thumb.png",
        companyName: "Huawei Canada",
        role: "Incomming Software Engineering Intern",
        date: "Jan 2025 - Apr 2025"
      },
      {
        companyLogo: "https://8d3cdb9a.rocketcdn.me/wp-content/uploads/2022/05/imageedit_10_9542891170.png.webp",
        companyName: "UW Computer Science Club",
        role: "Software Developer",
        date: "Aug 2024 - Present"
      },
      {
        companyLogo: "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Waterloo_seal.svg",
        companyName: "University of Waterloo",
        role: "STAT 230 Teaching Assistant",
        date: "Sept 2024 - Present"
      },
      {
        companyLogo: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAMAAABF0y+mAAAAbFBMVEVHcEwwfQovfQkwfQoofHIdergwfQkvfQkdergdergdergcerkvfQwdergaetQvfQgder4cerwpfDMvfQwbesMne2UvfQgdergnfEQderUYed8aetMrfVUderkufQwvfQwbesItfCQvfQwvfQwQQfQsAAAAJHRSTlMAE7mLCSeW/3Dv/z8uy4Fjqf7o3P/+64yd///5uLsgsEdTxU/BnGAFAAAAq0lEQVR4Ac3QBQKDQAwAwVACKSd1w+3/b6zgkLovzqAHf5JhXLGRicBCq9jYxBHHjnAkgEmkhmZpcWoyJbLZfbPC5vMFLRVDXeJqvZkCw22Nzdfwd652BvDkTAhXeDM406y4TSyAh5Yo8gPgybAw1w+R41aU6K3tiOHYKdVfUMwUk8LmSUqUKXZvEmo9k4AjaoaPhzbRJoJLTZcUX1YVt2PPi8z8MmJkwIsdAGKTCa5gqFMdAAAAAElFTkSuQmCC",
        companyName: "Bonumcare",
        role: "Freelance Software Developer",
        date: "Jun 2023 - Aug 2023"
      }
    ];

    const education = [
        {
          institutionLogo: "https://upload.wikimedia.org/wikipedia/en/6/6e/University_of_Waterloo_seal.svg",
          institution: "University of Waterloo",
          degree: "Bachelors of Computer Science, Artificial Intelligence Specialization",
          date: "GPA: 3.96 / 4.0 | 2023 - 2027"
        }
      ];


return (
    <section id="about">
      <h2>Jason&apos;s Portfolio</h2>
      <div className="about-content">
            <Image 
                    src={headshot} 
                    alt="Jason's headshot" 
                    width={200} 
                    height={200} 
                    className="headshot"
            />
          <div className="about-text">
            <p>Hi! I am Jason, a software developer with a background in Computer Science and AI. I am very
              passionate about low-level programing and artificial intelligence.
              I am also looking for Summer and Fall 2025 internships!
            </p>

            <div className="social-links">
          <a href="https://www.linkedin.com/in/jasonhonhk/" target="_blank" rel="noopener noreferrer" className="social-button">
              <FontAwesomeIcon icon={faLinkedin} />
          </a>
          <a href="https://github.com/JasonH53" target="_blank" rel="noopener noreferrer" className="social-button">
              <FontAwesomeIcon icon={faGithub} />
          </a>
          <a href="https://medium.com/@jasonh53" target="_blank" rel="noopener noreferrer" className="social-button">
              <FontAwesomeIcon icon={faMedium} />
          </a>
          <a href="./assets/resume.pdf" target="_blank" rel="noopener noreferrer" className="social-button">
              <FontAwesomeIcon icon={faFileAlt} />
          </a>
          </div>
          </div>
        </div>

      <h3>Experiences</h3>
      {workExperiences.map((experience, index) => (
        <div key={index} className="work-experience glow-on-hover">
          <img src={experience.companyLogo} alt={`${experience.companyName} logo`} />
          <div className="work-info">
            <h4>{experience.companyName}</h4>
            <p>{experience.role} | {experience.date}</p>
          </div>
        </div>
      ))}

    <h3>Education</h3>
    {education.map((edu, index) => (
        <div key={index} className="education-item glow-on-hover">
            <img src={edu.institutionLogo} alt={`${edu.institution} logo`} />
            <div className="education-info">
                <h4>{edu.institution}</h4>
                <p>{edu.degree}</p>
                <p>{edu.date}</p>
            </div>
        </div>
        ))}

    </section>
  );
};

export default About;