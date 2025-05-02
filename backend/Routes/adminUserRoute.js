const express = require('express');
const router = express.Router();
const adminUserController = require('../controllers/adminUserController.js');
const authorizeRoles = require('../middleware/authorizeRoles.js').authorizeRoles;
const authenticateUserByRole = require('../middleware/authenticateUserByRole.js').authenticateUserByRole;

router.post("/admin/signup", adminUserController.signup);
router.post("/admin/login", adminUserController.login);
// router.get('/admin/getuser',authenticateUserByRole, authorizeRoles(['manager']),adminUserController.getAllUsers);
router.get('/admin/getuser',adminUserController.getAllUsers);
router.put('/admin/edituser/:id', authenticateUserByRole, authorizeRoles(['admin']), adminUserController.editUser);

module.exports = router;