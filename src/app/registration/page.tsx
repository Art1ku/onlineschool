'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import classes from './Registration.module.scss';
import { $url } from "@/api/api";

export default function Registration() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    roles: [{ title: '' }], 
    userStatus: 'ACTIVE', 
  });

  const [message, setMessage] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    if (name === 'role') {
      setFormData({
        ...formData,
        roles: [{ title: value }],
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${$url}/api/v1/user/register`, formData);
      if (response.status === 200) {
        const role = formData.roles[0].title;
        setMessage('Registration successful! Redirecting...');
        
        // Перенаправление в зависимости от роли
        if (role === 'PARENT') {
          router.push('/application/parent');
        } else if (role === 'EMPLOYEE') {
          router.push('/application/employee');
        } else if (role === 'DIRECTOR') {
          router.push('/application/director');
        }
      }
    } catch (error: any) {
      setMessage(error.response?.data?.message || 'Registration failed!');
    }
  };

  return (
    <div className={classes.wrapper}>
      <form onSubmit={handleSubmit} className={classes.form}>
        <h1>Registration</h1>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <select
          name="role"
          value={formData.roles[0]?.title}
          onChange={handleChange}
          required
        >
          <option value="" disabled>
            Select Role
          </option>
          <option value="PARENT">Parent</option>
          <option value="EMPLOYEE">Employee</option>
          <option value="DIRECTOR">Director</option>
        </select>
        <button type="submit">Register</button>
        {message && <p className={classes.message}>{message}</p>}
      </form>
    </div>
  );
}
