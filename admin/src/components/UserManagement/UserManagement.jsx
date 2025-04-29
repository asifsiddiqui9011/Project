import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AdminContext } from '../../Context/AdminContext';
import './UserManagement.css';
import Register from '../Register/Register';

const UserManagement = () => {
    const { url,allUsers,fetchAllUsers,token } = useContext(AdminContext);
    // const [users, setUsers] = useState([]);
    console.log(allUsers)
    const [editingUser, setEditingUser] = useState(null);
    const [updatedUsername, setUpdatedUsername] = useState('');
    const [updatedMobileNumber, setUpdatedMobileNumber] = useState('');

    // Filter & search state
    const [filterRole, setFilterRole] = useState('');
    const [filterLocation, setFilterLocation] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    

    // Open the modal with the selected user's details
    const openEditModal = (user) => {
        setEditingUser(user);
        setUpdatedUsername(user.username);
        setUpdatedMobileNumber(user.mobileNumber);
    };

    // Update user details using PUT request
    const handleUpdate = async () => {
        if (!updatedUsername || !updatedMobileNumber) return;
        try {
            const authToken = localStorage.getItem("authToken");
            await axios.put(`${url}/admin/edituser/${editingUser._id}`, {
            username: updatedUsername, 
            mobileNumber: updatedMobileNumber
            }, {
            headers: {
                'auth-token': token
            }
            });
            alert('User updated successfully!');
            fetchAllUsers();
            setEditingUser(null);
        } catch (error) {
            console.error(`Error editing user ${editingUser._id}:`, error);
            let errorMessage = error.message;
            if (error.response && error.response.data && error.response.data.error) {
            errorMessage = error.response.data.error;
            }
            alert(`Error editing user: ${errorMessage}`);
        }
    };

    const handleCancel = () => {
        setEditingUser(null);
    };

    // Remove user from the database
    const handleRemove = async (userId) => {
        try {
            await axios.delete(`${url}/admin/deleteuser/${userId}`);
            fetchAllUsers();
        } catch (error) {
            console.error(`Error removing user ${userId}:`, error);
        }
    };

    // Apply filters and search on the users list
    const filteredUsers = allUsers.filter((user) => {
        const matchesRole = filterRole ? user.role.toLowerCase() === filterRole.toLowerCase() : true;
        const matchesLocation = filterLocation ? user.city.toLowerCase() === filterLocation.toLowerCase() : true;
        const searchLower = searchTerm.toLowerCase();
        const matchesSearch = searchTerm
            ? user.username.toLowerCase().includes(searchLower) ||
                String(user.employeeId).toLowerCase().includes(searchLower)
            : true;
        return matchesRole && matchesLocation && matchesSearch;
    });

    return (
        <>
        <div className="user-management-container">
            <h1 className="user-management-header">User Management</h1>

            {/* Filters and Search */}
            <div className="filter-container">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search by Username or Employee ID"
                    className="search-bar"
                />
                <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="filter-select"
                >
                    <option value="">All Roles</option>
                    <option value="admin">Admin</option>
                    <option value="manager">Manager</option>
                    <option value="clerk">Clerk</option>
                    <option value="delivery boy">Delivery Boy</option>
                </select>
                <select
                    value={filterLocation}
                    onChange={(e) => setFilterLocation(e.target.value)}
                    className="filter-location"
                >
                    <option value="">All Cities</option>
                    <option value="lucknow">Lucknow</option>
                    <option value="mumbai">Mumbai</option>
                    <option value="delhi">Delhi</option>
                </select>
            </div>

            <div className="user-cards-container">
                {filteredUsers.map((user) => (
                    <div key={user._id} className="user-card">
                        <div className="user-card-header">
                            <h2 className="user-card-username">{user.username}</h2>
                        </div>
                        <div className="user-card-body">
                            <p className="user-card-employeeId">Employee ID: {user.employeeId}</p>
                            <p className="user-card-email">Email: {user.email}</p>
                            <p className="user-card-role">Role: {user.role}</p>
                            <p className="user-card-mobile">Mobile: {user.mobileNumber}</p>
                            <p className="user-card-city">City: {user.city}</p>
                        </div>
                        <div className="user-card-actions">
                            <button
                                className="user-card-btn-edit"
                                onClick={() => openEditModal(user)}
                            >
                                Edit
                            </button>
                            <button
                                className="user-card-btn-remove"
                                onClick={() => handleRemove(user._id)}
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))}
                
            </div>

            {editingUser && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Edit User</h2>
                        <div className="modal-body">
                            <div className="edit-field">
                                <label>Current Username: {editingUser.username}</label>
                                <input
                                    type="text"
                                    value={updatedUsername}
                                    onChange={(e) => setUpdatedUsername(e.target.value)}
                                    placeholder="Enter new username"
                                />
                            </div>
                            <div className="edit-field">
                                <label>Current Mobile: {editingUser.mobileNumber}</label>
                                <input
                                    type="text"
                                    value={updatedMobileNumber}
                                    onChange={(e) => setUpdatedMobileNumber(e.target.value)}
                                    placeholder="Enter new mobile number"
                                />
                            </div>
                            <p>Email: {editingUser.email}</p>
                            <p>Role: {editingUser.role}</p>
                        </div>
                        <div className="modal-actions">
                            <button onClick={handleUpdate}>Update</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

           
        </div>
        <div className='register-container'>
            <Register />
        </div>
    
        
        </>
    );
};

export default UserManagement;