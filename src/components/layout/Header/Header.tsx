import classes from "./Header.module.scss"
import Link from "node_modules/next/link"
<<<<<<< HEAD
import Container from "@/components/base/Container/Container"
=======
import {useSession} from "next-auth/react";
>>>>>>> 4554f02e1e0fcddadb6c8e774e8784fba950b14e

export default function Header() {

    const session = useSession()
    console.log(session)
    return (
        <>
            <div className={classes.wrapper}>
                <Container>
                    <div className={classes.insideWrapper}>
                        <div className={classes.LogoWrapper}>
                            <p className={classes.LogoName}>S</p>
                            <p className={classes.LogoNameHighLight}>c</p>
                            <p className={classes.LogoName}>h</p>
                            <p className={classes.LogoNameHighLight}>ool</p>
                        </div>
                        <div className={classes.RegWrapper}>
                            <div className={classes.LogIn}>
                                Log in
                            </div>
                            <div className={classes.divider} />
                            <Link className={classes.Register} href={"/registration"}>
                                Register
                            </Link>
                        </div>
                    </div>
<<<<<<< HEAD
                </Container>
=======
                    <div className={cl.base}>
                        <Link className={cl.login} href={"/auth"}><h1>Log in</h1></Link>
                        <button className={cl.menu}><img src={menu.src}/><h1>menu</h1></button>
                    </div>
                </div>
>>>>>>> 4554f02e1e0fcddadb6c8e774e8784fba950b14e
            </div>
        </>
    )
}


