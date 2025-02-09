import React from "react";
import classes from './userTable.module.scss'

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    data: User[];
    searchEmail: string;
    filterRole: string;
    onOpenModal: (user: User) => void;
}

const UserTable: React.FC<Props> = ({ data, searchEmail, filterRole, onOpenModal }) => {
    const filteredUsers = data.filter(user =>
        user.email.toLowerCase().includes(searchEmail.toLowerCase()) &&
        (filterRole === 'ALL' || user.role === filterRole)
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
                        <th>Роль</th>
                        <th>Действия</th>
                    </tr>
                    </thead>
                    <tbody>
                    {filteredUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td className={classes.role}>{user.role}</td>
                            <td>
                                <button className={classes.action_modal} onClick={() => onOpenModal(user)}>⋮</button>
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
