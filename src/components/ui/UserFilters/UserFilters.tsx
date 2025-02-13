import React from "react";
import classes from "./UserFilters.module.scss";

interface Props {
    email: string;
    role: string;
    roles: string[];
    setEmail: (value: string) => void;
    setRole: (value: string) => void;
}

const UserFilters: React.FC<Props> = ({email, role, setEmail, setRole, roles}) => {
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
                {roles.map((item, idx) => {
                    return (
                        <option key={idx
                        } value={item}>{item}</option>
                    )
                })}
            </select>
        </div>
    );
};

export default UserFilters;
