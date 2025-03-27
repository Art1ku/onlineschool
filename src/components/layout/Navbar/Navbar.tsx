"use client";
import { useSidebar } from '@/components/context/SidebarContext';
import classes from './navbar.module.scss'

const Navbar = () => {

    const { toggleSidebar } = useSidebar();
    return (
        <nav className={classes.navbar}>
            <button onClick={toggleSidebar}>
                ☰ Меню
            </button>
        </nav>
    );
};

export default Navbar;
