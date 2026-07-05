import { create } from "zustand";
import { persist } from "zustand/middleware";
import { api } from "../api/apiClient";

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

      forgetPassword: async (email) => {
        try {
          set({ loading: true, error: null, message: null });

          const res = await api.post("/auth/forget-password", {
            email: email?.toLowerCase(),
          });

          set({
            loading: false,
            message: res.data.message,
          });
        } catch (err) {
          set({
            loading: false,
            error: err.response?.data?.message || "Something went wrong",
          });
        }
      },
      resetPassword: async (token, newPassword) => {
        try {
          if (!token || !newPassword) {
            throw new Error("Token and password are required");
          }

          set({ loading: true, error: null, message: null });

          const res = await api.post(`/auth/reset-password/${token}`, {
            newPassword
          });

          set({
            loading: false,
            message: res.data.message,
          });
        } catch (err) {
          set({
            loading: false,
            error: err.response?.data?.message || err.message,
          });
        }
      },
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

    //storage
    {
      name: "auth-storage",

      partialize: (state) => ({
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
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
    },
  ),
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
