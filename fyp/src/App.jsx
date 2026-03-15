import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
import MealCalendar from './pages/MealCalender';
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

// ✅ Import RTL CSS
import './App.css';


function AppWrapper() {
  const location = useLocation();

  // ✅ Urdu pages ka check - /urdu se start hone wale all pages
  const isUrdu = location.pathname.startsWith('/urdu');

  return (
    <>
      {/* ✅ ONLY ONE ALARM MODAL - Language ke hisab se */}
      {isUrdu ? <UrduAlarmModal /> : <AlarmModal />}
      
      {/* ✅ Apply dir attribute to main wrapper */}
      <div 
        className={`app-wrapper ${isUrdu ? 'urdu-mode' : 'english-mode'}`} 
        dir={isUrdu ? "rtl" : "ltr"}
      >
        {/* Dynamic Header */}
        {isUrdu ? <UrduHeader /> : <Header />}

        <Routes>
          {/* ===== English Routes ===== */}
          <Route path="/" element={<PublicHome />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/smart-pantry" element={<PantryPage />} />
          <Route path="/smart-shopping" element={<ShoppingList />} />
          <Route path="/guidance" element={<BeginnersPage/>} />
          <Route path="/measuring-skills" element={<MeasuringSkillsPage/>} />
          <Route path="/kitchen-appliances" element={<KitchenAppliancesPage/>} />
          <Route path="/cutting-techniques" element={<CuttingTechniquesPage/>} />
          <Route path="/kitchen-tools" element={<KitchenToolsPage/>} />
          <Route path="/cooking-methods" element={<CookingMethodsPage/>} />
          <Route path="/meat-cuts" element={<MeatProcessingPage/>} />  
          <Route path="/pantry-basics" element={<PantryBasicsPage/>} />    
          <Route path="/recipes" element={<RecipeFeature/>} />    
          <Route path="/soups" element={<RecipeSoupPage/>} />    
          <Route path="/Beverages" element={<RecipeBeveragesPage/>} />    
          <Route path="/desserts" element={<RecipeDessertsPage/>} />    
          <Route path="/baking" element={<RecipeBakingPage/>} />    
          <Route path="/calender" element={<MealCalendar/>} />
          <Route path="/meal-planner" element={<MealFeature/>} />
          <Route path="/login-page" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/bakery-essentials" element={<BakeryEssentialsPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/Vege" element={<RecipeVegetablePage />} />
          <Route path="/QuickRecipe" element={<RecipeQuickPage />} />
          <Route path="/StudentRecipe" element={<RecipeStudentPage />} />
          <Route path="/Beverage" element={<RecipeBeveragesPage />} />
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
                                        <Route path="/fish-dishes" element={<RecipesFish/>} />
                                        <Route path="/chicken" element={<RecipesPureChicken/>} />
                                        <Route path="/mutton" element={<RecipesPureMutton/>} />
                                        <Route path="/qeema" element={<RecipesQeema/>} />
                                        <Route path="/rice" element={<RecipesRice/>} />
                                        <Route path="/gravy" element={<RecipesHeavyGravy/>} />
                                        <Route path="/BBQ" element={<RecipesBBQ/>} />
                                        <Route path="/dinner" element={<Dinner/>} />
                                        <Route path="/recipe-dinner" element={<RecipesDinner/>} />

                                        <Route path="/breads" element={<RecipesBread/>} />
                                        <Route path="/appetizers" element={<RecipesAppetizers/>} />

                                        <Route path="/dinner-light" element={<RecipesLightDinner/>} />





          {/* ===== Urdu Routes ===== */}
          <Route path="/urdu" element={<UrduPublicHome />} />
          <Route path="/urdu-home" element={<UrduHomePage />} />
          <Route path="/urdu-signup" element={<UrduSignUpPage />} />
          <Route path="/urdu-login" element={<UrduLoginPage />} />
          <Route path="/urdu-public" element={<UrduPublicHome />} />
          <Route path="/urdu-guidance" element={<UrduBeginnersPage />} />
          <Route path="/urdu-cooking-methods" element={<UrduCookingMethodsPage />} />
          <Route path="/urdu-cutting-techniques" element={<UrduCuttingTechniquesPage />} />
          <Route path="/urdu-measuring-skills" element={<UrduMeasuringSkillsPage />} />
          <Route path="/urdu-meat-processing" element={<UrduMeatProcessingPage />} />
                    <Route path="/urdu-kitchen-tools" element={<UrduKitchenToolsPage />} />

          {/* ✅ Optional: Add more Urdu routes as needed */}
        </Routes>

        {/* Dynamic Footer */}
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