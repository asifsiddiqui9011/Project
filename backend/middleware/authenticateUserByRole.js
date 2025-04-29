const jwt = require("jsonwebtoken");
const adminUserModel = require("../models/adminUser.model.js");
const JWT_SECRET = process.env.ADMIN_SECRET_KEY;

/**
 * Middleware to authenticate users based on their role.
 * Validates the JWT and checks for the user's role and existence in the appropriate collection.
 */
exports.authenticateUserByRole = async (req, res, next) => {
  const token = req.header('auth-token');

  // Check if token is provided
  if (!token) {
    return res.status(401).json({ message: "Authentication failed. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    const { id, role } = decoded;

    console.log("Decoded Token:", decoded); // Debugging

    // Dynamically fetch the user based on rol
    
    const user = await adminUserModel.findById(id) // Fetch pantry staff from PantryStaff collection
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: `${role} user not found` });
    }

    console.log("Authenticated User:", user); // Debugging the authenticated user

    req.user = user; // Attach user object to the request
    next(); // Pass control to the next middleware
  } catch (error) {
    console.error("Authentication error:", error.message);
    return res.status(401).json({ message: "Authentication failed", error: error.message });
  }
};