'use client';
import Header from "@/components/layout/Header/Header";
import classes from './Application.module.scss';
import Link from "next/link";

const Application: React.FC = () => {

    return (
        <div className={classes.application}>
            <Header/>
        </div>
    );
};

export default Application;