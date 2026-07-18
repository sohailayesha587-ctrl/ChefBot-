import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CuttingTechniquesPage.css';

const CuttingTechniquesPage = () => {
  const navigate = useNavigate();
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [cuttingTechniques, setCuttingTechniques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const API_URL = 'http://localhost:5000/api/guides';

  useEffect(() => {
    fetchCuttingTechniques();
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) setSidebarOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const fetchCuttingTechniques = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(API_URL, {
        params: { category: 'cutting-techniques' }
      });
      
      const guides = response.data.guides || [];
      
      if (guides.length === 0) {
        setError('No cutting techniques found');
        setCuttingTechniques([]);
        setLoading(false);
        return;
      }

      const techniques = guides.map((guide, index) => {
        let content = {};
        
        if (typeof guide.content === 'string') {
          try {
            if (guide.content.trim().startsWith('{')) {
              content = JSON.parse(guide.content);
            } else {
              content = { fullDesc: guide.content };
            }
          } catch (e) {
            content = { fullDesc: guide.content };
          }
        } else if (typeof guide.content === 'object' && guide.content !== null) {
          content = guide.content;
        }

        return {
          id: guide._id || index + 1,
          name: guide.title,
          tagline: content.tagline || guide.title,
          fullDesc: content.fullDesc || content || `Learn about ${guide.title}`,
          keyUses: content.keyUses || ['General cutting'],
          previewImg: guide.image || `${guide.title.replace(/\s/g, '')}.png`,
          knife: content.knife || "Chef's knife",
          tips: content.tips || ['Practice regularly', 'Keep knife sharp'],
          steps: content.steps || ['Prepare ingredient', 'Make the cut']
        };
      });

      setCuttingTechniques(techniques);
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to load data');
      setCuttingTechniques([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTechniqueSelect = (technique) => {
    setSelectedTechnique(technique);
    setShowDetailPanel(true);
    setSidebarOpen(false);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedTechnique(null);
  };

  if (loading) {
    return (
      <div className="ctp-container">
        <div className="loading-spinner">Loading cutting techniques...</div>
      </div>
    );
  }

  if (error && cuttingTechniques.length === 0) {
    return (
      <div className="ctp-container">
        <div className="error-message">
          <p>{error}</p>
          <button onClick={fetchCuttingTechniques} className="retry-button">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="ctp-container">
      <div className="ctp-mobile-topbar">
        <button
          className={`ctp-hamburger ${sidebarOpen ? 'open' : ''}`}
          onClick={() => setSidebarOpen(prev => !prev)}
        >
          <span /><span /><span />
        </button>
        <h1 className="ctp-page-title">Essential Cutting Techniques</h1>
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
          <div className="ctp-sidebar-techniques">
            <ul className="ctp-techniques-list">
              {cuttingTechniques.map(technique => (
                <li
                  key={technique.id}
                  className={`ctp-technique-list-item${selectedTechnique?.id === technique.id ? ' ctp-active' : ''}`}
                  onClick={() => handleTechniqueSelect(technique)}
                >
                  <span className="ctp-technique-list-name">{technique.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        <main className="ctp-main">
          <header className="ctp-main-header">
            <div className="ctp-header-content">
              <h1 className="ctp-page-title desktop-title">Essential Cutting Techniques</h1>
              <p className="ctp-page-description">
                Master professional knife skills with these fundamental cutting techniques.
              </p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          <div className="ctp-techniques-grid-section">
            <div className="ctp-techniques-grid">
              {cuttingTechniques.map(technique => (
                <div
                  key={technique.id}
                  className="ctp-technique-card"
                  onClick={() => handleTechniqueSelect(technique)}
                >
                  <div className="ctp-card-image" style={{ backgroundImage: `url(${technique.previewImg})` }} />
                  <div className="ctp-card-content">
                    <h3 className="ctp-card-title">{technique.name}</h3>
                    <p className="ctp-card-description">{technique.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="ctp-back-section">
            <button
              className="ctp-back-button"
              onClick={() => navigate('/guidance')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Back to Guidance Page</span>
            </button>
          </div>
        </main>
      </div>

      {showDetailPanel && selectedTechnique && (
        <div className="ctp-modal-overlay" onClick={closeDetailPanel}>
          <div className="ctp-modal" onClick={e => e.stopPropagation()}>
            <button className="ctp-modal-close" onClick={closeDetailPanel}>×</button>

            <div className="ctp-modal-hero">
              <p className="ctp-modal-hero-label">Cutting Technique</p>
              <h2 className="ctp-modal-hero-title">{selectedTechnique.name}</h2>
              <p className="ctp-modal-hero-subtitle">{selectedTechnique.tagline}</p>
            </div>

            <div className="ctp-modal-inner">
              <div className="ctp-modal-left">
                <div className="ctp-msec">
                  <span className="ctp-msec-label">About this technique</span>
                  <p className="ctp-msec-text">{selectedTechnique.fullDesc}</p>
                </div>

                <hr className="ctp-mdivider" />

                <div className="ctp-uses-knife-row">
                  <div className="ctp-uses-section">
                    <span className="ctp-msec-label">Common uses</span>
                    <div className="ctp-uses-wrap">
                      {selectedTechnique.keyUses?.map((use, idx) => (
                        <div key={idx} className="ctp-use-tag">
                          <span className="ctp-use-dot">•</span>
                          {use}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ctp-knife-section">
                    <span className="ctp-msec-label">Recommended Knife</span>
                    <div className="ctp-knife-badge">
                      <span className="ctp-knife-badge-value">{selectedTechnique.knife}</span>
                    </div>
                  </div>
                </div>

                <hr className="ctp-mdivider" />

                <div className="ctp-modal-two-col">
                  <div className="ctp-msec">
                    <span className="ctp-msec-label">How to do it</span>
                    <div className="ctp-steps-list">
                      {selectedTechnique.steps?.map((step, idx) => (
                        <div key={idx} className="ctp-step-card">
                          <span className="ctp-step-num">{idx + 1}</span>
                          <span className="ctp-step-txt">{step}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="ctp-msec">
                    <span className="ctp-msec-label">Pro tips</span>
                    <div className="ctp-tips-list">
                      {selectedTechnique.tips?.map((tip, idx) => (
                        <div key={idx} className="ctp-tip-card">
                          <span className="ctp-tip-txt">{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              <div className="ctp-modal-right">
                <div
                  className="ctp-modal-right-image"
                  style={{ backgroundImage: `url(${selectedTechnique.previewImg})` }}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CuttingTechniquesPage;