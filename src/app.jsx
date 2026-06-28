import React from 'react'
import { Routes, Route } from 'react-router-dom'
import RecipeHomepage from './RecipeHomepage'
import soups from './soups'

// import './App.css'
function App() {
  return (
    <div className="app">
      <RecipeHomepage/>
      <soups/>
   </div>
  )
}
export default App