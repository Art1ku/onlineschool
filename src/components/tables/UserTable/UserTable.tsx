import React from "react";
import classes from "./userTable.module.scss";

interface Role {
    id: number;
    title: string;
}

interface User {
    id: number;
    username: string;
    email: string;
    roles: Role[]; // Теперь это массив объектов { id, title }
}

interface Props {
    data: User[];
    searchEmail: string;
    filterRole: string;
    onOpenModal: (user: User) => void;
}

const UserTable: React.FC<Props> = ({ data, searchEmail, filterRole, onOpenModal }) => {
    const filteredUsers = data.filter((user) =>
        user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
        (filterRole === "ALL" || user.roles.some(role => role.title === filterRole)) // Фильтр по ролям
    );

    return (
        <div className={classes.user}>
            {filteredUsers.length > 0 ? (
                <table className={classes.table}>
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Имя</th>
                        <th>Email</th>
                        <th>Роли</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.username}</td>
                            <td>{user.email}</td>
                            <td className={classes.role}>
                                {user.roles.map(role => role.title).join(", ")}
                            </td>
                            <td>
                                <button
                                    className={classes.action_modal}
                                    onClick={() => onOpenModal(user)}
                                >
                                    ⋮
                                </button>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>Пользователь не найден</p>
            )}
        </div>
    );
};

export default UserTable;
