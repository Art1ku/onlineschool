import React from 'react';
import classes from '../../../app/application/Application.module.scss';
import RegisterInput from "@/components/base/Input/InputsRegister";
import FileInput from "@/components/base/FileInput/FileInput";

interface EmployeeFormProps {
    employeeFields: { id: number; name: string; type: string; placeholder: string }[];
    employeeData: { [key: string]: string };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
                                                       employeeFields,
                                                       employeeData,
                                                       handleInputChange,
                                                       handleSubmit,
                                                       handleFileChange
                                                   }) => {
    return (
        <form onSubmit={handleSubmit} className={classes.employeeForm}>
            <h3>Employee Information</h3>
            <div className={classes.employeeInput}>
                {employeeFields.map((field) => (
                    <div key={field.id}>
                        <RegisterInput
                            key={field.id}
                            type={field.type}
                            name={field.name}
                            placeholder={field.placeholder}
                            value={employeeData[field.name]}
                            onChange={handleInputChange}
                        />
                    </div>
                ))}
                <div className={classes.files}>
                    <FileInput
                        label="Passport"
                        onChange={(e) => handleFileChange(e, 'Passport')}
                    />
                    <FileInput
                        label="Diploma"
                        onChange={(e) => handleFileChange(e, 'Diploma')}
                    />
                </div>
            </div>
            <button type="submit">Submit Employee Application</button>
        </form>
    );
};

export default EmployeeForm;
