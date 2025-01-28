import React from 'react';
import classes from './Input.module.scss'


interface RegisterInputProps {
    type: string;
    name: string;
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const RegisterInput: React.FC<RegisterInputProps> = ({ type, name, placeholder, value, onChange }) => {
    return (
        <div>
            <input
                className={classes.input}
                type={type}
                name={name}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default RegisterInput;
