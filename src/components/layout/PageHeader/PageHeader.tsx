import React from 'react';
import classes from './style.module.scss'

interface PageProps {
    text: string;
    icon: string;
    bc: string;
    icon2: string
}

const PageHeader = ({icon,text,bc,icon2}: PageProps) => {
    return (
            <div className={classes.dashboard_header}>
                <div className={classes.logo}>
                    <img style={{background:bc}} src={icon} alt=""/>
                    <h5>{text}</h5>
                </div>
                <div className={classes.bread_crumbs}>
                    <img src={icon2} alt=""/>
                    /
                    <p>{text}</p>
                </div>
            </div>
    );
};

export default PageHeader;