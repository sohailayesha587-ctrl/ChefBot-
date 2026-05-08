import React, { useState, useEffect } from 'react';
import './MeasuringSkillsPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const MeasuringSkillsPage = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('tools');
  const [selectedItem, setSelectedItem] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [toolsData, setToolsData] = useState([]);
  const [techniquesData, setTechniquesData] = useState([]);
  const [estimationData, setEstimationData] = useState([]);
  const [conversionData, setConversionData] = useState([]);
  const [precisionData, setPrecisionData] = useState([]);

  const API_BASE_URL = 'http://localhost:5000';

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setLoading(true);
    setError(null);
    try {
      const categories = ['measuring-tools', 'measuring-techniques', 'estimation', 'conversions', 'precision'];
      
      const results = await Promise.all(
        categories.map(async (cat) => {
          try {
            const response = await axios.get(`${API_BASE_URL}/api/beginners-guide?category=${cat}`);
            return { category: cat, data: response.data.guides || [] };
          } catch (err) {
            console.error(`Error fetching ${cat}:`, err);
            return { category: cat, data: [] };
          }
        })
      );

      let hasData = false;
      
      results.forEach(result => {
        const parsedData = result.data.map(guide => {
          let content = {};
          try {
            if (typeof guide.content === 'string' && guide.content.trim().startsWith('{')) {
              content = JSON.parse(guide.content);
            } else {
              content = { fullDesc: guide.content, tagline: guide.title };
            }
          } catch (e) {
            content = { fullDesc: guide.content, tagline: guide.title };
          }
          return { ...content, id: guide._id, image: guide.image, name: guide.title };
        });

        switch (result.category) {
          case 'measuring-tools':
            if (parsedData.length) { setToolsData(parsedData); hasData = true; }
            break;
          case 'measuring-techniques':
            if (parsedData.length) { setTechniquesData(parsedData); hasData = true; }
            break;
          case 'estimation':
            if (parsedData.length) { setEstimationData(parsedData); hasData = true; }
            break;
          case 'conversions':
            if (parsedData.length) { setConversionData(parsedData); hasData = true; }
            break;
          case 'precision':
            if (parsedData.length) { setPrecisionData(parsedData); hasData = true; }
            break;
          default: break;
        }
      });

      if (!hasData) {
        const fallback = getFallbackData();
        setToolsData(fallback.tools);
        setTechniquesData(fallback.techniques);
        setEstimationData(fallback.estimation);
        setConversionData(fallback.conversions);
        setPrecisionData(fallback.precision);
        setError('Using offline data. Connect to internet for latest content.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      const fallback = getFallbackData();
      setToolsData(fallback.tools);
      setTechniquesData(fallback.techniques);
      setEstimationData(fallback.estimation);
      setConversionData(fallback.conversions);
      setPrecisionData(fallback.precision);
      setError('Using offline data. Connect to internet for latest content.');
    } finally {
      setLoading(false);
    }
  };

  const getFallbackData = () => {
    return {
      tools: [],
      techniques: [],
      estimation: [],
      conversions: [],
      precision: []
    };
  };

  const getCurrentData = () => {
    switch (selectedCategory) {
      case 'tools': return toolsData;
      case 'techniques': return techniquesData;
      case 'estimation': return estimationData;
      case 'conversions': return conversionData;
      case 'precision': return precisionData;
      default: return toolsData;
    }
  };

  const handleItemSelect = (item) => {
    setSelectedItem(item);
    setShowDetailPanel(true);
  };

  const closeDetailPanel = () => {
    setShowDetailPanel(false);
    setSelectedItem(null);
  };

  const renderDetailContent = (item) => {
    const category = selectedCategory;

    return (
      <div className="msp-modal-details">
        {/* DESCRIPTION */}
        <div className="msp-detail-section">
          <h3>📋 Description</h3>
          <div className="msp-detail-content"><p>{item.fullDesc}</p></div>
        </div>

        {/* ========== MEASURING TOOLS ========== */}
        {category === 'tools' && (
          <>
            {item.keyFeatures && item.keyFeatures.length > 0 && (
              <div className="msp-detail-section">
                <h3>✅ Key Features</h3>
                <div className="msp-features-horizontal">
                  {item.keyFeatures.map((feature, idx) => (<div key={idx} className="msp-feature-box">{feature}</div>))}
                </div>
              </div>
            )}
            {item.properUsage && (
              <div className="msp-detail-section">
                <h3>📝 Proper Usage</h3>
                <div className="msp-detail-content">
                  {typeof item.properUsage === 'string' ? <p>{item.properUsage}</p> : 
                   item.properUsage.map((u, idx) => (<p key={idx}>• {u}</p>))}
                </div>
              </div>
            )}
            {item.commonMistakes && item.commonMistakes.length > 0 && (
              <div className="msp-detail-section">
                <h3>❌ Common Mistakes</h3>
                <div className="msp-mistakes-horizontal">
                  {item.commonMistakes.map((mistake, idx) => (<div key={idx} className="msp-mistake-box">{mistake}</div>))}
                </div>
              </div>
            )}
            {item.types && item.types.length > 0 && (
              <div className="msp-types-section">
                <h3 className="msp-types-heading">🔧 Types & Varieties</h3>
                <div className="msp-types-grid">
                  {item.types.map((type, idx) => (
                    <div key={idx} className="msp-type-card">
                      <div className="msp-type-image" style={{ backgroundImage: `url(${type.image})` }}></div>
                      <div className="msp-type-content">
                        <h4>{type.name}</h4>
                        <p className="msp-type-desc">{type.description}</p>
                        {type.capacity && <p><strong>Capacity:</strong> {type.capacity}</p>}
                        {type.sizes && <p><strong>Sizes:</strong> {type.sizes}</p>}
                        <div className="msp-type-best"><strong>Best For:</strong> {type.bestFor}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* ========== MEASURING TECHNIQUES ========== */}
        {category === 'techniques' && (
          <>
            {item.steps && item.steps.length > 0 && (
              <div className="msp-detail-section">
                <h3>📝 Steps</h3>
                <div className="msp-steps-list">
                  {item.steps.map((step, idx) => (<div key={idx} className="msp-step-item">{idx+1}. {step}</div>))}
                </div>
              </div>
            )}
            {item.tips && (
              <div className="msp-detail-section">
                <h3>💡 Pro Tips</h3>
                <p>{item.tips}</p>
              </div>
            )}
            {item.commonMistakes && item.commonMistakes.length > 0 && (
              <div className="msp-detail-section">
                <h3>❌ Common Mistakes</h3>
                <div className="msp-mistakes-horizontal">
                  {item.commonMistakes.map((mistake, idx) => (<div key={idx} className="msp-mistake-box">{mistake}</div>))}
                </div>
              </div>
            )}
            {item.usage && item.usage.length > 0 && (
              <div className="msp-detail-section">
                <h3>🎯 Usage</h3>
                <div className="msp-usage-list">
                  {item.usage.map((use, idx) => (<div key={idx} className="msp-usage-item">• {use}</div>))}
                </div>
              </div>
            )}
            {item.methods && item.methods.length > 0 && (
              <div className="msp-detail-section">
                <h3>⚙️ Methods</h3>
                {item.methods.map((method, idx) => (<div key={idx}>• {method}</div>))}
              </div>
            )}
          </>
        )}

        {/* ========== ESTIMATION SKILLS ========== */}
        {category === 'estimation' && (
          <>
            {item.techniques && item.techniques.length > 0 && (
              <div className="msp-detail-section">
                <h3>📝 Techniques</h3>
                {item.techniques.map((tech, idx) => (<div key={idx}>• {tech}</div>))}
              </div>
            )}
            {item.measurements && item.measurements.length > 0 && (
              <div className="msp-detail-section">
                <h3>✋ Hand Measurements</h3>
                {item.measurements.map((m, idx) => (<div key={idx}>• {m}</div>))}
              </div>
            )}
            {item.definitions && item.definitions.length > 0 && (
              <div className="msp-detail-section">
                <h3>📖 Definitions</h3>
                {item.definitions.map((d, idx) => (<div key={idx}>• {d}</div>))}
              </div>
            )}
            {item.equivalents && item.equivalents.length > 0 && (
              <div className="msp-detail-section">
                <h3>🔄 Equivalents</h3>
                {item.equivalents.map((eq, idx) => (<div key={idx}>• {eq}</div>))}
              </div>
            )}
            {item.references && item.references.length > 0 && (
              <div className="msp-detail-section">
                <h3>📏 References</h3>
                {item.references.map((ref, idx) => (<div key={idx}>• {ref}</div>))}
              </div>
            )}
            {item.comparisons && item.comparisons.length > 0 && (
              <div className="msp-detail-section">
                <h3>⚖️ Comparisons</h3>
                {item.comparisons.map((comp, idx) => (<div key={idx}>• {comp}</div>))}
              </div>
            )}
            {item.guidelines && item.guidelines.length > 0 && (
              <div className="msp-detail-section">
                <h3>📐 Guidelines</h3>
                {item.guidelines.map((g, idx) => (<div key={idx}>• {g}</div>))}
              </div>
            )}
            {item.plateMethod && item.plateMethod.length > 0 && (
              <div className="msp-detail-section">
                <h3>🍽️ Plate Method</h3>
                {item.plateMethod.map((p, idx) => (<div key={idx}>• {p}</div>))}
              </div>
            )}
            {item.process && item.process.length > 0 && (
              <div className="msp-detail-section">
                <h3>🔄 Process</h3>
                {item.process.map((p, idx) => (<div key={idx}>• {p}</div>))}
              </div>
            )}
            {item.indicators && item.indicators.length > 0 && (
              <div className="msp-detail-section">
                <h3>👀 Indicators</h3>
                {item.indicators.map((ind, idx) => (<div key={idx}>• {ind}</div>))}
              </div>
            )}
            {item.timeReferences && item.timeReferences.length > 0 && (
              <div className="msp-detail-section">
                <h3>⏱️ Time References</h3>
                {item.timeReferences.map((t, idx) => (<div key={idx}>• {t}</div>))}
              </div>
            )}
            {item.accuracy && (
              <div className="msp-detail-section">
                <h3>📊 Accuracy</h3>
                <p>{item.accuracy}</p>
              </div>
            )}
            {item.whenToUse && (
              <div className="msp-detail-section">
                <h3>✅ When to Use</h3>
                <p>{item.whenToUse}</p>
              </div>
            )}
            {item.whenNotToUse && (
              <div className="msp-detail-section">
                <h3>❌ When Not to Use</h3>
                <p>{item.whenNotToUse}</p>
              </div>
            )}
            {item.usage && item.usage.length > 0 && (
              <div className="msp-detail-section">
                <h3>🎯 Usage</h3>
                {item.usage.map((use, idx) => (<div key={idx}>• {use}</div>))}
              </div>
            )}
            {item.tips && (
              <div className="msp-detail-section">
                <h3>💡 Tips</h3>
                <p>{item.tips}</p>
              </div>
            )}
          </>
        )}

        {/* ========== CONVERSION SKILLS ========== */}
        {category === 'conversions' && (
          <>
            {item.commonConversions && item.commonConversions.length > 0 && (
              <div className="msp-detail-section">
                <h3>🔄 Common Conversions</h3>
                <div className="msp-conversions-grid">
                  {item.commonConversions.map((conv, idx) => (<div key={idx} className="msp-conversion-box">{conv}</div>))}
                </div>
              </div>
            )}
            {item.metricConversions && item.metricConversions.length > 0 && (
              <div className="msp-detail-section">
                <h3>📏 Metric Conversions</h3>
                <div className="msp-conversions-grid">
                  {item.metricConversions.map((conv, idx) => (<div key={idx} className="msp-conversion-box">{conv}</div>))}
                </div>
              </div>
            )}
            {item.volumeConversions && item.volumeConversions.length > 0 && (
              <div className="msp-detail-section">
                <h3>💧 Volume Conversions</h3>
                {item.volumeConversions.map((v, idx) => (<div key={idx}>• {v}</div>))}
              </div>
            )}
            {item.weightConversions && item.weightConversions.length > 0 && (
              <div className="msp-detail-section">
                <h3>⚖️ Weight Conversions</h3>
                {item.weightConversions.map((w, idx) => (<div key={idx}>• {w}</div>))}
              </div>
            )}
            {item.ovenConversions && item.ovenConversions.length > 0 && (
              <div className="msp-detail-section">
                <h3>🔥 Oven Temperature Conversions</h3>
                {item.ovenConversions.map((o, idx) => (<div key={idx}>• {o}</div>))}
              </div>
            )}
            {item.commonTemperatures && item.commonTemperatures.length > 0 && (
              <div className="msp-detail-section">
                <h3>🌡️ Common Temperatures</h3>
                {item.commonTemperatures.map((t, idx) => (<div key={idx}>• {t}</div>))}
              </div>
            )}
            {item.formula && item.formula.length > 0 && (
              <div className="msp-detail-section">
                <h3>📐 Formula</h3>
                {item.formula.map((f, idx) => (<div key={idx}>• {f}</div>))}
              </div>
            )}
            {item.scalingRules && item.scalingRules.length > 0 && (
              <div className="msp-detail-section">
                <h3>📈 Recipe Scaling Rules</h3>
                {item.scalingRules.map((rule, idx) => (<div key={idx}>• {rule}</div>))}
              </div>
            )}
            {item.commonMultipliers && item.commonMultipliers.length > 0 && (
              <div className="msp-detail-section">
                <h3>✖️ Common Multipliers</h3>
                {item.commonMultipliers.map((m, idx) => (<div key={idx}>• {m}</div>))}
              </div>
            )}
            {item.exceptions && item.exceptions.length > 0 && (
              <div className="msp-detail-section">
                <h3>⚠️ Exceptions</h3>
                {item.exceptions.map((exc, idx) => (<div key={idx}>• {exc}</div>))}
              </div>
            )}
            {item.commonSubstitutions && item.commonSubstitutions.length > 0 && (
              <div className="msp-detail-section">
                <h3>🔄 Ingredient Substitutions</h3>
                {item.commonSubstitutions.map((sub, idx) => (<div key={idx}>• {sub}</div>))}
              </div>
            )}
            {item.dairySubstitutions && item.dairySubstitutions.length > 0 && (
              <div className="msp-detail-section">
                <h3>🥛 Dairy Substitutions</h3>
                {item.dairySubstitutions.map((d, idx) => (<div key={idx}>• {d}</div>))}
              </div>
            )}
            {item.commonPanSizes && item.commonPanSizes.length > 0 && (
              <div className="msp-detail-section">
                <h3>🍰 Common Pan Sizes</h3>
                {item.commonPanSizes.map((pan, idx) => (<div key={idx}>• {pan}</div>))}
              </div>
            )}
            {item.areaCalculations && item.areaCalculations.length > 0 && (
              <div className="msp-detail-section">
                <h3>📐 Area Calculations</h3>
                {item.areaCalculations.map((area, idx) => (<div key={idx}>• {area}</div>))}
              </div>
            )}
            {item.adjustmentRules && item.adjustmentRules.length > 0 && (
              <div className="msp-detail-section">
                <h3>⚙️ Adjustment Rules</h3>
                {item.adjustmentRules.map((rule, idx) => (<div key={idx}>• {rule}</div>))}
              </div>
            )}
            {item.bakingConversions && item.bakingConversions.length > 0 && (
              <div className="msp-detail-section">
                <h3>🍪 Baking Conversions</h3>
                {item.bakingConversions.map((b, idx) => (<div key={idx}>• {b}</div>))}
              </div>
            )}
            {item.mustKnowEquivalents && item.mustKnowEquivalents.length > 0 && (
              <div className="msp-detail-section">
                <h3>📌 Must Know Equivalents</h3>
                {item.mustKnowEquivalents.map((m, idx) => (<div key={idx}>• {m}</div>))}
              </div>
            )}
            {item.handyEquivalents && item.handyEquivalents.length > 0 && (
              <div className="msp-detail-section">
                <h3>📝 Handy Equivalents</h3>
                {item.handyEquivalents.map((h, idx) => (<div key={idx}>• {h}</div>))}
              </div>
            )}
            {item.usage && item.usage.length > 0 && (
              <div className="msp-detail-section">
                <h3>🎯 Usage</h3>
                {item.usage.map((use, idx) => (<div key={idx}>• {use}</div>))}
              </div>
            )}
            {item.tips && (
              <div className="msp-detail-section">
                <h3>💡 Tips</h3>
                <p>{item.tips}</p>
              </div>
            )}
          </>
        )}

        {/* ========== PRECISION SKILLS ========== */}
        {category === 'precision' && (
          <>
            {item.criticalRules && item.criticalRules.length > 0 && (
              <div className="msp-detail-section">
                <h3>🎯 Critical Rules</h3>
                <div className="msp-critical-rules-grid">
                  {item.criticalRules.map((rule, idx) => (<div key={idx} className="msp-critical-rule-box">{rule}</div>))}
                </div>
              </div>
            )}
            {item.commonErrors && item.commonErrors.length > 0 && (
              <div className="msp-detail-section">
                <h3>❌ Common Errors</h3>
                <div className="msp-mistakes-horizontal">
                  {item.commonErrors.map((err, idx) => (<div key={idx} className="msp-mistake-box">{err}</div>))}
                </div>
              </div>
            )}
            {item.toolsRequired && item.toolsRequired.length > 0 && (
              <div className="msp-detail-section">
                <h3>🛠️ Tools Required</h3>
                {item.toolsRequired.map((tool, idx) => (<div key={idx}>• {tool}</div>))}
              </div>
            )}
            {item.calibrationMethods && item.calibrationMethods.length > 0 && (
              <div className="msp-detail-section">
                <h3>⚙️ Calibration Methods</h3>
                {item.calibrationMethods.map((cal, idx) => (<div key={idx}>• {cal}</div>))}
              </div>
            )}
            {item.maintenanceTips && item.maintenanceTips.length > 0 && (
              <div className="msp-detail-section">
                <h3>🔧 Maintenance Tips</h3>
                {item.maintenanceTips.map((tip, idx) => (<div key={idx}>• {tip}</div>))}
              </div>
            )}
            {item.accuracyCheck && item.accuracyCheck.length > 0 && (
              <div className="msp-detail-section">
                <h3>✅ Accuracy Check</h3>
                {item.accuracyCheck.map((check, idx) => (<div key={idx}>• {check}</div>))}
              </div>
            )}
            {item.toolsForMicro && item.toolsForMicro.length > 0 && (
              <div className="msp-detail-section">
                <h3>🔬 Tools for Micro Measurements</h3>
                {item.toolsForMicro.map((tool, idx) => (<div key={idx}>• {tool}</div>))}
              </div>
            )}
            {item.techniques && item.techniques.length > 0 && (
              <div className="msp-detail-section">
                <h3>📝 Techniques</h3>
                {item.techniques.map((tech, idx) => (<div key={idx}>• {tech}</div>))}
              </div>
            )}
            {item.criticalAmounts && item.criticalAmounts.length > 0 && (
              <div className="msp-detail-section">
                <h3>⚠️ Critical Amounts</h3>
                {item.criticalAmounts.map((amt, idx) => (<div key={idx}>• {amt}</div>))}
              </div>
            )}
            {item.portioningTools && item.portioningTools.length > 0 && (
              <div className="msp-detail-section">
                <h3>🥄 Portioning Tools</h3>
                {item.portioningTools.map((tool, idx) => (<div key={idx}>• {tool}</div>))}
              </div>
            )}
            {item.benefits && item.benefits.length > 0 && (
              <div className="msp-detail-section">
                <h3>✨ Benefits</h3>
                {item.benefits.map((ben, idx) => (<div key={idx}>• {ben}</div>))}
              </div>
            )}
            {item.criticalTemperatures && item.criticalTemperatures.length > 0 && (
              <div className="msp-detail-section">
                <h3>🌡️ Critical Temperatures</h3>
                {item.criticalTemperatures.map((temp, idx) => (<div key={idx}>• {temp}</div>))}
              </div>
            )}
            {item.commonRatios && item.commonRatios.length > 0 && (
              <div className="msp-detail-section">
                <h3>📊 Common Ratios</h3>
                {item.commonRatios.map((ratio, idx) => (<div key={idx}>• {ratio}</div>))}
              </div>
            )}
            {item.calculation && item.calculation.length > 0 && (
              <div className="msp-detail-section">
                <h3>🧮 Calculation</h3>
                {item.calculation.map((calc, idx) => (<div key={idx}>• {calc}</div>))}
              </div>
            )}
            {item.effects && item.effects.length > 0 && (
              <div className="msp-detail-section">
                <h3>📈 Effects</h3>
                {item.effects.map((eff, idx) => (<div key={idx}>• {eff}</div>))}
              </div>
            )}
            {item.basicRatios && item.basicRatios.length > 0 && (
              <div className="msp-detail-section">
                <h3>📐 Basic Ratios</h3>
                {item.basicRatios.map((ratio, idx) => (<div key={idx}>• {ratio}</div>))}
              </div>
            )}
            {item.application && item.application.length > 0 && (
              <div className="msp-detail-section">
                <h3>🎯 Application</h3>
                {item.application.map((app, idx) => (<div key={idx}>• {app}</div>))}
              </div>
            )}
            {item.documentationMethods && item.documentationMethods.length > 0 && (
              <div className="msp-detail-section">
                <h3>📝 Documentation Methods</h3>
                {item.documentationMethods.map((doc, idx) => (<div key={idx}>• {doc}</div>))}
              </div>
            )}
            {item.whatToRecord && item.whatToRecord.length > 0 && (
              <div className="msp-detail-section">
                <h3>📋 What to Record</h3>
                {item.whatToRecord.map((rec, idx) => (<div key={idx}>• {rec}</div>))}
              </div>
            )}
            {item.usage && item.usage.length > 0 && (
              <div className="msp-detail-section">
                <h3>🎯 Usage</h3>
                {item.usage.map((use, idx) => (<div key={idx}>• {use}</div>))}
              </div>
            )}
            {item.tips && (
              <div className="msp-detail-section">
                <h3>💡 Tips</h3>
                <p>{item.tips}</p>
              </div>
            )}
          </>
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="msp-container">
        <div className="loading-spinner">Loading measuring skills...</div>
      </div>
    );
  }

  return (
    <div className="msp-container">
      <div className="msp-layout">
        {/* SIDEBAR */}
        <aside className="msp-sidebar">
          <div className="msp-sidebar-header">
            <h2 className="msp-sidebar-title">Measuring Skills</h2>
          </div>

          <div className="msp-sidebar-categories">
            <ul className="msp-categories-list">
              <li className={`msp-category-item ${selectedCategory === 'tools' ? 'msp-active' : ''}`} onClick={() => setSelectedCategory('tools')}>
                <span className="msp-category-name">Tools & Equipment</span>
              </li>
              <li className={`msp-category-item ${selectedCategory === 'techniques' ? 'msp-active' : ''}`} onClick={() => setSelectedCategory('techniques')}>
                <span className="msp-category-name">Measuring Techniques</span>
              </li>
              <li className={`msp-category-item ${selectedCategory === 'estimation' ? 'msp-active' : ''}`} onClick={() => setSelectedCategory('estimation')}>
                <span className="msp-category-name">Estimation Skills</span>
              </li>
              <li className={`msp-category-item ${selectedCategory === 'conversions' ? 'msp-active' : ''}`} onClick={() => setSelectedCategory('conversions')}>
                <span className="msp-category-name">Conversion Skills</span>
              </li>
              <li className={`msp-category-item ${selectedCategory === 'precision' ? 'msp-active' : ''}`} onClick={() => setSelectedCategory('precision')}>
                <span className="msp-category-name">Precision Skills</span>
              </li>
            </ul>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main className="msp-main">
          {error && <div className="error-message" style={{color: 'orange', textAlign: 'center', padding: '10px'}}>{error}</div>}
          
          <header className="msp-main-header">
            <div className="msp-header-content">
              <h1 className="msp-page-title">
                {selectedCategory === 'tools' && 'Measuring Tools & Equipment'}
                {selectedCategory === 'techniques' && 'Measuring Techniques'}
                {selectedCategory === 'estimation' && 'Estimation Skills'}
                {selectedCategory === 'conversions' && 'Conversion Skills'}
                {selectedCategory === 'precision' && 'Precision Skills'}
              </h1>
              <p className="msp-page-description">
                {selectedCategory === 'tools' && 'Essential tools for accurate kitchen measurements.'}
                {selectedCategory === 'techniques' && 'Proper methods for measuring ingredients accurately.'}
                {selectedCategory === 'estimation' && 'Skills for estimating quantities when precision is not possible.'}
                {selectedCategory === 'conversions' && 'Converting between measurement systems and adjusting recipes.'}
                {selectedCategory === 'precision' && 'Advanced skills for exact measurements in baking and precision cooking.'}
              </p>
            </div>
          </header>

          {/* ITEMS GRID */}
          <div className="msp-items-grid-section">
            <div className="msp-items-grid">
              {getCurrentData().map(item => (
                <div key={item.id} className="msp-item-card" onClick={() => handleItemSelect(item)}>
                  <div className="msp-card-image" style={{ backgroundImage: `url(${item.image})` }}></div>
                  <div className="msp-card-content">
                    <div className="msp-card-header">
                      <h3 className="msp-card-title">{item.name}</h3>
                    </div>
                    <p className="msp-card-description">{item.tagline}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* MODAL */}
      {showDetailPanel && selectedItem && (
        <div className="msp-modal-overlay" onClick={closeDetailPanel}>
          <div className="msp-modal" onClick={(e) => e.stopPropagation()}>
            <button className="msp-modal-close" onClick={closeDetailPanel}>×</button>
            
            <div className="msp-modal-header">
              <div className="msp-modal-title">
                <h2>{selectedItem.name}</h2>
                <p className="msp-modal-subtitle">{selectedItem.tagline}</p>
              </div>
            </div>

            <div className="msp-modal-content">
              <div className="msp-modal-left">
                {renderDetailContent(selectedItem)}
              </div>
              <div className="msp-modal-right">
                <div className="msp-main-image-container">
                  <div className="msp-main-image" style={{ backgroundImage: `url(${selectedItem.image})` }}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="back-home-container">
        <button className="back-home-btn" onClick={() => navigate('/guidance')}>← Back to Guidance Page</button>
      </div>
    </div>
  );
};

export default MeasuringSkillsPage;