import React from 'react';
import classes from '@/styles/Admin.module.scss'
import PageHeader from "@/components/layout/PageHeader/PageHeader";
import LineChart from "@/components/charts/LineChart";
import StatsOverview from "@/components/stats/StatsOverview";

const DashboardPage = () => {
    return (
        <div className={classes.dashboard}>
            <div className='container'>
                <PageHeader icon2='/home_grey.svg' bc='#4298FF' text='dashboard' icon='/home.svg' />
                <div className={classes.statistics}>
                    <div className={classes.charts}>
                        <div className={classes.text}>
                            <h4>Статистика пользователей</h4>
                        </div>
                        <LineChart></LineChart>
                    </div>
                    <div className={classes.statistics_users}>
                        <StatsOverview />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;