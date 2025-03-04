import { create } from 'zustand';

interface AuthState {
    user: any;
    token: string | null;
    setUser: (user: any) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
    email: string;
    setEmail: (email: string) => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    token: null,
    setUser: (user) => set({ user }),
    setToken: (token) => set({ token }),
    logout: () => set({ user: null, token: null }),
    email: '',
    setEmail: (email) => set({ email })
}));

export default useAuthStore;
