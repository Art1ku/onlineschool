'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import  useAuthStore  from '@/store/authStore';
import { $url } from '@/api/api';
import { useSession } from 'next-auth/react';

export default function Verify() {
    const [verificationCode, setCode] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();
    const { email } = useAuthStore();
    const session = useSession()
    console.log(session)

    const handleVerify = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const res = await fetch(`${$url}/api/v1/auth/verify`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, verificationCode }),
            });

            const data = await res.json();
            console.log(data);

            if (!res.ok) throw new Error(data.message || 'Ошибка верификации');

            router.push('/auth'); 
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <form onSubmit={handleVerify}>
            <h1>Подтверждение почты</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <p>Мы отправили код на: <strong>{email}</strong></p>
            <input
                type="text"
                placeholder="Введите код"
                value={verificationCode}
                onChange={(e) => setCode(e.target.value)}
            />
            <button type="submit">Подтвердить</button>
        </form>
    );
}
