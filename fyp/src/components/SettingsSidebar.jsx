import React, { useState, useEffect } from 'react'; 
import axiosInstance from '../services/axiosConfig'; 
import { showToast } from '../components/Toast';
import './SettingsSidebar.css'; 
 
const SettingsSidebar = ({ isOpen, onClose }) => { 
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const [isProfileExpanded, setIsProfileExpanded] = useState(false); 
  const [editingName, setEditingName] = useState(false); 
  const [name, setName] = useState(''); 
 
  const [soundEnabled, setSoundEnabled] = useState(true); 
  const [language, setLanguage] = useState('en'); 
 
  useEffect(() => { 
    if (isOpen) { 
      fetchProfile(); 
      fetchSettings(); 
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
      const response = await axiosInstance.get('/users/profile'); 
 
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
      const response = await axiosInstance.get('/users/settings'); 
 
      if (response.data.success) { 
        const settings = response.data.settings; 
 
        const sound = 
          settings.soundPreferences?.beepEnabled ?? true; 
 
        const lang = 
          settings.displayPreferences?.language ?? 'en'; 
 
        setSoundEnabled(sound); 
        setLanguage(lang); 
 
        localStorage.setItem('soundEnabled', String(sound)); 
        localStorage.setItem('language', lang); 
      } 
    } catch (error) { 
      console.error('Error fetching settings:', error); 
    } finally { 
      setLoading(false); 
    } 
  }; 
 
  const updateProfile = async () => { 
    try { 
      const response = await axiosInstance.put('/users/profile', { 
        name 
      }); 
 
      if (response.data.success) { 
        setUser({ 
          ...user, 
          name 
        }); 
 
        setEditingName(false); 
        setIsProfileExpanded(false); 
 
        showToast('Name updated successfully', 'success'); 
      } 
    } catch (error) { 
      showToast('Failed to update name', 'error'); 
    } 
  }; 

  const updateSettings = async () => { 
    try { 
      const response = await axiosInstance.put('/users/settings', { 
        soundPreferences: { 
          beepEnabled: soundEnabled 
        }, 
        displayPreferences: { 
          language 
        } 
      }); 
 
      if (response.data.success) { 
        localStorage.setItem('soundEnabled', String(soundEnabled)); 
        localStorage.setItem('language', language); 
      } 
    } catch (error) { 
      console.error('Error saving settings:', error); 
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
 
    return () => { 
      delete window.playTimerSound; 
      delete window.stopTimerSound; 
      delete window.isSoundEnabled; 
    }; 
  }, [soundEnabled]); 
 
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
    localStorage.removeItem('soundEnabled'); 
    localStorage.removeItem('language'); 
 
    window.location.href = '/login-page'; 
  }; 
 
  return ( 
    <> 
      <div 
        className={`sidebar-overlay ${isOpen ? 'active' : ''}`} 
        onClick={onClose} 
      /> 
 
      <div className={`settings-sidebar ${isOpen ? 'open' : ''}`}> 
        <div className="sidebar-header"> 
          <div className="header-title-section"> 
            <h2>Settings</h2> 
          </div> 
 
          <button className="close-btn" onClick={onClose}> 
            × 
          </button> 
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
                  <img 
                    src={user.profilePicture} 
                    alt={user?.name} 
                  /> 
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
                    <button 
                      className="save-btn" 
                      onClick={updateProfile} 
                    > 
                      Save 
                    </button> 
 
                    <button 
                      className="cancel-btn" 
                      onClick={() => setEditingName(false)} 
                    > 
                      Cancel 
                    </button> 
                  </div> 
                </div> 
              ) : ( 
                <div className="profile-info"> 
                  <h3 className="profile-name"> 
                    {user?.name} 
                  </h3> 
 
                  <p className="profile-email"> 
                    {user?.email} 
                  </p> 
 
                  <button 
                    className="edit-profile-btn" 
                    onClick={() => 
                      setIsProfileExpanded(!isProfileExpanded) 
                    } 
                  > 
                    Edit Profile 
                    <span 
                      className={`arrow ${ 
                        isProfileExpanded ? 'rotate' : '' 
                      }`} 
                    > 
                      ▼ 
                    </span> 
                  </button> 
 
                  {isProfileExpanded && ( 
                    <div className="profile-options"> 
                      <div className="divider"></div> 
 
                      <button 
                        className="option-btn" 
                        onClick={handleChangeName} 
                      > 
                        Change Name 
                      </button> 
 
                      <button 
                        className="option-btn" 
                        onClick={handleChangeEmail} 
                      > 
                        Change Email 
                      </button> 
 
                      <button 
                        className="option-btn" 
                        onClick={handleChangePassword} 
                      > 
                        Change Password 
                      </button> 
                    </div> 
                  )} 
                </div> 
              )} 
            </div> 
 
            <div className="settings-block"> 
              <div className="block-title"> 
                <h4>Preferences</h4> 
              </div> 
 
              <div className="setting-item"> 
                <div className="setting-left"> 
                  <div> 
                    <div className="setting-title"> 
                      Sound Effects 
                    </div> 
 
                    <div className="setting-desc"> 
                      Enable or disable recipe voice sounds 
                    </div> 
                  </div> 
                </div> 
 
                <label className="toggle"> 
                  <input 
                    type="checkbox" 
                    checked={soundEnabled} 
                    onChange={(e) => 
                      setSoundEnabled(e.target.checked) 
                    } 
                  /> 
 
                  <span className="toggle-slider"></span> 
                </label> 
              </div> 
            </div> 
 
            <div className="settings-block"> 
              <div className="block-title"> 
                <h4>Language</h4> 
              </div> 
 
              <div className="setting-item"> 
                <div className="setting-left"> 
                  <div> 
                    <div className="setting-title"> 
                      Language 
                    </div> 
 
                    <div className="setting-desc"> 
                      Choose your preferred language 
                    </div> 
                  </div> 
                </div> 
 
                <select 
                  className="language-select" 
                  value={language} 
                  onChange={(e) => 
                    setLanguage(e.target.value) 
                  } 
                > 
                  <option value="en">English</option> 
                  <option value="ur">Urdu</option> 
                </select> 
              </div> 
            </div> 
 
            <button 
              className="save-btn-main" 
              onClick={updateSettings} 
            > 
              Save Changes 
            </button> 
 
            <button 
              className="logout-btn" 
              onClick={handleLogout} 
            > 
              Sign Out 
            </button> 
          </div> 
        )} 
      </div> 
    </> 
  ); 
}; 
 
export default SettingsSidebar;