'use client'
import classes from "./Registration.module.scss"
import { useState } from 'react';
import axios from 'axios';

export default function Registration() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    roles: 'PARENT',
    name: '',
    surname: '',
    age: '',
    resume: '',
    inn: null as File | null,
    passport: null as File | null,
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    setMessage('');

    try {
      const endpoint = '/api/v1/user/register';

      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        if (value) {
          formDataToSend.append(key, value);
        }
      });

      const res = await axios.post(endpoint, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const data = res.data;
      setMessage(`Success: ${data.message || 'Operation completed'}`);
      console.log(data);
    } catch (error: any) {
      setMessage(`Error: ${error.response?.data?.message || 'An error occurred'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={classes.wrapper}>
      <div className={classes.left}></div>
      <div className={classes.right}>
        <h1 className={classes.Name}>Register</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <select
            name="roles"
            value={formData.roles}
            onChange={handleInputChange}
            className={classes.roleSelect}
          >
            <option value="PARENT">PARENT</option>
            <option value="EMPLOYER">EMPLOYER</option>
          </select>

          {formData.roles === 'EMPLOYER' && (
            <>
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              <input
                type="text"
                name="surname"
                placeholder="Surname"
                value={formData.surname}
                onChange={handleInputChange}
                required
              />
              <input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleInputChange}
                min={15}
                max={125}
                required
              />
              <label className={classes.fileLabel}>
                Attach INN Image:
                <input
                  type="file"
                  name="inn"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
              </label>
              <label className={classes.fileLabel}>
                Attach Passport Image:
                <input
                  type="file"
                  name="passport"
                  onChange={handleFileChange}
                  accept="image/*"
                  required
                />
              </label>
              <textarea
                name="resume"
                placeholder="Resume"
                value={formData.resume}
                onChange={handleInputChange}
                className={classes.textArea}
                required
              />
            </>
          )}

          <button
            type="submit"
            className={classes.submit}
            disabled={loading}
          >
            {loading ? 'Processing...' : 'Register'}
          </button>
          {message && <p className={classes.message}>{message}</p>}
        </form>
      </div>
    </div>
  );
}
