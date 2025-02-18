import cl from "./Header.module.scss"
import school from "../../../../public/images/Group 15.png"
import menu from "../../../../public/images/Group 1.png"
import Link from "next/link"

<<<<<<< HEAD:src/components/layout/Header/Header.tsx
import classes from "./Header.module.scss"
import BurgerMenu from "@/components/layout/BurgerMenu/BurgerMenu";
import Link from "next/link";

export default function Header(){
    return(
     <header className={classes.header}>
         <Link href='/'><img src='/header_logo_blue.svg' alt=""/></Link>
         <BurgerMenu></BurgerMenu>
     </header>
=======
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
                        <Link className={cl.login} href={"/registration"}><h1>Log in</h1></Link>
                        <button className={cl.menu}><img src={menu.src}/><h1>menu</h1></button>
                    </div>
                </div>
            </div>
        </>
>>>>>>> 524dd1a739b25d3eb5d95a316245e2e339b78cdc:src/components/base/Header/Header.tsx
    )
}