import React from "react";
import { render } from 'react-dom';
import Home from "./pages/Home";
import Airdrop from "./pages/Airdrop";
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import { Link } from "react-router-dom";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
      <Route exact strict path="airdrop" element={<Airdrop/>} />
      <Route path="/" element={<Home/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
