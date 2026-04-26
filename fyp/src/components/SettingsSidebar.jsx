import React, { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosConfig';
import './SettingsSidebar.css';
import DailyReportModal from './DailyReportModal';
import { 
  getMissingNotifications, 
  markAsReplied, 
  generateReport,
  getDailyReportQuestions,
  submitReportAnswers
} from '../services/mockDailyReportService';

const SettingsSidebar = ({ isOpen, onClose }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  
  const [stats, setStats] = useState({
    totalTimers: 0,
    activeTimers: 0
  });

  // Daily Report State
  const [showDailyReport, setShowDailyReport] = useState(false);
  const [missingNotifications, setMissingNotifications] = useState([]);
  const [loadingReport, setLoadingReport] = useState(false);
  
  // Modal State
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
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const fetchProfile = async () => {
    try {
      const response = await axiosInstance.get('/users/profile');
      setUser(response.data.user);
      setName(response.data.user.name);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get('/users/settings');
      if (response.data.settings) {
        setSoundEnabled(response.data.settings.soundPreferences?.beepEnabled ?? true);
        setNotificationEnabled(response.data.settings.notificationPreferences?.browserNotification ?? true);
        setVibrationEnabled(response.data.settings.soundPreferences?.vibrationEnabled ?? true);
        setDarkMode(response.data.settings.displayPreferences?.theme === 'dark');
      }
    } catch (error) {
      console.error('Error:', error);
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
      console.error('Error:', error);
    }
  };

  // Fetch missing notifications
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

  // Handle Answer Now button click
  const handleAnswerNow = async (notificationId, reportId) => {
    try {
      setCurrentNotificationId(notificationId);
      const response = await getDailyReportQuestions(reportId);
      setCurrentReport(response.report);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error loading report questions:', error);
      alert('Failed to load report questions');
    }
  };

  // Handle submit report answers
  const handleSubmitReport = async (reportId, answers) => {
    try {
      // Submit answers
      const response = await submitReportAnswers(reportId, answers);
      alert(response.message);
      
      // Mark notification as replied
      if (currentNotificationId) {
        await markAsReplied(currentNotificationId);
      }
      
      // Refresh the missing notifications list
      await fetchMissingNotifications();
      
      // Close modal
      setIsModalOpen(false);
      setCurrentReport(null);
      setCurrentNotificationId(null);
    } catch (error) {
      console.error('Error submitting report:', error);
      alert('Failed to submit report');
    }
  };

  // Handle generate report
  const handleGenerateReport = async () => {
    try {
      setLoadingReport(true);
      const response = await generateReport();
      alert(`✅ ${response.message}`);
      await fetchMissingNotifications();
    } catch (error) {
      console.error('Error generating report:', error);
      alert('Failed to generate report');
    } finally {
      setLoadingReport(false);
    }
  };

  const updateProfile = async () => {
    try {
      await axiosInstance.put('/users/profile', { name });
      setUser({ ...user, name });
      setEditing(false);
      alert('Profile updated!');
    } catch (error) {
      alert('Failed to update profile');
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
        },
        displayPreferences: { 
          theme: darkMode ? 'dark' : 'light'
        }
      });
      alert('Settings saved!');
    } catch (error) {
      alert('Failed to save settings');
    }
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
        {/* Header with Close Button - RIGHT */}
        <div className="sidebar-header">
          <div className="header-title-section">
            <div className="title-icon">⚙️</div>
            <h2>Settings</h2>
          </div>
          <button className="close-btn-modern" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>

        {loading ? (
          <div className="loading-container">
            <div className="professional-spinner"></div>
            <p>Loading your profile...</p>
          </div>
        ) : (
          <div className="sidebar-content">
            {/* Professional User Card */}
            <div className="user-card">
              <div className="user-card-bg"></div>
              <div className="user-avatar-professional">
                {user?.profilePicture ? (
                  <img src={user.profilePicture} alt={user?.name} />
                ) : (
                  <div className="avatar-gradient">
                    {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                  </div>
                )}
                <div className="online-badge"></div>
              </div>
              
              {editing ? (
                <div className="edit-profile-container">
                  <input 
                    type="text" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    className="professional-input"
                    autoFocus
                  />
                  <div className="edit-buttons">
                    <button className="btn-save" onClick={updateProfile}>Save</button>
                    <button className="btn-cancel" onClick={() => setEditing(false)}>Cancel</button>
                  </div>
                </div>
              ) : (
                <div className="user-details">
                  <h3 className="user-name-professional">{user?.name}</h3>
                  <p className="user-email-professional">{user?.email}</p>
                  <button className="edit-profile-btn-modern" onClick={() => setEditing(true)}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M17 3L21 7L7 21H3V17L17 3Z"/>
                    </svg>
                    Edit Profile
                  </button>
                </div>
              )}
            </div>

            {/* Professional Stats Cards */}
            <div className="stats-container">
              <div className="stat-card-modern">
                <div className="stat-icon-wrapper">
                  <span>⏱️</span>
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.totalTimers}</span>
                  <span className="stat-label-modern">Total Timers</span>
                </div>
              </div>
              <div className="stat-card-modern">
                <div className="stat-icon-wrapper">
                  <span>🔔</span>
                </div>
                <div className="stat-content">
                  <span className="stat-number">{stats.activeTimers}</span>
                  <span className="stat-label-modern">Active Timers</span>
                </div>
              </div>
            </div>

            {/* DAILY REPORT BUTTON */}
            <div className="settings-container">
              <div className="section-header-left">
                <span className="section-indicator"></span>
                <h4>Daily Report</h4>
              </div>

              <button 
                className="daily-report-btn"
                onClick={() => setShowDailyReport(!showDailyReport)}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                  <polyline points="14 2 14 8 20 8"/>
                  <line x1="16" y1="13" x2="8" y2="13"/>
                  <line x1="16" y1="17" x2="8" y2="17"/>
                </svg>
                {showDailyReport ? 'Hide Daily Report' : 'View Daily Report'}
                {missingNotifications.length > 0 && (
                  <span className="report-badge">{missingNotifications.length}</span>
                )}
              </button>

              {/* Daily Report Panel */}
              {showDailyReport && (
                <div className="daily-report-panel">
                  <div className="daily-report-header">
                    <span>📋 Missing Notifications</span>
                    <button className="refresh-report-btn" onClick={fetchMissingNotifications}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M23 4v6h-6M1 20v-6h6"/>
                        <path d="M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"/>
                      </svg>
                    </button>
                  </div>

                  {loadingReport ? (
                    <div className="report-loading">Loading...</div>
                  ) : missingNotifications.length === 0 ? (
                    <div className="no-missing">
                      <span>✅ No missing notifications!</span>
                      <p>All notifications have been replied to.</p>
                    </div>
                  ) : (
                    <>
                      <div className="missing-list">
                        {missingNotifications.map((notif, index) => (
                          <div key={notif.id || index} className="missing-item">
                            <div className="missing-info">
                              <span className="missing-icon">🔔</span>
                              <div className="missing-details">
                                <div className="missing-title">{notif.title || 'Notification'}</div>
                                <div className="missing-message">{notif.message || 'No response received'}</div>
                                <div className="missing-time">
                                  Sent: {new Date(notif.sentAt).toLocaleString()}
                                </div>
                              </div>
                            </div>
                            <button 
                              className="answer-now-btn"
                              onClick={() => handleAnswerNow(notif.id, notif.reportId)}
                            >
                              📝 Answer Now
                            </button>
                          </div>
                        ))}
                      </div>

                      <div className="report-actions">
                        <button className="generate-report-btn" onClick={handleGenerateReport}>
                          📧 Generate & Send Report
                        </button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>

            {/* Settings Section */}
            <div className="settings-container">
              <div className="section-header-left">
                <span className="section-indicator"></span>
                <h4>Preferences</h4>
              </div>

              <div className="settings-list-modern">
                <div className="setting-item-modern">
                  <div className="setting-left">
                    <div className="setting-icon-modern">🔊</div>
                    <div className="setting-info-modern">
                      <span className="setting-title">Sound Effects</span>
                      <span className="setting-description">Play sound when timer ends</span>
                    </div>
                  </div>
                  <label className="toggle-modern">
                    <input type="checkbox" checked={soundEnabled} onChange={(e) => setSoundEnabled(e.target.checked)} />
                    <span className="toggle-track">
                      <span className="toggle-thumb"></span>
                    </span>
                  </label>
                </div>

                <div className="setting-item-modern">
                  <div className="setting-left">
                    <div className="setting-icon-modern">🔔</div>
                    <div className="setting-info-modern">
                      <span className="setting-title">Notifications</span>
                      <span className="setting-description">Receive browser notifications</span>
                    </div>
                  </div>
                  <label className="toggle-modern">
                    <input type="checkbox" checked={notificationEnabled} onChange={(e) => setNotificationEnabled(e.target.checked)} />
                    <span className="toggle-track">
                      <span className="toggle-thumb"></span>
                    </span>
                  </label>
                </div>

                <div className="setting-item-modern">
                  <div className="setting-left">
                    <div className="setting-icon-modern">📳</div>
                    <div className="setting-info-modern">
                      <span className="setting-title">Vibration</span>
                      <span className="setting-description">Haptic feedback on completion</span>
                    </div>
                  </div>
                  <label className="toggle-modern">
                    <input type="checkbox" checked={vibrationEnabled} onChange={(e) => setVibrationEnabled(e.target.checked)} />
                    <span className="toggle-track">
                      <span className="toggle-thumb"></span>
                    </span>
                  </label>
                </div>

                <div className="setting-item-modern">
                  <div className="setting-left">
                    <div className="setting-icon-modern">🌙</div>
                    <div className="setting-info-modern">
                      <span className="setting-title">Dark Mode</span>
                      <span className="setting-description">Switch to dark theme</span>
                    </div>
                  </div>
                  <label className="toggle-modern">
                    <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
                    <span className="toggle-track">
                      <span className="toggle-thumb"></span>
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="action-buttons-modern">
              <button className="btn-primary-modern" onClick={updateSettings}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M20 14.66V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h5.34"/>
                  <polygon points="18 2 22 6 12 16 8 16 8 12 18 2"/>
                </svg>
                Save Changes
              </button>
              
              <button className="btn-secondary-modern" onClick={handleLogout}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Daily Report Modal */}
      <DailyReportModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setCurrentReport(null);
          setCurrentNotificationId(null);
        }}
        report={currentReport}
        onSubmit={handleSubmitReport}
      />
    </>
  );
};

export default SettingsSidebar;