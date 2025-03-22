'use client';

import classes from "./BlockLinks.module.scss"
import Container from "../Container/Container";
import Link from "next/link";


export default function BlockLinks() {


    return (
        <div className={classes.wrapper}>
            <Container>
                <div className={classes.insideWrapper}>
                    <div className={classes.TitleWrapper}>
                        <p className={classes.Title}>Studying at School</p>
                    </div>
                    <div className={classes.BlocksWrapper}>
                        <div className={classes.block1}>
                            <div className={classes.BlockImg} >
                                 <div className={classes.BlockTitle}>
                                    <p className={classes.BlockTitleP}>Studying</p>
                                </div>
                            </div>
                            <div className={classes.BlockContent}>
                                <div className={classes.BlockText}>
                                    <p className={classes.BlockTitleP}></p>
                                </div>
                                <Link href={"/settings"}>
                                    <div className={classes.LinkP}>

                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={classes.block2}>
                            <div className={classes.BlockImg} >
                                 <div className={classes.BlockTitle}>
                                    <p className={classes.BlockTitleP}>Qualified teachers</p>
                                </div>
                            </div>
                            <div className={classes.BlockContent}>
                                <div className={classes.BlockText}>
                                    <p className={classes.BlockTitleP}></p>
                                </div>
                                <Link href={"/settings"}>
                                    <div className={classes.LinkP}>

                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={classes.block3}>
                        <div className={classes.BlockImg} >
                                 <div className={classes.BlockTitle}>
                                    <p className={classes.BlockTitleP}>Education</p>
                                </div>
                            </div>
                            <div className={classes.BlockContent}>
                                <div className={classes.BlockText}>
                                    <p className={classes.BlockTitleP}></p>
                                </div>
                                <Link href={"/settings"}>
                                    <div className={classes.LinkP}>

                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className={classes.block4}>
                        <div className={classes.BlockImg} >
                                 <div className={classes.BlockTitle}>
                                    <p className={classes.BlockTitleP}>Extra activities</p>
                                </div>
                            </div>
                            <div className={classes.BlockContent}>
                                <div className={classes.BlockText}>
                                    <p className={classes.BlockTitleP}></p>
                                </div>
                                <Link href={"/settings"}>
                                    <div className={classes.LinkP}>

                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
}