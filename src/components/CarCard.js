import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function CarCard({ car }) {
  const { toggleFavorite, toggleCompare, isFavorite, isInCompare } = useApp();
  const [imgLoaded, setImgLoaded] = useState(false);
  const fav = isFavorite(car.id);
  const inCompare = isInCompare(car.id);

  return (
    <div className={`car-card ${inCompare ? "in-compare" : ""}`}>
      <div className="card-image-wrap">
        {!imgLoaded && <div className="img-skeleton" />}
        <img
          src={car.image}
          alt={`${car.brand} ${car.model}`}
          className={`card-img ${imgLoaded ? "loaded" : ""}`}
          onLoad={() => setImgLoaded(true)}
        />
        <div className="card-badges">
          <span className={`badge-fuel fuel-${car.fuel.toLowerCase().replace(" ", "-")}`}>{car.fuel}</span>
          <span className="badge-category">{car.category}</span>
        </div>
        <button
          className={`btn-fav ${fav ? "active" : ""}`}
          onClick={(e) => { e.preventDefault(); toggleFavorite(car); }}
          title={fav ? "Șterge din favorite" : "Adaugă la favorite"}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      <div className="card-body">
        <div className="card-header-row">
          <div>
            <p className="card-brand">{car.brand}</p>
            <h3 className="card-model">{car.model}</h3>
          </div>
          <div className="card-rating">
            <span className="star">★</span>
            <span>{car.rating}</span>
          </div>
        </div>

        <div className="card-specs">
          <span className="spec-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            {car.power} CP
          </span>
          <span className="spec-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h4l3-9 4 18 3-9h4"/></svg>
            {car.mileage.toLocaleString()} km
          </span>
          <span className="spec-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
            {car.year}
          </span>
          <span className="spec-item">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
            {car.location}
          </span>
        </div>

        <div className="card-footer">
          <div className="card-price">
            <span className="price-amount">€{car.price.toLocaleString()}</span>
          </div>
          <div className="card-actions">
            <button
              className={`btn-compare ${inCompare ? "active" : ""}`}
              onClick={() => toggleCompare(car)}
              title={inCompare ? "Elimină din comparare" : "Adaugă la comparare"}
            >
              {inCompare ? "✓ Comparat" : "⇄ Compară"}
            </button>
            <Link to={`/car/${car.id}`} className="btn-details">Detalii →</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
