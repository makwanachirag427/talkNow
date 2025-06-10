import { create } from "zustand";
import { type themeState } from "../types";

export const useThemeStore = create<themeState>((set) => ({
  theme: localStorage.getItem("chat-theme") || "dark",
  setTheme: (theme) => {
    localStorage.setItem("chat-theme", theme);
    set({ theme });
  },
}));