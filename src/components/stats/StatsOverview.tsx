import { User, Users, GraduationCap } from "lucide-react";
import StatCard from "./StatCard";
import classes from './stats.module.scss'
import clsx from "clsx";

const StatsOverview = () => {

    const style: object = {
        color:'white',
        height:'28px'
    }

    return (
        <div className={classes.stats}>
            <StatCard
                title="Ученики"
                value={1243}
                icon={<GraduationCap style={style} />}
                color="#4298FF"
            />
            <StatCard
                title="Учителя"
                value={56}
                icon={<User style={style} />}
                color="#34D2B5"
            />
            <StatCard
                title="Пользователи"
                value={431}
                icon={<Users style={style} />}
                color="#F6AF4B"
            />
        </div>
    );
};

export default StatsOverview;
