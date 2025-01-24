'use client'

import classes from "./Header.module.scss"
import BurgerMenu from "@/components/base/BurgerMenu/BurgerMenu";
export default function Header(){


    return(
     <header className={classes.header}>
         <img src="/header_logo.svg" alt=""/>
         <BurgerMenu></BurgerMenu>
     </header>
    )
}