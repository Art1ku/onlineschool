import cl from "./Header.module.scss"
import school from "../../../../public/images/Group 15.png"
import menu from "../../../../public/images/Group 1.png"
import Link from "next/link"

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
    )
}