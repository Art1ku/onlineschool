import React from "react";
import classes from './UserFilters.module.scss'

interface Props {
    email: string;
    role: string;
    setEmail: (value: string) => void;
    setRole: (value: string) => void;
}

const UserFilters: React.FC<Props> = ({ email, role, setEmail, setRole }) => {
    return (
        <div className={classes.filter}>
            <input
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Поиск по email"
                className={classes.search}
            />
            <select value={role} onChange={(e) => setRole(e.target.value)} className={classes.filter_select}>
                <option value="ALL">Все роли</option>
                <option value="USER">Пользователь</option>
                <option value="TEACHER">Преподаватель</option>
                <option value="ADMIN">Админ</option>
                <option value="DIRECTOR">Директор</option>
            </select>
        </div>
    );
};

export default UserFilters;
