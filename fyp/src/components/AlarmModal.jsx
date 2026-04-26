// frontend/src/components/AlarmModal.jsx
import React, { useState, useEffect, useRef } from 'react';
import timerService from '../services/timerService';
import './AlarmModal.css';

const AlarmModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <>
      <div className="alarm-modal-overlay" onClick={onClose}></div>
      <div className="alarm-sidebar-modal">
        <div className="alarm-sidebar-header">
          <h2>⏰ ChefBot Timer</h2>
          <button className="close-btn" onClick={onClose}>×</button>
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
  const [backendTimers, setBackendTimers] = useState([]);
  const [loading, setLoading] = useState(false);
  
  const timerIntervalRef = useRef(null);
  const currentTimerIdRef = useRef(null);
  const beepIntervalRef = useRef(null);
  const titleIntervalRef = useRef(null);
  const backgroundTimerRef = useRef(null); // ✅ NEW: Background ke liye

  // Update total seconds when minutes/seconds change
  useEffect(() => {
    if (!isRunning) {
      setTotalSeconds((minutes * 60) + seconds);
    }
  }, [minutes, seconds, isRunning]);

  // Check for existing beep on mount
  // frontend/src/components/AlarmModal.jsx (Sirf changes dikha raha hoon)

// AlarmTimerComponent mein ye changes karo:

useEffect(() => {
  loadTimersFromBackend();
  checkExistingBeep();
  
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
  
  // ✅ Register background alarm callback
  timerService.onAlarmTrigger((label) => {
    console.log("🔔 Background alarm received:", label);
    startBeep();
  });
  
  // ✅ Start background polling (ye modal band hone par bhi chalega)
  timerService.startBackgroundPolling();
  
  window.addEventListener('beforeunload', () => {
    if (isBeeping) {
      localStorage.setItem('chefbot_beep_active', 'true');
    }
  });
  
  return () => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    if (titleIntervalRef.current) clearInterval(titleIntervalRef.current);
    if (backgroundTimerRef.current) clearTimeout(backgroundTimerRef.current);
    // ⚠️ Polling mat roko - background mein chalne do
    // timerService.stopBackgroundPolling(); // COMMENT THIS
  };
}, []);  // ✅ Empty dependency array - sirf ek baar run hoga
  // Check if beep was playing
  const checkExistingBeep = () => {
    const beepActive = localStorage.getItem('chefbot_beep_active');
    if (beepActive === 'true') {
      console.log("🔊 Restoring beep...");
      setIsCompleted(true);
      setIsBeeping(true);
      startBeep();
      showFloatingNotification();
    }
  };

  // Load timers from backend
  const loadTimersFromBackend = async () => {
    try {
      const timers = await timerService.getAllTimers();
      setBackendTimers(timers);
      
      const activeTimer = timers.find(t => t.status === 'running');
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

  // Countdown timer
  const startCountdown = (duration) => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    
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

  // Start timer
  const startTimer = async () => {
    if (isRunning || totalSeconds <= 0) return;
    
    setLoading(true);
    
    try {
      const duration = totalSeconds;
      const response = await timerService.createTimer(
        duration, 
        `${minutes}m ${seconds}s Timer`
      );
      
      const newTimer = response.timer;
      currentTimerIdRef.current = newTimer._id;
      setIsRunning(true);
      setIsCompleted(false);
      stopBeep();
      
      startCountdown(duration);
      
      // ✅ NEW: Background alarm schedule karo
      scheduleBackgroundAlarm(duration, `${minutes}m ${seconds}s Timer`);
      
      console.log(`✅ Timer started: ${duration} seconds`);
      
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to start timer');
    } finally {
      setLoading(false);
    }
  };

  // ✅ NEW: Background alarm schedule karne ke liye
  const scheduleBackgroundAlarm = (duration, label) => {
    if (backgroundTimerRef.current) clearTimeout(backgroundTimerRef.current);
    
    backgroundTimerRef.current = setTimeout(() => {
      // Ye tab band ya background mein bhi kaam karega
      triggerBackgroundAlarm(label);
    }, duration * 1000);
  };

  // ✅ NEW: Background alarm trigger
  const triggerBackgroundAlarm = (label) => {
    console.log("🔔 Background alarm triggered!");
    
    // Background notification (ye tab band hone par bhi dikhegi)
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("⏰ Timer Complete!", {
        body: `${label} - Time's up!`,
        requireInteraction: true,
        tag: "chefbot-background",
        renotify: true
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
    
    // Agar app open hai to beep bhi bajao
    if (!document.hidden) {
      startBeep();
    } else {
      // Background mein bhi sound try karo
      try {
        const audio = new Audio();
        // Small beep sound
        audio.src = 'data:audio/wav;base64,U3RlYWx0aCBMYWJz';
        audio.volume = 0.5;
        audio.play().catch(e => console.log("BG audio error:", e));
      } catch(e) {}
      
      // Store for when page opens again
      localStorage.setItem('chefbot_beep_active', 'true');
      setIsBeeping(true);
    }
  };

  // Stop timer
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
  };

  // Reset timer
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
    timerService.stopAlarm();
    removeFloatingNotification();
    
    setTotalSeconds((minutes * 60) + seconds);
    setIsRunning(false);
    setIsCompleted(false);
    
    await loadTimersFromBackend();
  };

  // Start beep
  const startBeep = () => {
    stopBeep();
    
    setIsBeeping(true);
    setIsCompleted(true);
    localStorage.setItem('chefbot_beep_active', 'true');
    
    const playBeep = () => {
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        
        if (audioContext.state === 'suspended') {
          audioContext.resume();
        }
        
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = 800;
        oscillator.type = 'sine';
        gainNode.gain.value = 0.3;
        
        oscillator.start();
        setTimeout(() => {
          oscillator.stop();
          audioContext.close();
        }, 300);
      } catch (e) {
        console.log("Beep error:", e);
      }
    };
    
    playBeep();
    beepIntervalRef.current = setInterval(playBeep, 1000);
    
    console.log("🔊 Beep started!");
    
    showFloatingNotification();
    
    // Browser notification
    if ("Notification" in window && Notification.permission === "granted") {
      const notification = new Notification("⏰ Timer Complete!", {
        body: "Click to stop alarm",
        requireInteraction: true,
        vibrate: [200, 100, 200]
      });
      notification.onclick = () => {
        stopBeep();
        notification.close();
      };
    }
    
    // Title blink
    let count = 0;
    const originalTitle = document.title;
    titleIntervalRef.current = setInterval(() => {
      if (isBeeping) {
        document.title = count % 2 === 0 ? "⏰ TIME'S UP!" : "ChefBot";
        count++;
        if (count > 100) {
          clearInterval(titleIntervalRef.current);
          document.title = originalTitle;
        }
      } else {
        clearInterval(titleIntervalRef.current);
        document.title = originalTitle;
      }
    }, 500);
    
    // Vibrate for mobile
    if ('vibrate' in navigator) {
      navigator.vibrate([200, 100, 200, 100, 200]);
    }
  };

  // Stop beep
  const stopBeep = () => {
    if (beepIntervalRef.current) {
      clearInterval(beepIntervalRef.current);
      beepIntervalRef.current = null;
    }
    
    if (titleIntervalRef.current) {
      clearInterval(titleIntervalRef.current);
      titleIntervalRef.current = null;
    }
    
    setIsBeeping(false);
    setIsCompleted(false);
    localStorage.removeItem('chefbot_beep_active');
    removeFloatingNotification();
    document.title = "ChefBot";
    
    if ('vibrate' in navigator) {
      navigator.vibrate(0);
    }
    
    console.log("🔕 Beep stopped!");
  };

  // Floating notification
  const showFloatingNotification = () => {
    removeFloatingNotification();
    
    const div = document.createElement('div');
    div.id = 'chefbot-floating-notification';
    div.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      z-index: 99999;
      background: white;
      border-radius: 10px;
      box-shadow: 0 5px 20px rgba(0,0,0,0.3);
      width: 300px;
      border-left: 5px solid #ff4757;
      font-family: Arial, sans-serif;
    `;
    div.innerHTML = `
      <div style="padding: 15px;">
        <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
          <span>🔔</span>
          <strong>ChefBot Timer Complete!</strong>
          <button id="floating-close-btn" style="background:none;border:none;font-size:20px;cursor:pointer;">×</button>
        </div>
        <div>
          <p>⏰ Time's up! Alarm is beeping.</p>
          <button id="floating-stop-btn" style="width:100%;padding:10px;background:#ff4757;color:white;border:none;border-radius:5px;cursor:pointer;font-weight:bold;">
            ⏹️ STOP BEEP
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(div);
    
    document.getElementById('floating-close-btn')?.addEventListener('click', () => removeFloatingNotification());
    document.getElementById('floating-stop-btn')?.addEventListener('click', () => stopBeep());
  };

  const removeFloatingNotification = () => {
    const existing = document.getElementById('chefbot-floating-notification');
    if (existing) existing.remove();
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const deleteTimer = async (timerId) => {
    try {
      await timerService.deleteTimer(timerId);
      await loadTimersFromBackend();
      if (currentTimerIdRef.current === timerId) {
        stopTimer();
      }
    } catch (error) {
      console.error('Error deleting timer:', error);
    }
  };

  return (
    <div className="alarm-sidebar-content">
      {/* Timer Display */}
      <div className="timer-display-section">
        <div className={`time-display ${isCompleted ? 'completed' : ''}`}>
          {formatTime(totalSeconds)}
        </div>
      </div>
      
      {/* Time Setup */}
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
      
      {/* Controls */}
      <div className="timer-controls">
        <div className="main-buttons">
          {!isRunning && !isCompleted ? (
            <button 
              className="start-btn" 
              onClick={startTimer} 
              disabled={totalSeconds <= 0 || loading}
            >
              {loading ? '⏳ STARTING...' : '🚀 START TIMER'}
            </button>
          ) : isRunning ? (
            <button className="pause-btn" onClick={stopTimer}>
              ⏸ STOP TIMER
            </button>
          ) : null}
          
          <button className="reset-btn" onClick={resetTimer}>
            🔄 RESET
          </button>
        </div>
      </div>
      
      {/* Saved Timers */}
      {backendTimers.length > 0 && (
        <div className="saved-timers-section">
          <h4>📋 Your Timers</h4>
          <div className="saved-timers-list">
            {backendTimers.map(timer => (
              <div key={timer._id} className="saved-timer-item">
                <div>
                  <div>{timer.label}</div>
                  <small>{timer.status === 'running' ? '🔴 Running' : '✅ Completed'}</small>
                </div>
                <button onClick={() => deleteTimer(timer._id)}>🗑️</button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Beep Status */}
      {isBeeping && (
        <div className="beep-status-active">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span>🔊 Alarm is beeping!</span>
            <button onClick={stopBeep} style={{ padding: '8px 16px', background: '#ff4757', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              STOP BEEP
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlarmModal;