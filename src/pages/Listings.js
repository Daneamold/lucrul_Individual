import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import CarCard from "../components/CarCard";
import FilterPanel from "../components/FilterPanel";
import CompareBar from "../components/CompareBar";
import { useFilteredCars } from "../hooks/useCars";
import { useApp } from "../context/AppContext";

export default function Listings() {
  const filtered = useFilteredCars();
  const { setFilter, compareList } = useApp();
  const [searchParams] = useSearchParams();
  const [mobileFilter, setMobileFilter] = useState(false);
  const [view, setView] = useState("grid");

  useEffect(() => {
    const search = searchParams.get("search");
    const category = searchParams.get("category");
    if (search) setFilter("search", search);
    if (category) setFilter("category", category);
  }, []);

  return (
    <div className="listings-page">
      <div className="listings-header">
        <div>
          <h1 className="page-title">Anunțuri auto</h1>
          <p className="results-count">{filtered.length} rezultate găsite</p>
        </div>
        <div className="listings-controls">
          <button className="btn-filter-mobile" onClick={() => setMobileFilter(true)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="4" y1="6" x2="20" y2="6"/><line x1="8" y1="12" x2="16" y2="12"/><line x1="11" y1="18" x2="13" y2="18"/>
            </svg>
            Filtre
          </button>
          <div className="view-toggle">
            <button className={view === "grid" ? "active" : ""} onClick={() => setView("grid")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
            </button>
            <button className={view === "list" ? "active" : ""} onClick={() => setView("list")}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>
            </button>
          </div>
        </div>
      </div>

      <div className="listings-layout">
        <FilterPanel />

        <main className="listings-main">
          {filtered.length === 0 ? (
            <div className="no-results">
              <div className="no-results-icon">⊘</div>
              <h3>Niciun rezultat</h3>
              <p>Încearcă să modifici filtrele pentru a vedea mai multe mașini.</p>
            </div>
          ) : (
            <div className={`cards-grid ${view === "list" ? "list-view" : ""}`}>
              {filtered.map(car => <CarCard key={car.id} car={car} />)}
            </div>
          )}
        </main>
      </div>

      {/* Mobile filter drawer */}
      {mobileFilter && (
        <div className="filter-drawer">
          <div className="drawer-overlay" onClick={() => setMobileFilter(false)} />
          <div className="drawer-content">
            <div className="drawer-header">
              <h3>Filtre</h3>
              <button onClick={() => setMobileFilter(false)}>×</button>
            </div>
            <FilterPanel onClose={() => setMobileFilter(false)} />
          </div>
        </div>
      )}

      <CompareBar />
    </div>
  );
}
