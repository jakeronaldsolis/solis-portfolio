import './Projects.scss';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const projects = [
  {
    title: 'SIGNED: Sign Language Tutorial',
    image: '/solis-portfolio/assets/signed.png',
    description: [
      'Developed an interactive sign language learning platform with real-time audio/visual feedback for enhanced accessibility.',
      'Implemented and compared Random Forest and SVM machine learning models; achieved superior gesture recognition accuracy with SVM.',
      'Integrated webcam-based gesture input for hands-on practice and assessment.',
      'Built with Python and Django, demonstrating full-stack and ML integration skills.'
    ]
  },
  {
    title: 'ARGUEL Summarizer',
    image: '/solis-portfolio/assets/arguel.png',
    description: [
      'Created an AI-powered tool to summarize complex arguments and long-form content into concise, actionable insights.',
      'Leveraged a pre-trained BERT model for advanced natural language processing and summarization.',
      'Showcased expertise in Python, Django, and NLP for production-ready applications.'
    ]
  },
  {
    title: 'Inventory System with FIFO Logic',
    image: '/solis-portfolio/assets/inv.png',
    description: [
      'Engineered a robust inventory management system using FIFO logic for precise stock tracking and reporting.',
      'Implemented modules for sales, purchases, adjustments, and comprehensive inventory analytics.',
      'Designed user roles and permissions for secure, role-based access control.',
      'Utilized PHP, JavaScript, and Bootstrap to deliver a responsive, user-friendly interface.'
    ]
  }
];

const fadeIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: 'easeOut',
    },
  }),
};

const modalVariants = {
  hidden: { opacity: 0, y: 60, scale: 0.96 },
  visible: { opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 70, damping: 18 } },
  exit: { opacity: 0, y: 60, scale: 0.96, transition: { duration: 0.25 } },
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

const SHAPES = [
  { type: 'circle', color: '#ffe066' },
  { type: 'triangle', color: '#a80000' },
  { type: 'square', color: '#fff' },
  { type: 'hex', color: '#d4af37' },
  { type: 'pent', color: '#ff6a00' },
];
const NUM_SHAPES = 9;
const SHAPE_SIZE_DESKTOP = 64;
const SHAPE_SIZE_MOBILE = 36;

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomDirection() {
  return Math.random() < 0.5 ? -1 : 1;
}

const Projects = () => {
  const [modalProject, setModalProject] = useState(null);
  const [shapePositions, setShapePositions] = useState([]);
  const sectionRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 600);
      if (sectionRef.current) {
        setContainerSize({
          width: sectionRef.current.offsetWidth,
          height: sectionRef.current.offsetHeight
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (!containerSize.width || !containerSize.height) return;
    setShapePositions(Array.from({ length: NUM_SHAPES }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / NUM_SHAPES + Math.PI / NUM_SHAPES;
      const speed = isMobile ? 0.18 : 0.35;
      return {
        x: getRandomInt(0, containerSize.width - (isMobile ? SHAPE_SIZE_MOBILE : SHAPE_SIZE_DESKTOP)),
        y: getRandomInt(0, containerSize.height - (isMobile ? SHAPE_SIZE_MOBILE : SHAPE_SIZE_DESKTOP)),
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        type: SHAPES[i % SHAPES.length].type,
        color: SHAPES[i % SHAPES.length].color
      };
    }));
  }, [containerSize.width, containerSize.height, isMobile]);

  useEffect(() => {
    if (!containerSize.width || !containerSize.height || shapePositions.length !== NUM_SHAPES) return;
    let raf;
    function animate() {
      setShapePositions(prev => prev.map((pos) => {
        let { x, y, dx, dy, type, color } = pos;
        const size = isMobile ? SHAPE_SIZE_MOBILE : SHAPE_SIZE_DESKTOP;
        x += dx;
        y += dy;
        if (x <= 0 || x >= containerSize.width - size) dx *= -1;
        if (y <= 0 || y >= containerSize.height - size) dy *= -1;
        x = Math.max(0, Math.min(x, containerSize.width - size));
        y = Math.max(0, Math.min(y, containerSize.height - size));
        return { x, y, dx, dy, type, color };
      }));
      raf = requestAnimationFrame(animate);
    }
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [containerSize.width, containerSize.height, isMobile, shapePositions.length]);

  useEffect(() => {
    if (modalProject) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
    return () => {
      document.body.classList.remove('modal-open');
    };
  }, [modalProject]);

  const openModal = (project) => setModalProject(project);
  const closeModal = () => setModalProject(null);

  const renderShape = (shape, i) => {
    const size = isMobile ? SHAPE_SIZE_MOBILE : SHAPE_SIZE_DESKTOP;
    const style = {
      position: 'absolute',
      left: shape.x,
      top: shape.y,
      width: size,
      height: size,
      opacity: 0.13,
      zIndex: 0,
      pointerEvents: 'none',
      transition: 'opacity 0.3s',
    };
    switch (shape.type) {
      case 'circle':
        return <div key={i} style={{ ...style, borderRadius: '50%', background: shape.color }} />;
      case 'square':
        return <div key={i} style={{ ...style, borderRadius: '0.3em', background: shape.color }} />;
      case 'triangle':
        return <svg key={i} style={style} viewBox="0 0 100 100"><polygon points="50,10 90,90 10,90" fill={shape.color} /></svg>;
      case 'hex':
        return <svg key={i} style={style} viewBox="0 0 100 100"><polygon points="50,10 90,35 90,75 50,90 10,75 10,35" fill={shape.color} /></svg>;
      case 'pent':
        return <svg key={i} style={style} viewBox="0 0 100 100"><polygon points="50,10 90,40 73,90 27,90 10,40" fill={shape.color} /></svg>;
      default:
        return null;
    }
  };

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <div className="projects-bg-shapes">
        {shapePositions.map(renderShape)}
      </div>
      <motion.h2
        className="projects-title"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7 }}
      >
        Projects
      </motion.h2>
      <motion.p
        className="projects-intro"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.7 }}
        transition={{ duration: 0.7, delay: 0.1 }}
      >
        A selection of my recent work. Click a project to learn more.
      </motion.p>
      <div className="projects-grid">
        {projects.map((project, idx) => (
          <motion.div
            className="project-card"
            key={project.title}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={fadeIn}
            custom={idx}
            onClick={() => openModal(project)}
            tabIndex={0}
            role="button"
            aria-label={`Open details for ${project.title}`}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') openModal(project); }}
          >
            <div className="project-image-wrapper">
              <img src={project.image} alt={project.title} className="project-image" loading="lazy" />
            </div>
            <div className="project-content">
              <h3 className="project-title">{project.title}</h3>
            </div>
          </motion.div>
        ))}
      </div>
      <AnimatePresence>
        {modalProject && (
          <motion.div
            className="project-modal-overlay"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={overlayVariants}
            onClick={closeModal}
          >
            <motion.div
              className="project-modal"
              initial="hidden"
              animate="visible"
              exit="exit"
              variants={modalVariants}
              onClick={e => e.stopPropagation()}
              tabIndex={-1}
            >
              <div className="modal-content">
                <div className="modal-image-col">
                  <img src={modalProject.image} alt={modalProject.title} className="modal-image" />
                </div>
                <div className="modal-info-col">
                  <h3 className="modal-title">{modalProject.title}</h3>
                  <ul className="modal-desc">
                    {modalProject.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default Projects;
