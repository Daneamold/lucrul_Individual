import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { cars } from "../data/cars";
import CarCard from "../components/CarCard";

const stats = [
  { value: "2,400+", label: "Anunțuri active" },
  { value: "180+", label: "Branduri" },
  { value: "98%", label: "Satisfacție clienți" },
  { value: "45K+", label: "Tranzacții reușite" },
];

export default function Home() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [visible, setVisible] = useState(false);
  const featured = cars.filter(c => c.rating >= 4.8).slice(0, 3);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/listings?search=${search}`);
  };

  return (
    <div className={`home ${visible ? "visible" : ""}`}>
      {/* Hero */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-gradient" />
          <div className="hero-grid" />
        </div>
        <div className="hero-content">
          <div className="hero-badge">◈ Marketplace Auto Premium</div>
          <h1 className="hero-title">
            Găsește<br />
            <em>mașina perfectă</em><br />
            pentru tine
          </h1>
          <p className="hero-subtitle">
            Cel mai avansat sistem de comparare auto din România. Analizează, filtrează și decide cu încredere.
          </p>
          <form className="hero-search" onSubmit={handleSearch}>
            <input
              type="text"
              placeholder="Caută după brand, model..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
            <button type="submit">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              Caută
            </button>
          </form>
          <div className="hero-quick-filters">
            {["Sport", "Luxury", "Electric", "SUV"].map(cat => (
              <Link key={cat} to={`/listings?category=${cat}`} className="quick-chip">{cat}</Link>
            ))}
          </div>
        </div>
        <div className="hero-scroll-hint">
          <span>Scroll</span>
          <div className="scroll-line" />
        </div>
      </section>

      {/* Stats */}
      <section className="stats-section">
        {stats.map(s => (
          <div key={s.label} className="stat-item">
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </section>

      {/* Featured */}
      <section className="section">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">Selecție exclusivă</p>
            <h2 className="section-title">Mașini recomandate</h2>
          </div>
          <Link to="/listings" className="section-link">Vezi toate →</Link>
        </div>
        <div className="cards-grid featured">
          {featured.map(car => <CarCard key={car.id} car={car} />)}
        </div>
      </section>

      {/* CTA Compare */}
      <section className="cta-section">
        <div className="cta-inner">
          <div className="cta-icon">⇄</div>
          <h2>Sistemul de comparare inteligent</h2>
          <p>Compară până la 3 mașini simultan. Analizează puterea, consumul, prețul și dotările — totul într-un singur ecran.</p>
          <Link to="/listings" className="btn-cta">Începe compararea</Link>
        </div>
      </section>

      {/* All Cars Preview */}
      <section className="section">
        <div className="section-header">
          <div>
            <p className="section-eyebrow">Catalog complet</p>
            <h2 className="section-title">Toate anunțurile</h2>
          </div>
          <Link to="/listings" className="section-link">Filtrează →</Link>
        </div>
        <div className="cards-grid">
          {cars.slice(0, 4).map(car => <CarCard key={car.id} car={car} />)}
        </div>
        <div style={{textAlign:"center", marginTop:"2rem"}}>
          <Link to="/listings" className="btn-cta secondary">Vezi toate cele {cars.length} anunțuri</Link>
        </div>
      </section>
    </div>
  );
}
