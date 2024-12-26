import { configureStore, createSlice } from "@reduxjs/toolkit";

// Create a theme slice
const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: localStorage.getItem("theme") || "dark", // Default to dark if not set
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light"; // Toggle between light and dark
      localStorage.setItem("theme", state.theme); // Persist in localStorage
    },
  },
});

// Export the toggle action
export const { toggleTheme } = themeSlice.actions;

// Create the store
export const store = configureStore({
  reducer: {
    theme: themeSlice.reducer,
  },
});
