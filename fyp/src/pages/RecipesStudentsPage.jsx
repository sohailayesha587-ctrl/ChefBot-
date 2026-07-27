import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './RecipesStudentsPage.css';

const RecipesStudentsPage = () => {
  const navigate = useNavigate();
  const [studentRecipes, setStudentRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showDetailPanel, setShowDetailPanel] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const speechSynthesisRef = useRef(null);

  useEffect(() => {
    fetch('http://localhost:5000/api/recipes/subCategory/student?limit=200')
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch student recipes');
        }
        return res.json();
      })
      .then(data => {
        setStudentRecipes(data.recipes || []);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching student recipes:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    return () => {
      if (speechSynthesisRef.current) {
        window.speechSynthesis.cancel();
        speechSynthesisRef.current = null;
      }
    };
  }, []);

  const speakInstructions = (instructions, stepIndex = 0) => {
    if ('speechSynthesis' in window) {
      if (speechSynthesisRef.current && isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        setCurrentStep(0);
        setProgress(0);
        speechSynthesisRef.current = null;
        return;
      }
      if (stepIndex >= 0 && stepIndex < instructions.length) {
        const utterance = new SpeechSynthesisUtterance();
        utterance.text = `Step ${stepIndex + 1}: ${instructions[stepIndex]}`;
        utterance.rate = 1.0;
        utterance.pitch = 1;
        utterance.volume = 1;
        setCurrentStep(stepIndex + 1);
        setProgress(((stepIndex + 1) / instructions.length) * 100);
        utterance.onstart = () => setIsPlaying(true);
        utterance.onend = () => { 
          setIsPlaying(false); 
          speechSynthesisRef.current = null;
          if (stepIndex < instructions.length - 1) {
            setTimeout(() => {
              speakInstructions(instructions, stepIndex + 1);
            }, 1000);
          }
        };
        utterance.onerror = () => { 
          setIsPlaying(false); 
          speechSynthesisRef.current = null; 
        };
        speechSynthesisRef.current = utterance;
        window.speechSynthesis.speak(utterance);
      }
    } else {
      alert('Your browser does not support text-to-speech.');
    }
  };

  const stopSpeaking = () => {
    if ('speechSynthesis' in window && speechSynthesisRef.current) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      setCurrentStep(0);
      setProgress(0);
      speechSynthesisRef.current = null;
    }
  };

  const speakNextStep = () => {
    if (selectedStudent && currentStep < selectedStudent.stepsRaw?.length) {
      stopSpeaking();
      speakInstructions(selectedStudent.stepsRaw, currentStep);
    }
  };

  const speakPreviousStep = () => {
    if (selectedStudent && currentStep > 1) {
      stopSpeaking();
      speakInstructions(selectedStudent.stepsRaw, currentStep - 2);
    }
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
    setShowDetailPanel(true);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  const closeDetailPanel = () => {
    stopSpeaking();
    setShowDetailPanel(false);
    setSelectedStudent(null);
    setIsPlaying(false);
    setCurrentStep(0);
    setProgress(0);
  };

  if (loading) {
    return (
      <div className="student-page">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading delicious student recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="student-page">
      <header className="student-header">
        <div className="student-header-content">
          <h1 className="student-page-title">Student Recipes</h1>
          <p className="student-page-description">
            Discover delicious student recipes with rich, flavorful, and homestyle taste
          </p>
        </div>
      </header>

      <main className="student-main">
        <div className="student-grid-section">
          <div className="student-grid">
            {studentRecipes.map(student => (
              <div
                key={student._id}
                className="student-card"
                onClick={() => handleStudentSelect(student)}
              >
                <div
                  className="student-card-image"
                  style={{ backgroundImage: `url(${student.image})` }}
                ></div>
                <div className="student-card-content">
                  <h3 className="student-card-title">{student.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <div className="back-button-container">
        <button className="back-home-btn" onClick={() => navigate('/')}>
          <span>←</span> Back to Home
        </button>
      </div>

      {showDetailPanel && selectedStudent && (
        <div className="student-modal-overlay" onClick={closeDetailPanel}>
          <div className="student-modal" onClick={e => e.stopPropagation()}>
            <div className="student-modal-hero">
              <div className="student-modal-hero-left">
                <span className="student-modal-tag">Student Recipe</span>
                <h2 className="student-modal-hero-title">{selectedStudent.title}</h2>
                {selectedStudent.tagline && (
                  <p className="student-modal-hero-tagline">{selectedStudent.tagline}</p>
                )}
              </div>
              <div className="student-modal-hero-right">
                <img
                  src={selectedStudent.image}
                  alt={selectedStudent.title}
                  className="student-modal-hero-img"
                />
              </div>
              <button className="student-modal-close" onClick={closeDetailPanel}>×</button>
            </div>

            <div className="student-modal-body">
              <div className="student-modal-col">
                <div className="student-modal-col-header">
                  <i className="fas fa-list-ul"></i>
                  <h3>Ingredients</h3>
                </div>
                <div className="student-modal-scroll">
                  {selectedStudent.ingredientsRaw?.map((ingredient, idx) => (
                    <div key={idx} className="student-ingredient-item">
                      <span className="student-ingredient-dot"></span>
                      <span className="student-ingredient-text">{ingredient}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="student-modal-col student-modal-col--steps">
                <div className="student-modal-col-header">
                  <i className="fas fa-shoe-prints"></i>
                  <h3>Steps to Make</h3>
                </div>
                <div className="student-modal-scroll">
                  {selectedStudent.stepsRaw?.map((step, idx) => (
                    <div key={idx} className="student-step-item">
                      <span className="student-step-num">{idx + 1}</span>
                      <span className="student-step-text">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="student-voice-bar">
              <div className="student-voice-left">
                <i className="fas fa-volume-up student-voice-icon"></i>
                <span className="student-voice-label">Voice Guide</span>
              </div>

              <div className="student-voice-progress">
                <div className="student-progress-track">
                  <div className="student-progress-fill" style={{ width: `${progress}%` }}></div>
                </div>
                <div className="student-progress-info">
                  <span>Step {currentStep} of {selectedStudent.stepsRaw?.length || 0}</span>
                  <span>{Math.round(progress)}%</span>
                </div>
              </div>

              <div className="student-voice-controls">
                <button
                  className="student-step-btn"
                  onClick={speakPreviousStep}
                  disabled={currentStep <= 1}
                >
                  <i className="fas fa-step-backward"></i> Prev
                </button>
                <button
                  className={`student-voice-main-btn ${isPlaying ? 'stop' : 'play'}`}
                  onClick={() => isPlaying ? stopSpeaking() : speakInstructions(selectedStudent.stepsRaw)}
                >
                  {isPlaying
                    ? <><i className="fas fa-stop"></i> Stop</>
                    : <><i className="fas fa-play"></i> Start</>
                  }
                </button>
                <button
                  className="student-step-btn"
                  onClick={speakNextStep}
                  disabled={currentStep >= (selectedStudent.stepsRaw?.length || 0)}
                >
                  Next <i className="fas fa-step-forward"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecipesStudentsPage;