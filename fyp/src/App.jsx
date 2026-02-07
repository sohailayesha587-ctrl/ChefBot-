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
import TableSettingsPage from './pages/TableSettingsPage';
import CuttingTechniquesPage from './pages/CuttingTechniquesPage';
import KitchenToolsPage from './pages/KitchenToolsPage';
import CookingMethodsPage from './pages/CookingMethodsPage';
import MeatCutsPage from './pages/MeatCutsPage';
import SpicesFlavorsPage from './pages/SpicesFlavorsPage';
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




function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PublicHome />} />
        <Route path="/home" element={<HomePage />} />
                <Route path="/smart-pantry" element={<PantryPage />} />
 <Route path="/smart-shopping" element={<ShoppingList />} />
  <Route path="/guidance" element={<BeginnersPage/>} />
    <Route path="/measuring-skills" element={<MeasuringSkillsPage/>} />
    <Route path="/table-settings" element={<TableSettingsPage/>} />
        <Route path="/cutting-techniques" element={<CuttingTechniquesPage/>} />
                <Route path="/kitchen-tools" element={<KitchenToolsPage/>} />
<Route path="/cooking-methods" element={<CookingMethodsPage/>} />
    <Route path="/meat-cuts" element={<MeatCutsPage/>} />  
    <Route path="/spices-flavors" element={<SpicesFlavorsPage/>} />    
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

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;