<<<<<<< HEAD
import cl from "./Header.module.scss"
import school from "../../../../public/images/Group 15.png"
import menu from "../../../../public/images/Group 1.png"
import Link from "../../../../node_modules/next/link"
=======
import classes from "./Header.module.scss"
import Link from "node_modules/next/link"
import Container from "@/components/base/Container/Container"
import {useSession} from "next-auth/react";

>>>>>>> 93d6702694eb4a4478d7736dd21f40dc817bf01c

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
                            <Link href={"/auth"}>
                                <div className={classes.LogIn}>
                                    Log in
                                </div>
                            </Link>
                            <div className={classes.divider} />
                            <Link className={classes.Register} href={"/registration"}>
                                Register
                            </Link>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}


