import { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion'
import './About.scss'

const summary = `Web developer and machine learning enthusiast skilled in Python, Django, React, and modern web technologies. Experienced in IT support at Sumitomo Electric's Pilipinas Kyohritsu Inc. Built projects with BERT, Random Forest, and SVM. Passionate about building innovative, efficient web solutions.`

const techIcons = [
  { name: 'html', src: '/solis-portfolio/assets/html.png', alt: 'HTML5' },
  { name: 'css', src: '/solis-portfolio/assets/css.png', alt: 'CSS3' },
  { name: 'js', src: '/solis-portfolio/assets/js.png', alt: 'JavaScript' },
  { name: 'bootstrap', src: '/solis-portfolio/assets/bootstrap.png', alt: 'Bootstrap' },
  { name: 'django', src: '/solis-portfolio/assets/django.png', alt: 'Django' },
  { name: 'python', src: '/solis-portfolio/assets/python.png', alt: 'Python' },
  { name: 'php', src: '/solis-portfolio/assets/php.png', alt: 'PHP' },
  { name: 'mysql', src: '/solis-portfolio/assets/mysql.png', alt: 'MySQL' },
]

const About = () => {
  const [typed, setTyped] = useState('')
  const [index, setIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const aboutRef = useRef(null)

  // Typing effect
  useEffect(() => {
    if (index < summary.length) {
      const timeout = setTimeout(() => {
        setTyped(summary.slice(0, index + 1))
        setIndex(index + 1)
      }, 32)
      return () => clearTimeout(timeout)
    }
  }, [index])

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

    if (aboutRef.current) {
      observer.observe(aboutRef.current)
    }

    return () => observer.disconnect()
  }, [])

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

  const iconVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -180 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.6,
        ease: 'easeOut'
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Infinity,
        ease: 'easeInOut'
      }
    }
  }

  return (
    <section id="about" className="about" ref={aboutRef}>
      {/* Background Elements */}
      <div className="about__background">
        <div className="about__background-gradient" />
        <div className="about__background-pattern" />
      </div>

      {/* Main Container */}
      <motion.div
        className="about__container"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="about__header" variants={itemVariants}>
          <motion.div
            className="about__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="about__badge-text">About Me</span>
          </motion.div>
          
          <motion.h2 className="about__title" variants={itemVariants}>
            Crafting Digital Experiences
          </motion.h2>
          
          <motion.p className="about__subtitle" variants={itemVariants}>
            Passionate developer with a love for innovation and problem-solving
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="about__content">
          {/* Left Column - Text Content */}
          <motion.div className="about__text-content" variants={itemVariants}>
            <div className="about__description-wrapper">
              <h3 className="about__description-title">My Story</h3>
              <p className="about__description">
                {typed}<span className="about__cursor">|</span>
              </p>
            </div>

            {/* Experience Highlights */}
            <div className="about__highlights">
              <motion.div 
                className="about__highlight-item"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="about__highlight-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
                  </svg>
                </div>
                <div className="about__highlight-content">
                  <h4>Web Development</h4>
                  <p>Full-stack development with modern frameworks and technologies</p>
                </div>
              </motion.div>

              <motion.div 
                className="about__highlight-item"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="about__highlight-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <div className="about__highlight-content">
                  <h4>Machine Learning</h4>
                  <p>Building intelligent solutions with AI and data science</p>
                </div>
              </motion.div>

              <motion.div 
                className="about__highlight-item"
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -2 }}
              >
                <div className="about__highlight-icon">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
                    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                </div>
                <div className="about__highlight-content">
                  <h4>IT Support</h4>
                  <p>Technical expertise in hardware, software, and network solutions</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Tech Icons */}
          <motion.div className="about__tech-section" variants={itemVariants}>
            <h3 className="about__tech-title">Technologies I Work With</h3>
            
            <div className="about__tech-grid">
              {techIcons.map((tech, idx) => (
                <motion.div
                  key={tech.name}
                  className="about__tech-item"
                  variants={iconVariants}
                  whileHover={{ 
                    scale: 1.1, 
                    rotate: 5,
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <motion.div
                    className="about__tech-icon-wrapper"
                    variants={floatingVariants}
                    animate="animate"
                    style={{ animationDelay: `${idx * 0.2}s` }}
                  >
                    <img
                      src={tech.src}
                      alt={tech.alt}
                      className="about__tech-icon"
                      loading="lazy"
                    />
                  </motion.div>
                  <span className="about__tech-name">{tech.alt}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default About