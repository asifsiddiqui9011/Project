const express = require('express');
const router = express.Router();
const {
    addtowishlist,
    removefromwishlist,
    getwishlist,
  } = require("../controllers/WishlistController.js");
 
const fetchUser = require('../middleware/fetchuser.js')
  
router.post("/addtowishlist",fetchUser, addtowishlist);
router.get("/getwishlist", fetchUser, getwishlist);
router.put("/removefromwishlist",fetchUser, removefromwishlist);

module.exports = router;