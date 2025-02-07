"use client";

import CountUp from "react-countup";
import {FC} from "react";
import classes from './stats.module.scss'

interface StatCardProps {
    title: string;
    value: number;
    icon: React.ReactNode;
    color: string;
}

const StatCard: FC<StatCardProps> = ({title, value, icon, color}) => {
    return (
        <div className={classes.stats_card}>
            <h5>{title}</h5>
            <div className={classes.count_up}>
                <CountUp
                    style={{color:color,fontSize:'18px',fontWeight:'600'}}
                    start={0}
                    end={value}
                    duration={2}
                    separator=" "
                />
                <div style={{backgroundColor: color}}> {icon} </div>
            </div>
            <p className={classes.period}>period</p>
        </div>
    );
};

export default StatCard;
