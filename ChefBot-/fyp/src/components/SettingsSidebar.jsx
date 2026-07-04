import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosConfig';
import './SettingsSidebar.css';

const SettingsSidebar = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isProfileExpanded, setIsProfileExpanded] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [name, setName] = useState('');
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  
  const [showEditMenu, setShowEditMenu] = useState(false);
  const [stats, setStats] = useState({
    totalTimers: 0,
    activeTimers: 0
  });

  const [showDailyReport, setShowDailyReport] = useState(false);
  const [missingNotifications, setMissingNotifications] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentReport, setCurrentReport] = useState(null);
  const [currentNotificationId, setCurrentNotificationId] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
      fetchSettings();
      fetchStats();
      fetchMissingNotifications();
      document.body.style.overflow = 'hidden';
    } else {
      setIsProfileExpanded(false);
      setEditingName(false);
      setShowEditMenu(false);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/users/profile');
      setUser(response.data.user);
      setName(response.data.user.name);
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get('/users/settings');
      if (response.data.settings) {
        setSoundEnabled(response.data.settings.soundPreferences?.beepEnabled ?? true);
        setNotificationEnabled(response.data.settings.notificationPreferences?.browserNotification ?? true);
        setVibrationEnabled(response.data.settings.soundPreferences?.vibrationEnabled ?? true);
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/users/stats');
      setStats({
        totalTimers: response.data.stats?.totalTimers || 0,
        activeTimers: response.data.stats?.activeTimers || 0
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const fetchMissingNotifications = async () => {
    try {
      setLoadingReport(true);
      const response = await getMissingNotifications();
      setMissingNotifications(response.notifications || []);
    } catch (error) {
      console.error('Error fetching missing notifications:', error);
      setMissingNotifications([]);
    } finally {
      setLoadingReport(false);
    }
  };

  const handleAnswerNow = async (notificationId, reportId) => {
    try {
      setCurrentNotificationId(notificationId);
      const response = await getDailyReportQuestions(reportId);
      setCurrentReport(response.report);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to load report questions');
    }
  };

  const handleSubmitReport = async (reportId, answers) => {
    try {
      const response = await submitReportAnswers(reportId, answers);
      alert(response.message);
      if (currentNotificationId) {
        await markAsReplied(currentNotificationId);
      }
      await fetchMissingNotifications();
      setIsModalOpen(false);
      setCurrentReport(null);
      setCurrentNotificationId(null);
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit report');
    }
  };

  const handleGenerateReport = async () => {
    try {
      setLoadingReport(true);
      const response = await generateReport();
      alert(response.message);
      await fetchMissingNotifications();
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate report');
    }
  };

  const updateName = async () => {
    try {
      await axiosInstance.put('/users/profile', { name });
      setUser({ ...user, name });
      setEditingName(false);
      setIsProfileExpanded(false);
      alert('Name updated successfully!');
    } catch (error) {
      alert('Failed to update name');
    }
  };

  const updateSettings = async () => {
    try {
      await axiosInstance.put('/users/settings', {
        soundPreferences: { 
          beepEnabled: soundEnabled,
          vibrationEnabled: vibrationEnabled 
        },
        notificationPreferences: { 
          browserNotification: notificationEnabled 
        }
      });
      
      localStorage.setItem('soundEnabled', soundEnabled);
      localStorage.setItem('vibrationEnabled', vibrationEnabled);
      localStorage.setItem('notificationEnabled', notificationEnabled);
      
      if (notificationEnabled && Notification.permission === 'default') {
        Notification.requestPermission();
      }
      
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
  };

  const playSound = () => {
    if (soundEnabled) {
      const audio = new Audio('/timer-sound.mp3');
      audio.play().catch(e => console.log('Sound play failed:', e));
    }
  };

  const stopSound = () => {};

  useEffect(() => {
    window.playTimerSound = playSound;
    window.stopTimerSound = stopSound;
    window.isSoundEnabled = () => soundEnabled;
    window.isVibrationEnabled = () => vibrationEnabled;
  }, [soundEnabled, vibrationEnabled]);

  const handleChangeName = () => {
    setEditingName(true);
    setIsProfileExpanded(false);
  };

  const handleChangeEmail = () => {
    window.location.href = '/change-account?type=email';
  };

  const handleChangePassword = () => {
    window.location.href = '/forgot-password';
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/login-page';
  };

  return (
    <>
      <div className={`sidebar-overlay ${isOpen ? 'active' : ''}`} onClick={onClose} />
      
      <div className={`settings-sidebar ${isOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <div className="header-title-section">
            <span className="title-icon"></span>
            <h2>Settings</h2>
          </div>
          <button className="close-btn" onClick={onClose}>X</button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="spinner"></div>
            <p>Loading...</p>
          </div>
        ) : (
          <div className="sidebar-content">
            <div className="profile-card">
              <div className="profile-avatar">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt={user?.name} />
                ) : (
                  <div className="avatar">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
              </div>
              
              {editingName ? (
                <div className="edit-name-container">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="name-input"
                    autoFocus
                  />
                  <div className="edit-btns">
                    <button className="save-btn" onClick={updateName}>Save</button>
                    <button className="cancel-btn" onClick={() => setEditingName(false)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="profile-info">
                  <h3 className="profile-name">{user?.name}</h3>
                  <p className="profile-email">{user?.email}</p>
                  
                  <button 
                    className="edit-profile-btn" 
                    onClick={() => setIsProfileExpanded(!isProfileExpanded)}
                  >
                    Edit Profile
                    <span className={`arrow ${isProfileExpanded ? 'rotate' : ''}`}>▼</span>
                  </button>

                  {isProfileExpanded && (
                    <div className="profile-options">
                      <div className="divider"></div>
                      <button className="option-btn" onClick={handleChangeName}>
                        Change Name
                      </button>
                      <button className="option-btn" onClick={handleChangeEmail}>
                        Change Email
                      </button>
                      <button className="option-btn" onClick={handleChangePassword}>
                        Change Password
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="stats-row">
              <div className="stat-card">
                <span className="stat-icon"></span>
                <div>
                  <div className="stat-number">{stats.totalTimers}</div>
                  <div className="stat-label">Total Timers</div>
                </div>
              </div>
              <div className="stat-card">
                <span className="stat-icon"></span>
                <div>
                  <div className="stat-number">{stats.activeTimers}</div>
                  <div className="stat-label">Active Timers</div>
                </div>
              </div>
            </div>

            <div className="settings-block">
              <div className="block-title">
                <span className="title-line"></span>
                <h4>Daily Report</h4>
              </div>

              <button 
                className="report-btn"
                onClick={() => setShowDailyReport(!showDailyReport)}
              >
                {showDailyReport ? 'Hide Daily Report' : 'View Daily Report'}
                {missingNotifications.length > 0 && (
                  <span className="badge">{missingNotifications.length}</span>
                )}
              </button>

              {showDailyReport && (
                <div className="report-panel">
                  {loadingReport ? (
                    <p>Loading...</p>
                  ) : missingNotifications.length === 0 ? (
                    <div className="empty-state">No missing notifications!</div>
                  ) : (
                    <>
                      {missingNotifications.map((notif, idx) => (
                        <div key={idx} className="notification-item">
                          <div>
                            <div className="notif-title">{notif.title}</div>
                            <div className="notif-msg">{notif.message}</div>
                          </div>
                          <button 
                            className="answer-btn"
                            onClick={() => handleAnswerNow(notif.id, notif.reportId)}
                          >
                            Answer
                          </button>
                        </div>
                      ))}
                      <button className="generate-btn" onClick={handleGenerateReport}>
                        Generate Report
                      </button>
                    </>
                  )}
                </div>
              )}
            </div>

            <div className="settings-block">
              <div className="block-title">
                <span className="title-line"></span>
                <h4>Preferences</h4>
              </div>

              <div className="setting-item">
                <div className="setting-left">
                  <span></span>
                  <div>
                    <div className="setting-title">Sound Effects</div>
                    <div className="setting-desc">Play sound when timer ends</div>
                  </div>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-left">
                  <span></span>
                  <div>
                    <div className="setting-title">Notifications</div>
                    <div className="setting-desc">Receive browser notifications</div>
                  </div>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={notificationEnabled} onChange={(e) => setNotificationEnabled(e.target.checked)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-item">
                <div className="setting-left">
                  <span></span>
                  <div>
                    <div className="setting-title">Vibration</div>
                    <div className="setting-desc">Haptic feedback on completion</div>
                  </div>
                </div>
                <label className="toggle">
                  <input type="checkbox" checked={vibrationEnabled} onChange={(e) => setVibrationEnabled(e.target.checked)} />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            <button className="save-btn-main" onClick={updateSettings}>
              Save Changes
            </button>
            
            <button className="logout-btn" onClick={handleLogout}>
              Sign Out
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default SettingsSidebar;