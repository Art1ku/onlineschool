import React from "react";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    onDelete: () => void;
    onChangeRole: (newRole: string) => void;
    selectedRole: string;
}

const UserModal: React.FC<Props> = ({ isOpen, onClose, onDelete, onChangeRole, selectedRole }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">Управление пользователем</h2>

                <label className="block mb-2">Изменить роль</label>
                <select
                    value={selectedRole}
                    onChange={(e) => onChangeRole(e.target.value)}
                    className="border p-2 w-full mb-4"
                >
                    <option value="USER">Пользователь</option>
                    <option value="TEACHER">Преподаватель</option>
                    <option value="ADMIN">Админ</option>
                    <option value="DIRECTOR">Директор</option>
                </select>

                <div className="flex justify-between">
                    <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={onDelete}>
                        Удалить
                    </button>
                    <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={onClose}>
                        Закрыть
                    </button>
                </div>
            </div>
        </div>
    );
};

export default UserModal;
