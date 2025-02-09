import React from "react";
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
    onChangeRole: (id: number, newRole: string) => void;
}

const UserModal: React.FC<Props> = ({ isOpen, user, onClose, onDelete, onChangeRole }) => {
    if (!isOpen || !user) return null;

    return (
        <div className={styles["modal-overlay"]}>
            <div className={styles.modal}>
                <h2>Управление пользователем</h2>
                <p><strong>{user.name}</strong></p>
                <select value={user.role} onChange={(e) => onChangeRole(user.id, e.target.value)}>
                    <option value="USER">Пользователь</option>
                    <option value="TEACHER">Преподаватель</option>
                    <option value="ADMIN">Админ</option>
                    <option value="DIRECTOR">Директор</option>
                </select>
                <div className={styles["modal-buttons"]}>
                    <button className={styles["delete-btn"]} onClick={() => onDelete(user.id)}>Удалить</button>
                    <button className={styles["close-btn"]} onClick={onClose}>Закрыть</button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
