import './Skills.scss'
import { useEffect, useRef, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules'
import { motion } from 'framer-motion'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/effect-coverflow'

const skills = [
  { name: 'HTML5', icon: '/solis-portfolio/assets/html.png', level: 95 },
  { name: 'CSS3', icon: '/solis-portfolio/assets/css.png', level: 90 },
  { name: 'JS', icon: '/solis-portfolio/assets/js.png', level: 92 },
  { name: 'Bootstrap', icon: '/solis-portfolio/assets/bootstrap.png', level: 85 },
  { name: 'Python', icon: '/solis-portfolio/assets/python.png', level: 93 },
  { name: 'Django', icon: '/solis-portfolio/assets/django.png', level: 88 },
  { name: 'PHP', icon: '/solis-portfolio/assets/php.png', level: 80 },
  { name: 'MySQL', icon: '/solis-portfolio/assets/mysql.png', level: 87 },
]

// Firecracker spark effect component
const FirecrackerSpark = () => (
  <span className="skill-bar-spark firecracker">
    {[0, 1, 2, 3, 4].map(i => (
      <span
        key={i}
        className={`sparkle sparkle-${i}`}
        style={{
          left: `${i * 6 - 12}px`,
          animation: `sparkle-burst-${i} 1.2s ${i * 0.08}s infinite alternate`
        }}
      />
    ))}
  </span>
)

// Custom hook for responsive breakpoint
function useIsDesktop(breakpoint = 900) {
  const [isDesktop, setIsDesktop] = useState(() => typeof window !== 'undefined' ? window.innerWidth >= breakpoint : false)
  useEffect(() => {
    const onResize = () => setIsDesktop(window.innerWidth >= breakpoint)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [breakpoint])
  return isDesktop
}

const Skills = () => {
  const [visible, setVisible] = useState(false)
  const ref = useRef(null)
  const isDesktop = useIsDesktop(900)

  useEffect(() => {
    function onScroll() {
      if (!ref.current) return
      const rect = ref.current.getBoundingClientRect()
      if (rect.top < window.innerHeight - 80) setVisible(true)
    }

    window.addEventListener('scroll', onScroll)
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const prefersReducedMotion = typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="skills-wrapper" style={{ maxWidth: '100vw', overflowX: 'hidden' }}>
      <section
        className="skills-section"
        id="skills"
        ref={ref}
        aria-labelledby="skills-heading"
        style={{ overflowX: 'hidden', position: 'relative', maxWidth: '100vw' }}
      >
        <div className="skills-bg"></div>
        <div className="skills-lightning flashit"></div>
        <h2 className="skills-title" id="skills-heading">Skills</h2>
        <p className="skills-intro">A quick look at the technologies and tools I use to build, design, and deliver modern web solutions.</p>
        {isDesktop ? (
          <div className="skills-grid">
            {skills.map((skill, idx) => (
              <motion.div
                className="skill-card"
                key={skill.name}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={visible ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
              >
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="skill-icon"
                  draggable="false"
                  loading="lazy"
                />
                <div className="skill-info">
                  <span className="skill-name">{skill.name}</span>
                  <div className="skill-bar-bg">
                    <div
                      className="skill-bar-fill"
                      style={{
                        width: visible ? skill.level + '%' : 0,
                        transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
                      }}
                    >
                      {visible && !prefersReducedMotion && <FirecrackerSpark />}
                    </div>
                  </div>
                  <span className="skill-level">{skill.level}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="skills-swiper">
            <Swiper
              modules={[Navigation, Pagination, EffectCoverflow]}
              navigation
              pagination={{ clickable: true, el: '.skills-swiper-dots' }}
              effect="coverflow"
              centeredSlides
              slidesPerView={1}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 120,
                modifier: 2,
                slideShadows: false
              }}
              style={{ minHeight: 300 }}
            >
              {skills.map((skill, idx) => (
                <SwiperSlide key={skill.name} role="listitem">
                  <motion.div
                    className="skill-card"
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={visible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ duration: 0.6, delay: idx * 0.1 }}
                  >
                    <img
                      src={skill.icon}
                      alt={skill.name}
                      className="skill-icon"
                      draggable="false"
                      loading="lazy"
                    />
                    <div className="skill-info">
                      <span className="skill-name">{skill.name}</span>
                      <div className="skill-bar-bg">
                        <div
                          className="skill-bar-fill"
                          style={{
                            width: visible ? skill.level + '%' : 0,
                            transition: 'width 1.2s cubic-bezier(0.22, 1, 0.36, 1)'
                          }}
                        >
                          {visible && !prefersReducedMotion && <FirecrackerSpark />}
                        </div>
                      </div>
                      <span className="skill-level">{skill.level}%</span>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
            <div className="skills-swiper-dots" />
          </div>
        )}
      </section>
    </div>
  )
}

export default Skills
