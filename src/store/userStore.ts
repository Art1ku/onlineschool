import { create } from "zustand";

interface Role {
  title: string;
}

interface User {
  id: number;
  email: string;
  username: string;
  roles: Role[];
  createdAt: string;
  userStatus: string;
  enabled: boolean;
}

interface AuthState {
  user: User | null;
  token: string | null;
  setUser: (user: User) => void;
  clearUser: () => void;
  setToken: (token: string) => void;
  clearToken: () => void;
  fetchUserDetails: (accessToken: string) => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),

  setToken: (token) => set({ token }), 
  clearToken: () => set({ token: null }), 

  fetchUserDetails: async (accessToken) => {
    try {
      console.log("Запрашиваем userDetails...");
      const response = await fetch("http://localhost:8080/api/v1/auth/user/details", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Ошибка при загрузке данных пользователя");
      }

      const userData = await response.json();
      // console.log("Получен userDetails:", userData);
      set({ user: userData });
    } catch (error) {
      console.error("Ошибка при загрузке пользователя:", error);
      set({ user: null });
    }
  },
}));
