import React from 'react';
import classes from './Burger.module.scss'

const BurgerMenu = () => {
    return (
        <div className={classes.burger}>
            <img src='/logo.svg' alt=""/>
            <p>menu</p>
        </div>
    );
};

export default BurgerMenu;