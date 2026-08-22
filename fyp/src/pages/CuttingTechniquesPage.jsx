import React, { useState, useEffect } from 'react';
import './CuttingTechniquesPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CuttingTechniquesPage = () => {
  const [selectedTechnique, setSelectedTechnique] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [cuttingTechniques, setCuttingTechniques] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
      const response = await axios.get('/api/beginners-guides', {
        params: { category: 'cutting-techniques' }
      });
      console.log('API Response:', response.data);
      
      const guides = response.data.guides || [];
      console.log('Guides:', guides);
      
      if (guides.length === 0) {
        setError('No cutting techniques found');
        setCuttingTechniques([]);
        setLoading(false);
        return;
      }

      const techniques = guides.map((guide) => {
        let content = {};
        
        if (guide.content && typeof guide.content === 'string') {
          try {
            content = JSON.parse(guide.content);
            console.log('Parsed content for', guide.title, ':', content);
          } catch (e) {
            console.error('Parse error:', e);
            content = { 
              fullDesc: guide.content,
              keyUses: [],
              steps: [],
              tips: []
            };
          }
        } else if (guide.content && typeof guide.content === 'object') {
          content = guide.content;
        }

        return {
          id: guide._id || guide.id,
          name: content.name || guide.title || 'Untitled',
          tagline: content.tagline || '',
          fullDesc: content.fullDesc || 'No description available',
          keyUses: Array.isArray(content.keyUses) ? content.keyUses : ['General use'],
          previewImg: guide.image || content.previewImg || 'default.png',
          knife: content.knife || "Chef's knife",
          tips: Array.isArray(content.tips) ? content.tips : ['Practice makes perfect'],
          steps: Array.isArray(content.steps) ? content.steps : ['Prepare your ingredients']
        };
      });

      console.log('Final techniques:', techniques);
      setCuttingTechniques(techniques);
    } catch (err) {
      console.error('API Error:', err);
      setError('Failed to load data from server.');
      setCuttingTechniques([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTechniqueSelect = (technique) => {
    console.log('Selected:', technique);
    setSelectedTechnique(technique);
    setShowDetailPanel(true);
    setSidebarOpen(false);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedTechnique(null);
  };

  const KnifeIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 3L18 16.5M15.5 14L19 17.5L20.5 16L17 12.5M9.5 9L12 11.5M3 21L9 15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <path d="M14.5 5.5L18.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  );

  const LightbulbIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.5 19.5H14.5M9.5 21.5H14.5M12 2.5C8.5 2.5 5.5 5.2 5.5 9C5.5 11.5 7 13.5 8.5 15C9.5 16 10 17 10 18H14C14 17 14.5 16 15.5 15C17 13.5 18.5 11.5 18.5 9C18.5 5.2 15.5 2.5 12 2.5Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const ScissorsIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M6 9C7.65685 9 9 7.65685 9 6C9 4.34315 7.65685 3 6 3C4.34315 3 3 4.34315 3 6C3 7.65685 4.34315 9 6 9Z" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M6 21C7.65685 21 9 19.6569 9 18C9 16.3431 7.65685 15 6 15C4.34315 15 3 16.3431 3 18C3 19.6569 4.34315 21 6 21Z" stroke="currentColor" strokeWidth="1.2"/>
      <path d="M8.5 7L20 18M8.5 17L20 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const SharpKnifeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M4.5 4L20 19.5M14.5 14L18.5 18L20 16.5L16 12.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M3 20.5L10 13.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const HandIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7 11.5V6.5C7 5.5 7.5 5 8.5 5C9.5 5 10 5.5 10 6.5V11M10 7.5V5C10 4 10.5 3.5 11.5 3.5C12.5 3.5 13 4 13 5V9.5M13 7.5V5C13 4 13.5 3.5 14.5 3.5C15.5 3.5 16 4 16 5V10M16 8.5V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M16 10.5C17 11.5 18 13 18 15C18 18.5 16 21 12 21C8 21 7 19 6.5 17C6 15 6 13 7 11.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  );

  const TargetIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.2"/>
      <circle cx="12" cy="12" r="1" fill="currentColor"/>
    </svg>
  );

  const tipIcons = [
    <LightbulbIcon />,
    <ScissorsIcon />,
    <SharpKnifeIcon />,
    <HandIcon />,
    <TargetIcon />,
    <LightbulbIcon />
  ];

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
          aria-label="Toggle menu"
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
                Master professional knife skills with these fundamental cutting techniques used in kitchens worldwide.
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
                      {selectedTechnique.keyUses && selectedTechnique.keyUses.length > 0 ? (
                        selectedTechnique.keyUses.map((use, idx) => (
                          <div key={idx} className="ctp-use-tag">
                            <span className="ctp-use-dot">•</span>
                            {use}
                          </div>
                        ))
                      ) : (
                        <div className="ctp-use-tag">
                          <span className="ctp-use-dot">•</span>
                          General use
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ctp-knife-section">
                    <span className="ctp-msec-label">Recommended Knife</span>
                    <div className="ctp-knife-badge">
                      <span className="ctp-knife-badge-icon"><KnifeIcon /></span>
                      <span className="ctp-knife-badge-value">{selectedTechnique.knife}</span>
                    </div>
                  </div>
                </div>

                <hr className="ctp-mdivider" />

                <div className="ctp-modal-two-col">
                  <div className="ctp-msec">
                    <span className="ctp-msec-label">How to do it</span>
                    <div className="ctp-steps-list">
                      {selectedTechnique.steps && selectedTechnique.steps.length > 0 ? (
                        selectedTechnique.steps.map((step, idx) => (
                          <div key={idx} className="ctp-step-card">
                            <span className="ctp-step-num">{idx + 1}</span>
                            <span className="ctp-step-txt">{step}</span>
                          </div>
                        ))
                      ) : (
                        <div className="ctp-step-card">
                          <span className="ctp-step-num">1</span>
                          <span className="ctp-step-txt">Prepare your ingredients</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="ctp-msec">
                    <span className="ctp-msec-label">Pro tips</span>
                    <div className="ctp-tips-list">
                      {selectedTechnique.tips && selectedTechnique.tips.length > 0 ? (
                        selectedTechnique.tips.map((tip, idx) => (
                          <div key={idx} className="ctp-tip-card">
                            <span className="ctp-tip-icon">{tipIcons[idx % tipIcons.length]}</span>
                            <span className="ctp-tip-txt">{tip}</span>
                          </div>
                        ))
                      ) : (
                        <div className="ctp-tip-card">
                          <span className="ctp-tip-icon"><LightbulbIcon /></span>
                          <span className="ctp-tip-txt">Practice makes perfect</span>
                        </div>
                      )}
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