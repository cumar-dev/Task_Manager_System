import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set, get) => ({
      user: null,
      token: null,
      isAuthenticated: false,

      // Login
      setAuth: (user, token) =>
        set({
          user,
          token,
          isAuthenticated: true,
        }),

      // Logout
      clearAuth: () =>
        set({
          user: null,
          token: null,
          isAuthenticated: false,
        }),

      // Get Token
      getToken: () => get().token,
    }),
    {
      name: "auth-storage",

      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export const useThemeStore = create(
  persist(
    (set) => ({
      theme: "light",

      setTheme: (theme) =>
        set({
          theme,
        }),
    }),
    {
      name: "theme-storage",
    }
  )
);


export const useSidebarStore = create((set) => ({
  open: true,

  toggle: () =>
    set((state) => ({
      open: !state.open,
    })),

  openSidebar: () =>
    set({
      open: true,
    }),

  closeSidebar: () =>
    set({
      open: false,
    }),
}));