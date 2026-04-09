import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { FaFileAlt, FaEnvelope, FaLinkedin } from 'react-icons/fa'
import './Hero.scss'

const Hero = () => {
  const heroRef = useRef(null)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.9, rotateY: -10 },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    }
  }

  const floatingVariants = {
    animate: {
      y: [-8, 8, -8],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  }

  const gradientVariants = {
    animate: {
      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "linear"
      }
    }
  }

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section id="hero" className="hero" ref={heroRef}>
      {/* Modern Gradient Background */}
      <motion.div 
        className="hero__gradient-bg"
        variants={gradientVariants}
        animate="animate"
      />
      
      {/* Subtle Grid Pattern */}
      <div className="hero__grid-pattern" />
      
      {/* Floating Particles */}
      <div className="hero__particles">
        <div className="hero__particle hero__particle--1" />
        <div className="hero__particle hero__particle--2" />
        <div className="hero__particle hero__particle--3" />
      </div>

      {/* Main Content Container */}
      <motion.div
        className="hero__container"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="hero__content">
          {/* Text Content - Mobile First */}
          <motion.div className="hero__text-section" variants={itemVariants}>
            <motion.div className="hero__badge" variants={itemVariants}>
              <span className="hero__badge-text">Available for opportunities</span>
            </motion.div>

            <motion.h1 className="hero__title" variants={itemVariants}>
              <span className="hero__title-line">Jake Ronald</span>
              <span className="hero__title-subtitle">Solis</span>
            </motion.h1>

            <motion.div className="hero__role" variants={itemVariants}>
              <span className="hero__role-text">Web Developer</span>
              <span className="hero__role-separator">•</span>
              <span className="hero__role-text">ML Enthusiast</span>
              <span className="hero__role-separator">•</span>
              <span className="hero__role-text">IT Support</span>
            </motion.div>

            <motion.p className="hero__description" variants={itemVariants}>
              Crafting innovative web solutions, exploring AI frontiers, and providing expert IT support. 
              Building scalable applications that solve real-world problems.
            </motion.p>

            <motion.div className="hero__actions" variants={itemVariants}>
              <motion.a
                href="/solis-portfolio/assets/Jake_Ronald_Solis-RESUME.pdf"
                download
                target="_blank"
                rel="noopener noreferrer"
                className="hero__btn hero__btn--primary"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaFileAlt className="hero__btn-icon" />
                <span>Resume</span>
              </motion.a>

              <motion.button
                onClick={scrollToContact}
                className="hero__btn hero__btn--secondary"
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.98 }}
              >
                <FaEnvelope className="hero__btn-icon" />
                <span>Contact</span>
              </motion.button>

              <motion.a
                href="https://www.linkedin.com/in/jakeronaldsolis"
                target="_blank"
                rel="noopener noreferrer"
                className="hero__linkedin"
                aria-label="LinkedIn profile"
                whileHover={{ scale: 1.06 }}
                whileTap={{ scale: 0.96 }}
              >
                <FaLinkedin className="hero__linkedin-icon" aria-hidden />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div className="hero__image-section" variants={itemVariants}>
            <motion.div
              className="hero__image-container"
              variants={floatingVariants}
              animate="animate"
            >
              <motion.div className="hero__image-wrapper" variants={imageVariants}>
                <img
                  src="/solis-portfolio/assets/jakesolis.png"
                  alt="Jake Solis - Web Developer and ML Enthusiast"
                  className="hero__image"
                  loading="eager"
                />
                <div className="hero__image-glow" />
              </motion.div>
              
              {/* Decorative Elements */}
              <div className="hero__decorative">
                <div className="hero__decorative-ring hero__decorative-ring--1" />
                <div className="hero__decorative-ring hero__decorative-ring--2" />
                <div className="hero__decorative-dot hero__decorative-dot--1" />
                <div className="hero__decorative-dot hero__decorative-dot--2" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Hero