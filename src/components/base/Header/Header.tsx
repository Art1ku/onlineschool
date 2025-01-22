import cl from "./Header.module.scss"
import school from "../photo/Group 15.png"
import menu from "../photo/Group 1.png"

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
    )
}