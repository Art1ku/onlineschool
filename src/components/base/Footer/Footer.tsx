
import classes from "./Footer.module.scss" 
import Container from "../Container/Container"

export default function Footer(){


    return(
        <>
            <div className={classes.wrapper}>
                <Container>
                    <div className={classes.insideWrapper}>
                        <div className={classes.part}>
                            <div className={classes.partInside}>
                                <p className={classes.schoolName}>Newdevis</p>
                                <div className={classes.icon}></div>
                            </div>
                        </div>
                        <div className={classes.part}>
                            <div className={classes.partInside}>
                                <div className={classes.first}>
                                    <p className={classes.section}>England</p>
                                </div>
                                <div className={classes.second}>
                                    <p className={classes.gmail}>examsvsvddsssvple@gmail.com</p>
                                    <p className={classes.section}>+44 20 7123 4567</p>
                                    <p className={classes.section}>Example Address st.</p>
                                    <p className={classes.section}>Example lol</p>
                                </div>
                                <div className={classes.third}>
                                    <p className={classes.section}>Link for more </p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.part1}>
                            <div className={classes.partInside}>
                                <div className={classes.first}>
                                    <p className={classes.section}>Links</p>
                                </div>
                                <div className={classes.second}>
                                    <p className={classes.section}>News</p>
                                    <p className={classes.section}>About us</p>
                                    <p className={classes.section}>Teachers</p>
                                    <p className={classes.section}>Open days</p>
                                </div>
                                <div className={classes.third}>
                                    <p className={classes.section}>Log in </p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.part}>
                            <div className={classes.partInside}>
                                <p className={classes.section}>Privacy statepoint</p>
                                <p className={classes.section}>Jobs</p>
                                <p className={classes.section}>More info and news in</p>
                                <div className={classes.widgets}>
                                    <div className={classes.facebook}></div>
                                    <div className={classes.instagram}></div>
                                    <div className={classes.telegram}></div>
                                    <div className={classes.steam}></div>
                                    <div className={classes.whatsapp}></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Container>
            </div>
        </>
    )
}