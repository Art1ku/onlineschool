'use client';

import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';

export default function Auth() {
    const [formData, setFormData] = useState({ identifier: '', password: '' });
    const [error, setError] = useState('');
    const router = useRouter();

    useEffect(() => {
        const role = Cookies.get('role');
        if (role) {
            redirectToRolePage(role);
        }
    }, []);

    const { setEmail } = useAuthStore();

    const redirectToRolePage = (role: string) => {
        if (role === 'PARENT') {
            router.push('/parent');
        } else if (role === 'EMPLOYEE') {
            router.push('/requests');
        } else {
            router.push('/auth');
        }
    };

    const getUserRoles = async (token: string) => {
        try {
            const res = await fetch('http://localhost:8080/api/v1/auth/user-roles', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!res.ok) {
                throw new Error('Ошибка при получении ролей');
            }

            const data = await res.json();
            return data.roles; // Возвращаем массив ролей
        } catch (error) {
            console.error('Ошибка при запросе ролей:', error);
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch('http://localhost:8080/api/v1/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            if (!res.ok) {
                if (data.message === 'Вы не верифицированы. Подтвердите почту') {
                    setEmail(formData.identifier);
                    router.push('/verify');
                    return;
                }
                throw new Error(data.message || 'Ошибка авторизации');
            }

            // Сохраняем токены и роль в куки
            Cookies.set('token', data.accessToken, { path: '/', expires: 7 });
            Cookies.set('role', data.role, { path: '/', expires: 7 });

            // Получаем роль пользователя с помощью запроса
            const roles = await getUserRoles(data.accessToken);
            const userRole = roles[0]?.title; // Получаем первую роль, если она есть

            if (userRole) {
                redirectToRolePage(userRole);
            } else {
                setError('Не удалось определить роль пользователя');
            }

        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h1>Авторизация</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <input
                type="email"
                placeholder="Email"
                onChange={(e) => setFormData({ ...formData, identifier: e.target.value })}
            />
            <input
                type="password"
                placeholder="Пароль"
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
            <button type="submit">Войти</button>
        </form>
    );
}
