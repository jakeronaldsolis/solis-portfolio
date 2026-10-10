import { useState, useRef } from 'react'
import emailjs from '@emailjs/browser'

const Contact = () => {
  const formRef = useRef(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus(null)

    try {
      await emailjs.sendForm(
        'service_jca7q84',
        'template_tttmhqb',
        formRef.current,
        'JX2FXJcxkNZ2vlHgY'
      )
      setStatus({ ok: true, text: "Message sent. I'll get back to you soon." })
      formRef.current.reset()
    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus({
        ok: false,
        text: 'Could not send your message. Please email jakeronaldsolis@gmail.com directly.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section">
      <div className="container container--narrow">
        <h2>Contact</h2>
        <p className="muted">
          <a className="link" href="mailto:jakeronaldsolis@gmail.com">jakeronaldsolis@gmail.com</a>
          {' · Philippines · Open to full-time, part-time, and freelance work'}
        </p>

        <form ref={formRef} onSubmit={handleSubmit} className="form">
          <label>
            Name
            <input type="text" name="name" required disabled={isSubmitting} />
          </label>
          <label>
            Email
            <input type="email" name="email" required disabled={isSubmitting} />
          </label>
          <label>
            Subject
            <input type="text" name="subject" required disabled={isSubmitting} />
          </label>
          <label>
            Message
            <textarea name="message" rows="6" required disabled={isSubmitting} />
          </label>
          <button type="submit" className="btn btn--primary" disabled={isSubmitting}>
            {isSubmitting ? 'Sending…' : 'Send message'}
          </button>
          {status && (
            <p role="status" className={status.ok ? 'status status--ok' : 'status status--error'}>
              {status.text}
            </p>
          )}
        </form>
      </div>
    </section>
  )
}

export default Contact
