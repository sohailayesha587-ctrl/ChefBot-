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
  const [theme, setTheme] = useState('light');
  const [language, setLanguage] = useState('en');
  
  const [stats, setStats] = useState({
    totalTimers: 0,
    activeTimers: 0,
    completedTimers: 0
  });

  useEffect(() => {
    if (isOpen) {
      fetchProfile();
      fetchSettings();
      fetchStats();
      document.body.style.overflow = 'hidden';
    } else {
      setIsProfileExpanded(false);
      setEditingName(false);
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/api/users/profile');
      if (response.data.success) {
        setUser(response.data.user);
        setName(response.data.user.name);
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get('/api/users/settings');
      if (response.data.success) {
        const settings = response.data.settings;
        setSoundEnabled(settings.soundPreferences?.timerSound === 'default' ?? true);
        setNotificationEnabled(settings.notificationPreferences?.emailNotifications ?? true);
        setVibrationEnabled(settings.soundPreferences?.volume > 0 ?? true);
        setTheme(settings.displayPreferences?.theme || 'light');
        setLanguage(settings.displayPreferences?.language || 'en');
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await axiosInstance.get('/api/users/stats');
      if (response.data.success) {
        setStats({
          totalTimers: response.data.stats?.totalTimers || 0,
          activeTimers: response.data.stats?.activeTimers || 0,
          completedTimers: response.data.stats?.completedTimers || 0
        });
      }
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const updateProfile = async () => {
    try {
      const response = await axiosInstance.put('/api/users/profile', { name });
      if (response.data.success) {
        setUser({ ...user, name });
        setEditingName(false);
        setIsProfileExpanded(false);
        alert('Name updated successfully');
      }
    } catch (error) {
      alert('Failed to update name');
    }
  };

  const updateSettings = async () => {
    try {
      const response = await axiosInstance.put('/api/users/settings', {
        soundPreferences: {
          timerSound: soundEnabled ? 'default' : 'none',
          volume: vibrationEnabled ? 70 : 0
        },
        notificationPreferences: {
          emailNotifications: notificationEnabled,
          pushNotifications: notificationEnabled,
          timerReminders: notificationEnabled
        },
        displayPreferences: {
          theme: theme,
          language: language
        }
      });
      
      if (response.data.success) {
        localStorage.setItem('soundEnabled', soundEnabled);
        localStorage.setItem('vibrationEnabled', vibrationEnabled);
        localStorage.setItem('notificationEnabled', notificationEnabled);
        localStorage.setItem('theme', theme);
        localStorage.setItem('language', language);
        
        if (notificationEnabled && Notification.permission === 'default') {
          Notification.requestPermission();
        }
        
        alert('Settings saved successfully');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      alert('Failed to save settings');
    }
  };

  const playSound = () => {
    if (soundEnabled) {
      const audio = new Audio('/timer-sound.mp3');
      audio.play().catch(() => {});
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
            <h2>Settings</h2>
          </div>
          <button className="close-btn" onClick={onClose}>×</button>
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
                    <button className="save-btn" onClick={updateProfile}>Save</button>
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
                <div>
                  <div className="stat-number">{stats.totalTimers}</div>
                  <div className="stat-label">Total Timers</div>
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-number">{stats.activeTimers}</div>
                  <div className="stat-label">Active Timers</div>
                </div>
              </div>
              <div className="stat-card">
                <div>
                  <div className="stat-number">{stats.completedTimers}</div>
                  <div className="stat-label">Completed</div>
                </div>
              </div>
            </div>

            <div className="settings-block">
              <div className="block-title">
                <h4>Preferences</h4>
              </div>

              <div className="setting-item">
                <div className="setting-left">
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

            <div className="settings-block">
              <div className="block-title">
                <h4>Appearance</h4>
              </div>

              <div className="setting-item">
                <div className="setting-left">
                  <div>
                    <div className="setting-title">Theme</div>
                    <div className="setting-desc">Choose your preferred theme</div>
                  </div>
                </div>
                <select 
                  className="theme-select"
                  value={theme} 
                  onChange={(e) => setTheme(e.target.value)}
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="system">System</option>
                </select>
              </div>

              <div className="setting-item">
                <div className="setting-left">
                  <div>
                    <div className="setting-title">Language</div>
                    <div className="setting-desc">Choose your preferred language</div>
                  </div>
                </div>
                <select 
                  className="language-select"
                  value={language} 
                  onChange={(e) => setLanguage(e.target.value)}
                >
                  <option value="en">English</option>
                  <option value="ur">Urdu</option>
                </select>
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