import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Header from './components/Header';
import Footer from './components/Footer';

import HomePage from './pages/HomePage';
import PublicHome from './pages/PublicHome';
import BeginnersPage from './pages/BeginnersPage';
import MeasuringSkillsPage from './pages/MeasuringSkillsPage';
import KitchenAppliancesPage from './pages/KitchenAppliancesPage';
import CuttingTechniquesPage from './pages/CuttingTechniquesPage';
import KitchenToolsPage from './pages/KitchenToolsPage';
import CookingMethodsPage from './pages/CookingMethodsPage';
import MeatProcessingPage from './pages/MeatProcessingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PantryBasicsPage from './pages/PantryBasicsPage';
import BakeryEssentialsPage from './pages/BakeryEssentialsPage';
import MealSuggestion from './pages/MealSuggestion';
import ChangeAccountInfoPage from './pages/ChangeAccountInfoPage';

import UrduHomePage from './pages/Urdu/UrduHomePage';
import UrduLoginPage from './pages/Urdu/UrduLoginPage';
import UrduPublicHome from './pages/Urdu/UrduPublicHome';
import UrduSignUpPage from './pages/Urdu/UrduSignUpPage';

import AlarmModal from './components/AlarmModal';
import SettingsSidebar from './components/SettingsSidebar';

import './App.css';

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    return children;
  }
  
  return <Navigate to="/login-page" replace />;
};

function AppWrapper() {
  const location = useLocation();
  
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  React.useEffect(() => {
    window.openAlarmModal = () => setIsAlarmModalOpen(true);
    window.closeAlarmModal = () => setIsAlarmModalOpen(false);
    window.openSettings = openSettings;
  }, []);

  const authPages = ['/login-page', '/signup', '/forgot-password', '/verify-otp', '/reset-password'];
  const hideHeaderOnPages = authPages.includes(location.pathname);
  const shouldShowHeader = !hideHeaderOnPages && !isSettingsOpen;

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <AlarmModal isOpen={isAlarmModalOpen} onClose={() => setIsAlarmModalOpen(false)} />
      
      <SettingsSidebar isOpen={isSettingsOpen} onClose={closeSettings} />
      
      <div className="app-wrapper english-mode" dir="ltr">
        {shouldShowHeader && (
          <Header onSettingsClick={openSettings} />
        )}

        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/urdu" element={<UrduPublicHome />} />
          <Route path="/urdu-login" element={<UrduLoginPage />} />
          <Route path="/urdu-signup" element={<UrduSignUpPage />} />

          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          
          <Route path="/urdu-home" element={<PrivateRoute><UrduHomePage /></PrivateRoute>} />
          
          <Route path="/guidance" element={<PrivateRoute><BeginnersPage /></PrivateRoute>} />
          
          <Route path="/measuring-skills" element={<PrivateRoute><MeasuringSkillsPage /></PrivateRoute>} />
          
          <Route path="/kitchen-appliances" element={<PrivateRoute><KitchenAppliancesPage /></PrivateRoute>} />
          
          <Route path="/cutting-techniques" element={<PrivateRoute><CuttingTechniquesPage /></PrivateRoute>} />
          
          <Route path="/kitchen-tools" element={<PrivateRoute><KitchenToolsPage /></PrivateRoute>} />
          
          <Route path="/cooking-methods" element={<PrivateRoute><CookingMethodsPage /></PrivateRoute>} />
          
          <Route path="/meat-cuts" element={<PrivateRoute><MeatProcessingPage /></PrivateRoute>} />
          
          <Route path="/pantry-basics" element={<PrivateRoute><PantryBasicsPage /></PrivateRoute>} />
          
          <Route path="/bakery-essentials" element={<PrivateRoute><BakeryEssentialsPage /></PrivateRoute>} />
          
          <Route path="/meal-suggestion" element={<PrivateRoute><MealSuggestion /></PrivateRoute>} />
          
          <Route path="/change-account" element={<PrivateRoute><ChangeAccountInfoPage /></PrivateRoute>} />

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppWrapper />
    </Router>
  );
}

export default App;