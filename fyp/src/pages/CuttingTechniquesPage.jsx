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
  const navigate = useNavigate();

  useEffect(() => {
    fetchCuttingTechniques();
  }, []);

  const fetchCuttingTechniques = async () => {
  setLoading(true);
  setError(null);
  try {
    const response = await axios.get('http://localhost:5000/api/beginners-guide?category=cutting-techniques');
    const guides = response.data.guides || [];
    
    // Parse and transform database guides into cutting techniques format
    const techniques = guides.map((guide, index) => {
      let content = {};
      try {
        const trimmed = guide.content?.trim();
        if (trimmed?.startsWith('{')) {
          content = JSON.parse(trimmed);
        } else if (typeof guide.content === 'object' && guide.content !== null) {
          content = guide.content;
        } else {
          content = { fullDesc: guide.content, tagline: guide.title };
        }
      } catch (e) {
        content = { fullDesc: guide.content, tagline: guide.title };
      }

      return {
        id: index + 1,
        name: guide.title,
        tagline: content.tagline || guide.title,
        fullDesc: content.fullDesc || guide.content,
        keyUses: content.keyUses || ['General cutting'],
        previewImg: guide.image || `${guide.title.replace(/\s/g, '')}Cut.png`,
        knife: content.knife || 'Chef\'s knife',
        tips: content.tips || ['Keep fingers curled under', 'Use sharp knife', 'Practice regularly'],
        steps: content.steps || [
          'Prepare the ingredient',
          'Secure the cutting board',
          'Use proper grip',
          'Make the cut',
          'Check for uniformity'
        ]
      };
    });

    if (techniques.length === 0) {
      setCuttingTechniques(getDefaultTechniques());
    } else {
      setCuttingTechniques(techniques);
    }
  } catch (error) {
    console.error('Error fetching cutting techniques:', error);
    setCuttingTechniques(getDefaultTechniques());
    setError('Using offline data. Connect to internet for latest content.');
  } finally {
    setLoading(false);
  }
};

  const getDefaultTechniques = () => {
    return [
      {
        id: 1, name: "Julienne", tagline: "Matchstick-style thin strips",
        fullDesc: "Julienne produces thin, matchstick-sized strips (4mm × 4mm × 5-7cm).",
        keyUses: ["Stir-fries", "Salads", "Garnishes", "Asian dishes"],
        previewImg: "JulienneCut.png", knife: "Chef's knife or Santoku",
        tips: ["Keep fingers curled under", "Create planks first, then strips", "Maintain uniform thickness"],
        steps: ["Wash and peel vegetable", "Trim ends into 5-7cm segments", "Slice into 4mm thick planks", "Stack planks and slice into strips", "Keep cuts even"]
      },
      {
        id: 2, name: "Brunoise", tagline: "Fine 3mm cubes",
        fullDesc: "Brunoise is an extremely fine dice cut (3mm × 3mm × 3mm).",
        keyUses: ["Sauces", "Soups", "Garnishes", "Stuffings"],
        previewImg: "BrunoiseCut.png", knife: "Sharp Chef's knife",
        tips: ["Start with julienne cuts", "Use claw grip for safety", "Keep knife very sharp"],
        steps: ["Start with julienne-cut vegetables", "Gather strips into tight bundle", "Slice across at 3mm intervals", "Keep pieces uniform", "Use gentle rocking motion"]
      },
      {
        id: 3, name: "Chiffonade", tagline: "Fine ribbon cuts for leafy greens",
        fullDesc: "Chiffonade cuts leafy greens into thin, ribbon-like strips.",
        keyUses: ["Herb garnishes", "Salads", "Pasta dishes", "Garnishes"],
        previewImg: "ChiffonadeCut.png", knife: "Chef's knife",
        tips: ["Stack leaves neatly", "Roll tightly before cutting", "Use gentle sawing motion"],
        steps: ["Wash and dry leaves", "Stack 5-10 leaves", "Roll tightly into cigar shape", "Slice into thin ribbons (1-3mm)", "Separate ribbons gently"]
      },
      {
        id: 4, name: "Dice", tagline: "Uniform cube cuts",
        fullDesc: "Dicing produces uniform cube-shaped pieces (large 20mm, medium 12mm, small 6mm).",
        keyUses: ["Sautéing", "Soups", "Stews", "Salads"],
        previewImg: "DiceCut.png", knife: "Chef's knife",
        tips: ["Create planks then batons", "Maintain consistent pressure", "Use cutting board anchors"],
        steps: ["Trim and square off vegetable", "Slice into uniform planks", "Stack and cut into batons", "Line up and cut into cubes", "Adjust size as needed"]
      },
      {
        id: 5, name: "Slice", tagline: "Basic cross-sectional cuts",
        fullDesc: "Slicing cuts food into flat, broad pieces of varying thickness.",
        keyUses: ["Sandwiches", "Roasting", "Frying", "Presentation"],
        previewImg: "SliceCut.png", knife: "Chef's knife or Santoku",
        tips: ["Use rocking motion", "Keep slices even", "Anchor food with flat side down"],
        steps: ["Create flat surface with first cut", "Place flat side down", "Use claw grip", "Slice with smooth motion", "Keep slices consistent"]
      },
      {
        id: 6, name: "Mince", tagline: "Finely chopped pieces",
        fullDesc: "Mincing creates very small, irregular pieces smaller than a dice.",
        keyUses: ["Garlic", "Onions", "Herbs", "Flavor bases"],
        previewImg: "MinceCut.png", knife: "Chef's knife",
        tips: ["Rock knife back and forth", "Gather and chop repeatedly", "Use curved blade efficiently"],
        steps: ["Start with finely chopped pieces", "Place knife tip on board", "Rock knife while moving", "Gather and repeat", "Continue until desired fineness"]
      },
      {
        id: 7, name: "Batonnet", tagline: "Stick-shaped cuts",
        fullDesc: "Batonnet produces stick-shaped pieces (6mm × 6mm × 5-6cm).",
        keyUses: ["French fries", "Vegetable sticks", "Stir-fries", "Crudités"],
        previewImg: "BatonnetCut.png", knife: "Chef's knife",
        tips: ["Trim sides first", "Measure thickness", "Keep consistent length"],
        steps: ["Trim and square off vegetable", "Cut into 5-6cm segments", "Slice into 6mm thick planks", "Stack and cut into sticks", "Maintain uniform size"]
      },
      {
        id: 8, name: "Tourne", tagline: "Football-shaped decorative cuts",
        fullDesc: "Tourne produces seven-sided, football-shaped decorative pieces.",
        keyUses: ["Fine dining", "Garnishes", "Roasted vegetables", "Special occasions"],
        previewImg: "TourneCut.png", knife: "Paring knife or tourne knife",
        tips: ["Use small paring knife", "Practice on carrots first", "Maintain seven equal sides"],
        steps: ["Peel and cut into 5cm lengths", "Hold at angle with thumb", "Make shallow cuts while rotating", "Create seven equal sides", "Trim ends for football shape"]
      }
    ];
  };

  const handleTechniqueSelect = (technique) => {
    setSelectedTechnique(technique);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedTechnique(null);
  };

  const getTechniqueCardClass = (techniqueName) => {
    const name = techniqueName.toLowerCase();
    if (name.includes('julienne')) return 'julienne';
    if (name.includes('brunoise')) return 'brunoise';
    if (name.includes('chiffonade')) return 'chiffonade';
    if (name.includes('dice')) return 'dice';
    if (name.includes('slice')) return 'slice';
    if (name.includes('mince')) return 'mince';
    if (name.includes('batonnet')) return 'batonnet';
    if (name.includes('tourne')) return 'tourne';
    return '';
  };

  if (loading) {
    return (
      <div className="ctp-container">
        <div className="loading-spinner">Loading cutting techniques...</div>
      </div>
    );
  }

  return (
    <div className="ctp-container">
      <div className="ctp-layout">
        {/* SIDEBAR */}
        <aside className="ctp-sidebar">
          <div className="ctp-sidebar-header">
            <h2 className="ctp-sidebar-title">Cutting Techniques</h2>
            <p className="ctp-sidebar-subtitle">Essential Knife Skills</p>
          </div>

          <div className="ctp-sidebar-techniques">
            <ul className="ctp-techniques-list">
              {cuttingTechniques.map(technique => (
                <li 
                  key={technique.id} 
                  className={`ctp-technique-list-item ${selectedTechnique?.id === technique.id ? 'ctp-active' : ''}`}
                  onClick={() => handleTechniqueSelect(technique)}
                >
                  <span className="ctp-technique-list-name">{technique.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="ctp-main">
          <header className="ctp-main-header">
            <div className="ctp-header-content">
              <h1 className="ctp-page-title">Essential Cutting Techniques</h1>
              <p className="ctp-page-description">
                Master professional knife skills with these fundamental cutting techniques.
              </p>
              {error && <p className="error-note">{error}</p>}
            </div>
          </header>

          {/* TECHNIQUES GRID */}
          <div className="ctp-techniques-grid-section">
            <div className="ctp-techniques-grid">
              {cuttingTechniques.map(technique => (
                <div 
                  key={technique.id} 
                  className={`ctp-technique-card ${getTechniqueCardClass(technique.name)}`}
                  onClick={() => handleTechniqueSelect(technique)}
                >
                  <div 
                    className="ctp-card-image"
                    style={{ backgroundImage: `url(${technique.previewImg})` }}
                  ></div>
                  
                  <div className="ctp-card-content">
                    <h3 className="ctp-card-title">{technique.name}</h3>
                    <p className="ctp-card-description">{technique.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* DETAIL MODAL */}
      {showDetailPanel && selectedTechnique && (
        <div className="ctp-modal-overlay" onClick={closeDetailPanel}>
          <div className="ctp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="ctp-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="ctp-modal-header">
              <div className="ctp-modal-title">
                <h2>{selectedTechnique.name}</h2>
                <p className="ctp-modal-subtitle">{selectedTechnique.tagline}</p>
              </div>
            </div>

            <div className="ctp-modal-content">
              {/* LEFT SIDE - CONTENT */}
              <div className="ctp-modal-details">
                <div className="ctp-detail-section description-section">
                  <h3>Description</h3>
                  <p>{selectedTechnique.fullDesc}</p>
                </div>

                <div className="ctp-detail-section uses-section">
                  <h3>Common Uses</h3>
                  <div className="ctp-uses-list">
                    {selectedTechnique.keyUses.map((use, idx) => (
                      <div key={idx} className="ctp-use-item">
                        <span className="ctp-use-check">✓</span>
                        <span>{use}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ctp-detail-section details-section">
                  <h3>Technique Details</h3>
                  <div className="ctp-details-list">
                    <div className="ctp-detail-item">
                      <span className="ctp-detail-label">Recommended Knife:</span>
                      <span className="ctp-detail-value">{selectedTechnique.knife}</span>
                    </div>
                  </div>
                </div>

                <div className="ctp-detail-section steps-section">
                  <h3>Steps to {selectedTechnique.name} Cut</h3>
                  <div className="ctp-steps-list">
                    {selectedTechnique.steps.map((step, idx) => (
                      <div key={idx} className="ctp-step-item">
                        <span className="ctp-step-number">{idx + 1}.</span>
                        <span className="ctp-step-text">{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="ctp-detail-section tips-section">
                  <h3>Pro Tips</h3>
                  <div className="ctp-tips-list">
                    {selectedTechnique.tips.map((tip, idx) => (
                      <div key={idx} className="ctp-tip-item">
                        <span className="ctp-tip-number">{idx + 1}.</span>
                        <span className="ctp-tip-text">{tip}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* RIGHT SIDE - IMAGE */}
              <div className="ctp-modal-image-container">
                <div 
                  className="ctp-modal-main-image"
                  style={{ backgroundImage: `url(${selectedTechnique.previewImg})` }}
                ></div>
                <div className="ctp-image-caption">
                  {selectedTechnique.name} - Cutting Technique
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="back-home-container">
        <button 
          className="back-home-btn"
          onClick={() => {
            try {
              navigate('/guidance');
            } catch (error) {
              window.location.href = '/guidance';
            }
          }}
        >
          ← Back to Guidance Page
        </button>
      </div>
    </div>
  );
};

export default CuttingTechniquesPage;