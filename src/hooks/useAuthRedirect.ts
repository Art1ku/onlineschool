import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import useAuthStore from '@/store/authStore';
import { isTokenExpired } from '@/utils/auth';

export const useAuthRedirect = () => {
    const { token, logout } = useAuthStore();
    const router = useRouter();

    useEffect(() => {
        if (!token || isTokenExpired(token)) {
            logout();
            router.push('/login');
        }
    }, [token]);
};
