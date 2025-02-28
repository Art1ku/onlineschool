import create from 'zustand'; // правильный импорт

interface AuthState {
    accessToken: string | null;
    refreshToken: string | null;
    role: string | null;
    setAuth: (accessToken: string, refreshToken: string, role: string) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    accessToken: null,
    refreshToken: null,
    role: null,
    setAuth: (accessToken, refreshToken, role) => set({ accessToken, refreshToken, role }),
    logout: () => set({ accessToken: null, refreshToken: null, role: null }),
}));
