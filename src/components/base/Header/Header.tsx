<<<<<<< HEAD
import cl from "./Header.module.scss"
import school from "../../../../public/images/Group 15.png"
import menu from "../../../../public/images/Group 1.png"

export default function Header() {


    return (
        <>
            <div className={cl.header}>
                <div className={cl.header_container}>
                    <div className={cl.container_logo}>
                        <img className={cl.logo} src={school.src}/>
                        <h1 className={cl.logo_text}>School</h1>
                    </div>
                    <div className={cl.base}>
                        <button className={cl.login}><h1>Log in</h1></button>
                        <button className={cl.menu}><img src={menu.src}/><h1>menu</h1></button>
                    </div>
                </div>
            </div>
        </>
=======
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
>>>>>>> 4db280174c84bf95c098e5b51ac643b68710a9a8
    )
}