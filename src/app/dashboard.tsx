'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';

const DashboardPage = () => {
    const router = useRouter();
    const { accessToken, refreshToken, role } = useAuthStore();

    useEffect(() => {
        if (!accessToken || !refreshToken) {
            // Перенаправляем на страницу авторизации, если нет токенов
            router.push('/login');
        }
    }, [accessToken, refreshToken, router]);

    return (
        <div>
            <h1>Добро пожаловать, {role === 'employee' ? 'Сотрудник' : 'Родитель'}</h1>
            {/* Дальше можно добавлять логику для отображения разных страниц в зависимости от роли */}
        </div>
    );
};

export default DashboardPage;
