// components/DailyReportSlider.jsx

import React, { useState, useEffect } from 'react';
import { getPendingReport, submitUsage } from '../services/dailyReportService';  // ✅ './' not '../'
import './DailyReportSlider.css';

const DailyReportSlider = ({ isOpen, onClose, onSuccess }) => {
  const [report, setReport] = useState(null);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      fetchPendingReport();
    }
  }, [isOpen]);

  const fetchPendingReport = async () => {
    setLoading(true);
    const result = await getPendingReport();
    if (result.success) {
      setReport(result.report);
      setSuggestions(result.suggestions || []);
    }
    setLoading(false);
  };

  const handleSubmit = async () => {
    if (!message.trim()) {
      alert('Please enter what you used today');
      return;
    }

    setSubmitting(true);
    const result = await submitUsage(message);
    
    if (result.success) {
      onSuccess && onSuccess(result.deducted);
      onClose();
      alert(`✅ ${result.message}\nDeducted: ${result.deducted?.map(d => `${d.quantity} ${d.name}`).join(', ')}`);
    } else {
      alert('❌ ' + result.message);
    }
    setSubmitting(false);
  };

  const handleSuggestionClick = (suggestion) => {
    setMessage(prev => prev ? `${prev}, ${suggestion}` : suggestion);
  };

  if (!isOpen) return null;

  return (
    <div className="slider-overlay" onClick={onClose}>
      <div className="slider-container" onClick={(e) => e.stopPropagation()}>
        
        {/* Header */}
        <div className="slider-header">
          <div className="header-left">
            <div className="header-icon">📋</div>
            <h2>Daily Report</h2>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Content */}
        <div className="slider-content">
          
          {/* Question */}
          <div className="question-section">
            <div className="question-icon">❓</div>
            <h3>What did you use from your pantry today?</h3>
            <p className="question-desc">
              Tell us what items you consumed so we can update your inventory
            </p>
          </div>

          {/* Suggestions */}
          {suggestions.length > 0 && (
            <div className="suggestions-section">
              <div className="suggestions-label">Quick suggestions:</div>
              <div className="suggestions-list">
                {suggestions.map((item, index) => (
                  <button 
                    key={index} 
                    className="suggestion-chip"
                    onClick={() => handleSuggestionClick(item)}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Example */}
          <div className="example-section">
            <div className="example-label">Example:</div>
            <div className="example-text">
              "2 bread, 1 milk, 0.5 kg rice"
            </div>
          </div>

          {/* Text Input */}
          <div className="input-section">
            <textarea
              className="report-input"
              placeholder="Type your reply here..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
            />
          </div>

          {/* Action Buttons */}
          <div className="action-buttons">
            <button 
              className="btn-submit"
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting ? 'Submitting...' : '✓ Submit Report'}
            </button>
            <button 
              className="btn-skip"
              onClick={onClose}
            >
              Skip for now
            </button>
          </div>

          {/* Info Note */}
          <div className="info-note">
            <span>ℹ️</span>
            <p>Items will be deducted from your pantry automatically</p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default DailyReportSlider;