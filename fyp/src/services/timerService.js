import { useState, useEffect, useRef } from 'react';

export const useTimer = () => {
  const [timers, setTimers] = useState([]);
  const [activeTimers, setActiveTimers] = useState([]);
  const [notificationPermission, setNotificationPermission] = useState(false);
  const pollingIntervalRef = useRef(null);
  const audioContextRef = useRef(null);

  const createTimer = (duration, label = 'Cooking Timer', recipeId = null) => {
    const endTime = new Date(Date.now() + duration * 1000);
    const newTimer = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      duration: duration,
      label: label,
      recipeId: recipeId,
      endTime: endTime.toISOString(),
      status: 'active',
      createdAt: new Date().toISOString()
    };
    
    setTimers(prevTimers => [...prevTimers, newTimer]);
    startBackgroundPolling();
    
    return newTimer;
  };

  const getAllTimers = () => {
    return timers;
  };

  const getActiveTimers = () => {
    const now = new Date();
    const active = timers.filter(timer => {
      const endTime = new Date(timer.endTime);
      return timer.status === 'active' && endTime > now;
    });
    setActiveTimers(active);
    return active;
  };

  const completeTimer = (timerId) => {
    setTimers(prevTimers => 
      prevTimers.map(timer => 
        timer.id === timerId 
          ? { ...timer, status: 'completed', completedAt: new Date().toISOString() }
          : timer
      )
    );
  };

  const deleteTimer = (timerId) => {
    setTimers(prevTimers => prevTimers.filter(timer => timer.id !== timerId));
  };

  const startBackgroundPolling = () => {
    if (pollingIntervalRef.current) return;
    
    pollingIntervalRef.current = setInterval(() => {
      const now = new Date();
      const active = timers.filter(timer => {
        const endTime = new Date(timer.endTime);
        return timer.status === 'active' && endTime > now;
      });
      
      active.forEach(timer => {
        const endTime = new Date(timer.endTime);
        const remaining = Math.max(0, Math.floor((endTime - now) / 1000));
        
        if (remaining === 0 && timer.status === 'active') {
          completeTimer(timer.id);
          showAlarm(timer.label);
          showBackgroundNotification(timer.label);
        }
      });
      
      setActiveTimers(active);
    }, 5000);
  };

  const stopBackgroundPolling = () => {
    if (pollingIntervalRef.current) {
      clearInterval(pollingIntervalRef.current);
      pollingIntervalRef.current = null;
    }
  };

  const showAlarm = (label) => {
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      audioContextRef.current = audioContext;
      
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
      }, 500);
    } catch(error) {
      console.log('Sound error:', error);
    }
  };

  const showBackgroundNotification = (label) => {
    if (Notification.permission === 'granted') {
      const notification = new Notification('Timer Complete!', {
        body: label + ' - Time is up!',
        requireInteraction: true,
        tag: 'chefbot-timer',
        renotify: true
      });
      
      notification.onclick = () => {
        window.focus();
        notification.close();
      };
    }
  };

  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      console.log('Notifications not supported');
      return false;
    }
    
    if (Notification.permission === 'granted') {
      setNotificationPermission(true);
      return true;
    }
    
    if (Notification.permission !== 'denied') {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setNotificationPermission(true);
        return true;
      }
    }
    
    return false;
  };

  useEffect(() => {
    requestNotificationPermission();
    
    return () => {
      stopBackgroundPolling();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    getActiveTimers();
  }, [timers]);

  return {
    timers,
    activeTimers,
    createTimer,
    getAllTimers,
    getActiveTimers,
    completeTimer,
    deleteTimer,
    startBackgroundPolling,
    stopBackgroundPolling,
    requestNotificationPermission,
    notificationPermission
  };
};