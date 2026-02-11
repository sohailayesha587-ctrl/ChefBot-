import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
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
import RecipeMainCoursePage from './pages/RecipeMainCoursePage';
import RecipeBeveragesPage from './pages/RecipeBeveragesPage';
import RecipeDessertsPage from './pages/RecipeDessertsPage';
import MealCalendar from './pages/MealCalender';
import MealFeature from './pages/MealFeature';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import AlarmModal from './components/AlarmModal'; // ✅ MODAL IMPORT
import PantryBasicsPage from './pages/PantryBasicsPage';
import BakeryEssentialsPage from './pages/BakeryEssentialsPage';

function App() {
  return (
    <Router>
      {/* ✅ ALARM MODAL - SABSE UPAR */}
      <AlarmModal />
      
      <Header />
      <Routes>
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
        <Route path="/MainCourse" element={<RecipeMainCoursePage/>} />    
        <Route path="/Beverages" element={<RecipeBeveragesPage/>} />    
        <Route path="/desserts" element={<RecipeDessertsPage/>} />    
        <Route path="/baking" element={<RecipeBakingPage/>} />    
        <Route path="/calender" element={<MealCalendar/>} />
        <Route path="/meal-planner" element={<MealFeature/>} />
        <Route path="/login-page" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
                <Route path="/bakery-essentials" element={<BakeryEssentialsPage />} />

        
        {/* ❌ ALARM ROUTE HATA DIYA - Kyonki modal use karenge */}
        {/* <Route path="/Alarm" element={<Alarm />} /> */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;