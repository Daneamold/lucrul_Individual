import React from "react";
import { useApp } from "../context/AppContext";
import { brands, categories, fuels, locations } from "../data/cars";

export default function FilterPanel({ onClose }) {
  const { filters, setFilter, resetFilters } = useApp();

  return (
    <aside className="filter-panel">
      <div className="filter-header">
        <h2>Filtrare</h2>
        <button className="btn-reset" onClick={resetFilters}>Resetează</button>
      </div>

      <div className="filter-group">
        <label>Căutare rapidă</label>
        <input
          type="text"
          placeholder="Brand, model, culoare..."
          value={filters.search}
          onChange={e => setFilter("search", e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label>Brand</label>
        <select value={filters.brand} onChange={e => setFilter("brand", e.target.value)} className="filter-select">
          <option value="">Toate brandurile</option>
          {brands.map(b => <option key={b} value={b}>{b}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label>Categorie</label>
        <select value={filters.category} onChange={e => setFilter("category", e.target.value)} className="filter-select">
          <option value="">Toate categoriile</option>
          {categories.map(c => <option key={c} value={c}>{c}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label>Combustibil</label>
        <div className="filter-chips">
          <button
            className={`chip ${filters.fuel === "" ? "active" : ""}`}
            onClick={() => setFilter("fuel", "")}
          >Toate</button>
          {fuels.map(f => (
            <button
              key={f}
              className={`chip ${filters.fuel === f ? "active" : ""}`}
              onClick={() => setFilter("fuel", f)}
            >{f}</button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Transmisie</label>
        <div className="filter-chips">
          {["", "Manuala", "Automata", "DSG", "PDK"].map(t => (
            <button
              key={t}
              className={`chip ${filters.transmission === t ? "active" : ""}`}
              onClick={() => setFilter("transmission", t)}
            >{t || "Toate"}</button>
          ))}
        </div>
      </div>

      <div className="filter-group">
        <label>Preț (€)</label>
        <div className="range-row">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={e => setFilter("minPrice", e.target.value)}
            className="filter-input half"
          />
          <span>—</span>
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={e => setFilter("maxPrice", e.target.value)}
            className="filter-input half"
          />
        </div>
      </div>

      <div className="filter-group">
        <label>Putere minimă (CP)</label>
        <input
          type="number"
          placeholder="ex. 200"
          value={filters.minPower}
          onChange={e => setFilter("minPower", e.target.value)}
          className="filter-input"
        />
      </div>

      <div className="filter-group">
        <label>Locație</label>
        <select value={filters.location} onChange={e => setFilter("location", e.target.value)} className="filter-select">
          <option value="">Toate locațiile</option>
          {locations.map(l => <option key={l} value={l}>{l}</option>)}
        </select>
      </div>

      <div className="filter-group">
        <label>Sortare</label>
        <select value={filters.sortBy} onChange={e => setFilter("sortBy", e.target.value)} className="filter-select">
          <option value="price-asc">Preț crescător</option>
          <option value="price-desc">Preț descrescător</option>
          <option value="power-desc">Putere (mare → mică)</option>
          <option value="mileage-asc">Km (mic → mare)</option>
          <option value="year-desc">An (nou → vechi)</option>
          <option value="rating-desc">Rating (sus → jos)</option>
        </select>
      </div>

      {onClose && (
        <button className="btn-apply" onClick={onClose}>Aplică filtrele</button>
      )}
    </aside>
  );
}
