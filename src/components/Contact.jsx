import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaEnvelope, FaUser, FaPaperPlane, FaMapMarkerAlt, FaPhone } from 'react-icons/fa'
import emailjs from '@emailjs/browser'
import Swal from 'sweetalert2'
import './Contact.scss'

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const contactRef = useRef(null)
  const formRef = useRef(null)

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

    if (contactRef.current) {
      observer.observe(contactRef.current)
    }

    return () => observer.disconnect()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const showSuccessAlert = () => {
    Swal.fire({
      title: 'Message Sent Successfully!',
      text: 'Thank you for reaching out. I\'ll get back to you as soon as possible.',
      icon: 'success',
      confirmButtonText: 'Great!',
      confirmButtonColor: '#6366f1',
      background: '#1a1a1a',
      color: '#ffffff',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        content: 'swal-custom-content'
      }
    })
  }

  const showErrorAlert = (errorMessage = 'Something went wrong. Please try again.') => {
    Swal.fire({
      title: 'Oops...',
      text: errorMessage,
      icon: 'error',
      confirmButtonText: 'Try Again',
      confirmButtonColor: '#ef4444',
      background: '#1a1a1a',
      color: '#ffffff',
      customClass: {
        popup: 'swal-custom-popup',
        title: 'swal-custom-title',
        content: 'swal-custom-content'
      }
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const result = await emailjs.sendForm(
        'service_jca7q84',
        'template_tttmhqb',
        formRef.current,
        'JX2FXJcxkNZ2vlHgY'
      )

      if (result.status === 200) {
        showSuccessAlert()
        setFormData({ name: '', email: '', subject: '', message: '' })
      } else {
        showErrorAlert('Failed to send message. Please try again.')
      }
    } catch (error) {
      console.error('EmailJS error:', error)
      
      // Handle specific EmailJS errors
      if (error.text && error.text.includes('limit')) {
        showErrorAlert('Monthly email limit reached. Please contact me directly at jakeronaldsolis@gmail.com')
      } else if (error.text && error.text.includes('service')) {
        showErrorAlert('Email service temporarily unavailable. Please try again later.')
      } else {
        showErrorAlert('Network error. Please check your connection and try again.')
      }
    } finally {
      setIsSubmitting(false)
    }
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

  const formVariants = {
    hidden: { opacity: 0, scale: 0.95, y: 20 },
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

  return (
    <section id="contact" className="contact" ref={contactRef}>
      {/* Background Elements */}
      <div className="contact__background">
        <div className="contact__background-gradient" />
        <div className="contact__background-pattern" />
      </div>

      {/* Main Container */}
      <motion.div
        className="contact__container"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
      >
        {/* Section Header */}
        <motion.div className="contact__header" variants={itemVariants}>
          <motion.div
            className="contact__badge"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isVisible ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
          >
            <span className="contact__badge-text">Get In Touch</span>
          </motion.div>
          
          <motion.h2 className="contact__title" variants={itemVariants}>
            Let's Work Together
          </motion.h2>
          
          <motion.p className="contact__subtitle" variants={itemVariants}>
            Have a project in mind? I'd love to hear about it. Send me a message and I'll respond as soon as possible.
          </motion.p>
        </motion.div>

        {/* Contact Content Grid */}
        <div className="contact__content">
          {/* Contact Information */}
          <motion.div className="contact__info-wrapper" variants={itemVariants}>
            <div className="contact__info-header">
              <h3>Contact Information</h3>
              <p>Feel free to reach out through any of these channels.</p>
            </div>
            
            <div className="contact__info-grid">
              <div className="contact__info-item">
                <div className="contact__info-icon-wrapper">
                  <FaEnvelope className="contact__info-icon" />
                </div>
                <div className="contact__info-content">
                  <h4>Email</h4>
                  <p>jakeronaldsolis@gmail.com</p>
                  <span className="contact__info-note">I'll respond within 24 hours</span>
                </div>
              </div>
              
              <div className="contact__info-item">
                <div className="contact__info-icon-wrapper">
                  <FaMapMarkerAlt className="contact__info-icon" />
                </div>
                <div className="contact__info-content">
                  <h4>Location</h4>
                  <p>Philippines</p>
                  <span className="contact__info-note">Available for remote work worldwide</span>
                </div>
              </div>
              
              <div className="contact__info-item">
                <div className="contact__info-icon-wrapper">
                  <FaUser className="contact__info-icon" />
                </div>
                <div className="contact__info-content">
                  <h4>Availability</h4>
                  <p>Open to Opportunities</p>
                  <span className="contact__info-note">Full-time, part-time, and freelance</span>
                </div>
              </div>
            </div>

            <div className="contact__info-cta">
              <h4>Ready to Start?</h4>
              <p>Let's discuss how I can help bring your ideas to life.</p>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div className="contact__form-wrapper" variants={formVariants}>
            <div className="contact__form-header">
              <h3>Send Message</h3>
              <p>Fill out the form below and I'll get back to you promptly.</p>
            </div>
            
            <form ref={formRef} onSubmit={handleSubmit} className="contact__form">
              <div className="contact__form-row">
                <div className="contact__form-group">
                  <label htmlFor="name" className="contact__form-label">
                    <FaUser className="contact__form-icon" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="contact__form-input"
                    placeholder="Enter your full name"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="contact__form-group">
                  <label htmlFor="email" className="contact__form-label">
                    <FaEnvelope className="contact__form-icon" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="contact__form-input"
                    placeholder="Enter your email address"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="contact__form-group">
                <label htmlFor="subject" className="contact__form-label">
                  Subject *
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="contact__form-input"
                  placeholder="What is this about?"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="contact__form-group">
                <label htmlFor="message" className="contact__form-label">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  className="contact__form-textarea"
                  placeholder="Tell me about your project, question, or collaboration idea..."
                  rows="6"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <motion.button
                type="submit"
                className="contact__form-submit"
                disabled={isSubmitting}
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? (
                  <>
                    <div className="contact__form-spinner" />
                    <span>Sending Message...</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="contact__form-submit-icon" />
                    <span>Send Message</span>
                  </>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}

export default Contact 