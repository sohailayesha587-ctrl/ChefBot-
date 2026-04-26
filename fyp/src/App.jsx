import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// ✅ Auth Context
import { useAuth } from './context/AuthContext';

// ✅ Headers & Footers
import Header from './components/Header';
import Footer from './components/Footer';
import UrduHeader from './components/Urdu/UrduHeader';
import UrduFooter from './components/Urdu/UrduFooter';

// ✅ Pages - English
import HomePage from './pages/HomePage';
import PublicHome from './pages/PublicHome';
import PantryPage from './pages/PantryPage';
import ShoppingList from './pages/ShoppingList';
import BeginnersPage from './pages/BeginnersPage';
import MeasuringSkillsPage from './pages/MeasuringSkillsPage';
import KitchenAppliancesPage from './pages/KitchenAppliancesPage';
import CuttingTechniquesPage from './pages/CuttingTechniquesPage';
import KitchenToolsPage from './pages/KitchenToolsPage';
import CookingMethodsPage from './pages/CookingMethodsPage';
import MeatProcessingPage from './pages/MeatProcessingPage';
import RecipeFeature from './pages/RecipeFeature';
import RecipeSoupPage from './pages/RecipeSoupPage';
import RecipeBakingPage from './pages/RecipeBakingPage';
import RecipeBeveragesPage from './pages/RecipeBeveragesPage';
import RecipeDessertsPage from './pages/RecipeDessertsPage';
import MealCalendar from './pages/MealCalendar';
import MealFeature from './pages/MealFeature';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import PantryBasicsPage from './pages/PantryBasicsPage';
import BakeryEssentialsPage from './pages/BakeryEssentialsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import RecipeVegetablePage from './pages/RecipeVegetablePage';
import RecipeStudentPage from './pages/RecipeStudentPage';
import RecipeRegionalPage from './pages/RecipeRegionalPage';
import RecipeSaladsPage from './pages/RecipeSaladsPage';
import RecipeSnacksPage from './pages/RecipeSnacksPage';
import RecipeQuickPage from './pages/RecipeQuickPage';
import Lunch from './pages/Lunch';
import RecipesLunch from './pages/RecipesLunch';
import RecipeBreakFast from './pages/RecipeBreakFast';
import RecipePlainVegetables from './pages/RecipePlainVegetables';
import RecipesVegChicken from './pages/RecipesVegChicken';
import RecipesVegMutton from './pages/RecipesVegMutton';
import RecipesPlainDal from './pages/RecipesPlainDal';
import RecipesDalChicken from './pages/RecipesDalChicken';
import RecipesDalMutton from './pages/RecipesDalMutton';
import RecipesEggDishes from './pages/RecipesEggDishes';
import RecipesFish from './pages/RecipesFish';
import RecipesPureChicken from './pages/RecipesPureChicken';
import RecipesPureMutton from './pages/RecipesPureMutton';
import RecipesQeema from './pages/RecipesQeema';
import RecipesRice from './pages/RecipesRice';
import RecipesHeavyGravy from './pages/RecipesHeavyGravy';
import RecipesBread from './pages/RecipesBread';
import RecipesBBQ from './pages/RecipesBBQ';
import RecipesLightDinner from './pages/RecipesLightDinner';
import Dinner from './pages/Dinner';
import RecipesDinner from './pages/RecipesDinner';
import RecipesAppetizers from './pages/RecipesAppetizers';
import RecipeCheatMeal from './pages/RecipeCheatMeal';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import ResetPasswordPage from './pages/ResetPasswordPage';
import MealSuggestion from './pages/MealSuggestion';
import RecipeDetail from './pages/RecipeDetail';

// ✅ Pages - Urdu
import UrduHomePage from './pages/Urdu/UrduHomePage';
import UrduSignUpPage from './pages/Urdu/UrduSignUpPage';
import UrduLoginPage from './pages/Urdu/UrduLoginPage';
import UrduPublicHome from './pages/Urdu/UrduPublicHome';
import UrduBeginnersPage from './pages/Urdu/UrduBeginnersPage';
import UrduCookingMethodsPage from './pages/Urdu/UrduCookingMethodsPage';
import UrduCuttingTechniquesPage from './pages/Urdu/UrduCuttingTechniquesPage';
import UrduMeasuringSkillsPage from './pages/Urdu/UrduMeasuringSkillsPage';
import UrduMeatProcessingPage from './pages/Urdu/UrduMeatProcessingPage';
import UrduKitchenToolsPage from './pages/Urdu/UrduKitchenToolsPage';

// ✅ Alarm Modal
import AlarmModal from './components/AlarmModal';
import UrduAlarmModal from './components/Urdu/UrduAlarmModal';

// ✅ Settings Sidebar
import SettingsSidebar from './components/SettingsSidebar';

// ✅ Daily Report Modal
import DailyReportModal from './components/DailyReportModal';

// ✅ Import CSS
import './App.css';

// ✅ Private Route Component
const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem('token');
  
  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }
  
  // Agar user hai ya token hai to page open karo
  if (user || token) {
    return children;
  }
  
  // Nahi to login pe bhejo
  return <Navigate to="/login-page" state={{ from: location.pathname }} replace />;
};

function AppWrapper() {
  const location = useLocation();
  
  // State for Alarm Modal
  const [isAlarmModalOpen, setIsAlarmModalOpen] = useState(false);
  const [isUrduAlarmModalOpen, setIsUrduAlarmModalOpen] = useState(false);
  
  // State for Settings Sidebar
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // State for Daily Report Modal
  const [isDailyReportOpen, setIsDailyReportOpen] = useState(false);
  const [dailyReportData, setDailyReportData] = useState(null);

  // Urdu pages ka check
  const isUrdu = location.pathname.startsWith('/urdu');

  // Function to open settings
  const openSettings = () => {
    setIsSettingsOpen(true);
  };

  // Function to close settings
  const closeSettings = () => {
    setIsSettingsOpen(false);
  };
  
  // Function to open daily report modal
  const openDailyReport = (reportData) => {
    setDailyReportData(reportData);
    setIsDailyReportOpen(true);
  };
  
  // Function to close daily report modal
  const closeDailyReport = () => {
    setIsDailyReportOpen(false);
    setDailyReportData(null);
  };

  React.useEffect(() => {
    if (!isUrdu) {
      window.openAlarmModal = () => setIsAlarmModalOpen(true);
      window.closeAlarmModal = () => setIsAlarmModalOpen(false);
      window.openSettings = openSettings;
      window.openDailyReport = openDailyReport;
    } else {
      window.openUrduAlarmModal = () => setIsUrduAlarmModalOpen(true);
      window.closeUrduAlarmModal = () => setIsUrduAlarmModalOpen(false);
      window.openUrduSettings = openSettings;
      window.openUrduDailyReport = openDailyReport;
    }
  }, [isUrdu]);

  // Auth pages jahan header nahi dikhna chahiye
  const authPages = ['/login-page', '/signup', '/forgot-password', '/verify-otp', '/reset-password'];
  const hideHeaderOnPages = authPages.includes(location.pathname) || location.pathname === '/urdu-login' || location.pathname === '/urdu-signup';
  
  // Header show karna hai ya nahi
  const shouldShowHeader = !hideHeaderOnPages && !isSettingsOpen;

  return (
    <>
      <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={isUrdu}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      
      <AlarmModal 
        isOpen={isAlarmModalOpen}
        onClose={() => setIsAlarmModalOpen(false)}
      />
      <UrduAlarmModal 
        isOpen={isUrduAlarmModalOpen}
        onClose={() => setIsUrduAlarmModalOpen(false)}
      />
      
      {/* Settings Sidebar */}
      <SettingsSidebar 
        isOpen={isSettingsOpen}
        onClose={closeSettings}
      />
      
      {/* Daily Report Modal */}
      <DailyReportModal 
        isOpen={isDailyReportOpen}
        onClose={closeDailyReport}
        report={dailyReportData}
        onSubmit={async (reportId, answers) => {
          console.log('Report submitted:', reportId, answers);
          closeDailyReport();
        }}
      />
      
      <div 
        className={`app-wrapper ${isUrdu ? 'urdu-mode' : 'english-mode'}`} 
        dir={isUrdu ? "rtl" : "ltr"}
      >
        {/* Header - Sirf tab show hoga jab settings band ho aur auth page na ho */}
        {shouldShowHeader && (
          isUrdu ? 
            <UrduHeader onSettingsClick={openSettings} /> : 
            <Header onSettingsClick={openSettings} />
        )}

        <Routes>
          {/* ===== PUBLIC ROUTES (Bina Login) ===== */}
          <Route path="/" element={<PublicHome />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          
          {/* ===== Urdu Public Routes ===== */}
          <Route path="/urdu" element={<UrduPublicHome />} />
          <Route path="/urdu-signup" element={<UrduSignUpPage />} />
          <Route path="/urdu-login" element={<UrduLoginPage />} />

          {/* ===== PRIVATE ROUTES (Login Required) ===== */}
          <Route path="/home" element={<PrivateRoute><HomePage /></PrivateRoute>} />
          <Route path="/smart-pantry" element={<PrivateRoute><PantryPage /></PrivateRoute>} />
          <Route path="/smart-shopping" element={<PrivateRoute><ShoppingList /></PrivateRoute>} />
          <Route path="/guidance" element={<PrivateRoute><BeginnersPage /></PrivateRoute>} />
          <Route path="/measuring-skills" element={<PrivateRoute><MeasuringSkillsPage /></PrivateRoute>} />
          <Route path="/kitchen-appliances" element={<PrivateRoute><KitchenAppliancesPage /></PrivateRoute>} />
          <Route path="/cutting-techniques" element={<PrivateRoute><CuttingTechniquesPage /></PrivateRoute>} />
          <Route path="/kitchen-tools" element={<PrivateRoute><KitchenToolsPage /></PrivateRoute>} />
          <Route path="/cooking-methods" element={<PrivateRoute><CookingMethodsPage /></PrivateRoute>} />
          <Route path="/meat-cuts" element={<PrivateRoute><MeatProcessingPage /></PrivateRoute>} />
          <Route path="/pantry-basics" element={<PrivateRoute><PantryBasicsPage /></PrivateRoute>} />
          <Route path="/recipes" element={<PrivateRoute><RecipeFeature /></PrivateRoute>} />
          <Route path="/soups" element={<PrivateRoute><RecipeSoupPage /></PrivateRoute>} />
          <Route path="/Beverages" element={<PrivateRoute><RecipeBeveragesPage /></PrivateRoute>} />
          <Route path="/desserts" element={<PrivateRoute><RecipeDessertsPage /></PrivateRoute>} />
          <Route path="/baking" element={<PrivateRoute><RecipeBakingPage /></PrivateRoute>} />
          <Route path="/meal-planner" element={<PrivateRoute><MealFeature /></PrivateRoute>} />
          <Route path="/bakery-essentials" element={<PrivateRoute><BakeryEssentialsPage /></PrivateRoute>} />
          <Route path="/Vege" element={<PrivateRoute><RecipeVegetablePage /></PrivateRoute>} />
          <Route path="/QuickRecipe" element={<PrivateRoute><RecipeQuickPage /></PrivateRoute>} />
          <Route path="/StudentRecipe" element={<PrivateRoute><RecipeStudentPage /></PrivateRoute>} />
          <Route path="/Regional" element={<PrivateRoute><RecipeRegionalPage /></PrivateRoute>} />
          <Route path="/Salads" element={<PrivateRoute><RecipeSaladsPage /></PrivateRoute>} />
          <Route path="/Snack" element={<PrivateRoute><RecipeSnacksPage /></PrivateRoute>} />
          <Route path="/lunch" element={<PrivateRoute><Lunch /></PrivateRoute>} />
          <Route path="/recipe-lunch" element={<PrivateRoute><RecipesLunch /></PrivateRoute>} />
          <Route path="/BreakFast" element={<PrivateRoute><RecipeBreakFast /></PrivateRoute>} />
          <Route path="/plain-veg" element={<PrivateRoute><RecipePlainVegetables /></PrivateRoute>} />
          <Route path="/veg-chick" element={<PrivateRoute><RecipesVegChicken /></PrivateRoute>} />
          <Route path="/veg-mutton" element={<PrivateRoute><RecipesVegMutton /></PrivateRoute>} />
          <Route path="/plain-dal" element={<PrivateRoute><RecipesPlainDal /></PrivateRoute>} />
          <Route path="/dal-chick" element={<PrivateRoute><RecipesDalChicken /></PrivateRoute>} />
          <Route path="/dal-mutton" element={<PrivateRoute><RecipesDalMutton /></PrivateRoute>} />
          <Route path="/egg-dishes" element={<PrivateRoute><RecipesEggDishes /></PrivateRoute>} />
          <Route path="/fish-dishes" element={<PrivateRoute><RecipesFish /></PrivateRoute>} />
          <Route path="/chicken" element={<PrivateRoute><RecipesPureChicken /></PrivateRoute>} />
          <Route path="/mutton" element={<PrivateRoute><RecipesPureMutton /></PrivateRoute>} />
          <Route path="/qeema" element={<PrivateRoute><RecipesQeema /></PrivateRoute>} />
          <Route path="/rice" element={<PrivateRoute><RecipesRice /></PrivateRoute>} />
          <Route path="/gravy" element={<PrivateRoute><RecipesHeavyGravy /></PrivateRoute>} />
          <Route path="/BBQ" element={<PrivateRoute><RecipesBBQ /></PrivateRoute>} />
          <Route path="/dinner" element={<PrivateRoute><Dinner /></PrivateRoute>} />
          <Route path="/recipe-dinner" element={<PrivateRoute><RecipesDinner /></PrivateRoute>} />
          <Route path="/breads" element={<PrivateRoute><RecipesBread /></PrivateRoute>} />
          <Route path="/appetizers" element={<PrivateRoute><RecipesAppetizers /></PrivateRoute>} />
          <Route path="/dinner-light" element={<PrivateRoute><RecipesLightDinner /></PrivateRoute>} />
          <Route path="/cheat-meal" element={<PrivateRoute><RecipeCheatMeal /></PrivateRoute>} />
          <Route path="/meal-suggestion" element={<PrivateRoute><MealSuggestion /></PrivateRoute>} />
          <Route path="/recipe/:id" element={<PrivateRoute><RecipeDetail /></PrivateRoute>} />
          <Route path="/meal-calendar" element={<PrivateRoute><MealCalendar /></PrivateRoute>} />

          {/* ===== Urdu Private Routes ===== */}
          <Route path="/urdu-home" element={<PrivateRoute><UrduHomePage /></PrivateRoute>} />
          <Route path="/urdu-guidance" element={<PrivateRoute><UrduBeginnersPage /></PrivateRoute>} />
          <Route path="/urdu-cooking-methods" element={<PrivateRoute><UrduCookingMethodsPage /></PrivateRoute>} />
          <Route path="/urdu-cutting-techniques" element={<PrivateRoute><UrduCuttingTechniquesPage /></PrivateRoute>} />
          <Route path="/urdu-measuring-skills" element={<PrivateRoute><UrduMeasuringSkillsPage /></PrivateRoute>} />
          <Route path="/urdu-meat-processing" element={<PrivateRoute><UrduMeatProcessingPage /></PrivateRoute>} />
          <Route path="/urdu-kitchen-tools" element={<PrivateRoute><UrduKitchenToolsPage /></PrivateRoute>} />
                    <Route path="/urdu-public" element={<PrivateRoute><UrduPublicHome /></PrivateRoute>} />

          {/* ===== Catch All ===== */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {isUrdu ? <UrduFooter /> : <Footer />}
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