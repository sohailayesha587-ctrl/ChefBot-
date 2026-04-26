import React, { useState } from 'react';
import './DailyReportModal.css';

const DailyReportModal = ({ isOpen, onClose, report, onSubmit }) => {
  const [answers, setAnswers] = useState({});
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen || !report) return null;

  const handleAnswerChange = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleSubmit = async () => {
    // Check required questions
    const requiredQuestions = report.questions.filter(q => q.required);
    const missingRequired = requiredQuestions.filter(q => !answers[q.id]);
    
    if (missingRequired.length > 0) {
      alert(`Please answer: ${missingRequired.map(q => q.text).join(', ')}`);
      return;
    }

    setSubmitting(true);
    await onSubmit(report.reportId, answers);
    setSubmitting(false);
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div className="modal-title">
            <span>📋</span>
            <h2>Daily Report</h2>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <div className="modal-body">
          <div className="report-date">
            📅 {new Date(report.date).toLocaleDateString('en-PK', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}
          </div>

          {report.questions.map((question) => (
            <div key={question.id} className="question-field">
              <label className="question-label">
                {question.text}
                {question.required && <span className="required-star">*</span>}
              </label>

              {question.type === 'text' && (
                <input
                  type="text"
                  className="question-input"
                  placeholder={question.placeholder}
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                />
              )}

              {question.type === 'select' && (
                <select
                  className="question-select"
                  value={answers[question.id] || ''}
                  onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                >
                  <option value="">Select...</option>
                  {question.options.map(opt => (
                    <option key={opt} value={opt}>{opt}</option>
                  ))}
                </select>
              )}
            </div>
          ))}
        </div>

        <div className="modal-footer">
          <button className="modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
          <button className="modal-submit-btn" onClick={handleSubmit} disabled={submitting}>
            {submitting ? 'Submitting...' : '✓ Submit Report'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DailyReportModal;