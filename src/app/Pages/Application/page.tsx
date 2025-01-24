import React, { useState } from 'react';
import Header from "@/components/base/Header/Header";
import classes from './Application.module.scss';
import RegisterInput from "@/components/base/Input/InputsRegister";

const Application: React.FC = () => {
    // Массив с данными для полей ввода
    const inputs = [
        { id: 1, type: 'text', placeholder: 'Your first name' },
        { id: 2, type: 'text', placeholder: 'where are they registered?' },
        { id: 3, type: 'email', placeholder: 'your last name' },
        { id: 4, type: 'password', placeholder: 'where were you born' },
        { id: 5, type: 'email', placeholder: 'your Email' },
        { id: 6, type: 'email', placeholder: 'TIN of your passport' },
    ];

    // Состояние для значений каждого поля
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    });

    // Обработчик изменения данных в полях ввода
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    return (
        <div className={classes.application}>
            <Header />
            <h2>REGISTER YOUR APPLICATION</h2>
            <form action="">
                <div className={classes.forms}>
                    <div className={classes.input}>
                        {inputs.map(input => (
                            <RegisterInput
                                key={input.id}
                                type={input.type}
                                placeholder={input.placeholder}
                                value={formData[input.placeholder.replace(' ', '').toLowerCase()]}
                                onChange={handleInputChange}
                            />
                        ))}
                    </div>
                    <div className={classes.textarea}>
                        <textarea
                            id="work-experience"
                            name="workExperience"
                            cols="30"
                            rows="10"
                            placeholder="your work experience"
                        />
                        <textarea
                            id="position-tasks"
                            name="positionTasks"
                            cols="30"
                            rows="10"
                            placeholder="what position did you hold and what were your tasks?"
                        />
                    </div>
                </div>
                <div className={classes.photo}>
                    <p>Photo of your passport</p>
                    <img src="/passport.png" alt="passport" />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default Application;
