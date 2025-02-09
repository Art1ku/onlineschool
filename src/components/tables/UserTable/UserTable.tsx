"use client";

import React, { useEffect, useState } from "react";
import UserFilters from "@/components/ui/UserFilters/UserFilters";
import UserModal from "@/components/ui/UserModal/UserModal";
import { fetchUsers, deleteUserById, updateUserRole } from "@/lib/api/user";

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
}

const UserTable: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [email, setEmail] = useState("");
    const [roleFilter, setRoleFilter] = useState("ALL");
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);

    // Загружаем пользователей
    useEffect(() => {
        const loadUsers = async () => {
            try {
                const data = await fetchUsers();
                setUsers(data);
            } catch (error) {
                console.error("Ошибка загрузки пользователей:", error);
            }
        };
        loadUsers();
    }, []);

    // Открытие модалки
    const openModal = (user: User) => {
        setSelectedUser(user);
        setModalOpen(true);
    };

    // Закрытие модалки
    const closeModal = () => {
        setSelectedUser(null);
        setModalOpen(false);
    };

    // Удаление пользователя
    const handleDelete = async () => {
        if (!selectedUser) return;
        try {
            await deleteUserById(selectedUser.id);
            setUsers(users.filter((user) => user.id !== selectedUser.id));
            closeModal();
        } catch (error) {
            console.error("Ошибка при удалении:", error);
        }
    };

    // Изменение роли
    const handleRoleChange = async (newRole: string) => {
        if (!selectedUser) return;
        try {
            await updateUserRole(selectedUser.id, newRole);
            setUsers(users.map(user =>
                user.id === selectedUser.id ? { ...user, role: newRole } : user
            ));
            closeModal();
        } catch (error) {
            console.error("Ошибка при обновлении роли:", error);
        }
    };

    // Фильтрация пользователей
    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(email.toLowerCase()) &&
        (roleFilter === "ALL" || user.role === roleFilter)
    );

    return (
        <div>
            <UserFilters email={email} role={roleFilter} setEmail={setEmail} setRole={setRoleFilter} />

            <table className="border-collapse w-full">
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
                        <td>{user.role}</td>
                        <td>
                            <button onClick={() => openModal(user)}>⋮</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>

            <UserModal
                isOpen={modalOpen}
                onClose={closeModal}
                onDelete={handleDelete}
                onChangeRole={handleRoleChange}
                selectedRole={selectedUser?.role || ""}
            />
        </div>
    );
};

export default UserTable;
