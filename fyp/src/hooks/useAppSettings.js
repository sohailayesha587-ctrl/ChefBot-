import { useState, useEffect } from 'react';
import axiosInstance from '../services/axiosConfig';

export const useAppSettings = () => {
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [language, setLanguage] = useState('en');
  const [loading, setLoading] = useState(true);

  const fetchSettings = async () => {
    try {
      const response = await axiosInstance.get('/users/settings');
      const settings = response.data.settings;

      setSoundEnabled(
        settings?.soundPreferences?.beepEnabled ?? true
      );

      setLanguage(
        settings?.displayPreferences?.language ?? 'en'
      );
    } catch (error) {
      console.error('Error fetching settings:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    soundEnabled,
    setSoundEnabled,
    language,
    setLanguage,
    loading,
    refetch: fetchSettings
  };
};
