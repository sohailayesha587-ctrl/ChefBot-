import { useNavigate } from 'react-router-dom'
import './AboutPage.css'

export default function AboutPage() {
  const navigate = useNavigate()

  return (
    <div className="about-page-container">
      {/* Hero Section */}
      <section className="about-hero-section">
        <div className="about-hero-content">
          <h1 className="about-hero-title">About Us</h1>
          <p className="about-hero-description">ChefBot Your Personal Kitchen Assistant</p>
        </div>
      </section>

      {/* What is ChefBot + Mission - Combined Row */}
      <section className="about-content-section about-combined-section">
        <div className="about-section-container">
          <div className="about-two-col-grid">
            {/* What is ChefBot */}
            <div className="about-info-card">
              <div className="about-info-card-inner">
                <div className="about-info-text">
                  <h2>What is ChefBot?</h2>
                  <p>ChefBot is your personal kitchen assistant designed to make everyday cooking easier, safer, and more organized — whether you're a beginner or experienced cook.</p>
                  <p>It tracks your pantry, suggests meals from available ingredients, explains cooking steps clearly, and guides appliance safety.</p>
                </div>
                <div className="about-info-image">
                  <img src="https://images.unsplash.com/photo-1495521821757-a1efb6729352?w=400&h=250&fit=crop" alt="Cooking" className="about-section-image" />
                </div>
              </div>
            </div>

            {/* Our Mission */}
            <div className="about-info-card-alt">
              <h2>Our Mission</h2>
              <p>To empower every home cook with intelligent kitchen tools that simplify routines, reduce food wastage, and build confidence.</p>
              <div className="about-mission-highlights">
                <div className="about-highlight"><span className="about-highlight-icon">✓</span><span>Simplify cooking routines</span></div>
                <div className="about-highlight"><span className="about-highlight-icon">✓</span><span>Reduce food wastage</span></div>
                <div className="about-highlight"><span className="about-highlight-icon">✓</span><span>Build confidence in kitchen</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features + Benefits - Side by Side */}
      <section className="about-content-section alt-bg">
        <div className="about-section-container">
          <div className="about-two-col-grid">
            {/* Why Choose ChefBot */}
            <div>
              <h2 className="about-section-title">Why Choose ChefBot?</h2>
              <div className="about-features-grid">
                {[
                  { title: "Pantry Management", desc: "Track grocery items digitally" },
                  { title: "Smart Meal Suggestions", desc: "Recommendations from your pantry" },
                  { title: "Meal Planning", desc: "Plan daily or weekly meals" },
                  { title: "Step-by-Step Guidance", desc: "Clear cooking instructions" },
                  { title: "Kitchen Safety Tips", desc: "Safe appliance usage guide" },
                  { title: "Smart Alarms", desc: "Cooking timers & reminders" },
                  { title: "Voice & Text", desc: "Hands-free interaction" },
                  { title: "Shopping List", desc: "Digital shopping management" },
                ].map((f, i) => (
                  <div className="about-feature-card" key={i}>
                    <h3>{f.title}</h3>
                    <p>{f.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Key Benefits */}
            <div>
              <h2 className="about-section-title">Key Benefits</h2>
              <div className="about-benefits-grid">
                {[
                  { num: "01", title: "Save Time", desc: "Instant meal suggestions from your pantry." },
                  { num: "02", title: "Reduce Waste", desc: "Use ingredients you already have." },
                  { num: "03", title: "Learn Safely", desc: "Guidance for beginners on tools & methods." },
                  { num: "04", title: "Stay Organized", desc: "Pantry, lists & plans in one place." },
                ].map((b, i) => (
                  <div className="about-benefit-card" key={i}>
                    <div className="about-benefit-number">{b.num}</div>
                    <h3>{b.title}</h3>
                    <p>{b.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="about-content-section about-how-it-works">
        <div className="about-section-container">
          <h2 className="about-section-title">How It Works</h2>
          <div className="about-steps-grid">
            {[
              { num: 1, title: "Create Account", desc: "Sign up with email & password" },
              { num: 2, title: "Add Pantry", desc: "List your ingredients" },
              { num: 3, title: "Get Suggestions", desc: "Receive meal recommendations" },
              { num: 4, title: "Cook & Enjoy", desc: "Follow guidance confidently" },
            ].map((s, i) => (
              <div className="about-step-card" key={i}>
                <div className="about-step-circle">{s.num}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}