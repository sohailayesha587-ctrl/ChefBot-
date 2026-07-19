import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
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
import ContactPage from "./pages/ContactPage";
import AboutPage from "./pages/AboutPage";
import ShoppingList from "./pages/ShoppingList";
import MealFeature from "./pages/MealFeature";
import AlarmModal from './components/AlarmModal';
import SettingsSidebar from './components/SettingsSidebar';
import desserts from './pages/desserts';
import soups from './pages/soups';
import CheatMeal from './pages/CheatMeal';
import beverages from './pages/beverages';
import Baking from './pages/Baking';
import Regional from './pages/Regional';
import Salads from './pages/Salads';
import Snack from './pages/Snack';
import StudentRecipe from './pages/StudentRecipe';
import QuickRecipe from './pages/QuickRecipe';
import Vege from './pages/Vege';
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
        {shouldShowHeader && <Header onSettingsClick={openSettings} />}

        <Routes>
          <Route path="/" element={<PublicHome />} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                                        <Route path="/verify-otp" element={<VerifyOTPPage />} />


          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/home" element={<HomePage />} />
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
          <Route path="/smart-pantry" element={<PantryFeature />} />
          <Route path="/meal-planner" element={<MealFeature />} />
          <Route path="/smart-shopping" element={<ShoppingList />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/MyRecipeHomepage" element={<MyRecipeHomepage />} />
        <Route path="/soups" element={<RecipeSoupPage />} />
        <Route path="/Beverages" element={<RecipeBeveragesPage />} />
        <Route path="/desserts" element={<RecipeDessertsPage />} />
        <Route path="/baking" element={<RecipeBakingPage />} />
        <Route path="/Vege" element={<RecipeVegetablePage />} />
        <Route path="/QuickRecipe" element={<RecipeQuickPage />} />
        <Route path="/StudentRecipe" element={<RecipeStudentPage />} />
        <Route path="/Regional" element={<RecipeRegionalPage />} />
        <Route path="/Salads" element={<RecipeSaladsPage />} />
        <Route path="/Snack" element={<RecipeSnacksPage />} />
        <Route path="/lunch" element={<Lunch />} />
        <Route path="/recipe-lunch" element={<RecipesLunch />} />
        <Route path="/BreakFast" element={<RecipeBreakFast />} />
        <Route path="/plain-veg" element={<RecipePlainVegetables />} />
        <Route path="/veg-chick" element={<RecipesVegChicken />} />
        <Route path="/veg-mutton" element={<RecipesVegMutton />} />
        <Route path="/plain-dal" element={<RecipesPlainDal />} />
        <Route path="/dal-chick" element={<RecipesDalChicken />} />
        <Route path="/dal-mutton" element={<RecipesDalMutton />} />
        <Route path="/egg-dishes" element={<RecipesEggDishes />} />
        <Route path="/fish-dishes" element={<RecipesFish />} />
        <Route path="/chicken" element={<RecipesPureChicken />} />
        <Route path="/mutton" element={<RecipesPureMutton />} />
        <Route path="/qeema" element={<RecipesQeema />} />
        <Route path="/rice" element={<RecipesRice />} />
        <Route path="/gravy" element={<RecipesHeavyGravy />} />
        <Route path="/BBQ" element={<RecipesBBQ />} />
        <Route path="/dinner" element={<Dinner />} />
        <Route path="/recipe-dinner" element={<RecipesDinner />} />
        <Route path="/breads" element={<RecipesBread />} />
        <Route path="/appetizers" element={<RecipesAppetizers />} />
        <Route path="/dinner-light" element={<RecipesLightDinner />} />
        <Route path="/cheat-meal" element={<RecipeCheatMeal />} />
        </Routes>

        <Footer />
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <AppWrapper />
      </AuthProvider>
    </Router>
  );
}

export default App;