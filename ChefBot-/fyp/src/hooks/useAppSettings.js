import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosConfig';

export const useAppSettings = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [notificationEnabled, setNotificationEnabled] = useState(true);
  const [vibrationEnabled, setVibrationEnabled] = useState(true);
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get('/users/settings');
      setSoundEnabled(response.data.settings?.soundPreferences?.beepEnabled ?? true);
      setVibrationEnabled(response.data.settings?.soundPreferences?.vibrationEnabled ?? true);
      setNotificationEnabled(response.data.settings?.notificationPreferences?.browserNotification ?? true);
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return { soundEnabled, notificationEnabled, vibrationEnabled, loading, refetch: fetchSettings };
};