import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AppProvider } from "./context/AppContext";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Listings from "./pages/Listings";
import CarDetail from "./pages/CarDetail";
import Compare from "./pages/Compare";
import Favorites from "./pages/Favorites";
import "./App.css";

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <div className="page-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/listings" element={<Listings />} />
              <Route path="/car/:id" element={<CarDetail />} />
              <Route path="/compare" element={<Compare />} />
              <Route path="/favorites" element={<Favorites />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
