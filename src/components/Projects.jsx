import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaTimes, FaArrowRight } from 'react-icons/fa'
import './Projects.scss'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const projects = [
  {
    title: 'SIGNED: Sign Language Tutorial',
    image: '/solis-portfolio/assets/signed.png',
    description: [
      'Developed an interactive sign language learning platform with real-time audio/visual feedback for enhanced accessibility.',
      'Implemented and compared Random Forest and SVM machine learning models; achieved superior gesture recognition accuracy with SVM.',
      'Integrated webcam-based gesture input for hands-on practice and assessment.',
      'Built with Python and Django, demonstrating full-stack and ML integration skills.'
    ],
    technologies: ['Python', 'Django', 'Machine Learning', 'Computer Vision', 'SVM', 'Random Forest']
  },
  {
    title: 'ARGUEL\nSummarizer',
    image: '/solis-portfolio/assets/arguel.png',
    description: [
      'Created an AI-powered tool to summarize complex arguments and long-form content into concise, actionable insights.',
      'Leveraged a pre-trained BERT model for advanced natural language processing and summarization.',
      'Showcased expertise in Python, Django, and NLP for production-ready applications.'
    ],
    technologies: ['Python', 'Django', 'BERT', 'NLP', 'AI', 'Natural Language Processing']
  },
  {
    title: 'Inventory System with FIFO Logic',
    image: '/solis-portfolio/assets/inv.png',
    description: [
      'Engineered a robust inventory management system using FIFO logic for precise stock tracking and reporting.',
      'Implemented modules for sales, purchases, adjustments, and comprehensive inventory analytics.',
      'Designed user roles and permissions for secure, role-based access control.',
      'Utilized PHP, JavaScript, and Bootstrap to deliver a responsive, user-friendly interface.'
    ],
    technologies: ['PHP', 'JavaScript', 'Bootstrap', 'MySQL', 'FIFO Logic', 'Inventory Management']
  }
]

const Projects = () => {
  const [modalProject, setModalProject] = useState(null)
  const [enlargedImage, setEnlargedImage] = useState(null)
  const [isVisible, setIsVisible] = useState(false)
  const [isSmallScreen, setIsSmallScreen] = useState(false)
  const [showRotateMessage, setShowRotateMessage] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const projectsRef = useRef(null)
  const [scrollPosition, setScrollPosition] = useState(0)

  // Intersection Observer for animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (projectsRef.current) {
      observer.observe(projectsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth >= 0 && window.innerWidth <= 767)
      setIsMobile(window.innerWidth >= 0 && window.innerWidth <= 803)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Modal body scroll lock
  useEffect(() => {
    if (modalProject || enlargedImage) {
      // Don't override the fixed positioning we set in openModal
      if (!modalProject) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    }
  }, [modalProject, enlargedImage])

  const openModal = (project, event) => {
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    // Save current scroll position
    const currentScrollPosition = window.pageYOffset;
    setScrollPosition(currentScrollPosition);
    
    // Prevent any scroll changes
    document.body.style.position = 'fixed';
    document.body.style.top = `-${currentScrollPosition}px`;
    document.body.style.width = '100%';
    
    setModalProject(project);
  }
  const closeModal = () => {
    setModalProject(null);
    
    // Restore scroll position and remove fixed positioning
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.width = '';
    
    if (scrollY) {
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }
  const openEnlargedImage = (imageSrc, imageAlt) => {
    setEnlargedImage({ src: imageSrc, alt: imageAlt })
    if (isSmallScreen) {
      setShowRotateMessage(true)
      setTimeout(() => setShowRotateMessage(false), 3000)
    }
  }
  const closeEnlargedImage = () => {
    setEnlargedImage(null)
    setShowRotateMessage(false)
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: 'easeOut'
      }
    }
  }

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 20 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 20
      }
    },
    exit: {
      opacity: 0,
      scale: 0.9,
      y: 50,
      transition: {
        duration: 0.3
      }
    }
  }

  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.2 } }
  }

  return (
    <section id="projects" className="projects" ref={projectsRef}>
      {/* Background Elements */}
      <div className="projects__background">
        <div className="projects__background-gradient" />
        <div className="projects__background-pattern" />
      </div>

      {/* Main Container */}
      <motion.div
        className="projects__container"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="projects__header" variants={itemVariants}>
          <motion.div
            className="projects__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="projects__badge-text">Portfolio</span>
          </motion.div>
          
          <motion.h2 className="projects__title" variants={itemVariants}>
            Featured Projects
          </motion.h2>
          
          <motion.p className="projects__subtitle" variants={itemVariants}>
            A showcase of my recent work, demonstrating skills in web development, machine learning, and problem-solving
          </motion.p>
        </motion.div>

        {/* Projects Grid/Swiper */}
        {isMobile ? (
          <div className="projects__swiper-container">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              className="projects__swiper"
              breakpoints={{
                480: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                768: {
                  slidesPerView: 1,
                  spaceBetween: 20
                }
              }}
            >
              {projects.map((project, idx) => (
                <SwiperSlide key={project.title}>
                  <motion.div
                    className="projects__card"
                    variants={cardVariants}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="projects__card-image">
                      <img 
                        src={project.image} 
                        alt={project.title} 
                        loading="lazy"
                      />
                      <div className="projects__card-overlay">
                        <motion.button
                          className="projects__card-button"
                          onClick={(event) => openModal(project, event)}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <FaArrowRight />
                          View Details
                        </motion.button>
                      </div>
                    </div>
                    
                    <div className="projects__card-content">
                      <h3 className="projects__card-title">{project.title}</h3>
                      
                      <div className="projects__card-tech">
                        {project.technologies.slice(0, 4).map((tech, techIdx) => (
                          <span key={techIdx} className="projects__card-tech-tag">
                            {tech}
                          </span>
                        ))}
                        {project.technologies.length > 4 && (
                          <span className="projects__card-tech-more">
                            +{project.technologies.length - 4} more
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="projects__grid">
            {projects.map((project, idx) => (
              <motion.div
                key={project.title}
                className="projects__card"
                variants={cardVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="projects__card-image">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    loading="lazy"
                  />
                  <div className="projects__card-overlay">
                    <motion.button
                      className="projects__card-button"
                      onClick={(event) => openModal(project, event)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FaArrowRight />
                      View Details
                    </motion.button>
                  </div>
                </div>
                
                <div className="projects__card-content">
                  <h3 className="projects__card-title">{project.title}</h3>
                  
                  <div className="projects__card-tech">
                    {project.technologies.slice(0, 4).map((tech, techIdx) => (
                      <span key={techIdx} className="projects__card-tech-tag">
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 4 && (
                      <span className="projects__card-tech-more">
                        +{project.technologies.length - 4} more
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

      </motion.div>

      {/* Project Modal */}
      <AnimatePresence>
        {modalProject && (
          <motion.div
            className="projects__modal-overlay"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={closeModal}
          >
            <motion.div
              className="projects__modal"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="projects__modal-header">
                <h3 className="projects__modal-title">{modalProject.title}</h3>
                <button
                  className="projects__modal-close"
                  onClick={closeModal}
                  aria-label="Close modal"
                >
                  <FaTimes />
                </button>
              </div>

              <div className="projects__modal-content">
                <div className="projects__modal-image">
                  <img 
                    src={modalProject.image} 
                    alt={modalProject.title}
                    loading="lazy"
                    onClick={() => openEnlargedImage(modalProject.image, modalProject.title)}
                  />
                </div>
                
                <div className="projects__modal-details">
                  <div className="projects__modal-description">
                    <h4>Project Overview</h4>
                    <ul>
                      {modalProject.description.map((point, idx) => (
                        <li key={idx}>{point}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="projects__modal-tech">
                    <h4>Technologies Used</h4>
                    <div className="projects__modal-tech-tags">
                      {modalProject.technologies.map((tech, idx) => (
                        <span key={idx} className="projects__modal-tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Responsive Lightbox for enlarged image */}
      <Lightbox
        open={!!enlargedImage}
        close={closeEnlargedImage}
        slides={enlargedImage ? [{ src: enlargedImage.src }] : []}
        controller={{ closeOnBackdropClick: true }}
        swipe={{ enabled: false, threshold: 0, velocity: 0 }}
        carousel={{ finite: true, preload: 0 }}
        render={{
          buttonPrev: () => null,
          buttonNext: () => null,
          toolbar: () => null,
          slide: ({ slide }) => (
            <div style={{ 
              width: '100%', 
              height: '100%', 
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <img 
                src={slide.src} 
                alt={enlargedImage?.alt || ''} 
                style={{ 
                  width: '100%', 
                  height: '100%', 
                  objectFit: 'contain',
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  pointerEvents: 'none'
                }} 
              />
              {showRotateMessage && (
                <div style={{
                  position: 'absolute',
                  top: '50%',
                  left: '50%',
                  transform: 'translate(-50%, -50%)',
                  background: 'rgba(0, 0, 0, 0.8)',
                  color: 'white',
                  padding: '1rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  zIndex: 1000,
                  maxWidth: '80%',
                  fontSize: '14px',
                  lineHeight: '1.4'
                }}>
                  <div style={{ marginBottom: '0.5rem' }}>📱</div>
                  <div>Rotate your device for better viewing</div>
                </div>
              )}
            </div>
          )
        }}
      />
    </section>
  )
}

export default Projects
