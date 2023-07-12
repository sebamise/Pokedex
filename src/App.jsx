import React from "react"
import PokemonList from "./Components/PokemonList";
import {  Routes, Route } from 'react-router-dom';
import Navbar from "./Components/Navbar";
import Home from "./Templates/Home";
import './Components/Style.css';
import './index.css';
import ItemsList from "./Components/ItemsList";
function App() {

  return (
    <div className="vh-100">
    <Navbar/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/PokemonList" element={<PokemonList />} />
        <Route path="/ItemsList" element={<ItemsList />} />
      </Routes>

  </div>
);
  
}

export default App
