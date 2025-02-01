'use client'
import Header from "@/components/base/Header/Header"
import classes from './Employee.module.scss'
import React, {useEffect, useState} from "react";
import axios from "axios";
import EmployeeForm from "@/components/base/EmployeeForm/EmployeeForm";
import { $url } from "@/api/api";

const EmployeePage = () => {
    const [formType, setFormType] = useState<'parent' | 'employee'>('parent');

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

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        if (formType === 'employee') {
            Object.entries(employeeData).forEach(([key, value]) => formData.append(key, value));
        }

        Object.entries(files).forEach(([key, value]) => {
            if (value) formData.append(key, value as Blob);
        });

        try {
            const response = await axios.post('/api/v1/application', formData, {headers: {'Content-Type': 'multipart/form-data'}});
            alert('Application submitted successfully!');
        } catch (error) {
            alert('Failed to submit application.');
        }
    };

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        type: 'parentData' | 'childData' | 'employeeData'
    ) => {
        const {name, value} = e.target;

         if (type === 'employeeData') {
            setEmployeeData((prev) => ({...prev, [name]: value}));
        }
    };

    const employeeFields = [
        {id: 1, name: 'employeeName', type: 'text', placeholder: 'Employee Name'},
        {id: 2, name: 'employeeId', type: 'text', placeholder: 'Employee ID'},
        {id: 3, name: 'position', type: 'text', placeholder: 'Position'},
        {id: 4, name: 'department', type: 'text', placeholder: 'Department'},
    ];

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

    if (!isClient) {
        return null;
    }
    return (
        <div className={classes.employee}>
            <Header/>
            <h2>Register Application</h2>
            <EmployeeForm
                employeeFields={employeeFields}
                employeeData={employeeData}
                handleInputChange={(e) => handleInputChange(e, 'employeeData')}
                handleSubmit={handleSubmit}
                handleFileChange={handleFileChange}
            />
        </div>
    );
};

export default EmployeePage;
