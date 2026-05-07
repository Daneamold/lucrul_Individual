import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useCar, useImageGallery } from "../hooks/useCars";
import { useApp } from "../context/AppContext";
import CompareBar from "../components/CompareBar";

export default function CarDetail() {
  const { id } = useParams();
  const { car, loading } = useCar(id);
  const { toggleFavorite, toggleCompare, isFavorite, isInCompare } = useApp();
  const navigate = useNavigate();

  const gallery = useImageGallery(car?.images || []);
  const fav = car ? isFavorite(car.id) : false;
  const inCompare = car ? isInCompare(car.id) : false;

  if (loading) return (
    <div className="detail-loading">
      <div className="loading-spinner" />
      <p>Se încarcă...</p>
    </div>
  );

  if (!car) return (
    <div className="not-found">
      <h2>Mașina nu a fost găsită</h2>
      <Link to="/listings">← Înapoi la anunțuri</Link>
    </div>
  );

  return (
    <div className="detail-page">
      <div className="detail-nav">
        <button className="btn-back" onClick={() => navigate(-1)}>← Înapoi</button>
        <div className="breadcrumb">
          <Link to="/">Acasă</Link>
          <span>/</span>
          <Link to="/listings">Anunțuri</Link>
          <span>/</span>
          <span>{car.brand} {car.model}</span>
        </div>
      </div>

      <div className="detail-layout">
        {/* Gallery */}
        <div className="detail-gallery">
          <div className="gallery-main">
            <img src={gallery.activeImage} alt={`${car.brand} ${car.model}`} className="gallery-img" />
            <div className="gallery-overlay-badges">
              <span className={`badge-fuel fuel-${car.fuel.toLowerCase()}`}>{car.fuel}</span>
              <span className="badge-category">{car.category}</span>
            </div>
            {car.images.length > 1 && (
              <>
                <button className="gallery-prev" onClick={gallery.prev}>‹</button>
                <button className="gallery-next" onClick={gallery.next}>›</button>
              </>
            )}
          </div>
          {car.images.length > 1 && (
            <div className="gallery-thumbs">
              {car.images.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`view ${i + 1}`}
                  className={`gallery-thumb ${i === gallery.activeIndex ? "active" : ""}`}
                  onClick={() => gallery.goTo(i)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Info Panel */}
        <div className="detail-info">
          <div className="detail-title-row">
            <div>
              <p className="detail-brand">{car.brand}</p>
              <h1 className="detail-model">{car.model}</h1>
            </div>
            <div className="detail-rating">
              <span className="star">★</span>
              <span className="rating-val">{car.rating}</span>
            </div>
          </div>

          <div className="detail-price-row">
            <span className="detail-price">€{car.price.toLocaleString()}</span>
            <span className="detail-location">📍 {car.location}</span>
          </div>

          <div className="detail-specs-grid">
            {[
              { icon: "⚡", label: "Putere", value: `${car.power} CP` },
              { icon: "📅", label: "An fabricație", value: car.year },
              { icon: "🛣️", label: "Kilometraj", value: `${car.mileage.toLocaleString()} km` },
              { icon: "⚙️", label: "Transmisie", value: car.transmission },
              { icon: "🔧", label: "Motor", value: car.engine },
              { icon: "🎨", label: "Culoare", value: car.color },
              { icon: "🚗", label: "Uși", value: car.doors },
              { icon: "💺", label: "Locuri", value: car.seats },
              { icon: "⛽", label: "Consum", value: car.consumption },
              { icon: "🌿", label: "CO₂", value: car.co2 },
            ].map(spec => (
              <div key={spec.label} className="spec-card">
                <span className="spec-icon">{spec.icon}</span>
                <span className="spec-label">{spec.label}</span>
                <span className="spec-value">{spec.value}</span>
              </div>
            ))}
          </div>

          <div className="detail-actions">
            <button
              className={`btn-detail-fav ${fav ? "active" : ""}`}
              onClick={() => toggleFavorite(car)}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill={fav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
              {fav ? "Salvat la favorite" : "Salvează la favorite"}
            </button>
            <button
              className={`btn-detail-compare ${inCompare ? "active" : ""}`}
              onClick={() => toggleCompare(car)}
            >
              ⇄ {inCompare ? "Eliminat din comparare" : "Adaugă la comparare"}
            </button>
          </div>

          <div className="detail-contact">
            <button className="btn-contact">📞 Contactează vânzătorul</button>
            <button className="btn-contact secondary">✉️ Trimite mesaj</button>
          </div>
        </div>
      </div>

      {/* Description */}
      <section className="detail-section">
        <h2>Descriere</h2>
        <p className="detail-description">{car.description}</p>
      </section>

      {/* Features */}
      <section className="detail-section">
        <h2>Dotări & Opționale</h2>
        <div className="features-grid">
          {car.features.map(f => (
            <div key={f} className="feature-item">
              <span className="feature-check">✓</span>
              {f}
            </div>
          ))}
        </div>
      </section>

      <CompareBar />
    </div>
  );
}
