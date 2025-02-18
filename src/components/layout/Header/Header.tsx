'use client'

import classes from "./Header.module.scss"
import BurgerMenu from "@/components/layout/BurgerMenu/BurgerMenu";
import Link from "next/link";

export default function Header(){
    return(
     <header className={classes.header}>
         <Link href='/'><img src='/header_logo_blue.svg' alt=""/></Link>
         <BurgerMenu></BurgerMenu>
     </header>
    )
}