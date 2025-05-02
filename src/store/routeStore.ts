import { create } from 'zustand';

interface SidebarState {
    activeLink: string;
    setActiveLink: (link: string) => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
    activeLink: '',
    setActiveLink: (link) => set({ activeLink: link }),
}));
