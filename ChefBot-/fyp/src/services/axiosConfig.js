let timerInterval = null;
let onTimerComplete = null;

const timerService = {
  createTimer: (duration, label = 'Cooking Timer') => {
    const endTime = Date.now() + (duration * 1000);
    
    const timer = {
      id: Date.now().toString(),
      duration: duration,
      label: label,
      endTime: endTime,
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    const timers = JSON.parse(localStorage.getItem('chefbot_timers') || '[]');
    timers.push(timer);
    localStorage.setItem('chefbot_timers', JSON.stringify(timers));
    
    timerService.startChecking();
    
    return { success: true, timer: timer };
  },

  getAllTimers: () => {
    try {
      return JSON.parse(localStorage.getItem('chefbot_timers') || '[]');
    } catch (error) {
      return [];
    }
  },

  getActiveTimers: () => {
    try {
      const timers = JSON.parse(localStorage.getItem('chefbot_timers') || '[]');
      const now = Date.now();
      return timers.filter(t => t.status === 'active' && t.endTime > now);
    } catch (error) {
      return [];
    }
  },

  completeTimer: (timerId) => {
    try {
      const timers = JSON.parse(localStorage.getItem('chefbot_timers') || '[]');
      const index = timers.findIndex(t => t.id === timerId);
      
      if (index !== -1) {
        timers[index].status = 'completed';
        timers[index].completedAt = new Date().toISOString();
        localStorage.setItem('chefbot_timers', JSON.stringify(timers));
        return { success: true };
      }
      
      return { success: false };
    } catch (error) {
      return { success: false };
    }
  },

  deleteTimer: (timerId) => {
    try {
      const timers = JSON.parse(localStorage.getItem('chefbot_timers') || '[]');
      const filtered = timers.filter(t => t.id !== timerId);
      localStorage.setItem('chefbot_timers', JSON.stringify(filtered));
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  },

  startChecking: () => {
    if (timerInterval) return;
    
    timerInterval = setInterval(() => {
      const activeTimers = timerService.getActiveTimers();
      const now = Date.now();
      
      for (const timer of activeTimers) {
        const remaining = Math.floor((timer.endTime - now) / 1000);
        
        if (remaining <= 0) {
          timerService.completeTimer(timer.id);
          
          if (onTimerComplete) {
            onTimerComplete(timer.label);
          }
          
          timerService.showAlert(timer.label);
        }
      }
    }, 1000);
  },

  stopChecking: () => {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  },

  onComplete: (callback) => {
    onTimerComplete = callback;
  },

  showAlert: (label) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("Timer Complete!", {
        body: label + " - Time's up!",
        requireInteraction: true
      });
    }
    
    try {
      const audio = new AudioContext();
      const osc = audio.createOscillator();
      const gain = audio.createGain();
      
      osc.connect(gain);
      gain.connect(audio.destination);
      osc.frequency.value = 800;
      gain.gain.value = 0.3;
      
      osc.start();
      setTimeout(() => {
        osc.stop();
        audio.close();
      }, 500);
    } catch(e) {}
  }
};

export default timerService;