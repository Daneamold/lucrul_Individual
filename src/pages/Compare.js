import React from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const compareRows = [
  { key: "price", label: "Preț", format: v => `€${v.toLocaleString()}`, highlight: (vals) => vals.indexOf(Math.min(...vals)) },
  { key: "year", label: "An fabricație", highlight: (vals) => vals.indexOf(Math.max(...vals)) },
  { key: "mileage", label: "Kilometraj", format: v => `${v.toLocaleString()} km`, highlight: (vals) => vals.indexOf(Math.min(...vals)) },
  { key: "power", label: "Putere", format: v => `${v} CP`, highlight: (vals) => vals.indexOf(Math.max(...vals)) },
  { key: "engine", label: "Motor" },
  { key: "fuel", label: "Combustibil" },
  { key: "transmission", label: "Transmisie" },
  { key: "consumption", label: "Consum" },
  { key: "co2", label: "Emisii CO₂" },
  { key: "doors", label: "Uși" },
  { key: "seats", label: "Locuri" },
  { key: "color", label: "Culoare" },
  { key: "location", label: "Locație" },
  { key: "rating", label: "Rating", format: v => `★ ${v}`, highlight: (vals) => vals.indexOf(Math.max(...vals)) },
];

export default function Compare() {
  const { compareList, toggleCompare, clearCompare } = useApp();
  const navigate = useNavigate();

  if (compareList.length === 0) {
    return (
      <div className="compare-empty">
        <div className="empty-icon">⇄</div>
        <h2>Nicio mașină în lista de comparare</h2>
        <p>Adaugă cel puțin 2 mașini din anunțuri pentru a le compara</p>
        <Link to="/listings" className="btn-cta">Mergi la anunțuri</Link>
      </div>
    );
  }

  if (compareList.length === 1) {
    return (
      <div className="compare-empty">
        <div className="empty-icon">+</div>
        <h2>Mai adaugă o mașină</h2>
        <p>Ai {compareList[0].brand} {compareList[0].model} în listă. Adaugă măcar o mașină în plus pentru a compara.</p>
        <Link to="/listings" className="btn-cta">Adaugă mașină</Link>
      </div>
    );
  }

  return (
    <div className="compare-page">
      <div className="compare-page-header">
        <div>
          <h1 className="page-title">Comparare mașini</h1>
          <p className="results-count">{compareList.length} mașini selectate</p>
        </div>
        <div className="compare-header-actions">
          <button className="btn-reset" onClick={clearCompare}>Golește lista</button>
          <Link to="/listings" className="btn-add-more">+ Adaugă mașină</Link>
        </div>
      </div>

      <div className="compare-table-wrap">
        <table className="compare-table">
          <thead>
            <tr>
              <th className="row-label-header">Specificații</th>
              {compareList.map(car => (
                <th key={car.id} className="car-header">
                  <div className="compare-car-header">
                    <img src={car.image} alt={car.brand} className="compare-car-img" />
                    <div className="compare-car-title">
                      <span className="compare-car-brand">{car.brand}</span>
                      <span className="compare-car-model">{car.model}</span>
                      <span className="compare-car-year">{car.year}</span>
                    </div>
                    <div className="compare-car-actions">
                      <Link to={`/car/${car.id}`} className="btn-detail-sm">Detalii</Link>
                      <button className="btn-remove-compare" onClick={() => toggleCompare(car)}>✕</button>
                    </div>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {compareRows.map((row, rowIdx) => {
              const values = compareList.map(car => car[row.key]);
              const numericVals = values.map(Number).filter(n => !isNaN(n));
              const highlightIdx = (row.highlight && numericVals.length === values.length)
                ? row.highlight(numericVals)
                : -1;

              return (
                <tr key={row.key} className={rowIdx % 2 === 0 ? "row-even" : "row-odd"}>
                  <td className="row-label">{row.label}</td>
                  {values.map((val, i) => (
                    <td
                      key={i}
                      className={`row-value ${i === highlightIdx ? "highlight" : ""}`}
                    >
                      {row.format ? row.format(val) : val}
                      {i === highlightIdx && <span className="best-badge">✓ Best</span>}
                    </td>
                  ))}
                </tr>
              );
            })}

            {/* Features comparison */}
            <tr className="row-section-header">
              <td colSpan={compareList.length + 1}>Dotări incluse</td>
            </tr>
            <tr>
              <td className="row-label">Opționale</td>
              {compareList.map(car => (
                <td key={car.id} className="row-value features-cell">
                  {car.features.map(f => (
                    <span key={f} className="feature-tag">✓ {f}</span>
                  ))}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      {/* Winner section */}
      <div className="compare-verdict">
        <h2>Verdict bazat pe preț/performanță</h2>
        <div className="verdict-cards">
          {compareList.map(car => {
            const score = ((car.power / car.price) * 100000 + car.rating * 10).toFixed(1);
            return (
              <div key={car.id} className="verdict-card">
                <img src={car.image} alt={car.brand} />
                <h3>{car.brand} {car.model}</h3>
                <div className="score-bar-wrap">
                  <div
                    className="score-bar"
                    style={{ width: `${Math.min((score / 12) * 100, 100)}%` }}
                  />
                </div>
                <p className="score-label">Scor: {score}</p>
                <Link to={`/car/${car.id}`} className="btn-details">Vezi detalii</Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
