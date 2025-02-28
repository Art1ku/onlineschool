'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import  useAuthStore  from '@/store/authStore';

const Dashboard = () => {
    const { isAuthenticated, setIsAuthenticated } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            router.push('/');
        } else {
            setIsAuthenticated(true);
        }
    }, [router, setIsAuthenticated]);

    if (!isAuthenticated) {
        return <p>Проверка авторизации...</p>;
    }

    return <h1>Добро пожаловать в личный кабинет!</h1>;
};

export default Dashboard;
