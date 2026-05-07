import React, { createContext, useContext, useReducer, useEffect } from "react";

const AppContext = createContext();

const initialState = {
  favorites: JSON.parse(localStorage.getItem("favorites") || "[]"),
  compareList: [],
  filters: {
    brand: "",
    category: "",
    fuel: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    minPower: "",
    transmission: "",
    sortBy: "price-asc",
    search: "",
  },
};

function appReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_FAVORITE": {
      const exists = state.favorites.find(f => f.id === action.payload.id);
      const favorites = exists
        ? state.favorites.filter(f => f.id !== action.payload.id)
        : [...state.favorites, action.payload];
      localStorage.setItem("favorites", JSON.stringify(favorites));
      return { ...state, favorites };
    }
    case "TOGGLE_COMPARE": {
      const exists = state.compareList.find(c => c.id === action.payload.id);
      if (exists) {
        return { ...state, compareList: state.compareList.filter(c => c.id !== action.payload.id) };
      }
      if (state.compareList.length >= 3) {
        return { ...state, compareList: [state.compareList[1], state.compareList[2], action.payload] };
      }
      return { ...state, compareList: [...state.compareList, action.payload] };
    }
    case "CLEAR_COMPARE":
      return { ...state, compareList: [] };
    case "SET_FILTER":
      return { ...state, filters: { ...state.filters, [action.key]: action.value } };
    case "RESET_FILTERS":
      return { ...state, filters: initialState.filters };
    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const toggleFavorite = (car) => dispatch({ type: "TOGGLE_FAVORITE", payload: car });
  const toggleCompare = (car) => dispatch({ type: "TOGGLE_COMPARE", payload: car });
  const clearCompare = () => dispatch({ type: "CLEAR_COMPARE" });
  const setFilter = (key, value) => dispatch({ type: "SET_FILTER", key, value });
  const resetFilters = () => dispatch({ type: "RESET_FILTERS" });

  const isFavorite = (id) => state.favorites.some(f => f.id === id);
  const isInCompare = (id) => state.compareList.some(c => c.id === id);

  return (
    <AppContext.Provider value={{
      ...state,
      toggleFavorite,
      toggleCompare,
      clearCompare,
      setFilter,
      resetFilters,
      isFavorite,
      isInCompare,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
}
