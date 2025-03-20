import React from 'react';
import classes from '@/app/application/employee/Employee.module.scss';
import RegisterInput from "@/components/ui/Input/InputsRegister";

interface EmployeeFormProps {
    employeeFields: { id: number; name: string; type: string; placeholder: string }[]; // Добавляем описание полей
    employeeData: { [key: string]: string | number };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
    employeeFields,
    employeeData,
    handleInputChange,
    handleSubmit,
}) => {
    return (
        <form onSubmit={handleSubmit} className={classes.employeeForm}>
            <h3>Employee Information</h3>
            <div className={classes.employeeInput}>
                {employeeFields.map((field) => (
                    <div key={field.id}>
                        <RegisterInput
                            type={field.type} 
                            name={field.name}
                            placeholder={field.placeholder}
                            value={employeeData[field.name] || ""}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
            </div>

            <button type="submit">Submit Application</button>
        </form>
    );
};

export default EmployeeForm;
