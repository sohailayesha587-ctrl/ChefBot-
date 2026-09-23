
import { useState } from 'react'
import './ContactPage.css'

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [status, setStatus] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      setStatus('error')
      setTimeout(() => setStatus(''), 3000)
      return
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.message)
      }

      setStatus('success')

      setFormData({
        name: '',
        email: '',
        message: ''
      })

      setTimeout(() => setStatus(''), 3000)
    } catch (error) {
      console.error(error)
      setStatus('send-error')
      setTimeout(() => setStatus(''), 3000)
    }
  }

  return (
    <div className="contact-page">

      <section className="contact-hero">
        <div className="hero-content">
          <h1>Contact Us</h1>
          <p>Get in touch with us. We'd love to hear from you.</p>
        </div>
      </section>

      <section className="contact-main">
        <div className="contact-container">

          <div className="contact-left">
            <h2>We'd Love to Help!</h2>
            <p>Have questions about ChefBot? Need support?</p>

            <div className="contact-info">

              <div className="info-box">
                <h3>Address</h3>
                <p>
                  Faculty of IT, Govt. Graduate College for Women
                  <br />
                  Satellite Town, Gujranwala, Punjab
                </p>
              </div>

              <div className="info-box">
                <h3>Email</h3>
                <p>
                  <a href="mailto:support@chefbot.pk">
                    support@chefbot.pk
                  </a>
                  <br />
                  <a href="mailto:info@chefbot.pk">
                    info@chefbot.pk
                  </a>
                </p>
              </div>

            </div>
          </div>

          <div className="contact-right">
            <div className="form-box">

              {status === 'success' && (
                <div className="alert success">
                  ✓ Message sent successfully!
                </div>
              )}

              {status === 'error' && (
                <div className="alert error">
                  ✗ Please fill in all fields.
                </div>
              )}

              {status === 'send-error' && (
                <div className="alert error">
                  ✗ Failed to send message. Please try again.
                </div>
              )}

              <form onSubmit={handleSubmit}>

                <div className="form-group">
                  <label>Name *</label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                  />
                </div>

                <div className="form-group">
                  <label>Email *</label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="form-group">
                  <label>Message *</label>

                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us more..."
                    rows="4"
                  />
                </div>

                <button
                  type="submit"
                  className="submit-btn"
                >
                  Send Message
                </button>

              </form>

            </div>
          </div>

        </div>
      </section>

    </div>
  )
}