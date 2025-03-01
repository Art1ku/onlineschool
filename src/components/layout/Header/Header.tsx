import classes from "./Header.module.scss"
import Link from "node_modules/next/link"
import Container from "@/components/base/Container/Container"

export default function Header() {


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
                </Container>
            </div>
        </>
    )
}


