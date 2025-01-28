'use client'
import Header from "@/components/base/Header/Header"
import classes from './Parent.module.scss';
import {useRouter} from "next/navigation";
import React, {useEffect, useState} from "react";
import axios from "axios";
import ParentForm from "@/components/base/ParentForm/ParentForm";

const ParentPage = () => {

    const [formType, setFormType] = useState<'parent'>('parent');
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

    const [files, setFiles] = useState({
        parentPhoto: null,
        childBirthCertificate: null,
        childRegistrationBook: null,
    });

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    const router = useRouter();

    const handleFormTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedFormType = e.target.value as 'parent' ;
        setFormType(selectedFormType);

        // Изменяем URL в зависимости от выбранной формы
        if (router) {
            router.push(`/application/${selectedFormType}`);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();
        if (formType === 'parent') {
            Object.entries(parentData).forEach(([key, value]) => formData.append(`parent_${key}`, value));
            Object.entries(childData).forEach(([key, value]) => formData.append(`child_${key}`, value));
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
        type: 'parentData' | 'childData'
    ) => {
        const {name, value} = e.target;

        if (type === 'parentData') {
            setParentData((prev) => ({...prev, [name]: value}));
        } else if (type === 'childData') {
            setChildData((prev) => ({...prev, [name]: value}));
        }
    };

    const parentFields = [
        {id: 1, name: 'firstName', type: 'text', placeholder: 'First Name'},
        {id: 2, name: 'lastName', type: 'text', placeholder: 'Last Name'},
        {id: 3, name: 'middleName', type: 'text', placeholder: 'Middle Name'},
        {id: 4, name: 'age', type: 'number', placeholder: 'Age'},
    ];

    const childFields = [
        {id: 1, name: 'firstName', type: 'text', placeholder: 'Child First Name'},
        {id: 2, name: 'lastName', type: 'text', placeholder: 'Child Last Name'},
        {id: 3, name: 'middleName', type: 'text', placeholder: 'Child Middle Name'},
        {id: 4, name: 'age', type: 'number', placeholder: 'Child Age'},
        {id: 5, name: 'grade', type: 'text', placeholder: 'Class/Grade'},
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
        <div className={classes.parent}>
            <Header/>
            <h2>Register Application</h2>
            <ParentForm
                parentFields={parentFields}
                childFields={childFields}
                parentData={parentData}
                childData={childData}
                handleInputChange={handleInputChange}
                handleFileChange={handleFileChange}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default ParentPage;
