'use client'
import React, {useState} from 'react';
import {$api} from '@/api/api';
import cl from './Parent.module.scss';
import { ClassNames } from '@emotion/react';
import { classNames } from './classNames';

const ParentPage = () => {
    const [parentData, setParentData] = useState({
        bidParent: '',
        childBirthCertificate: '',
        placeOfResidence: '',
        passportParent: '',
        nameParent: '',
        surnameParent: '',
        patronymicParent: '',
        emailParent: '',
        phoneNumberParent: '',
        childMedicalCertificateCopy: '',
        childMedicalRecord: '',
        ageChild: '',
        surnameChild: '',
        patronymicChild: '',
        childClass: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;
        setParentData((prev) => ({
            ...prev,
            [name]: value
        }));фц
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await $api.post(`/api/v1/bidForStudy/create`, parentData);
            alert(response.status === 200 ? "Заявка успешно отправлена!" : "Ошибка при отправке заявки.");
        } catch (error) {
            console.error("Ошибка при отправке заявки:", error);
            alert("Ошибка при отправке заявки.");
        }
    };

    return (
        <div className={cl.main}>
            <div className={cl.parentpageContainer}>
                <form className={cl.parentpageForm} onSubmit={handleSubmit}>
                    <div className={cl.paretpageInput} >
                        {Object.entries(parentData).map(([key, value]) => (
                            <div
                                key={key}
                                className={`${cl.wrapperInputWithLabel} `}
                            >
                                <input
                                    id={key}
                                    name={key}
                                    type={key === "emailParent" ? "email" : "text"}
                                    className={cl.input}
                                    value={value}
                                    onChange={handleInputChange}
                                />
                                <label className={classNames(cl.defaultPlaceholder, {[value.length]: cl.flyingPlaceholder})} htmlFor={key}>
                                    {key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (s) => s.toUpperCase())}
                                </label>
                            </div>  
                        ))}
                        <button type="submit">Submit Application</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ParentPage;
