'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Header from "@/components/base/Header/Header";
import RegisterInput from "@/components/base/Input/InputsRegister";
import FileInput from "@/components/base/FileInput/FileInput";
import classes from './Application.module.scss';

const Application: React.FC = () => {
    // Поля для родителей
    const parentFields = [
        { id: 1, name: 'firstName', type: 'text', placeholder: 'First Name' },
        { id: 2, name: 'lastName', type: 'text', placeholder: 'Last Name' },
        { id: 3, name: 'middleName', type: 'text', placeholder: 'Middle Name' },
        { id: 4, name: 'age', type: 'number', placeholder: 'Age' },
    ];

    // Поля для ребенка
    const childFields = [
        { id: 1, name: 'firstName', type: 'text', placeholder: 'Child First Name' },
        { id: 2, name: 'lastName', type: 'text', placeholder: 'Child Last Name' },
        { id: 3, name: 'middleName', type: 'text', placeholder: 'Child Middle Name' },
        { id: 4, name: 'age', type: 'number', placeholder: 'Child Age' },
        { id: 5, name: 'grade', type: 'text', placeholder: 'Class/Grade' },
    ];

    // Состояние для текстовых полей
    const [parentData, setParentData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        age: '',
    });

    const [childData, setChildData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        age: '',
        grade: '',
    });

    // Состояние для файлов
    const [files, setFiles] = useState({
        parentPhoto: null,
        childBirthCertificate: null,
        childRegistrationBook: null,
    });


    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: 'parentData' | 'childData'
    ) => {
        const { name, value } = e.target;

        if (type === 'parentData') {
            setParentData((prev) => ({ ...prev, [name]: value }));
        } else {
            setChildData((prev) => ({ ...prev, [name]: value }));
        }
    };


    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fileKey: 'parentPhoto' | 'childBirthCertificate' | 'childRegistrationBook'
    ) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFiles((prev) => ({
            ...prev,
            [fileKey]: file,
        }));
    };

    // Отправка формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(parentData).forEach(([key, value]) => formData.append(`parent_${key}`, value));
        Object.entries(childData).forEach(([key, value]) => formData.append(`child_${key}`, value));
        Object.entries(files).forEach(([key, value]) => {
            if (value) formData.append(key, value as Blob);
        });

        try {
            const response = await axios.post('/api/v1/application', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            console.log('Response:', response.data);
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Error submitting application:', error);
            alert('Failed to submit application.');
        }
    };

    return (
        <div className={classes.application}>
            <Header />
            <h2>Register Application</h2>

            <form onSubmit={handleSubmit}>
                <div className={classes.forms}>
                    {/* Родители */}
                    <div className={classes.parent}>
                        <h3>Parent Information</h3>
                        <div className={classes.parentInput}>
                            {parentFields.map((field) => (
                                <RegisterInput
                                    key={field.id}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={parentData[field.name]}
                                    onChange={(e) => handleInputChange(e, 'parentData')}
                                />
                            ))}
                        </div>
                        <FileInput label="Parent Photo" onChange={(e) => handleFileChange(e, 'parentPhoto')} />
                    </div>

                    {/* Ребенок */}
                    <div className={classes.child}>
                        <h3>Child Information</h3>
                        <div className={classes.childInput}>
                            {childFields.map((field) => (
                                <RegisterInput
                                    key={field.id}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={childData[field.name]}
                                    onChange={(e) => handleInputChange(e, 'childData')}
                                />
                            ))}
                        </div>
                        <FileInput label="Child Birth Certificate" onChange={(e) => handleFileChange(e, 'childBirthCertificate')} />
                        <FileInput label="Child Registration Book" onChange={(e) => handleFileChange(e, 'childRegistrationBook')} />
                    </div>
                </div>

                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default Application;
