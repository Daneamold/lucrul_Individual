import { useState, useEffect, useMemo } from "react";
import { cars } from "../data/cars";
import { useApp } from "../context/AppContext";

export function useFilteredCars() {
  const { filters } = useApp();

  const filtered = useMemo(() => {
    let result = [...cars];

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(c =>
        c.brand.toLowerCase().includes(q) ||
        c.model.toLowerCase().includes(q) ||
        c.color.toLowerCase().includes(q)
      );
    }
    if (filters.brand) result = result.filter(c => c.brand === filters.brand);
    if (filters.category) result = result.filter(c => c.category === filters.category);
    if (filters.fuel) result = result.filter(c => c.fuel === filters.fuel);
    if (filters.location) result = result.filter(c => c.location === filters.location);
    if (filters.transmission) result = result.filter(c => c.transmission === filters.transmission);
    if (filters.minPrice) result = result.filter(c => c.price >= Number(filters.minPrice));
    if (filters.maxPrice) result = result.filter(c => c.price <= Number(filters.maxPrice));
    if (filters.minPower) result = result.filter(c => c.power >= Number(filters.minPower));

    switch (filters.sortBy) {
      case "price-asc": result.sort((a, b) => a.price - b.price); break;
      case "price-desc": result.sort((a, b) => b.price - a.price); break;
      case "power-desc": result.sort((a, b) => b.power - a.power); break;
      case "mileage-asc": result.sort((a, b) => a.mileage - b.mileage); break;
      case "year-desc": result.sort((a, b) => b.year - a.year); break;
      case "rating-desc": result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }

    return result;
  }, [filters]);

  return filtered;
}

export function useCar(id) {
  const [car, setCar] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const found = cars.find(c => c.id === Number(id));
      setCar(found || null);
      setLoading(false);
    }, 400);
  }, [id]);

  return { car, loading };
}

export function useImageGallery(images = []) {
  const [activeIndex, setActiveIndex] = useState(0);

  const next = () => setActiveIndex(i => (i + 1) % images.length);
  const prev = () => setActiveIndex(i => (i - 1 + images.length) % images.length);
  const goTo = (i) => setActiveIndex(i);

  return { activeIndex, next, prev, goTo, activeImage: images[activeIndex] };
}
