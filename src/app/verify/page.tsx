import { useState } from 'react';
import { useRouter } from 'next/router';
import { verifyEmail } from '@/api/authApi';

const VerifyEmailPage = () => {
    const router = useRouter();
    const { email } = router.query; // Получаем email из query params
    const [code, setCode] = useState('');

    const handleVerify = async () => {
        try {
            const response = await verifyEmail(email as string, code);
            console.log('Email verified:', response);
            // Перенаправить на страницу после успешной верификации
            router.push('/dashboard');
        } catch (error) {
            console.error('Ошибка при верификации:', error.message);
        }
    };

    return (
        <div>
            <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="Verification Code"
            />
            <button onClick={handleVerify}>Verify Email</button>
        </div>
    );
};

export default VerifyEmailPage;
