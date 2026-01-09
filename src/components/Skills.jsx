import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FaCode, FaServer, FaTools, FaDesktop, FaDatabase, FaShieldAlt,
  FaHtml5, FaCss3Alt, FaJs, FaReact, FaBootstrap, FaPython, FaPhp,
  FaWindows, FaLinux, FaApple, FaLaptopCode, FaHdd, FaDownload, FaCog
} from 'react-icons/fa'
import './Skills.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

const skillCategories = [
  {
    name: 'Frontend Development',
    icon: FaCode,
    color: '#4ecdc4',
    skills: [
      { name: 'HTML5', icon: FaHtml5, isReactIcon: true },
      { name: 'CSS3', icon: FaCss3Alt, isReactIcon: true },
      { name: 'JavaScript', icon: FaJs, isReactIcon: true },
      { name: 'React', icon: FaReact, isReactIcon: true },
      { name: 'Bootstrap', icon: FaBootstrap, isReactIcon: true }
    ]
  },
  {
    name: 'Backend Development',
    icon: FaServer,
    color: '#a80000',
    skills: [
      { name: 'Python', icon: FaPython, isReactIcon: true },
      { name: 'C++', icon: FaCode, isReactIcon: true },
      { name: 'Django', icon: FaCode, isReactIcon: true },
      { name: 'PHP', icon: FaPhp, isReactIcon: true }
    ]
  },
  {
    name: 'IT Support & Hardware',
    icon: FaTools,
    color: '#ff6b35',
    skills: [
      { name: 'Hardware Troubleshooting', icon: FaTools, isReactIcon: true },
      { name: 'Software Installation', icon: FaDownload, isReactIcon: true },
      { name: 'System Setup', icon: FaCog, isReactIcon: true },
      { name: 'Network Configuration', icon: FaDesktop, isReactIcon: true }
    ]
  },
  {
    name: 'Operating Systems',
    icon: FaDesktop,
    color: '#9c27b0',
    skills: [
      { name: 'Windows', icon: FaWindows, isReactIcon: true },
      { name: 'Linux', icon: FaLinux, isReactIcon: true },
      { name: 'macOS', icon: FaApple, isReactIcon: true },
      { name: 'Virtual Machines', icon: FaLaptopCode, isReactIcon: true }
    ]
  },
  {
    name: 'Security & Networking',
    icon: FaShieldAlt,
    color: '#4caf50',
    skills: [
      { name: 'Cybersecurity Basics', icon: FaShieldAlt, isReactIcon: true },
      { name: 'Firewall Configuration', icon: FaShieldAlt, isReactIcon: true },
      { name: 'VPN Setup', icon: FaShieldAlt, isReactIcon: true },
      { name: 'Data Backup', icon: FaHdd, isReactIcon: true }
    ]
  },
  {
    name: 'Database',
    icon: FaDatabase,
    color: '#00d4ff',
    skills: [
      { name: 'MySQL', icon: FaDatabase, isReactIcon: true },
      { name: 'PostgreSQL', icon: FaDatabase, isReactIcon: true }
    ]
  }
]

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const skillsRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.1 }
    )

    if (skillsRef.current) {
      observer.observe(skillsRef.current)
    }

    return () => observer.disconnect()
  }, [])

  // Check screen size
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth >= 0 && window.innerWidth <= 803)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)

    return () => window.removeEventListener('resize', checkScreenSize)
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

  const categoryVariants = {
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

  const skillVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: 'easeOut'
      }
    }
  }

  return (
    <section id="skills" className="skills" ref={skillsRef}>
      {/* Background Elements */}
      <div className="skills__background">
        <div className="skills__background-gradient" />
        <div className="skills__background-pattern" />
      </div>

      {/* Main Container */}
      <motion.div
        className="skills__container"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="skills__header" variants={itemVariants}>
          <motion.div
            className="skills__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="skills__badge-text">Expertise</span>
          </motion.div>
          
          <motion.h2 className="skills__title" variants={itemVariants}>
            Technical Skills & Expertise
          </motion.h2>
          
          <motion.p className="skills__subtitle" variants={itemVariants}>
            A comprehensive overview of my technical capabilities across web development, IT support, and system administration
          </motion.p>
        </motion.div>

        {/* Skills Grid/Swiper */}
        {isMobile ? (
          <div className="skills__swiper-container">
            <Swiper
              modules={[Navigation, Pagination]}
              spaceBetween={20}
              slidesPerView={1}
              navigation={true}
              pagination={{ clickable: true }}
              className="skills__swiper"
              breakpoints={{
                480: {
                  slidesPerView: 1,
                  spaceBetween: 20
                },
                803: {
                  slidesPerView: 1,
                  spaceBetween: 20
                }
              }}
            >
              {skillCategories.map((category, categoryIdx) => (
                <SwiperSlide key={category.name}>
                  <motion.div
                    className="skills__category"
                    variants={categoryVariants}
                    whileHover={{ 
                      y: -8,
                      transition: { duration: 0.3 }
                    }}
                  >
                    <div className="skills__category-header" style={{ borderColor: category.color }}>
                      <div className="skills__category-icon" style={{ color: category.color }}>
                        <category.icon />
                      </div>
                      <h3 className="skills__category-title">{category.name}</h3>
                    </div>
                    
                    <div className="skills__category-skills">
                      {category.skills.map((skill, skillIdx) => (
                        <motion.div
                          key={skill.name}
                          className="skills__skill-item"
                          variants={skillVariants}
                          whileHover={{ 
                            scale: 1.02,
                            transition: { duration: 0.2 }
                          }}
                        >
                          <div className="skills__skill-icon" style={{ color: category.color }}>
                            {skill.isReactIcon ? (
                              <skill.icon />
                            ) : (
                              <img
                                src={skill.icon}
                                alt={skill.name}
                                loading="lazy"
                              />
                            )}
                          </div>
                          <span className="skills__skill-name">{skill.name}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        ) : (
          <div className="skills__grid">
            {skillCategories.map((category, categoryIdx) => (
              <motion.div
                key={category.name}
                className="skills__category"
                variants={categoryVariants}
                whileHover={{ 
                  y: -8,
                  transition: { duration: 0.3 }
                }}
              >
                <div className="skills__category-header" style={{ borderColor: category.color }}>
                  <div className="skills__category-icon" style={{ color: category.color }}>
                    <category.icon />
                  </div>
                  <h3 className="skills__category-title">{category.name}</h3>
                </div>
                
                <div className="skills__category-skills">
                  {category.skills.map((skill, skillIdx) => (
                    <motion.div
                      key={skill.name}
                      className="skills__skill-item"
                      variants={skillVariants}
                      whileHover={{ 
                        scale: 1.02,
                        transition: { duration: 0.2 }
                      }}
                    >
                      <div className="skills__skill-icon" style={{ color: category.color }}>
                        {skill.isReactIcon ? (
                          <skill.icon />
                        ) : (
                          <img
                            src={skill.icon}
                            alt={skill.name}
                            loading="lazy"
                          />
                        )}
                      </div>
                      <span className="skills__skill-name">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  )
}

export default Skills
