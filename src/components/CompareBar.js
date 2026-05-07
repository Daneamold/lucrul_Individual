import React from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function CompareBar() {
  const { compareList, toggleCompare, clearCompare } = useApp();
  const navigate = useNavigate();

  if (compareList.length === 0) return null;

  return (
    <div className="compare-bar">
      <div className="compare-bar-inner">
        <div className="compare-slots">
          {compareList.map(car => (
            <div key={car.id} className="compare-slot">
              <img src={car.image} alt={car.brand} />
              <div className="slot-info">
                <span className="slot-brand">{car.brand}</span>
                <span className="slot-model">{car.model}</span>
              </div>
              <button className="slot-remove" onClick={() => toggleCompare(car)}>×</button>
            </div>
          ))}
          {Array(3 - compareList.length).fill(null).map((_, i) => (
            <div key={`empty-${i}`} className="compare-slot empty">
              <span>+ Adaugă mașină</span>
            </div>
          ))}
        </div>
        <div className="compare-bar-actions">
          <button className="btn-clear" onClick={clearCompare}>Golește</button>
          <button
            className="btn-go-compare"
            onClick={() => navigate("/compare")}
            disabled={compareList.length < 2}
          >
            Compară ({compareList.length})
          </button>
        </div>
      </div>
    </div>
  );
}
