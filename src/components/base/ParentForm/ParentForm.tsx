import React from 'react';
import classes from "@/app/application/parent/Parent.module.scss";
import RegisterInput from "@/components/base/Input/InputsRegister";
import FileInput from "@/components/base/FileInput/FileInput";

interface ParentFormProps {
    parentFields: { id: number; name: string; type: string; placeholder: string }[];
    childFields: { id: number; name: string; type: string; placeholder: string }[];
    parentData: { [key: string]: string };
    childData: { [key: string]: string };
    handleInputChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        type: 'parentData' | 'childData'
    ) => void;
    handleFileChange: (
        e: React.ChangeEvent<HTMLInputElement>,
        fileKey: 'parentPhoto' | 'childBirthCertificate' | 'childRegistrationBook'
    ) => void;
    handleSubmit: (e: React.FormEvent) => void;
}

const ParentForm: React.FC<ParentFormProps> = ({
                                                   parentFields,
                                                   childFields,
                                                   parentData,
                                                   childData,
                                                   handleInputChange,
                                                   handleFileChange,
                                                   handleSubmit,
                                               }) => {
    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className={classes.forms}>
                    {/* Родители */}
                    <div className={classes.parentInput}>
                        <h3>Parent Information</h3>
                        <div className={classes.parentInput}>
                            {parentFields.map((field) => (
                                <RegisterInput
                                    key={field.id}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={parentData[field.name]}
                                    onChange={(e) => handleInputChange(e, 'parentData')}
                                />
                            ))}
                        </div>
                        <FileInput
                            label="Parent Photo"
                            onChange={(e) => handleFileChange(e, 'parentPhoto')}
                        />
                    </div>

                    {/* Ребенок */}
                    <div className={classes.childInput}>
                        <h3>Child Information</h3>
                        <div className={classes.childInput}>
                            {childFields.map((field) => (
                                <RegisterInput
                                    key={field.id}
                                    type={field.type}
                                    name={field.name}
                                    placeholder={field.placeholder}
                                    value={childData[field.name]}
                                    onChange={(e) => handleInputChange(e, 'childData')}
                                />
                            ))}
                        </div>
                        <div className={classes.files}>
                            <FileInput
                                label="Child Birth Certificate"
                                onChange={(e) => handleFileChange(e, 'childBirthCertificate')}
                            />
                            <FileInput
                                label="Child Registration Book"
                                onChange={(e) => handleFileChange(e, 'childRegistrationBook')}
                            />
                        </div>
                    </div>
                </div>

                <button type="submit">Submit Application</button>
            </form>
        </div>
    );
};

export default ParentForm;
