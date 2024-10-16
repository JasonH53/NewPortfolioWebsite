import Link from 'next/link';
import Image from 'next/image';
import chessImage from '../public/assets/chess.png';
import voicelensImage from '../public/assets/voicelens.webp';
import uwcompassImage from '../public/assets/uwcompass.jpg';
import uwschedulerImage from '../public/assets/uwscheduler.png';
import slmodImage from '../public/assets/slmod.png';

const Projects = () => {
  const projects = [
    { 
      name: 'Chess Engine', 
      description: 'Chess Engine with various levels of AI opponents, built with C++',
      link: 'https://github.com/pacman-ty/chess-engin',
      image: chessImage
    },
    { 
      name: 'VoiceLens', 
      description: 'Empowering mute individuals with real-time lip reading and translation, built for Hack The North 2024. ',
      link: 'https://devpost.com/software/voicelens',
      image: voicelensImage
    },
    { 
      name: 'UWCompass', 
      description: 'Degree requirement tracker that parses your transcript to help you plan your courses, built with React',
      link: 'https://jasonh53.github.io/UWCompass/',
      image: uwcompassImage
    },
    {
      name: 'UWScheduler',
      description: 'Assignment Planner and Scheduler designed for UWaterloo students, built with MEAN stack.',
      link: 'https://github.com/JasonH53/UWAssignmentPlanner',
      image: uwschedulerImage
    },
    {
      name: 'SLMod',
      description: 'QOL game modification for Minecraft Hypixel Skyblock with 20+ features, built with Java',
      link: 'https://github.com/JasonH53/SLM',
      image: slmodImage
    }
  ];

  return (
    <section id="projects">
      <h2>Projects</h2>
      <div className="wrapper-container">
      {projects.map((project, index) => (
        <Link 
          key={index} 
          href={project.link} 
          passHref 
          legacyBehavior
        >
          <a 
            className="project glow-on-hover" 
            target="_blank" 
            rel="noopener noreferrer"
            style={{ display: 'block', textDecoration: 'none', color: 'inherit' }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ flexShrink: 0, marginRight: '20px' }}>
                <Image
                  src={project.image}
                  alt={`${project.name} image`}
                  width={100}
                  height={100}
                  objectFit="cover"
                />
              </div>
              <div>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
              </div>
            </div>
          </a>
        </Link>
      ))}
      </div>
    </section>
  );
};

export default Projects;