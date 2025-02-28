import { useState } from 'react';
import { useRouter } from 'next/router';
import { register } from '@/api/authApi';

const RegistrationPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const router = useRouter();

    const handleRegister = async () => {
        try {
            const response = await register(username, password, email);
            // После успешной регистрации, перенаправляем на страницу подтверждения почты
            router.push(`/verify-email?email=${email}`);
        } catch (error) {
            console.error('Ошибка при регистрации:', error.message);
        }
    };

    return (
        <div>
            <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
            />
            <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
            />
            <button onClick={handleRegister}>Register</button>
        </div>
    );
};

export default RegistrationPage;
