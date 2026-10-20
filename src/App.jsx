import { useState } from 'react'
import { contactDetails, services } from './data/library.js'
import './App.css'

const events = [
  {
    day: '07',
    month: 'NOV',
    type: 'FOR YOUNG READERS',
    title: 'Saturday Story Circle',
    description:
      'Bring little ones for a cozy morning of picture books, songs, and imagination.',
    time: 'Saturday, November 7 · 10:30 AM',
  },
  {
    day: '14',
    month: 'NOV',
    type: 'COMMUNITY WORKSHOP',
    title: 'Words That Connect',
    description:
      'A welcoming, hands-on literacy workshop for anyone ready to grow their skills.',
    time: 'Saturday, November 14 · 2:00 PM',
  },
]

const books = [
  {
    category: 'FICTION',
    title: 'The Light Between Pages',
    author: 'Mara Ellison',
    description:
      'A gentle story about the unexpected ways a neighborhood can become a family.',
    cover: 'cover-sage',
    initials: 'LB',
  },
  {
    category: 'GROW & LEARN',
    title: 'Small Steps, Big Ideas',
    author: 'Jonah Reed',
    description:
      'Fresh ways to stay curious, build good habits, and make space for new ideas.',
    cover: 'cover-ochre',
    initials: 'SI',
  },
  {
    category: 'FOR YOUNG READERS',
    title: 'A Garden of Questions',
    author: 'Nia Okafor',
    description:
      'A playful picture-book adventure for the little questions that lead everywhere.',
    cover: 'cover-rose',
    initials: 'GQ',
  },
]

const bookCategories = ['ALL', ...new Set(books.map((book) => book.category))]

const navLinks = [
  ['Home', '#home'],
  ['About us', '#about'],
  ['Services', '#services'],
  ['Events', '#events'],
  ['Featured books', '#books'],
  ['FAQs', '#faq'],
  ['Contact', '#contact'],
]

function Icon({ name, size = 22 }) {
  const paths = {
    book: (
      <>
        <path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H20v16H6.5A2.5 2.5 0 0 0 4 21.5z" />
        <path d="M4 5.5v16M8 7h8M8 11h7" />
      </>
    ),
    wifi: (
      <>
        <path d="M5 9a11 11 0 0 1 14 0M8 12a6.5 6.5 0 0 1 8 0M11 15a2 2 0 0 1 2 0M12 19h.01" />
      </>
    ),
    study: (
      <>
        <path d="M3 19h18M5 19V8l7-4 7 4v11M9 19v-6h6v6" />
      </>
    ),
    spark: (
      <>
        <path d="m12 3 1.7 5.3L19 10l-5.3 1.7L12 17l-1.7-5.3L5 10l5.3-1.7z" />
        <path d="m19 15 .9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9z" />
      </>
    ),
    arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
    pin: (
      <>
        <path d="M20 10c0 5-8 11-8 11S4 15 4 10a8 8 0 1 1 16 0Z" />
        <circle cx="12" cy="10" r="2.5" />
      </>
    ),
    phone: (
      <path d="M7 3h3l1.5 4-2 1.5a14 14 0 0 0 6 6l1.5-2 4 1.5v3c0 1.1-.9 2-2 2C10.7 19 5 13.3 5 6c0-1.7.6-3 2-3Z" />
    ),
    mail: (
      <>
        <rect x="3" y="5" width="18" height="14" rx="2" />
        <path d="m4 7 8 6 8-6" />
      </>
    ),
  }

  return (
    <svg
      aria-hidden="true"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {paths[name]}
    </svg>
  )
}

function SectionHeading({ eyebrow, title, description, light = false }) {
  return (
    <div className={`section-heading${light ? ' section-heading-light' : ''}`}>
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  )
}

function ContactForm() {
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)
  const [submittedName, setSubmittedName] = useState('')

  function handleChange(event) {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    setErrors((current) => ({ ...current, [name]: '' }))
    setSubmitted(false)
    setSubmittedName('')
  }

  function handleSubmit(event) {
    event.preventDefault()
    const nextErrors = {}

    if (!values.name.trim()) nextErrors.name = 'Please enter your name.'
    if (!values.email.trim()) {
      nextErrors.email = 'Please enter your email address.'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
      nextErrors.email = 'Enter a valid email address.'
    }
    if (!values.message.trim()) {
      nextErrors.message = 'Please write a message.'
    }

    setErrors(nextErrors)
    setSubmitted(false)
    if (Object.keys(nextErrors).length === 0) {
      setSubmittedName(values.name.trim())
      setSubmitted(true)
      setValues({ name: '', email: '', message: '' })
    }
  }

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label className="form-field">
          <span>Full name</span>
          <input
            autoComplete="name"
            name="name"
            value={values.name}
            onChange={handleChange}
            placeholder="Your name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <span className="field-error" id="name-error" role="alert">
              {errors.name}
            </span>
          )}
        </label>
        <label className="form-field">
          <span>Email address</span>
          <input
            autoComplete="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            placeholder="you@example.com"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <span className="field-error" id="email-error" role="alert">
              {errors.email}
            </span>
          )}
        </label>
      </div>
      <label className="form-field">
        <span>Your message</span>
        <textarea
          name="message"
          value={values.message}
          onChange={handleChange}
          placeholder="How can we help?"
          rows="4"
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'message-error' : undefined}
        />
        {errors.message && (
          <span className="field-error" id="message-error" role="alert">
            {errors.message}
          </span>
        )}
      </label>
      <div className="form-actions">
        <button className="button button-primary" type="submit">
          Send a message <Icon name="arrow" size={18} />
        </button>
        {submitted && (
          <p className="success-message" role="status">
            Thanks, {submittedName}. Your form is complete. For a direct reply, call us on +250 7888 42 936.
          </p>
        )}
      </div>
    </form>
  )
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [bookQuery, setBookQuery] = useState('')
  const [bookCategory, setBookCategory] = useState('ALL')
  const visibleBooks = books.filter((book) => {
    const matchesCategory =
      bookCategory === 'ALL' || book.category === bookCategory
    const searchText =
      `${book.title} ${book.author} ${book.description}`.toLowerCase()
    return matchesCategory && searchText.includes(bookQuery.trim().toLowerCase())
  })

  return (
    <>
      <header className="site-header" id="home">
        <div className="topline">
          <a className="brand" href="#home" aria-label="Bright Future Library home">
            <span className="brand-mark"><Icon name="book" size={22} /></span>
            <span className="brand-name">Bright Future <i>Library</i></span>
          </a>
          <button
            className="menu-toggle"
            type="button"
            aria-label={menuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={menuOpen}
            aria-controls="main-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
          <nav
            className={`main-navigation${menuOpen ? ' navigation-open' : ''}`}
            id="main-navigation"
            aria-label="Main navigation"
          >
            {navLinks.map(([label, href]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </a>
            ))}
          </nav>
          <a className="header-visit" href="#contact">
            Plan a visit <Icon name="arrow" size={17} />
          </a>
        </div>
      </header>

      <main>
        <section className="hero-section" aria-labelledby="hero-title">
          <div className="hero-copy">
            <span className="eyebrow"><span className="eyebrow-dot" /> YOUR COMMUNITY, YOUR LIBRARY</span>
            <h1 id="hero-title">A little more<br />room to <em>grow.</em></h1>
            <p className="hero-description">
              A good book can take you anywhere. Find your next chapter, learn
              something new, and feel at home at Bright Future Library.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="#services">
                Explore the library <Icon name="arrow" size={18} />
              </a>
              <a className="text-link" href="#about">Get to know us <span>↗</span></a>
            </div>
            <div className="hero-footnote">
              <span className="avatar-stack" aria-hidden="true">
                <span>J</span><span>M</span><span>A</span>
              </span>
              <span>A place for every reader, every day.</span>
            </div>
          </div>
          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?auto=format&fit=crop&w=1200&q=85"
              alt="Sunlight falling across the shelves of a welcoming library"
            />
            <div className="image-caption">
              <span className="caption-mark">✳</span>
              <span><strong>Come as you are.</strong><br />There’s a place for you here.</span>
            </div>
            <span className="hero-image-label">OPEN BOOKS. OPEN POSSIBILITIES.</span>
          </div>
          <a className="scroll-cue" href="#about" aria-label="Scroll to about the library">
            <span>SCROLL TO EXPLORE</span><span className="scroll-line" />
          </a>
        </section>

        <section className="intro-section section-wrap" id="about">
          <div className="intro-label">
            <span className="eyebrow">A BRIGHTER KIND OF NEIGHBORHOOD</span>
            <span className="intro-index">01 / ABOUT US</span>
          </div>
          <div className="intro-content">
            <h2>A place to feel curious,<br />connected, and <em>at home.</em></h2>
            <div className="intro-bottom">
              <p>
                We believe everyone deserves the chance to learn, imagine, and
                belong. Bright Future Library brings books, helpful resources,
                and neighbors together—one shared story at a time.
              </p>
              <a href="#contact" className="round-link" aria-label="Contact Bright Future Library">
                <Icon name="arrow" size={21} />
              </a>
            </div>
          </div>
        </section>

        <section className="services-section section-wrap" id="services">
          <SectionHeading
            eyebrow="MORE THAN BOOKS"
            title="A little something for everyone."
            description="Good things happen when a community has the space and support to grow."
          />
          <div className="service-grid">
            {services.map((service) => (
              <article className="service-card" key={service.number}>
                <div className="service-card-top">
                  <span className="service-icon"><Icon name={service.icon} /></span>
                  <span className="service-number">{service.number}</span>
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <span className="card-arrow" aria-hidden="true"><Icon name="arrow" size={18} /></span>
              </article>
            ))}
          </div>
          <div className="service-note">
            <span className="note-star">✳</span>
            <p><strong>Not sure where to start?</strong> Our friendly team is always happy to help you find your way.</p>
            <a href="#contact">Say hello <span>↗</span></a>
          </div>
        </section>

        <section className="events-section" id="events">
          <div className="events-inner section-wrap">
            <div className="events-header">
              <SectionHeading
                eyebrow="PUT IT ON YOUR CALENDAR"
                title="Good things are happening."
                description="Make a little time for stories, new ideas, and good company."
                light
              />
              <span className="events-stamp" aria-hidden="true">SAVE<br />YOUR<br />SEAT <b>✳</b></span>
            </div>
            <div className="event-list">
              {events.map((event) => (
                <article className="event-card" key={event.title}>
                  <div className="event-date">
                    <span>{event.month}</span>
                    <strong>{event.day}</strong>
                  </div>
                  <div className="event-detail">
                    <span className="event-type">{event.type}</span>
                    <h3>{event.title}</h3>
                    <p>{event.description}</p>
                  </div>
                  <div className="event-time">{event.time}</div>
                  <a className="event-arrow" href="#contact" aria-label={`Ask about ${event.title}`}>
                    <Icon name="arrow" size={19} />
                  </a>
                </article>
              ))}
            </div>
            <p className="events-footnote">All events are free and open to the community. We’d love to see you there.</p>
          </div>
        </section>

        <section className="books-section section-wrap" id="books">
          <div className="books-heading">
            <SectionHeading
              eyebrow="ON OUR SHELVES RIGHT NOW"
              title="Stories worth sharing."
              description="A few hand-picked reads from our library team. Your next favorite might be here."
            />
            <a href="#contact" className="text-link books-link">Ask for a recommendation <span>↗</span></a>
          </div>
          <div className="book-tools">
            <label className="book-search">
              <span className="visually-hidden">Search featured books</span>
              <input
                type="search"
                value={bookQuery}
                onChange={(event) => setBookQuery(event.target.value)}
                placeholder="Search by title, author, or topic"
              />
            </label>
            <div className="book-filters" role="group" aria-label="Filter books by category">
              {bookCategories.map((category) => (
                <button
                  className={bookCategory === category ? 'book-filter-active' : ''}
                  key={category}
                  type="button"
                  aria-pressed={bookCategory === category}
                  onClick={() => setBookCategory(category)}
                >
                  {category === 'ALL' ? 'All books' : category}
                </button>
              ))}
            </div>
          </div>
          <p className="book-result-count" aria-live="polite">
            {visibleBooks.length} {visibleBooks.length === 1 ? 'book' : 'books'} to explore
          </p>
          <div className="book-grid">
            {visibleBooks.map((book) => (
              <article className="book-card" key={book.title}>
                <div className={`book-cover ${book.cover}`}>
                  <span className="book-cover-top">{book.category}</span>
                  <span className="book-initials">{book.initials}</span>
                  <span className="book-cover-title">{book.title}</span>
                  <span className="book-cover-author">{book.author}</span>
                  <span className="book-cover-seal">BF<br />LIBRARY</span>
                </div>
                <div className="book-info">
                  <span>{book.category}</span>
                  <h3>{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <p>{book.description}</p>
                </div>
              </article>
            ))}
            {visibleBooks.length === 0 && (
              <p className="book-empty">No books match that search. Try another title or category.</p>
            )}
          </div>
        </section>

        <section className="faq-section section-wrap" id="faq">
          <SectionHeading
            eyebrow="A FEW HELPFUL ANSWERS"
            title="Good to know."
            description="Quick answers to help you plan your library visit."
          />
          <div className="faq-list">
            <details>
              <summary>What can I do at Bright Future Library?</summary>
              <p>Browse books, use internet and computer access, find a study space, and take part in educational workshops and literacy programs.</p>
            </details>
            <details>
              <summary>Where is the library located?</summary>
              <p>We are in Gasabo District, Kigali, Rwanda. Call us at +250 7888 42 936 for directions before you visit.</p>
            </details>
            <details>
              <summary>How can I ask about events or borrowing books?</summary>
              <p>Call us at +250 7888 42 936 and our team will help you find the information you need.</p>
            </details>
          </div>
        </section>

        <section className="contact-section" id="contact">
          <div className="contact-inner section-wrap">
            <div className="contact-copy">
              <span className="eyebrow">WE’RE JUST AROUND THE CORNER</span>
              <h2>Come in.<br /><em>Say hello.</em></h2>
              <p>Questions, ideas, or just want to know what’s on? We’re in Gasabo, Kigali, and would love to hear from you.</p>
              <div className="contact-details">
                {contactDetails.map((detail) => (
                  <a
                    key={detail.label}
                    href={detail.href}
                    target={detail.external ? '_blank' : undefined}
                    rel={detail.external ? 'noreferrer' : undefined}
                  >
                    <span className="contact-icon"><Icon name={detail.icon} size={19} /></span>
                    <span><small>{detail.label}</small>{detail.value}</span>
                  </a>
                ))}
              </div>
              <p className="hours-note"><strong>Visit us in Kigali</strong><br />Contact us by phone for directions and current opening hours.</p>
            </div>
            <div className="contact-form-wrap">
              <span className="form-kicker">WE’RE LISTENING <span>✳</span></span>
              <h3>Send us a little note.</h3>
              <p>We’ll be happy to point you in the right direction. For a direct reply, please call us.</p>
              <ContactForm />
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <a className="brand footer-brand" href="#home">
          <span className="brand-mark"><Icon name="book" size={20} /></span>
          <span className="brand-name">Bright Future <i>Library</i></span>
        </a>
        <p>A place for every reader, every day.</p>
        <a className="back-to-top" href="#home">BACK TO TOP ↑</a>
        <span className="copyright">© 2026 Bright Future Library</span>
      </footer>
    </>
  )
}

export default App
