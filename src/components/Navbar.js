import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

export default function Navbar() {
  const { favorites, compareList } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Acasă" },
    { to: "/listings", label: "Anunțuri" },
    { to: "/compare", label: `Comparare ${compareList.length > 0 ? `(${compareList.length})` : ""}` },
    { to: "/favorites", label: `Favorite ${favorites.length > 0 ? `(${favorites.length})` : ""}` },
  ];

  return (
    <nav className={`navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="nav-inner">
        <Link to="/" className="nav-logo">
          <span className="logo-icon">◈</span>
          <span className="logo-text">AUTO<em>PIATA</em></span>
        </Link>

        <div className={`nav-links ${menuOpen ? "open" : ""}`}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              className={`nav-link ${location.pathname === link.to ? "active" : ""}`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="nav-actions">
          <Link to="/favorites" className="nav-icon-btn" title="Favorite">
            <svg width="20" height="20" viewBox="0 0 24 24" fill={favorites.length > 0 ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
            {favorites.length > 0 && <span className="badge">{favorites.length}</span>}
          </Link>
          <Link to="/compare" className="nav-icon-btn" title="Comparare">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="2" y="3" width="8" height="18" rx="1"/>
              <rect x="14" y="3" width="8" height="18" rx="1"/>
            </svg>
            {compareList.length > 0 && <span className="badge compare">{compareList.length}</span>}
          </Link>
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)}>
            <span/><span/><span/>
          </button>
        </div>
      </div>
    </nav>
  );
}
