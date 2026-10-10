import { FaFileAlt, FaEnvelope, FaLinkedin } from 'react-icons/fa'
import { asset } from '../assets'

const Hero = () => (
  <section id="hero" className="section hero">
    <div className="container hero__inner">
      <div className="hero__text">
        <p className="eyebrow">Available for opportunities</p>
        <h1>Jake Ronald Solis</h1>
        <p className="hero__role">Web Developer • ML Enthusiast • IT Support</p>
        <p className="muted">
          Building web applications, exploring machine learning, and providing IT support.
        </p>
        <div className="hero__actions">
          <a className="btn btn--primary" href={asset('Jake_Ronald_Solis-RESUME.pdf')} download>
            <FaFileAlt aria-hidden /> Resume
          </a>
          <a className="btn" href="#contact">
            <FaEnvelope aria-hidden /> Contact
          </a>
          <a
            className="btn btn--icon"
            href="https://www.linkedin.com/in/jakeronaldsolis"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
          >
            <FaLinkedin aria-hidden />
          </a>
        </div>
      </div>
      <img className="hero__image" src={asset('jakesolis.png')} alt="Jake Solis" />
    </div>
  </section>
)

export default Hero
