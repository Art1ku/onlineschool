'use client';

import Header from "@/components/layout/Header/Header";
import classes from './Employee.module.css';
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "@/modules/application/components/EmployeeForm/EmployeeForm";
import { $url } from "@/api/api";

const EmployeePage = () => {
    const [formType, setFormType] = useState<'parent' | 'employee'>('parent');

    const [employeeData, setEmployeeData] = useState({
        name: '',
        surname: '',
        patronymic: '',
        age: 0,
        phoneNumber: '',
        email: '',
    });

    const [files, setFiles] = useState({
        parentPhoto: null,
        childBirthCertificate: null,
        childRegistrationBook: null,
        resume: '',
        passport: '',
    });

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const bitsResponse = await axios.get(`${$url}/api/v1/bitsforwork/getAllBits`);
            if (bitsResponse.status !== 200) {
                throw new Error('Ошибка при получении данных из bitsforwork/getAllBits');
            }
            const bitsData = bitsResponse.data;

            const formData = new FormData();
            Object.entries(employeeData).forEach(([key, value]) => {
                formData.append(key, String(value));
            });

            Object.entries(files).forEach(([key, value]) => {
                if (value) formData.append(key, value);
            });

            formData.append("bitsData", JSON.stringify(bitsData));

            const rep = await axios.post(`${$url}/api/v1/employee/createBidForWork`, formData);
            
            if (rep.status === 200) {
                console.log(rep.data);
                alert("Application submitted successfully!");
            }
        } catch (error: any) {
            console.error("Ошибка при отправке заявки:", error);
            alert("Ошибка при отправке заявки");
        }
    };

    const handleFileChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        fileKey: keyof typeof files
    ) => {
        const file = e.target.files ? e.target.files[0] : null;
        if (file) {
            setFiles((prev) => ({
                ...prev,
                [fileKey]: file,
            }));
        }
    };

    const employeeFields = [
        { id: 5, name: 'name', type: 'text', placeholder: 'Name' },
        { id: 6, name: 'surname', type: 'text', placeholder: 'Surname' },
        { id: 7, name: 'patronymic', type: 'text', placeholder: 'Patronymic' },
        { id: 8, name: 'age', type: 'number', placeholder: 'Age' },
        { id: 9, name: 'phoneNumber', type: 'text', placeholder: 'Phone Number' },
        { id: 10, name: 'email', type: 'email', placeholder: 'Email' },
    ];

    const fileFields = [
        { id: 1, name: 'resume', label: 'Resume' },
        { id: 2, name: 'passport', label: 'Passport' },
    ];

    if (!isClient) {
        return null;
    }

    return (
        <div className={classes.employee}>
            <Header />
            <h2>Register Application</h2>
            <EmployeeForm
                employeeFields={employeeFields}
                employeeData={employeeData}
                handleInputChange={() => {}}
                fileFields={fileFields}
            />
        </div>
    );
};

export default EmployeePage;
