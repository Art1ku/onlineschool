'use client';

import React, { useState } from 'react';
import axios from 'axios';
import Header from "@/components/base/Header/Header";
import ParentForm from "@/components/base/ParentForm/ParentForm";
import EmployeeForm from "@/components/base/EmployeeForm/EmployeeForm";
import classes from './Application.module.scss';

const Application: React.FC = () => {
    // Поля для родителей
    const parentFields = [
        { id: 1, name: 'firstName', type: 'text', placeholder: 'First Name' },
        { id: 2, name: 'lastName', type: 'text', placeholder: 'Last Name' },
        { id: 3, name: 'middleName', type: 'text', placeholder: 'Middle Name' },
        { id: 4, name: 'age', type: 'number', placeholder: 'Age' },
    ];

    // Поля для ребёнка
    const childFields = [
        { id: 1, name: 'firstName', type: 'text', placeholder: 'Child First Name' },
        { id: 2, name: 'lastName', type: 'text', placeholder: 'Child Last Name' },
        { id: 3, name: 'middleName', type: 'text', placeholder: 'Child Middle Name' },
        { id: 4, name: 'age', type: 'number', placeholder: 'Child Age' },
        { id: 5, name: 'grade', type: 'text', placeholder: 'Class/Grade' },
    ];

    // Поля для сотрудников
    const employeeFields = [
        { id: 1, name: 'employeeName', type: 'text', placeholder: 'Employee Name' },
        { id: 2, name: 'employeeId', type: 'text', placeholder: 'Employee ID' },
        { id: 3, name: 'position', type: 'text', placeholder: 'Position' },
        { id: 4, name: 'department', type: 'text', placeholder: 'Department' },
    ];

    // Состояние выбора типа формы
    const [formType, setFormType] = useState<'parent' | 'employee'>('parent');

    // Состояния для данных
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

    const [employeeData, setEmployeeData] = useState({
        employeeName: '',
        employeeId: '',
        position: '',
        department: '',
    });

    const [files, setFiles] = useState({
        parentPhoto: null,
        childBirthCertificate: null,
        childRegistrationBook: null,
    });

    // Обработчик изменений данных
    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: 'parentData' | 'childData' | 'employeeData'
    ) => {
        const { name, value } = e.target;

        if (type === 'parentData') {
            setParentData((prev) => ({ ...prev, [name]: value }));
        } else if (type === 'childData') {
            setChildData((prev) => ({ ...prev, [name]: value }));
        } else if (type === 'employeeData') {
            setEmployeeData((prev) => ({ ...prev, [name]: value }));
        }
    };

    // Обработчик изменений файлов
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

    // Обработчик отправки формы
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        if (formType === 'parent') {
            Object.entries(parentData).forEach(([key, value]) =>
                formData.append(`parent_${key}`, value)
            );
            Object.entries(childData).forEach(([key, value]) =>
                formData.append(`child_${key}`, value)
            );
        } else if (formType === 'employee') {
            Object.entries(employeeData).forEach(([key, value]) =>
                formData.append(key, value)
            );
        }

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

            {/* Селектор выбора формы */}
            <div className={classes.selector}>
                <label htmlFor="formType">Select Form Type:</label>
                <select
                    id="formType"
                    value={formType}
                    onChange={(e) => setFormType(e.target.value as 'parent' | 'employee')}
                >
                    <option value="parent">Parent</option>
                    <option value="employee">Employee</option>
                </select>
            </div>

            {formType === 'parent' ? (
                <ParentForm
                    parentFields={parentFields}
                    childFields={childFields}
                    parentData={parentData}
                    childData={childData}
                    handleInputChange={handleInputChange}
                    handleFileChange={handleFileChange}
                    handleSubmit={handleSubmit}
                />
            ) : (
                <EmployeeForm
                    employeeFields={employeeFields}
                    employeeData={employeeData}
                    handleInputChange={(e) => handleInputChange(e, 'employeeData')}
                    handleSubmit={handleSubmit}
                    handleFileChange={handleFileChange}
                />
            )}
        </div>
    );
};

export default Application;
