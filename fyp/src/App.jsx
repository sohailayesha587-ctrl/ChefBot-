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

import AlarmModal from './components/AlarmModal';
import SettingsSidebar from './components/SettingsSidebar';

import './App.css';

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

          <Route path="/home" element={<HomePage />} />
          
          <Route path="/urdu-home" element={<UrduHomePage />} />
          
          <Route path="/guidance" element={<BeginnersPage />} />
          
          <Route path="/measuring-skills" element={<MeasuringSkillsPage />} />
          
          <Route path="/kitchen-appliances" element={<KitchenAppliancesPage />} />
          
          <Route path="/cutting-techniques" element={<CuttingTechniquesPage />} />
          
          <Route path="/kitchen-tools" element={<KitchenToolsPage />} />
          
          <Route path="/cooking-methods" element={<CookingMethodsPage />} />
          
          <Route path="/meat-cuts" element={<MeatProcessingPage />} />
          
          <Route path="/pantry-basics" element={<PantryBasicsPage />} />
          
          <Route path="/bakery-essentials" element={<BakeryEssentialsPage />} />
          
          <Route path="/meal-suggestion" element={<MealSuggestion />} />
          
          <Route path="/change-account" element={<ChangeAccountInfoPage />} />

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