import React from 'react';
import classes from './Input.module.scss';

interface InputProps {
    type?: string; // Опциональный тип
    value: string; // Обязательное значение для поля
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void; // Обработчик изменения
    placeholder: string; // Плейсхолдер
}

const RegisterInput: React.FC<InputProps> = ({ value, onChange, type = 'text', placeholder }) => {
    return (
        <input
            className={classes.input}
            type={type} // Используется тип, если он передан
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required
        />
    );
};

export default RegisterInput;
