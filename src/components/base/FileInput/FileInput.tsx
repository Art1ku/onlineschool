import React, { useState } from 'react';
import classes from './File.module.scss';

interface FileInputProps {
    label: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileInput: React.FC<FileInputProps> = ({ label, onChange }) => {
    const [fileCount, setFileCount] = useState(0);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setFileCount(e.target.files.length);
        }
        onChange(e);
    };

    return (
        <div className={classes.fileInputWrapper}>
            <label className={classes.fileLabel}>
                {label}
                <input
                    type="file"
                    className={classes.fileInput}
                    onChange={handleFileChange}
                    multiple
                />
            </label>
            {fileCount > 0 && (
                <span className={classes.fileCount}>
                    {fileCount} {fileCount === 1 ? 'file' : 'files'} selected
                </span>
            )}
        </div>
    );
};

export default FileInput;
