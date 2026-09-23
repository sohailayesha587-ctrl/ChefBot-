import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FaTimes, FaLightbulb, FaExclamationTriangle, FaUtensils, FaDotCircle, FaArrowLeft } from 'react-icons/fa';
import './CuttingTechniquesPage.css';

const parseContent = (content) => {
  if (!content) return {};
  if (typeof content === 'object') return content;
  try {
    return JSON.parse(content);
  } catch {
    return { fullDesc: content, tagline: content };
  }
};

const CuttingTechniquesPage = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [cuttingTechniques, setCuttingTechniques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCuttingTechniques = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get('/api/beginners-guides?category=cutting-techniques');
        const guides = response.data.guides || [];

        setCuttingTechniques(guides);
        if (guides.length === 0) setError('No cutting techniques found in database.');
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data from server.');
      } finally {
        setLoading(false);
      }
    };

    fetchCuttingTechniques();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleTechniqueSelect = (technique) => {
    setSelectedTechnique(technique);
    setSidebarOpen(false);
  };

  const closeDetailPanel = () => setSelectedTechnique(null);
  const openLightbox = (url) => setLightboxImage(url);
  const closeLightbox = () => setLightboxImage(null);

  if (loading) {
    return (
      <div className="ctp-container">
        <div className="loading-spinner">Loading...</div>
      </div>
    );
  }

  if (error && cuttingTechniques.length === 0) {
    return (
      <div className="ctp-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ctp-container">
      <div className="ctp-mobile-topbar">
        <h1 className="ctp-page-title">Cutting Techniques</h1>
      </div>

      <div
        className={`ctp-sidebar-overlay${sidebarOpen ? ' visible' : ''}`}
        onClick={() => setSidebarOpen(false)}
      />

      <div className="ctp-layout">
        <aside className={`ctp-sidebar${sidebarOpen ? ' open' : ''}`}>
          <div className="ctp-sidebar-header">
            <h2 className="ctp-sidebar-title">Cutting Techniques</h2>
            <p className="ctp-sidebar-subtitle">Essential Knife Skills</p>
          </div>
          <ul className="ctp-techniques-list">
            {cuttingTechniques.map(technique => (
              <li
                key={technique._id}
                className={`ctp-technique-list-item${selectedTechnique?._id === technique._id ? ' ctp-active' : ''}`}
                onClick={() => handleTechniqueSelect(technique)}
              >
                <span className="ctp-technique-list-name">{technique.title}</span>
              </li>
            ))}
          </ul>
        </aside>

        <main className="ctp-main">
          <header className="ctp-main-header">
            <div className="ctp-header-content">
              <h1 className="ctp-page-title desktop-title">Essential Cutting Techniques</h1>
              <p className="ctp-page-description">
                Master professional knife skills with these fundamental cutting techniques used in kitchens worldwide.
              </p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          <div className="ctp-techniques-grid-section">
            <div className="ctp-techniques-grid">
              {cuttingTechniques.map(technique => {
                const content = parseContent(technique.content);
                return (
                  <div
                    key={technique._id}
                    className="ctp-technique-card"
                    onClick={() => handleTechniqueSelect(technique)}
                  >
                    <div
                      className="ctp-card-image"
                      style={{ backgroundImage: `url(${technique.image || '/api/placeholder/120/120'})` }}
                    />
                    <div className="ctp-card-content">
                      <h3 className="ctp-card-title">{technique.title}</h3>
                      <p className="ctp-card-description">{content.tagline || technique.title}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="ctp-back-section">
            <button className="ctp-back-button" onClick={() => navigate('/guidance')}>
              <FaArrowLeft />
              <span>Back to Guidance Page</span>
            </button>
          </div>
        </main>
      </div>

      {selectedTechnique && (
        <DetailModal
          technique={selectedTechnique}
          onClose={closeDetailPanel}
          onImageClick={openLightbox}
        />
      )}

      {lightboxImage && (
        <div className="ctp-lightbox-overlay" onClick={closeLightbox}>
          <button className="ctp-lightbox-close" onClick={closeLightbox}>
            <FaTimes />
          </button>
          <img
            className="ctp-lightbox-image"
            src={lightboxImage}
            alt="Full view"
            onClick={e => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
};

const DetailModal = ({ technique, onClose, onImageClick }) => {
  const content = parseContent(technique.content);
  const image = technique.image || '/api/placeholder/400/400';
  const tipIcons = [<FaLightbulb />, <FaLightbulb />, <FaExclamationTriangle />];

  return (
    <div className="ctp-modal-overlay" onClick={onClose}>
      <div className="ctp-modal" onClick={e => e.stopPropagation()}>
        <button className="ctp-modal-close" onClick={onClose}>
          <FaTimes />
        </button>

        <div className="ctp-modal-hero">
          <p className="ctp-modal-hero-label">Cutting Technique</p>
          <h2 className="ctp-modal-hero-title">{technique.title}</h2>
          <p className="ctp-modal-hero-subtitle">{content.tagline || technique.title}</p>
        </div>

        <div className="ctp-modal-inner">
          <div className="ctp-modal-left">
            <div className="ctp-about-row">
              <div className="ctp-about-text">
                <div className="ctp-msec">
                  <span className="ctp-msec-label">About this technique</span>
                  <p className="ctp-msec-text">{content.fullDesc || content.tagline || technique.title}</p>
                </div>
              </div>
              <div
                className="ctp-about-thumb"
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => onImageClick(image)}
              />
            </div>

            <hr className="ctp-mdivider" />

            {content.keyUses?.length > 0 && (
              <>
                <div className="ctp-uses-section">
                  <span className="ctp-msec-label">Common uses</span>
                  <div className="ctp-uses-wrap">
                    {content.keyUses.map((use, idx) => (
                      <div key={idx} className="ctp-use-tag">
                        <span className="ctp-use-dot"><FaDotCircle /></span>
                        {use}
                      </div>
                    ))}
                  </div>
                </div>
                <hr className="ctp-mdivider" />
              </>
            )}

            <div className="ctp-modal-two-col">
              {content.steps?.length > 0 && (
                <div className="ctp-msec">
                  <span className="ctp-msec-label">How to do it</span>
                  <div className="ctp-steps-list">
                    {content.steps.map((step, idx) => (
                      <div key={idx} className="ctp-step-card">
                        <span className="ctp-step-num">{idx + 1}</span>
                        <span className="ctp-step-txt">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {content.tips?.length > 0 && (
                <div className="ctp-msec">
                  <span className="ctp-msec-label">Pro tips</span>
                  <div className="ctp-tips-list">
                    {content.tips.map((tip, idx) => (
                      <div key={idx} className="ctp-tip-card">
                        <span className="ctp-tip-icon">{tipIcons[idx % tipIcons.length]}</span>
                        <span className="ctp-tip-txt">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="ctp-modal-right">
            <div
              className="ctp-modal-right-image"
              style={{ backgroundImage: `url(${image})` }}
              onClick={() => onImageClick(image)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CuttingTechniquesPage;