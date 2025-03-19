// 'use client';
//
// import { useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import useAuthStore from '@/store/authStore';
//
// export default function Dashboard() {
//     const { token } = useAuthStore();
//     const router = useRouter();
//
//     useEffect(() => {
//         if (!token) {
//             router.push('/auth');
//         }
//     }, [token]);
//
//     return <h1>Добро пожаловать в личный кабинет!</h1>;
// }
