import React from 'react';
import classes from '@/app/application/employee/Employee.module.scss';
import RegisterInput from "@/components/ui/Input/InputsRegister";
import FileInput from "@/components/ui/FileInput/FileInput";

interface EmployeeFormProps {
    employeeFields: { id: number; name: string; type: string; placeholder: string }[];
    employeeData: { [key: string]: string | number };
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSubmit: (e: React.FormEvent) => void;
    fileFields: { id: number; name: string; label: string }[];  
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>, fileKey: string) => void; 
}

const EmployeeForm: React.FC<EmployeeFormProps> = ({
    employeeFields,
    employeeData,
    handleInputChange,
    handleSubmit,
    fileFields,  
    handleFileChange, 
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

            <h3>Upload Documents</h3>
            <div className={classes.files}>
                {fileFields.map((file) => (
                    <div key={file.id}>
                        <FileInput
                            label={file.label}
                            onChange={(e) => handleFileChange(e, file.name)}
                        />
                    </div>
                ))}
            </div>

            <button type="submit">Submit Application</button>
        </form>
    );
};

export default EmployeeForm;

