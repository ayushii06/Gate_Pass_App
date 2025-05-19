import { createSlice } from "@reduxjs/toolkit";

// Function to get the initial theme from localStorage or default to "dark"
const getInitialTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") || "dark"; // Default to dark mode
  }
  return "dark";
};

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    theme: getInitialTheme(),
  },
  reducers: {
    toggleTheme: (state) => {
      state.theme = state.theme === "light" ? "dark" : "light";

      if (typeof window !== "undefined") {
        localStorage.setItem("theme", state.theme);

        // Apply the theme class to <html> dynamically
        document.documentElement.classList.remove("light", "dark");
        document.documentElement.classList.add(state.theme);
      }
    },
  },
});

// Export actions and reducer
export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;
