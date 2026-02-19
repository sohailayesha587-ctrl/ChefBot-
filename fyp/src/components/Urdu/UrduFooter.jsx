import React from 'react';
import { Link } from 'react-router-dom';
import './UrduFooter.css'; // Same CSS use karenge, ya nayi file banaye prefix ke saath

function UrduFooter() {
  const currentPath = window.location.pathname;
  console.log("🟢 URDU FOOTER DEBUG: Current Path =", currentPath);

  // PAGES WHERE NO FOOTER SHOULD SHOW
  const noFooterPages = ['/login', '/login-page', '/urdu-login','/Alarm', '/alarm'];
  
  if (noFooterPages.includes(currentPath)) {
    console.log("🟡 URDU FOOTER: Hiding footer for", currentPath);
    return null;
  }

  // SIGNUP PAGE - SIMPLE FOOTER
  if (currentPath === '/signup') {
    console.log("🟡 URDU FOOTER: Showing simple footer for signup");
    return (
      <footer className="urdu-simple-footer">
        <div className="urdu-simple-footer-content">
          <p>© 2025 ChefBot | تمام حقوق محفوظ ہیں</p>
          <p>مدد چاہیے؟ رابطہ کریں: support@chefbot.com</p>
          <div className="urdu-simple-footer-links">
            <a href="/terms">شرائط</a> | 
            <a href="/privacy">رازداری</a> | 
            <a href="/contact">رابطہ</a>
          </div>
        </div>
      </footer>
    );
  }

  // ALL OTHER PAGES - FULL FOOTER
  console.log("🟢 URDU FOOTER: Showing full footer for", currentPath);
  
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("ChefBot میں شامل ہونے کے لیے شکریہ!");
  };

  return (
    <footer className="urdu-chefbot-footer">
      <div className="urdu-footer-gallery">
        <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836" alt="کھانا 1" />
        <img src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0" alt="کھانا 2" />
        <img src="https://images.unsplash.com/photo-1521305916504-4a1121188589" alt="کھانا 3" />
        <img src="https://images.unsplash.com/photo-1600891964599-f61ba0e24092" alt="کھانا 4" />
        <img src="https://images.unsplash.com/photo-1504754524776-8f4f37790ca0" alt="کھانا 5" />
      </div>

      <div className="urdu-footer-cta">
        <h2>آئیے مل کر کچھ مزیدار پکائیں۔</h2>
        <form onSubmit={handleSubmit}>
          <input type="email" id="urdu-search-footer" placeholder="اپنا ای میل درج کریں" required />
          <button type="submit">اب شامل ہوں</button>
        </form>
      </div>

      <div className="urdu-footer-main">
        <div className="urdu-footer-column">
          <h3>ChefBot</h3>
          <p>آپ کا AI کچن پارٹنر جو ترکیبیں تجویز کرتا ہے، کھانے کی منصوبہ بندی میں مدد دیتا ہے اور پکانے کو مزیدار اور آسان بناتا ہے۔</p>
        </div>

        <div className="urdu-footer-column">
          <h4>فوری روابط</h4>
          <ul>
            <li><Link to="/urdu-home">ہوم</Link></li>
            <li><Link to="/urdu-recipes">ترکیبیں</Link></li>
            <li><Link to="/urdu-meal-planning">کھانے کی منصوبہ بندی</Link></li>
            <li><Link to="/urdu-guidance">رہنمائی</Link></li>
            <li><Link to="/urdu-about">ہمارے بارے میں</Link></li>
          </ul>
        </div>

        <div className="urdu-footer-column">
          <h4>رابطہ میں رہیں</h4>
          <ul>
            <li><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a></li>
            <li><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a></li>
            <li><a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a></li>
          </ul>
        </div>
      </div>

      <div className="urdu-footer-bottom">
        <p>© 2026 ChefBot۔ تمام حقوق محفوظ ہیں۔</p>
      </div>
    </footer>
  );
}

export default UrduFooter;
