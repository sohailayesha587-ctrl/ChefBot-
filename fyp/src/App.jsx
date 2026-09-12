import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { SocketProvider } from './context/SocketContext';
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
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import SignUpPage from './pages/SignUpPage';
import PantryBasicsPage from './pages/PantryBasicsPage';
import BakeryEssentialsPage from './pages/BakeryEssentialsPage';
import MealSuggestion from './pages/MealSuggestion';
import ChangeAccountInfoPage from './pages/ChangeAccountInfoPage';
import PantryFeature from './pages/PantryFeature';
import ContactPage from './pages/ContactPage';
import AboutPage from './pages/AboutPage';
import ShoppingList from './pages/ShoppingList';
import MealFeature from './pages/MealFeature';
import SettingsSidebar from './components/SettingsSidebar';
import RecipeDessertsPage from './pages/RecipeDessertsPage';
import RecipesSoupsPage from './pages/RecipesSoupsPage';
import RecipeCheatMealPage from './pages/RecipeCheatMealPage';
import RecipeBeveragePage from './pages/RecipeBeveragePage';
import RecipeBakingPage from './pages/RecipeBakingPage';
import RecipesRegionalPage from './pages/RecipesRegionalPage';
import RecipesSaladsPage from './pages/RecipesSaladsPage';
import RecipesSnacksPage from './pages/RecipesSnacksPage';
import RecipesStudentsPage from './pages/RecipesStudentsPage';
import RecipeQuickPage from './pages/RecipeQuickPage';
import RecipesVegePage from './pages/RecipesVegePage';
import RecipesHeavyGravy from './pages/RecipesHeavyGravy';
import RecipesFish from './pages/RecipesFish';
import MyRecipeHomepage from './pages/MyRecipeHomePage';
import Lunch from './pages/Lunch';
import RecipeBreakfast from './pages/RecipeBreakfast';
import RecipesBread from './pages/RecipesBread';
import RecipesEggDishes from './pages/RecipesEggDishes';
import RecipesBBQ from './pages/RecipesBBQ';
import RecipesDalMutton from './pages/RecipesDalMutton';
import RecipesDinner from './pages/RecipesDinner';
import RecipesAppetizers from './pages/RecipesAppetizers';
import RecipesPlainDal from './pages/RecipesPlainDal';
import RecipesPureChicken from './pages/RecipesPureChicken';
import RecipePlainVegetables from './pages/RecipePlainVegetables';
import RecipesPureMutton from './pages/RecipesPureMutton';
import RecipesQeema from './pages/RecipesQeema';
import RecipesVegChicken from './pages/RecipesVegChicken';
import RecipesVegMutton from './pages/RecipesVegMutton';
import RecipesRice from './pages/RecipesRice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import ResetPasswordPage from './pages/ResetPasswordPage';
import VerifyOTPPage from './pages/VerifyOTPPage';
import RecipeBreakFast from './pages/RecipeBreakfast';
import RecipeDetail from './pages/RecipeDetail';
import SearchResults from './pages/SearchResults';
import RecipesLunch from './pages/RecipesLunch';
import Dashboard from './pages/Dashboard';
import LanguagePopup from './components/LanguagePopup';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function AppWrapper() {
  const location = useLocation();
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [language, setLanguage] = useState('en');
const [showLanguagePopup, setShowLanguagePopup] = useState(
  sessionStorage.getItem('languagePopupSelected') !== 'true'
);
  const isUrdu = language === 'ur';

  const openSettings = () => setIsSettingsOpen(true);
  const closeSettings = () => setIsSettingsOpen(false);

  React.useEffect(() => {
    const isUrdu = document.cookie.includes('googtrans=/en/ur');

    if (isUrdu) {
      setLanguage('ur');
    }
  }, []);

  React.useEffect(() => {
    const direction = isUrdu ? 'rtl' : 'ltr';
    const lang = isUrdu ? 'ur' : 'en';

    document.documentElement.setAttribute('dir', direction);
    document.documentElement.setAttribute('lang', lang);

    document.body.setAttribute('dir', direction);

    document.body.classList.remove('urdu-mode', 'english-mode');
    document.body.classList.add(
      isUrdu ? 'urdu-mode' : 'english-mode'
    );
  }, [isUrdu]);

  React.useEffect(() => {
    const originalSpeak = window.speechSynthesis?.speak;

    if (!originalSpeak) {
      return;
    }

    window.speechSynthesis.speak = function (utterance) {
      const soundEnabled = localStorage.getItem('soundEnabled');

      if (soundEnabled === 'false') {
        return;
      }

      originalSpeak.call(window.speechSynthesis, utterance);
    };

    return () => {
      window.speechSynthesis.speak = originalSpeak;
    };
  }, []);

  React.useEffect(() => {
    window.openSettings = openSettings;

    return () => {
      delete window.openSettings;
    };
  }, []);

  const authPages = [
    '/login-page',
    '/dashboard',
    '/forgot-password',
    '/verify-otp',
    '/reset-password',
    '/change-account'
  ];

  const hideHeaderOnPages = authPages.includes(location.pathname);
  const shouldShowHeader = !hideHeaderOnPages && !isSettingsOpen;

  return (
    <>
      <ToastContainer />

      <SettingsSidebar
        isOpen={isSettingsOpen}
        onClose={closeSettings}
      />

      <div
        className={`app-wrapper ${
          isUrdu ? 'urdu-mode' : 'english-mode'
        }`}
        dir={isUrdu ? 'rtl' : 'ltr'}
      >
        <ScrollToTop />

        {shouldShowHeader && (
          <Header
            onSettingsClick={openSettings}
            onLanguageChange={setLanguage}
          />
        )}

        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/beginners" element={<BeginnersPage />} />
          <Route path="/measuring-skills" element={<MeasuringSkillsPage />} />
          <Route path="/kitchen-appliances" element={<KitchenAppliancesPage />} />
          <Route path="/cutting-techniques" element={<CuttingTechniquesPage />} />
          <Route path="/kitchen-tools" element={<KitchenToolsPage />} />
          <Route path="/cooking-methods" element={<CookingMethodsPage />} />
          <Route path="/meat-processing" element={<MeatProcessingPage />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/pantry-basics" element={<PantryBasicsPage />} />
          <Route path="/bakery-essentials" element={<BakeryEssentialsPage />} />
          <Route path="/meal-suggestion" element={<MealSuggestion />} />
          <Route path="/change-account" element={<ChangeAccountInfoPage />} />
          <Route path="/pantry-feature" element={<PantryFeature />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/shopping-list" element={<ShoppingList />} />
          <Route path="/meal-feature" element={<MealFeature />} />
          <Route path="/recipe-desserts" element={<RecipeDessertsPage />} />
          <Route path="/recipes-soups" element={<RecipesSoupsPage />} />
          <Route path="/recipe-cheat-meal" element={<RecipeCheatMealPage />} />
          <Route path="/recipe-beverage" element={<RecipeBeveragePage />} />
          <Route path="/recipe-baking" element={<RecipeBakingPage />} />
          <Route path="/recipes-regional" element={<RecipesRegionalPage />} />
          <Route path="/recipes-salads" element={<RecipesSaladsPage />} />
          <Route path="/recipes-snacks" element={<RecipesSnacksPage />} />
          <Route path="/recipes-students" element={<RecipesStudentsPage />} />
          <Route path="/recipe-quick" element={<RecipeQuickPage />} />
          <Route path="/recipes-vege" element={<RecipesVegePage />} />
          <Route path="/recipes-heavy-gravy" element={<RecipesHeavyGravy />} />
          <Route path="/recipes-fish" element={<RecipesFish />} />
          <Route path="/my-recipe-home" element={<MyRecipeHomepage />} />
          <Route path="/lunch" element={<Lunch />} />
          <Route path="/recipe-breakfast" element={<RecipeBreakfast />} />
          <Route path="/recipes-bread" element={<RecipesBread />} />
          <Route path="/recipes-egg-dishes" element={<RecipesEggDishes />} />
          <Route path="/recipes-bbq" element={<RecipesBBQ />} />
          <Route path="/recipes-dal-mutton" element={<RecipesDalMutton />} />
          <Route path="/recipes-dinner" element={<RecipesDinner />} />
          <Route path="/recipes-appetizers" element={<RecipesAppetizers />} />
          <Route path="/recipes-plain-dal" element={<RecipesPlainDal />} />
          <Route path="/recipes-pure-chicken" element={<RecipesPureChicken />} />
          <Route path="/recipe-plain-vegetables" element={<RecipePlainVegetables />} />
          <Route path="/recipes-qeema" element={<RecipesQeema />} />
          <Route path="/recipes-veg-chicken" element={<RecipesVegChicken />} />
          <Route path="/recipes-veg-mutton" element={<RecipesVegMutton />} />
          <Route path="/recipes-rice" element={<RecipesRice />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/verify-otp" element={<VerifyOTPPage />} />
          <Route path="/recipe-breakfast" element={<RecipeBreakFast />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/recipes-lunch" element={<RecipesLunch />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>

        <Footer />
      </div>

      {showLanguagePopup && (
        <LanguagePopup
          onLanguageSelected={() => setShowLanguagePopup(false)}
        />
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <SocketProvider>
          <AppWrapper />
        </SocketProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;