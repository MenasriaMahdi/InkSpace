import { api } from "../lib/api";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: number;
  username: string;
  email: string;
  bio?: string | null;
  avatar?: string | null;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post("/auth/login", { email, password });

          const responseData = response.data.data;
          const user = responseData.user;
          const accessToken = responseData.tokens.accessToken;

          if (!accessToken) {
            throw new Error("No access token in response");
          }

          localStorage.setItem("accessToken", accessToken);
          set({ user });
          
          console.log("✅ Login successful");
        } catch (error: any) {// ✅ Throw Error object
        } finally {
          set({ isLoading: false });
        }
      },

      register: async (username: string, email: string, password: string) => {
        set({ isLoading: true });
        try {
          const response = await api.post("/auth/register", {
            username,
            email,
            password,
          });

          const responseData = response.data.data;
          const user = responseData.user;
          const accessToken = responseData.tokens.accessToken;

          localStorage.setItem("accessToken", accessToken);
          set({ user });
        } catch (error: any) {
          const message = error.response?.data?.message || "Registration failed";
          throw new Error(message); // ✅ Consistent error handling
        } finally {
          set({ isLoading: false });
        }
      },

      logout: () => {
        localStorage.removeItem("accessToken");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
