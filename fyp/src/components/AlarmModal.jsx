import React, { useState, useEffect, useRef } from 'react';
import { timerService } from '../services/timerService';
import axiosInstance from '../services/axiosConfig';
import './AlarmModal.css';

const AlarmModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="alarm-modal-overlay" onClick={onClose} />
      <div className="alarm-sidebar-modal">
        <div className="alarm-sidebar-header">
          <h2>ChefBot Timer</h2>
          <button className="close-btn" onClick={onClose}>x</button>
        </div>
        <AlarmTimerComponent />
      </div>
    </>
  );
};

const AlarmTimerComponent = () => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(5);
  const [totalSeconds, setTotalSeconds] = useState(5);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isBeeping, setIsBeeping] = useState(false);
  const [loading, setLoading] = useState(false);
  const [timers, setTimers] = useState([]);

  const timerIntervalRef = useRef(null);
  const beepIntervalRef = useRef(null);
  const titleIntervalRef = useRef(null);
  const currentTimerIdRef = useRef(null);
  const backgroundTimerRef = useRef(null);
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);

  useEffect(() => {
    loadTimers();
    requestNotificationPermission();
    
    return () => {
      cleanupIntervals();
      stopContinuousBeep();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    if (!isRunning) {
      setTotalSeconds((minutes * 60) + seconds);
    }
  }, [minutes, seconds, isRunning]);

  const getAudioContext = () => {
    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }
    return audioContextRef.current;
  };

  const loadTimers = async () => {
    try {
      const data = await timerService.getAllTimers();
      setTimers(data);
      
      const activeTimer = data.find(t => t.status === 'running');
      if (activeTimer) {
        const now = new Date();
        const endTime = new Date(activeTimer.endTime);
        let remaining = Math.max(0, Math.floor((endTime - now) / 1000));
        
        if (remaining > 0) {
          setTotalSeconds(remaining);
          setIsRunning(true);
          currentTimerIdRef.current = activeTimer._id;
          startCountdown(remaining);
        } else {
          await timerService.completeTimer(activeTimer._id);
          startBeep();
        }
      }
    } catch (error) {
      console.error('Error loading timers:', error);
    }
  };

  const startCountdown = (duration) => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
    }
    
    let timeLeft = duration;
    
    timerIntervalRef.current = setInterval(async () => {
      if (timeLeft <= 1) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
        setIsRunning(false);
        setIsCompleted(true);
        setTotalSeconds(0);
        
        if (currentTimerIdRef.current) {
          await timerService.completeTimer(currentTimerIdRef.current);
        }
        
        startBeep();
      } else {
        timeLeft--;
        setTotalSeconds(timeLeft);
      }
    }, 1000);
  };

  const startTimer = async () => {
    if (isRunning || totalSeconds <= 0) return;
    
    setLoading(true);
    
    try {
      const duration = totalSeconds;
      const label = `${minutes}m ${seconds}s Timer`;
      const response = await timerService.createTimer(duration, label);
      
      const newTimer = response.timer;
      currentTimerIdRef.current = newTimer._id;
      setIsRunning(true);
      setIsCompleted(false);
      stopBeep();
      
      startCountdown(duration);
      scheduleBackgroundAlarm(duration, label);
      
    } catch (error) {
      console.error('Error starting timer:', error);
      alert('Failed to start timer');
    } finally {
      setLoading(false);
    }
  };

  const scheduleBackgroundAlarm = (duration, label) => {
    if (backgroundTimerRef.current) {
      clearTimeout(backgroundTimerRef.current);
    }
    
    backgroundTimerRef.current = setTimeout(() => {
      triggerBackgroundAlarm(label);
    }, duration * 1000);
  };

  const triggerBackgroundAlarm = (label) => {
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("Timer Complete!", {
        body: `${label} - Time's up!`,
        requireInteraction: true
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
    
    if (!document.hidden) {
      startBeep();
    } else {
      localStorage.setItem('chefbot_beep_active', 'true');
      setIsBeeping(true);
    }
  };

  const stopTimer = async () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    if (backgroundTimerRef.current) {
      clearTimeout(backgroundTimerRef.current);
      backgroundTimerRef.current = null;
    }
    
    if (currentTimerIdRef.current) {
      await timerService.completeTimer(currentTimerIdRef.current);
      currentTimerIdRef.current = null;
    }
    
    setIsRunning(false);
    setIsCompleted(false);
    stopBeep();
  };

  const resetTimer = async () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    
    if (backgroundTimerRef.current) {
      clearTimeout(backgroundTimerRef.current);
      backgroundTimerRef.current = null;
    }
    
    if (currentTimerIdRef.current) {
      await timerService.deleteTimer(currentTimerIdRef.current);
      currentTimerIdRef.current = null;
    }
    
    stopBeep();
    
    setTotalSeconds((minutes * 60) + seconds);
    setIsRunning(false);
    setIsCompleted(false);
    setIsBeeping(false);
    
    await loadTimers();
  };

  const startContinuousBeep = () => {
    try {
      const audioContext = getAudioContext();
      
      if (audioContext.state === 'suspended') {
        audioContext.resume();
      }
      
      stopContinuousBeep();
      
      oscillatorRef.current = audioContext.createOscillator();
      gainNodeRef.current = audioContext.createGain();
      
      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContext.destination);
      
      oscillatorRef.current.frequency.value = 800;
      oscillatorRef.current.type = 'sine';
      gainNodeRef.current.gain.value = 0.3;
      
      oscillatorRef.current.start();
      
    } catch (error) {
      console.log('Beep start error:', error);
    }
  };

  const stopContinuousBeep = () => {
    if (oscillatorRef.current) {
      try {
        oscillatorRef.current.stop();
        oscillatorRef.current.disconnect();
      } catch (error) {
        console.log('Stop oscillator error:', error);
      }
      oscillatorRef.current = null;
    }
    
    if (gainNodeRef.current) {
      gainNodeRef.current = null;
    }
  };

  const startBeep = () => {
    if (isBeeping) return;
    
    stopBeep();
    
    setIsBeeping(true);
    setIsCompleted(true);
    localStorage.setItem('chefbot_beep_active', 'true');
    
    startContinuousBeep();
    
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("Timer Complete!", {
        body: "Click to stop alarm",
        requireInteraction: true,
        vibrate: [200, 100, 200]
      });
      notification.onclick = () => {
        stopBeep();
        notification.close();
      };
    }
    
    let count = 0;
    const originalTitle = document.title;
    titleIntervalRef.current = setInterval(() => {
      document.title = count % 2 === 0 ? "TIME'S UP!" : "ChefBot";
      count++;
      if (count > 100) {
        clearInterval(titleIntervalRef.current);
        document.title = originalTitle;
      }
    }, 500);
    
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  };

  const stopBeep = () => {
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
      beepIntervalRef.current = null;
    }
    
    if (titleIntervalRef.current) {
      clearInterval(titleIntervalRef.current);
      titleIntervalRef.current = null;
    }
    
    stopContinuousBeep();
    
    setIsBeeping(false);
    setIsCompleted(false);
    localStorage.removeItem('chefbot_beep_active');
    document.title = "ChefBot";
    
    if ('vibrate' in navigator) {
      navigator.vibrate(0);
    }
  };

  const cleanupIntervals = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
      beepIntervalRef.current = null;
    }
    if (titleIntervalRef.current) {
      clearInterval(titleIntervalRef.current);
      titleIntervalRef.current = null;
    }
    if (backgroundTimerRef.current) {
      clearTimeout(backgroundTimerRef.current);
      backgroundTimerRef.current = null;
    }
  };

  const requestNotificationPermission = () => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  };

  const deleteTimer = async (timerId) => {
    try {
      await timerService.deleteTimer(timerId);
      await loadTimers();
      if (currentTimerIdRef.current === timerId) {
        stopTimer();
      }
    } catch (error) {
      console.error('Error deleting timer:', error);
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="alarm-sidebar-content">
      <div className="timer-display-section">
        <div className={`time-display ${isCompleted ? 'completed' : ''}`}>
          {formatTime(totalSeconds)}
        </div>
      </div>
      
      <div className="time-setup-section">
        <h3>Set Timer Duration</h3>
        <div className="time-inputs">
          <div className="time-input">
            <label>Minutes</label>
            <input
              type="number"
              min="0"
              max="120"
              value={minutes}
              onChange={(e) => setMinutes(Math.min(parseInt(e.target.value) || 0, 120))}
              disabled={isRunning}
            />
          </div>
          <div className="time-input">
            <label>Seconds</label>
            <input
              type="number"
              min="0"
              max="59"
              value={seconds}
              onChange={(e) => setSeconds(Math.min(parseInt(e.target.value) || 0, 59))}
              disabled={isRunning}
            />
          </div>
        </div>
        
        <div className="quick-presets">
          <h4>Quick Presets</h4>
          <div className="preset-buttons">
            {[1, 5, 10, 15, 20, 30].map(mins => (
              <button
                key={mins}
                className="preset-btn"
                onClick={() => {
                  if (!isRunning) {
                    setMinutes(mins);
                    setSeconds(0);
                    stopBeep();
                  }
                }}
                disabled={isRunning}
              >
                {mins} min
              </button>
            ))}
          </div>
        </div>
      </div>
      
      <div className="timer-controls">
        <div className="main-buttons">
          {!isRunning && !isCompleted ? (
            <button 
              className="start-btn" 
              onClick={startTimer} 
              disabled={totalSeconds <= 0 || loading}
            >
              {loading ? 'Starting...' : 'Start Timer'}
            </button>
          ) : isRunning ? (
            <button className="pause-btn" onClick={stopTimer}>
              Stop Timer
            </button>
          ) : null}
          
          <button className="reset-btn" onClick={resetTimer}>
            Reset
          </button>
        </div>
      </div>
      
      {timers.length > 0 && (
        <div className="saved-timers-section">
          <h4>Your Timers</h4>
          <div className="saved-timers-list">
            {timers.map(timer => (
              <div key={timer._id} className="saved-timer-item">
                <div>
                  <div>{timer.label}</div>
                  <small>{timer.status === 'running' ? 'Running' : 'Completed'}</small>
                </div>
                <button onClick={() => deleteTimer(timer._id)}>Delete</button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {isBeeping && (
        <div className="beep-status-active">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>Alarm is beeping!</span>
            <button onClick={stopBeep} style={{ padding: '8px 16px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Stop Beep
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlarmModal;