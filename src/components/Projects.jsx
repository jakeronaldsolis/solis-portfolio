import { FaGithub } from 'react-icons/fa'
import { asset } from '../assets'

const projects = [
  {
    title: 'Jake Looper',
    image: 'jakelooper.png',
    githubUrl: 'https://github.com/jakeronaldsolis/jake-looper',
    description: [
      'Windows desktop app that loops MP4 videos so the output meets a minimum target runtime you choose (1–10 hours).',
      'Uses FFmpeg concat demuxer with stream copy (-c copy) for fast, lossless concatenation instead of re-encoding.',
      'Tkinter GUI for batching files, live progress from FFmpeg stderr, and per-file stop/remove while jobs run.',
      'Resolves ffmpeg and ffprobe from PATH or from the same folder as the script or bundled executable (portable layout).'
    ],
    technologies: ['Python', 'Tkinter', 'FFmpeg', 'FFprobe', 'Desktop', 'Threading']
  },
  {
    title: 'SIGNED: Sign Language Tutorial',
    image: 'signed.png',
    description: [
      'Developed an interactive sign language learning platform with real-time audio/visual feedback for enhanced accessibility.',
      'Implemented and compared Random Forest and SVM machine learning models; achieved superior gesture recognition accuracy with SVM.',
      'Integrated webcam-based gesture input for hands-on practice and assessment.',
      'Built with Python and Django, demonstrating full-stack and ML integration skills.'
    ],
    technologies: ['Python', 'Django', 'Machine Learning', 'Computer Vision', 'SVM', 'Random Forest']
  },
  {
    title: 'ARGUEL Summarizer',
    image: 'arguel.png',
    description: [
      'Created an AI-powered tool to summarize complex arguments and long-form content into concise, actionable insights.',
      'Leveraged a pre-trained BERT model for advanced natural language processing and summarization.',
      'Showcased expertise in Python, Django, and NLP for production-ready applications.'
    ],
    technologies: ['Python', 'Django', 'BERT', 'NLP', 'AI']
  },
  {
    title: 'Inventory System with FIFO Logic',
    image: 'inv.png',
    description: [
      'Engineered a robust inventory management system using FIFO logic for precise stock tracking and reporting.',
      'Implemented modules for sales, purchases, adjustments, and comprehensive inventory analytics.',
      'Designed user roles and permissions for secure, role-based access control.',
      'Utilized PHP, JavaScript, and Bootstrap to deliver a responsive, user-friendly interface.'
    ],
    technologies: ['PHP', 'JavaScript', 'Bootstrap', 'MySQL', 'FIFO Logic']
  }
]

const Projects = () => (
  <section id="projects" className="section">
    <div className="container">
      <h2>Projects</h2>
      <div className="projects">
        {projects.map((project) => (
          <article key={project.title} className="card project">
            <img src={asset(project.image)} alt={project.title} loading="lazy" />
            <div className="project__body">
              <h3>{project.title}</h3>
              <ul>
                {project.description.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
              <div className="tags">
                {project.technologies.map((tech) => (
                  <span key={tech} className="tag">{tech}</span>
                ))}
              </div>
              {project.githubUrl && (
                <a className="link" href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <FaGithub aria-hidden /> GitHub
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </div>
  </section>
)

export default Projects
