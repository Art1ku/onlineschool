'use client';

import classes from "./BlockLinks.module.scss"
import Container from "../Container/Container";



export default function BlockLinks() {


    return (
        <div className={classes.wrapper}>
            <Container>
                <div className={classes.insideWrapper}>
                    <div className={classes.TitleWrapper}>
                        <p className={classes.Title}>Studying at School</p>
                    </div>
                    <div className={classes.BlocksWrapper}>
                        <div>

                        </div>

                    </div>
                </div>
            </Container>
        </div>
    );
}