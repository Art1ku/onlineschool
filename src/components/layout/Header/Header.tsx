import { useState, useEffect } from "react";
import classes from "./Header.module.scss";
import Link from "next/link";
import Container from "@/components/base/Container/Container";
import { useSession } from "next-auth/react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [showNav, setShowNav] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

      const session = useSession();
      console.log(session)

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY <= 500) {
                setShowNav(true); 
            } else {
                setShowNav(false); 
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const closeMenu = (e: any) => {
        if (e.target.classList.contains(classes.menuOverlay)) {
            setMenuOpen(false);
        }
    };

    const handleScrollToSection = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, sectionId: string) => {
        event.preventDefault();
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    };
    
    return (
        <>
            <div className={classes.wrapper}>
                <Container>
                    <div className={classes.flexBox}>
                        <div className={classes.insideWrapper}>
                            <div className={classes.LogoWrapper}>
                                <p className={classes.LogoName}>LOGOTY</p>
                            </div>
                            <div className={classes.RegWrapper}>
                                <div className={classes.menuIcon} onClick={() => setMenuOpen(!menuOpen)}>
                                    <div className={menuOpen ? classes.burgerOpen : classes.burger}></div>
                                </div>
                                <Link href={"/auth/signin"} className={classes.LogIn}>
                                    Log in
                                </Link>
                                <div className={classes.divider} />
                                <Link className={classes.Register} href={"/auth/signin"}>
                                    Register
                                </Link>
                            </div>
                        </div>
                        <div className={`${classes.navContainer} ${showNav ? classes.navVisible : classes.navHidden}`}>
                            <a href="#section1" className={classes.anchorF}>About us</a>
                            <a href="#section2" className={classes.anchor}>Our statistic</a>
                            <a href="#section3" className={classes.anchor}>School system</a>
                            <a href="#section4" className={classes.anchor}>News</a>
                            <a href="#section5" className={classes.anchorL}>Section 5</a>
                        </div>
                    </div>
                </Container>
            </div>



            <div className={`${classes.menuOverlay} ${menuOpen ? classes.menuVisible : ""}`} onClick={closeMenu}>
                <div className={classes.menuContent} onClick={(e) => e.stopPropagation()}>
                    <div className={classes.menuContentCont}>
                        <Link href={"/profile"} onClick={() => setMenuOpen(false)}>
                            <p>Cabinet</p>
                        </Link>
                    </div>
                    <div className={classes.menuContentCont}>
                        <Link href={"/settings"} onClick={() => setMenuOpen(false)}>
                            <p>Settings</p> 
                        </Link>
                    </div>
                    <div className={classes.menuContentCont}>
                        <Link href={"/logout"} onClick={() => setMenuOpen(false)}>
                            <p>Logout</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
