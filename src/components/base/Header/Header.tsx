'use client'

import classes from "./Header.module.scss"
import BurgerMenu from "@/components/base/BurgerMenu/BurgerMenu";
import Link from "next/link";
export default function Header(){


    return(
     <header className={classes.header}>
         <Link href='/'><img src="/header_logo.svg" alt=""/></Link>
         <BurgerMenu></BurgerMenu>
     </header>
    )
}