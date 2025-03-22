'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        username: '',
        password: '',
        title: 'PARENT', // Стандартная роль
    });

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/v1/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    email: formData.email,
                    username: formData.username,
                    password: formData.password,
                    roles: [{ id: formData.title === 'PARENT' ? 1 : 2, title: formData.title }], // Исправлено
                    userStatus: 'ACTIVE',
                    createdAt: new Date().toISOString(),
                }),
            });

            if (!res.ok) {
                const data = await res.json();
                throw new Error(data.message || 'Ошибка регистрации');
            }

            router.push('/auth');
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Регистрация</h1>
            <input
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
            <input
                type="text"
                placeholder="Username"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
            />
            <input
                type="password"
                placeholder="Пароль"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <select
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            >
                <option value="PARENT">Родитель</option>
                <option value="EMPLOYEE">Работник</option>
            </select>
            <button type="submit">Зарегистрироваться</button>
        </form>
    );
}
