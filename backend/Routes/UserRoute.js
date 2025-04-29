const express = require('express');
const router = express.Router();
const {
    signup,
    login,
    googlelogin,
    getuserdetails,
    forgotPassword,
    resetPassword,
    updatePassword
  
  } = require("../controllers/UserController.js");

const fetchuser = require('../middleware/fetchuser.js')
  
router.post("/signup", signup);
router.post("/googlelogin",  googlelogin);
router.post("/login",  login,);
router.get("/getuserdetails",fetchuser, getuserdetails);
// router.delete("//:id", deleteAddress);
router.post("/forgot-password",forgotPassword);
router.post("/reset-password",fetchuser,resetPassword);
router.post('/update-password',fetchuser,updatePassword);


module.exports = router;