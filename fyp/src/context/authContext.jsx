import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }

  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    const adminData = localStorage.getItem('adminData');

    if (userData) {
      try {
        setUser(JSON.parse(userData));
      } catch {
        localStorage.removeItem('userData');
        localStorage.removeItem('userToken');
      }
    }

    if (adminData) {
      try {
        setAdmin(JSON.parse(adminData));
      } catch {
        localStorage.removeItem('adminData');
        localStorage.removeItem('adminToken');
      }
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      const response = await axios.post('/api/auth/login', {
        email,
        password
      });

      const { token, user } = response.data;

      if (!token || !user) {
        return {
          success: false,
          error: 'Invalid login response from server'
        };
      }

      if (user.role === 'admin') {
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminData', JSON.stringify(user));
        setAdmin(user);
      } else {
        localStorage.setItem('userToken', token);
        localStorage.setItem('userData', JSON.stringify(user));
        setUser(user);
      }

      return {
        success: true,
        user
      };
    } catch (error) {
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          'Login failed'
      };
    }
  };

  const logout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userData');
    setUser(null);
  };

  const adminLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminData');
    setAdmin(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        admin,
        loading,
        login,
        logout,
        adminLogout,
        isAdmin: admin?.role === 'admin'
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};