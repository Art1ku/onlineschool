import React, { useState } from "react";
import styles from "./UserModal.module.scss";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

interface Props {
    isOpen: boolean;
    user: User | null;
    onClose: () => void;
    onDelete: (id: number) => void;
    roles: string[];
    onChangeRole: (id: number, newRole: string) => void;
    addRoleToUser: (id: number, role: string) => void;
}

const UserModal: React.FC<Props> = ({ isOpen, user, onClose, onDelete, onChangeRole, roles, addRoleToUser }) => {
    if (!isOpen || !user) return null;

    const [selectedRole, setSelectedRole] = useState(user.role);

    const handleAddRole = () => {
        if (selectedRole) {
            addRoleToUser(user.id, selectedRole);
            onClose(); // Закрываем модалку
        }
    };

    return (
        <div className={styles["modal-overlay"]}>
            <div className={styles.modal}>
                <h2>Управление пользователем</h2>
                <p><strong>{user.name}</strong></p>

                <div className={styles["modal-buttons"]}>
                    <button className={styles["delete-btn"]} onClick={() => onDelete(user.id)}>Удалить</button>
                    <button className={styles["close-btn"]} onClick={onClose}>Закрыть</button>
                </div>

                <br />

                <div>
                    <label>Добавить роль:</label>
                    <select value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                        {roles.map((role, index) => (
                            <option key={index} value={role}>
                                {role}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleAddRole}>Добавить роль</button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;