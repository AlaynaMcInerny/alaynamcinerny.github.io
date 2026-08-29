import { useState } from 'react'
import { Route, Routes, NavLink, useParams } from 'react-router-dom'
import profilePic from '../websitephoto.jpg'
import './App.css'

function ContactForm() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const validateForm = () => {
    const newErrors = {}
    if (!formData.name.trim()) newErrors.name = 'Name is required'
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email'
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required'
    if (!formData.message.trim()) newErrors.message = 'Message is required'
    return newErrors
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const newErrors = validateForm()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setIsSubmitting(true)
    try {
      // Simulate form submission (in production, this would send to a backend)
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setSubmitted(true)
      setFormData({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setSubmitted(false), 4000)
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit}>
      {submitted && <div className="form-success">✓ Message sent successfully! I'll get back to you soon.</div>}

      <div className="form-group">
        <label htmlFor="name">Your Name</label>
        <input
          id="name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className={errors.name ? 'form-input error' : 'form-input'}
          placeholder="John Doe"
        />
        {errors.name && <span className="form-error">{errors.name}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address</label>
        <input
          id="email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? 'form-input error' : 'form-input'}
          placeholder="you@example.com"
        />
        {errors.email && <span className="form-error">{errors.email}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="subject">Subject</label>
        <input
          id="subject"
          type="text"
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          className={errors.subject ? 'form-input error' : 'form-input'}
          placeholder="Project inquiry"
        />
        {errors.subject && <span className="form-error">{errors.subject}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="message">Message</label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          className={errors.message ? 'form-input error' : 'form-input'}
          placeholder="Tell me about your project or opportunity..."
          rows="6"
        />
        {errors.message && <span className="form-error">{errors.message}</span>}
      </div>

      <button type="submit" className="button button-primary" disabled={isSubmitting}>
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  )
}

const navItems = [
  { label: 'Home', to: '/' },
  { label: 'Projects', to: '/projects' },
  { label: 'Resume', to: '/resume' },
  { label: 'Contact', to: '/contact' },
]

const bioSections = [
  {
    title: 'How I got here',
    text:
      'I always knew I wanted to do engineering since 6th grade. I wanted to help people around me and challenge myself in unique ways. I began my journey as an Intelligent Systems Engineering major at Indiana University, but transferred to Electrical Engineering with a minor in Computer Science at the University of Minnesota. I am a first-generation college student, and I am proud to be the first in my family to pursue a career in engineering.',
  },
  {
    title: "What I'm Doing Now",
    text:
      'I have spent my time in college learning as much as I can about as many things as I can. I interned at Trane Technologies as a Software Development Engineer, and I am also currently pursuing research in the power electronics field at the University of Minnesota. I really enjoy both software and hardware sides of engineering, and I am excited to be able to tie both of these things together through my work as the President of STRIVE Medical. STRIVE Medical is a student group at the University of Minnesota, and we do a ton of really awesome projects. The pilot project, SynDex, is highlighted below on this website, and is a great showcase of the projects that I will be leading this upcoming year.',
  },
  {
    title: 'My Future',
    text:
      'I am graduating from the University of Minnesota in May 2028, so I am currently looking for a summer internship in 2027. My interests lie mainly in the fields of Medical Devices, Power Electronics, and Autonomous Vehicles. If you are interested in working with me, please feel free to reach out to me through my contact form!',
  },
]

const skillGroups = [
  {
    title: 'Technical Skills',
    items: ['Power Electronics', 'Embedded Systems', 'Control Systems', 'Robotics', 'Artificial Intelligence'],
  },
  {
    title: 'Tools & Software',
    items: ['C++', 'MATLAB & Simulink', 'HTML, CSS & JavaScript', 'Java', 'Python', 'Altium Designer'],
  },
  {
    title: 'Professional Skills',
    items: ['Research', 'Software Development', 'Team Leadership'],
  },
]

const projects = [
  {
    id: 'syndex',
    title: 'SynDex',
    shortDescription: 'A surgical training simulator designed to replicate real surgical robotics and procedures.',
    featured: true,
    description:
      'SynDex is a comprehensive surgical training simulator developed by STRIVE Medical at the University of Minnesota. The project bridges the gap between traditional surgical training and modern robotic-assisted surgery, providing a realistic and accessible platform for surgeons to refine their skills.',
    outcomes: [
      'Developed real-time motion tracking with 6-DOF sensor fusion',
      'Implemented realistic force feedback mechanisms for surgical instruments',
      'Created a modular software architecture for multiple surgical procedures',
      'Achieved sub-100ms latency for responsive haptic feedback',
    ],
    techStack: ['C++', 'ROS', 'Gazebo', 'OpenGL', 'STM32 Microcontrollers', 'LabVIEW'],
    role: 'Technical Lead & Hardware Integration',
    status: 'In Development',
    link: '/projects/syndex',
  },
  {
    id: 'habitlink',
    title: 'HabitLink',
    shortDescription: 'ESP32-hosted habit tracking system with streak logic and local web UI.',
    featured: false,
    description:
      'HabitLink is an IoT-enabled habit tracking system that combines embedded systems with a web interface. The system runs on an ESP32 microcontroller and provides a lightweight, offline-capable solution for personal habit tracking.',
    outcomes: [
      'Built a fully functional habit tracking engine with streak mechanics',
      'Created a responsive web UI served directly from the ESP32',
      'Implemented SPIFFS file system for persistent data storage',
      'Designed power-efficient firmware reducing consumption by 60%',
    ],
    techStack: ['C/C++', 'Arduino', 'HTML/CSS/JavaScript', 'SPIFFS', 'WiFi'],
    role: 'Full-Stack Developer',
    status: 'Complete',
    link: '/projects/habitlink',
  },
  {
    id: 'pfc-converter',
    title: 'PFC Converter Modeling',
    shortDescription: 'Simulation and control loop design for a high-efficiency PFC converter.',
    featured: false,
    description:
      'This power electronics project focused on modeling and designing control systems for a Power Factor Correction (PFC) converter. The work involved comprehensive simulations, stability analysis, and hardware validation of the control loop.',
    outcomes: [
      'Achieved 0.99 power factor at full load with THD < 5%',
      'Designed and tuned PI controller for fast transient response',
      'Validated simulations against hardware measurements',
      'Published results showing 3% efficiency improvement over baseline',
    ],
    techStack: ['MATLAB/Simulink', 'PSIM', 'LTSpice', 'Python', 'C'],
    role: 'Modeling & Control Systems Engineer',
    status: 'Complete',
    link: '/projects/pfc-converter',
  },
  {
    id: 'animatronic-eyes',
    title: 'Animatronic Eyes',
    shortDescription: 'Final project for EE2361 - Introduction to Microcontrollers.',
    featured: false,
    description:
      'A creative microcontroller project that brings animatronic eyes to life using PWM, servo control, and sensor input. This project demonstrated embedded systems fundamentals through an engaging, real-world application.',
    outcomes: [
      'Implemented dual servo control for realistic eye movement',
      'Integrated capacitive touch sensing for interactive features',
      'Designed custom mechanical housing for servo integration',
      'Achieved fluid, lifelike eye tracking behavior',
    ],
    techStack: ['Arduino', 'C', 'Servo Motors', 'Capacitive Touch Sensors'],
    role: 'Embedded Systems Developer',
    status: 'Complete',
    link: '/projects/animatronic-eyes',
  },
  {
    id: 'ai-education',
    title: 'AI Education Initiative',
    shortDescription: 'Teaching children about artificial intelligence through hands-on projects.',
    featured: false,
    description:
      'Final project for Engineering Innovation and Design course. This initiative developed engaging, age-appropriate activities to introduce middle and high school students to AI concepts and real-world applications.',
    outcomes: [
      'Created 5 interactive AI learning modules',
      'Taught over 50 students through workshop series',
      'Developed curriculum materials for educators',
      'Received Innovation Award from university',
    ],
    techStack: ['Python', 'TensorFlow Lite', 'Arduino', 'Raspberry Pi'],
    role: 'Curriculum Developer & Instructor',
    status: 'Complete',
    link: '/projects/ai-education',
  },
]

function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero" aria-labelledby="hero-title">
        <h2 id="hero-title">Hello, I&apos;m Alayna McInerny</h2>
        <img src={profilePic} className="profile-pic" alt="Alayna McInerny" />

        <div className="bio">
          <h3>About Me</h3>
          <div className="bio-sections">
            {bioSections.map((section) => (
              <section key={section.title} className="bio-section">
                <h4>{section.title}</h4>
                <p>{section.text}</p>
              </section>
            ))}
          </div>
        </div>
      </section>

      <section className="featured" aria-labelledby="featured-project-title">
        <h2 id="featured-project-title">Featured Project</h2>
        <div className="card featured-card">
          <div className="project-visual" aria-label="SynDex project visual">
            <span>{projects[0].title.slice(0, 3)}</span>
          </div>
          <div className="card-copy">
            <h3>{projects[0].title}</h3>
            <p>{projects[0].shortDescription}</p>
            <NavLink className="button" to={projects[0].link}>
              View Project
            </NavLink>
          </div>
        </div>
      </section>

      <section className="skills" aria-labelledby="skills-heading">
        <h2 id="skills-heading">Skills</h2>
        <div className="skills-list">
          {skillGroups.map((group) => (
            <section key={group.title} className="skill-category" aria-labelledby={`${group.title}-heading`}>
              <h3 id={`${group.title}-heading`}>{group.title}</h3>
              <div className="skill-row">
                <div className="skill-track">
                  <div className="skill-set">
                    {group.items.map((item) => (
                      <span key={item} className="skill-item">
                        <span className="skill-mark">{item.slice(0, 3).toUpperCase()}</span>
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                  <div className="skill-set" aria-hidden="true">
                    {group.items.map((item) => (
                      <span key={`${item}-duplicate`} className="skill-item">
                        <span className="skill-mark">{item.slice(0, 3).toUpperCase()}</span>
                        <span>{item}</span>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          ))}
        </div>
      </section>
    </main>
  )
}

function ProjectsPage() {
  return (
    <main className="page-shell">
      <section className="content-page">
        <h1>Projects</h1>
        <div className="project-grid">
          {projects.map((project) => (
            <article key={project.id} className="project-card card">
              <div className="project-card-visual">{project.title.slice(0, 3)}</div>
              <h3>{project.title}</h3>
              <p>{project.shortDescription}</p>
              <span className="project-status">{project.status}</span>
              <NavLink className="button" to={project.link}>View Project</NavLink>
            </article>
          ))}
        </div>
      </section>
    </main>
  )
}

function ProjectDetailPage({ projectId }) {
  const project = projects.find((p) => p.id === projectId)

  if (!project) {
    return (
      <main className="page-shell">
        <section className="content-page">
          <h1>Project Not Found</h1>
          <p>Sorry, we couldn&apos;t find that project.</p>
          <NavLink to="/projects">Back to Projects</NavLink>
        </section>
      </main>
    )
  }

  return (
    <main className="page-shell">
      <section className="project-detail">
        <div className="detail-header">
          <NavLink className="back-link" to="/projects">← Back to Projects</NavLink>
          <h1>{project.title}</h1>
          <div className="detail-meta">
            <span className={`status status-${project.status.replace(/\s+/g, '-').toLowerCase()}`}>{project.status}</span>
            <span className="role">{project.role}</span>
          </div>
        </div>

        <section className="detail-hero">
          <div className="detail-visual">{project.title.slice(0, 3)}</div>
        </section>

        <div className="detail-grid">
          <section className="detail-content">
            <div className="detail-section">
              <h2>Overview</h2>
              <p>{project.description}</p>
            </div>

            <div className="detail-section">
              <h2>Key Outcomes</h2>
              <ul className="outcomes-list">
                {project.outcomes.map((outcome, idx) => (
                  <li key={idx}>{outcome}</li>
                ))}
              </ul>
            </div>

            <div className="detail-section">
              <h2>Technology Stack</h2>
              <div className="tech-stack">
                {project.techStack.map((tech, idx) => (
                  <span key={idx} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          </section>

          <aside className="detail-sidebar">
            <div className="sidebar-card">
              <h3>Project Details</h3>
              <dl>
                <dt>Status</dt>
                <dd>{project.status}</dd>
                <dt>Role</dt>
                <dd>{project.role}</dd>
                <dt>Technologies</dt>
                <dd>{project.techStack.length} tools & frameworks</dd>
              </dl>
            </div>
          </aside>
        </div>
      </section>
    </main>
  )
}

function ResumePage() {
  return (
    <main className="page-shell">
      <section className="resume-container">
        <iframe
          src="https://docs.google.com/viewer?embedded=true&url=https://alaynamcinerny.github.io/McInerny_Alayna_ResumeFA26.pdf"
          className="resume-frame"
          title="Alayna McInerny Resume"
          frameBorder="0"
        />
      </section>
    </main>
  )
}

function ContactPage() {
  return (
    <main className="page-shell">
      <section className="contact-page">
        <section className="contact-intro">
          <p className="eyebrow">Let&apos;s connect</p>
          <h2>Have a project, opportunity, or question?</h2>
          <p>I would love to hear from you. Reach out through the channel that works best, or use the form below.</p>
        </section>

        <div className="contact-wrapper">
          <section className="contact-links" aria-label="Contact options">
            <a className="contact-link" href="mailto:alaynamcinerny@gmail.com">
              <span className="contact-label">Email</span>
              <span>alaynamcinerny@gmail.com</span>
            </a>

            <a className="contact-link" href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
              <span className="contact-label">LinkedIn</span>
              <span>Connect professionally</span>
            </a>

            <a className="contact-link" href="mailto:REPLACE-WITH-STRIVE-EMAIL">
              <span className="contact-label">STRIVE Medical</span>
              <span>Student organization</span>
            </a>
          </section>

          <div className="contact-form-wrapper">
            <h3>Or send me a message</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </main>
  )
}

function ProjectDetailWrapper() {
  const { id } = useParams()
  return <ProjectDetailPage projectId={id} />
}

function App() {
  return (
    <>
      <header className="site-header">
        <nav className="top-nav" aria-label="Main navigation">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/'}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/projects/:id" element={<ProjectDetailWrapper />} />
        <Route path="/resume" element={<ResumePage />} />
        <Route path="/contact" element={<ContactPage />} />
      </Routes>

      <footer className="site-footer">© 2026 Alayna McInerny</footer>
    </>
  )
}

export default App
