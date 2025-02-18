"use client";

import React, { useEffect, useState } from "react";
import PageHeader from "@/components/layout/PageHeader/PageHeader";
import UserTable from "@/components/tables/UserTable/UserTable";
import UserFilters from "@/components/ui/UserFilters/UserFilters";
import UserModal from "@/components/ui/UserModal/UserModal";
import axios from "axios";
import { addRoleToUser, deleteUserById, updateUserRole, deleteRoleToUser } from "@/lib/api/user";
import { $url } from "@/api/api";
import Loader from "@/components/ui/Loader/Loader";

interface User {
    id: number;
    username: string;
    email: string;
    roles: { id: number; title: string }[];
}

const UsersPage: React.FC = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [searchEmail, setSearchEmail] = useState("");
    const [filterRole, setFilterRole] = useState("ALL");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [roles, setRoles] = useState<{ id: number; title: string }[]>([]);
    const [loading, setLoading] = useState(false);

    const getAllUsers = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${$url}/api/v1/user/get-all-users`);
            const formattedUsers: User[] = res.data.map((user: any) => ({
                id: user.id,
                username: user.username,
                email: user.email,
                roles: user.roles.map((role: any) => ({ id: role.id, title: role.title })),
            }));
            setUsers(formattedUsers);
        } catch (error) {
            console.error("Ошибка при получении пользователей:", error);
        } finally {
            setLoading(false);
        }
    };

    const getAllRoles = async () => {
        setLoading(true);
        try {
            const res = await axios.get(`${$url}/api/v1/auth/user-roles`);
            setRoles(res.data);
        } catch (error) {
            console.error("Ошибка при получении ролей:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getAllUsers();
        getAllRoles();
    }, []);

    const handleDeleteUser = async (id: number) => {
        try {
            await deleteUserById(id);
            setUsers(users.filter((user) => user.id !== id));
            setSelectedUser(null);
        } catch (error) {
            console.error("Ошибка при удалении пользователя:", error);
        }
    };

    const handleDeleteRole = async (userId: number, role: string) => {
        try {
            await deleteRoleToUser(userId, role);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId
                        ? {
                            ...user,
                            roles: user.roles.filter((userRole) => userRole.title !== role),
                        }
                        : user
                )
            );
            alert("Роль успешно удалена!");
        } catch (error) {
            console.error("Ошибка при удалении роли:", error);
            alert("Не удалось удалить роль. Попробуйте снова.");
        }
    };

    const handleChangeRole = async (userId: number, newRole: string) => {
        try {
            await updateUserRole(userId, newRole);
            setUsers((prevUsers) =>
                prevUsers.map((user) =>
                    user.id === userId ? { ...user, roles: [...user.roles, { title: newRole }] } : user
                )
            );
            alert("Роль успешно изменена!");
        } catch (error) {
            console.error("Ошибка при изменении роли:", error);
            alert("Не удалось изменить роль. Попробуйте снова.");
        }
    };

    const handleAddRole = async (id: number, role: string) => {
        try {
            await addRoleToUser(id, role);
            getAllUsers();  // обновляем пользователей после добавления роли
            setSelectedUser(null);
        } catch (error) {
            console.error("Ошибка при добавлении роли:", error);
        }
    };

    return (
        <>
            {loading ? (
                <div className="loading">
                    <Loader />
                </div>
            ) : (
                <div className="container">
                    <PageHeader text="Users" icon2="/user_grey.svg" icon="/user.svg" bc="#FF5074" />
                    <UserFilters email={searchEmail} role={filterRole} setEmail={setSearchEmail} roles={roles} setRole={setFilterRole} />
                    <UserTable data={users} searchEmail={searchEmail} filterRole={filterRole} onOpenModal={setSelectedUser} />
                    <UserModal
                        roles={roles}
                        isOpen={!!selectedUser}
                        user={selectedUser}
                        onClose={() => setSelectedUser(null)}
                        onDelete={handleDeleteUser}
                        onChangeRole={handleChangeRole}
                        addRoleToUser={handleAddRole}
                        deleteRoleFromUser={handleDeleteRole}
                    />
                </div>
            )}
        </>
    );
};

export default UsersPage;
