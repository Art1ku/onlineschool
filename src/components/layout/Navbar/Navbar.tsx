"use client";
import classes from './navbar.module.scss'

interface NavbarProps {
    toggleSidebar: () => void;
}

const Navbar = ({ toggleSidebar }: NavbarProps) => {
    return (
        <nav className={classes.navbar}>
            <button onClick={toggleSidebar}>
                ☰ Меню
            </button>
        </nav>
    );
};

export default Navbar;
