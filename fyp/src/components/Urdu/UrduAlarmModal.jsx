import React, { useState, useEffect, useRef } from 'react';
import './AlarmModal.css';

const UrduAlarmModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  // ✅ Global function for Header to call
  window.openAlarmModal = () => {
    console.log("✅ اردو AlarmModal کھل رہا ہے...");
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div className="urdu-alarm-modal-overlay" onClick={closeModal}></div>
      
      {/* Sidebar Modal */}
      <div className="urdu-alarm-sidebar-modal">
        <div className="urdu-alarm-sidebar-header">
          <h2>⏰ ChefBot ٹائمر</h2>
          <button className="urdu-close-btn" onClick={closeModal}>×</button>
        </div>
        
        <UrduAlarmTimerComponent />
      </div>
    </>
  );
};

// Timer Component with INSTANT Background Timer
const UrduAlarmTimerComponent = () => {
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(300);
  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isSoundPlaying, setIsSoundPlaying] = useState(false);
  
  const audioContextRef = useRef(null);
  const oscillatorRef = useRef(null);
  const gainNodeRef = useRef(null);
  const timerIntervalRef = useRef(null);
  const beepIntervalRef = useRef(null);
  const floatingNotificationRef = useRef(null);
  const titleBlinkIntervalRef = useRef(null);

  // ✅ Global beep state for Header
  window.isAlarmBeeping = isSoundPlaying;

  // ✅ Check for existing timer/beep on mount
  useEffect(() => {
    const wasBeeping = localStorage.getItem('chefbot_beep_active');
    if (wasBeeping === 'true') startContinuousBeep();

    const timerRunning = localStorage.getItem('chefbot_timer_running');
    const endTime = localStorage.getItem('chefbot_timer_endTime');
    const storedTotalSeconds = localStorage.getItem('chefbot_timer_totalSeconds');

    if (timerRunning === 'true' && endTime && storedTotalSeconds) {
      const remainingTime = parseInt(endTime) - Date.now();
      if (remainingTime > 0) {
        const remainingSeconds = Math.ceil(remainingTime / 1000);
        setTotalSeconds(remainingSeconds);
        setIsRunning(true);

        timerIntervalRef.current = setInterval(() => {
          const timeLeft = parseInt(endTime) - Date.now();
          const secondsLeft = Math.max(0, Math.ceil(timeLeft / 1000));

          if (secondsLeft <= 0) {
            clearInterval(timerIntervalRef.current);
            setIsRunning(false);
            setIsCompleted(true);
            startContinuousBeep();
            clearBackgroundTimer();
          } else {
            setTotalSeconds(secondsLeft);
          }
        }, 1000);
      } else {
        clearBackgroundTimer();
        startContinuousBeep();
      }
    }

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
      removeFloatingNotification();
      clearTitleBlinking();
    };
  }, []);

  const clearBackgroundTimer = () => {
    localStorage.removeItem('chefbot_timer_running');
    localStorage.removeItem('chefbot_timer_endTime');
    localStorage.removeItem('chefbot_timer_totalSeconds');
  };

  const clearTitleBlinking = () => {
    if (titleBlinkIntervalRef.current) {
      clearInterval(titleBlinkIntervalRef.current);
      titleBlinkIntervalRef.current = null;
    }
    document.title = "ChefBot";
  };

  const showFloatingStopNotification = () => {
    removeFloatingNotification();
    const floatingDiv = document.createElement('div');
    floatingDiv.id = 'urdu-chefbot-floating-notification';
    floatingDiv.className = 'urdu-floating-notification active';
    
    floatingDiv.innerHTML = `
      <div class="urdu-floating-notification-content">
        <div class="urdu-floating-notification-header">
          <span class="floating-icon">🔔</span>
          <span class="floating-title">ChefBot ٹائمر مکمل!</span>
          <button class="floating-close-btn" id="urdu-floating-close-btn">×</button>
        </div>
        <div class="urdu-floating-notification-body">
          <p>آپ کا ٹائمر ختم ہو گیا! الارم بج رہا ہے۔</p>
          <button class="floating-stop-btn" id="urdu-floating-stop-btn">
            ⏹️ الارم بند کریں
          </button>
        </div>
      </div>
    `;
    
    document.body.appendChild(floatingDiv);
    floatingNotificationRef.current = floatingDiv;

    setTimeout(() => {
      const closeBtn = document.getElementById('urdu-floating-close-btn');
      const stopBtn = document.getElementById('urdu-floating-stop-btn');

      if (closeBtn) closeBtn.onclick = removeFloatingNotification;
      if (stopBtn) stopBtn.onclick = () => { stopAllBeeps(); removeFloatingNotification(); };
    }, 100);

    setTimeout(() => {
      if (floatingNotificationRef.current && document.body.contains(floatingNotificationRef.current)) {
        removeFloatingNotification();
      }
    }, 30000);
  };

  const removeFloatingNotification = () => {
    if (floatingNotificationRef.current && document.body.contains(floatingNotificationRef.current)) {
      document.body.removeChild(floatingNotificationRef.current);
      floatingNotificationRef.current = null;
    }
    const existing = document.getElementById('urdu-chefbot-floating-notification');
    if (existing && existing.parentNode) existing.parentNode.removeChild(existing);
  };

  const startContinuousBeep = () => {
    try {
      const audioContext = initializeAudioContext();
      if (!audioContext) return;

      if (audioContext.state === 'suspended') audioContext.resume();

      oscillatorRef.current = audioContext.createOscillator();
      gainNodeRef.current = audioContext.createGain();

      oscillatorRef.current.connect(gainNodeRef.current);
      gainNodeRef.current.connect(audioContext.destination);

      oscillatorRef.current.frequency.value = 800;
      oscillatorRef.current.type = 'sine';

      gainNodeRef.current.gain.setValueAtTime(0, audioContext.currentTime);
      gainNodeRef.current.gain.linearRampToValueAtTime(0.5, audioContext.currentTime + 0.05);
      gainNodeRef.current.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);

      oscillatorRef.current.start();
      setIsSoundPlaying(true);
      localStorage.setItem('chefbot_beep_active', 'true');

      showFloatingStopNotification();
    } catch (error) {
      console.error("Error starting beep:", error);
    }
  };

  const initializeAudioContext = () => {
    if (!audioContextRef.current) {
      try {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch (error) {
        console.error("AudioContext fail:", error);
      }
    }
    return audioContextRef.current;
  };

  const stopAllBeeps = () => {
    if (oscillatorRef.current) {
      try { oscillatorRef.current.stop(); oscillatorRef.current.disconnect(); } catch {}
      oscillatorRef.current = null;
    }
    if (gainNodeRef.current) {
      try { gainNodeRef.current.disconnect(); } catch {}
      gainNodeRef.current = null;
    }
    clearTitleBlinking();
    setIsSoundPlaying(false);
    setIsCompleted(false);
    localStorage.removeItem('chefbot_beep_active');
    removeFloatingNotification();
    document.title = "ChefBot";
  };

  const formatTime = (timeInSeconds) => {
    const mins = Math.floor(timeInSeconds / 60);
    const secs = timeInSeconds % 60;
    return `${mins.toString().padStart(2,'0')}:${secs.toString().padStart(2,'0')}`;
  };

  const handleTimeChange = (e) => {
    const { name, value } = e.target;
    const numValue = parseInt(value) || 0;
    if (name === 'minutes') {
      setMinutes(Math.min(numValue,120));
      setTotalSeconds(Math.min(numValue,120)*60 + seconds);
    } else if (name==='seconds') {
      setSeconds(Math.min(numValue,59));
      setTotalSeconds(minutes*60 + Math.min(numValue,59));
    }
  };

  const startTimer = () => {
    if (isRunning || totalSeconds<=0) return;
    setIsRunning(true); setIsCompleted(false); stopAllBeeps();
    const endTime = Date.now() + totalSeconds*1000;
    localStorage.setItem('chefbot_timer_running','true');
    localStorage.setItem('chefbot_timer_endTime',endTime.toString());
    localStorage.setItem('chefbot_timer_totalSeconds',totalSeconds.toString());

    timerIntervalRef.current = setInterval(()=>{
      const timeLeft = endTime - Date.now();
      const secondsLeft = Math.max(0,Math.ceil(timeLeft/1000));
      if(secondsLeft<=0){
        clearInterval(timerIntervalRef.current);
        setIsRunning(false); setIsCompleted(true); startContinuousBeep(); clearBackgroundTimer();
      } else { setTotalSeconds(secondsLeft); }
    },1000);
  };

  return (
    <div className="urdu-alarm-sidebar-content">
      <div className="urdu-timer-display-section">
        <div className={`urdu-time-display ${isCompleted?'completed':''} ${isRunning?'running':''}`}>
          {formatTime(totalSeconds)}
        </div>
      </div>

      <div className="urdu-time-setup-section">
        <h3>ٹائمر سیٹ کریں</h3>
        <div className="urdu-time-inputs">
          <div className="urdu-time-input">
            <label>منٹ</label>
            <input type="number" name="minutes" min="1" max="120" value={minutes} onChange={handleTimeChange} disabled={isRunning}/>
          </div>
          <div className="urdu-time-input">
            <label>سیکنڈ</label>
            <input type="number" name="seconds" min="0" max="59" value={seconds} onChange={handleTimeChange} disabled={isRunning}/>
          </div>
        </div>
      </div>

      <div className="urdu-timer-controls">
        {!isRunning && !isCompleted ? (
          <button className="urdu-start-btn" onClick={startTimer}>شروع کریں</button>
        ) : null}
      </div>

      {isSoundPlaying && (
        <div className="urdu-beep-status-active">
          الارم بج رہا ہے!
          <button onClick={stopAllBeeps}>بند کریں</button>
        </div>
      )}
    </div>
  );
};

export default UrduAlarmModal;
