import React, { useState, useEffect } from 'react';
import { getPendingReport } from '../services/dailyReportService';
import './NotificationBell.css';

const NotificationBell = ({ onNotificationClick }) => {
  const [hasPending, setHasPending] = useState(false);
  const [checking, setChecking] = useState(false);

  const checkPendingReport = async () => {
    setChecking(true);
    const result = await getPendingReport();
    if (result.success) {
      setHasPending(result.hasPending === true);
    }
    setChecking(false);
  };

  useEffect(() => {
    checkPendingReport();
    
    const interval = setInterval(checkPendingReport, 5 * 60 * 1000);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <button 
      className={`notification-bell ${hasPending ? 'has-notification' : ''}`}
      onClick={onNotificationClick}
    >
      <span className="bell-icon">Bell</span>
      {hasPending && <span className="notification-dot"></span>}
    </button>
  );
};

export default NotificationBell;