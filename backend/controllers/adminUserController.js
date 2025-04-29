const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const adminUser = require('../models/adminUser.model.js');

const SECRET_KEY = process.env.ADMIN_SECRET_KEY || 'ADMIN_USER';

// Signup endpoint
exports.signup =  async (req, res) => {
  try {
    const { username, email, mobileNumber, password, role,city } = req.body;
    
    // Verify user does not already exist
    const userExists = await adminUser.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }
    
    // Create and save the new user. Employee ID is auto-generated.
    const newUser = new adminUser({ username, email, mobileNumber, password, role,city });
    await newUser.save();

    res.status(201).json({ 
      message: 'User created successfully', 
      employeeId: newUser.employeeId 
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Login endpoint
exports.login =  async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if the user exists
    const user = await adminUser.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Validate the password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate and send a JWT token
    const token = jwt.sign({ id: user._id, role: user.role,city:user.city }, SECRET_KEY, {
      expiresIn: '7h',
    });
    res.json({ token,user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Get all users endpoint
exports.getAllUsers = async (req, res) => {
  try {
    const users = await adminUser.find({});
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};


// Edit user endpoint
exports.editUser = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;
    const updatedUser = await adminUser.findByIdAndUpdate(id, updateData, { new: true });
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User updated successfully', user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete user endpoint
exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await adminUser.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};