import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import CarCard from "../components/CarCard";
import CompareBar from "../components/CompareBar";

export default function Favorites() {
  const { favorites } = useApp();

  if (favorites.length === 0) {
    return (
      <div className="compare-empty">
        <div className="empty-icon">♡</div>
        <h2>Nu ai mașini la favorite</h2>
        <p>Apasă pe inimă de pe orice anunț pentru a salva mașinile care îți plac</p>
        <Link to="/listings" className="btn-cta">Explorează anunțuri</Link>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header-simple">
        <h1 className="page-title">Favorite</h1>
        <p className="results-count">{favorites.length} mașini salvate</p>
      </div>
      <div className="cards-grid">
        {favorites.map(car => <CarCard key={car.id} car={car} />)}
      </div>
      <CompareBar />
    </div>
  );
}
