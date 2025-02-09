const API_BASE = "https://96a3-46-251-196-77.ngrok-free.app/api/v1";

// Получение всех пользователей
export const fetchUsers = async () => {
    const response = await fetch(`${API_BASE}/user/get-all-user`);
    if (!response.ok) throw new Error("Ошибка при загрузке пользователей");
    return response.json();
};

// Удаление пользователя
export const deleteUserById = async (id: number) => {
    const response = await fetch(`${API_BASE}/user/${id}`, {
        method: "DELETE",
    });
    if (!response.ok) throw new Error("Ошибка при удалении пользователя");
};

// Обновление роли пользователя
export const updateUserRole = async (id: number, role: string) => {
    const response = await fetch(`${API_BASE}/user/${id}/role`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({role}),
    });
    if (!response.ok) throw new Error("Ошибка при изменении роли");
};
