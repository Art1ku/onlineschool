import axios from "axios";

const API_BASE = "http://192.168.139.213:8080/api/v1/user";

const user = {
    username: "alisa",
    password: "1234",
};
const authHeader = `Basic ${btoa(`${user.username}:${user.password}`)}`;

export const fetchUsers = async () => {
    const response = await fetch(`${API_BASE}/get-all-users`);
    if (!response.ok) throw new Error("Ошибка при загрузке пользователей");
    return response.json();
};

export const deleteUserById = async (id: number) => {
    await axios.delete(`${API_BASE}/delete-user-by-id/${id}`, {
        headers: {Authorization: authHeader},
    });
};

export const updateUserRole = async (userId: number, newRole: string) => {
    try {
        const response = await axios.patch(`${API_BASE}/update-user-role`, {
            user_id: userId,
            role: newRole
        }, {
            headers: {Authorization: authHeader}
        });
        return response.data;
    } catch (error) {
        console.error("Ошибка при обновлении роли:", error);
        throw error;
    }
};

export const addRoleToUser = async (id: number, role: string) => {
    try {
        await axios.post(`${API_BASE}/add-role-to-user-by-title`, null, {
            params: {user_id: id, title: role},
            headers: {Authorization: authHeader}
        });
        console.log("Роль успешно добавлена!");
    } catch (error) {
        console.error("Ошибка при добавлении роли:", error);
        throw error;
    }
};

export const deleteRoleToUser = async (id: number, role: string) => {
    try {
        await axios.delete(`${API_BASE}/delete-user-role-by-title`, {
            params: {title: role, user_id: id},
            headers: {Authorization: authHeader},
        });
        console.log(role)
        console.log("Роль успешно удалена!");
    } catch (error) {
        if (error.response) {
            console.error("Ошибка от сервера:", error.response.data);
        } else if (error.request) {
            console.error("Ошибка запроса:", error.request);
        } else {
            console.error("Ошибка при настройке запроса:", error.message);
        }
        throw error;
    }
};