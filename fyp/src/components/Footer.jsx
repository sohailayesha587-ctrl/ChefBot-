import React from 'react';
import { Link } from 'react-router-dom';
import './Footer.css';

function Footer() {
  const currentPath = window.location.pathname;
  const hideFooter = [
    '/login-page',
    '/signup',
    '/forgot-password',
    '/verify-otp',
    '/reset-password',
    '/Alarm',
    '/alarm'
  ];

  if (hideFooter.includes(currentPath)) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer-images">
        <img src="footer1.jpg" alt="footer" />
        <img src="footer2.jpg" alt="footer" />
        <img src="footer3.jpg" alt="footer" />
        <img src="footer4.jpg" alt="footer" />
        <img src="footer5.jpg" alt="footer" />
      </div>

      <div className="footer-heading">
        <h2>Let's cook something amazing together.</h2>
      </div>

      <div className="footer-main">
        <div className="footer-content">
          <h3>ChefBot</h3>
          <p>
            Your kitchen partner that suggests recipes, helps plan meals,
            and makes cooking stress-free and fun.
          </p>
        </div>

        <div className="footer-content">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/meal-suggestion">Meal Suggestions</Link></li>
            <li><Link to="/smart-shopping">Shopping List</Link></li>

            <li><Link to="/smart-pantry">Pantry items</Link></li>
            <li><Link to="/meal-planning">Meal Planner</Link></li>
            <li><Link to="/guidance">Guidance</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>

          </ul>
        </div>


      </div>

      <div className="footer-bottom">
        <p>&copy; 2026 ChefBot. All rights reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;