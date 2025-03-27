'use client'
import React, { useState } from 'react';
import axios from 'axios';
import cl from './Employee.module.scss';
import { $api } from '@/api/api';
import { classNames } from './classNames';


const EmployeePage = () => {
    const [employeeData, setEmployeeData] = useState({
        name: '',
        surname: '',
        patronymic: '',
        age: 0,
        phoneNumber: '',
        email: '',
        resume: '',
        passport: ''
    })

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEmployeeData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
              const response = await $api.post(`/api/v1/bidForStudy/create`, );
              alert(response.status === 200 ? "Заявка успешно отправлена!" : "Ошибка при отправке заявки.");
          } catch (error) {
              console.error("Ошибка при отправке заявки:", error);
              alert("Ошибка при отправке заявки.");
          }
      };
    return (
            <div className={cl.EmployeePage}>
                <div className={cl.employeepage_container}>
                    <form className={cl.EmployeePage_form} onSubmit={handleSubmit}>
                        <div className={cl.box}></div>

                        <div className={cl.EmployeePage_imput}>
                            {Object.entries(employeeData).map(([key, value]) => (
                                <div
                                    key={key}
                                    className={`${cl.wrapperInputWithLabel} `}
                                >
                                    <input
                                        id={key}
                                        name={key}
                                        type={key === "emailEmployee" ? "email" : "text"}
                                        className={cl.input}
                                        value={value}
                                        onChange={handleInputChange}
                                    />
                                    <label className={classNames(cl.defaultPlaceholder, { [value.length]: cl.flyingPlaceholder })} htmlFor={key}>
                                        {key.replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (s) => s.toUpperCase())}
                                    </label>
                                </div>
                            ))}
                            <button className={cl.button} type="submit">Submit Application</button>


                        </div>
                    </form>
                </div>
            </div>
        );
    };

    export default EmployeePage