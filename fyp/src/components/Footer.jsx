import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  // ✅ PAKKA CHECK KARNE KE LIYE
  const currentPath = window.location.pathname;
  console.log("Footer checking path:", currentPath); // Debug ke liye

  // 1. LOGIN PAGE - NO FOOTER AT ALL
  if (currentPath === '/login' || currentPath === '/login-page') {
    return null;
  }

  // 2. SIGNUP PAGE - SIMPLE FOOTER (TEXT ONLY)
  if (currentPath === '/signup') {
    console.log("Showing SIMPLE footer for signup");
    return (
      <footer className="simple-footer">
        <div className="simple-footer-content">
          <p>© 2025 ChefBot | All rights reserved</p>
          <p>Need help? Contact us at: support@chefbot.com</p>
          <div className="simple-footer-links">
            <a href="/terms">Terms</a> | 
            <a href="/privacy">Privacy</a> | 
            <a href="/contact">Contact</a>
          </div>
        </div>
      </footer>
    );
  }

  // 3. ALL OTHER PAGES - FULL FOOTER WITH IMAGES
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Thank you for joining ChefBot!");
  };

  return (
    <footer className="chefbot-footer">
      {/* Top Image Strip */}
      <div className="footer-gallery">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="Food 1" />
        <img src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0" alt="Food 2" />
        <img src="https://images.unsplash.com/photo-1521305916504-4a1121188589" alt="Food 3" />
        <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" alt="Food 4" />
        <img src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0" alt="Food 5" />
      </div>

      {/* Middle CTA Section */}
      <div className="footer-cta">
        <h2>Let’s cook something amazing together.</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" id="search-footer" placeholder="Enter your email" required />
          <button type="submit">Join Now</button>
        </form>
      </div>

      {/* Bottom 3-Section Footer */}
      <div className="footer-main">
        <div className="footer-column">
          <h3>ChefBot</h3>
          <p>Your AI kitchen partner that suggests recipes, helps plan meals, and makes cooking stress-free and fun.</p>
        </div>

        <div className="footer-column">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/recipes">Recipes</Link></li>
            <li><Link to="/meal-planning">Meal Planner</Link></li>
            <li><Link to="/guidance">Guidance</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4>Stay Connected</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>© 2026 ChefBot. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;