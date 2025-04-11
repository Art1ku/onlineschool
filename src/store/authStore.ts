import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    user: any;
    token: string | null;
    setUser: (user: any) => void;
    setToken: (token: string | null) => void;
    logout: () => void;
    email: string;
    setEmail: (email: string) => void;
}

const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            setUser: (user) => set({ user }),
            setToken: (token) => set({ token }),
            logout: () => set({ user: null, token: null }),
            email: '',
            setEmail: (email) => set({ email }),
        }),
        {
            name: "auth-storage", 
            partialize: (state) => ({
                token: state.token,
                user: state.user,
                email: state.email,
            }),
        }
    )
);

export default useAuthStore;
