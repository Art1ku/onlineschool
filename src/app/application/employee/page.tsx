'use client'
import Header from "@/components/base/Header/Header"
import classes from './Employee.module.scss'
import React, { useEffect, useState } from "react";
import axios from "axios";
import EmployeeForm from "@/components/base/EmployeeForm/EmployeeForm";

const EmployeePage = () => {
    const [employeeData, setEmployeeData] = useState({
        infoOfEmployee: '',
        documentsOfEmployee: '',
        bedStatus: '',
        email: '',
    });
    const [files, setFiles] = useState<{
        childBirthCertificate: File | null;
        childRegistrationBook: File | null;
    }>({
        childBirthCertificate: null,
        childRegistrationBook: null,
    });

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        Object.entries(employeeData).forEach(([key, value]) => formData.append(key, value));
        Object.entries(files).forEach(([key, value]) => {
            if (value) formData.append(key, value);
        });

        try {
            await axios.post('/api/v1/employee/createBidForWork', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            alert('Application submitted successfully!');
        } catch (error) {
            alert('Failed to submit application.');
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployeeData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, fileKey: 'childBirthCertificate' | 'childRegistrationBook') => {
        const file = e.target.files ? e.target.files[0] : null;
        setFiles((prev) => ({ ...prev, [fileKey]: file }));
    };

    if (!isClient) {
        return null;
    }

    return (
        <div className={classes.employee}>
            <Header />
            <h2>Register Application</h2>
            <EmployeeForm
                employeeFields={[
                    { id: 1, name: 'infoOfEmployee', type: 'text', placeholder: 'Employee Info' },
                    { id: 2, name: 'documentsOfEmployee', type: 'text', placeholder: 'Documents Info' },
                    { id: 3, name: 'bedStatus', type: 'text', placeholder: 'Bed Status' },
                    { id: 4, name: 'email', type: 'email', placeholder: 'Email' },
                ]}
                employeeData={employeeData}
                handleInputChange={handleInputChange}
                handleSubmit={handleSubmit}
                handleFileChange={handleFileChange}
            />
        </div>
    );
};

export default EmployeePage;
