import React, { useEffect } from "react";
import './index.css';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PokemonDetail from './pages/PokemonDetail'
import MyPokemon from './pages/MyPokemon'
import PokemonList from './pages/PokemonList'

const App = () => {  
  useEffect(() => {
    if (!localStorage.getItem("pokemon_data")) {
      localStorage.setItem("pokemon_data", JSON.stringify([]));
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<PokemonList/>}/>
          <Route path="/detail/:name" element={<PokemonDetail/>}/>
          <Route path="/my-pokemon" element={<MyPokemon/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;