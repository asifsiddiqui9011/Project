import React, { useContext, useState } from 'react';
import axios from 'axios';
import './Register.css';
import { AdminContext } from '../../Context/AdminContext';

const Register = () => {

    const {url}= useContext(AdminContext)
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        mobileNumber: '',
        password: '',
        role: 'clerk'
    });

    const [errors, setErrors] = useState({});
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const errors = {};
        if (formData.username.length < 4) {
            errors.username = 'Username must have at least 4 characters';
        }
        if (/\d/.test(formData.username)) {
            errors.username = 'Username should not contain digits';
        }
        const emailRegex = /^[a-zA-Z0-9_.+-]+@[a-z-]+\.[a-z.]+$/;
        if (!emailRegex.test(formData.email)) {
            errors.email = 'Please fill a valid email address';
        }
        const mobileRegex = /^\d{10}$/;
        if (!mobileRegex.test(formData.mobileNumber)) {
            errors.mobileNumber = 'Please fill a valid 10-digit mobile number';
        }
        if (!formData.password) {
            errors.password = 'Password is required';
        }
        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }
        setErrors({});
        try {
            // Update the URL to your backend register endpoint.
            await axios.post(`${url}/admin/signup`, formData);
            setMessage('Registration successful');
            // Optionally clear the form:
            setFormData({
                username: '',
                email: '',
                mobileNumber: '',
                password: '',
                role: 'clerk'
            });
        } catch (error) {
            setMessage('Registration failed');
        }
    };

    return (
        <div className="register-container">
            <h2 className="register-title">Register</h2>
            {message && <p className="register-message">{message}</p>}
            <form className="register-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                    <label className="form-label" htmlFor="username">Username: </label>
                    <span>
                        <input 
                            className="form-input"
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        {errors.username && <p className="error-message" style={{color: 'red'}}>{errors.username}</p>}
                    </span>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="email">Email: </label>
                    <span>
                        <input 
                            className="form-input"
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <p className="error-message" style={{color: 'red'}}>{errors.email}</p>}
                    </span>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="mobileNumber">Mobile Number: </label>
                    <span>
                        <input 
                            className="form-input"
                            type="text"
                            id="mobileNumber"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                        />
                        {errors.mobileNumber && <p className="error-message" style={{color: 'red'}}>{errors.mobileNumber}</p>}
                    </span>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="password">Password: </label>
                    <span>
                        <input 
                            className="form-input"
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {errors.password && <p className="error-message" style={{color: 'red'}}>{errors.password}</p>}
                    </span>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="role">Role: </label>
                    <select 
                        className="form-select"
                        id="role"
                        name="role" 
                        value={formData.role} 
                        onChange={handleChange}
                    >
                        <option value="manager">Manager</option>
                        <option value="admin">Admin</option>
                        <option value="clerk">Clerk</option>
                        <option value="delivery boy">Delivery Boy</option>
                    </select>
                </div>
                <div className="form-group">
                    <label className="form-label" htmlFor="city">City: </label>
                    <span>
                        <input 
                            className="form-input"
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city || ''}
                            onChange={handleChange}
                        />
                    </span>
                </div>
                <div className="form-group">
                    <button className="form-button" type="submit">Register</button>
                </div>
            </form>
        </div>
    );
};

export default Register;