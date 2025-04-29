const express = require('express');
const router = express.Router();
const {
  toggleCartItem,
  removeFromCart,
    getcart,
    decrementCartQuantity,
    incrementCartQuantity
  } = require("../controllers/CartController.js");
 
const fetchUser = require('../middleware/fetchuser.js')
  
// router.post("/addtocart",fetchUser, addtocart);
// router.get("/getcart", fetchUser, getcart);
// router.put("/removefromcart",fetchUser, removefromcart);
router.post("/togglecartitem", fetchUser, toggleCartItem);
router.get("/getcart", fetchUser, getcart);
router.put("/removefromcart", fetchUser, removeFromCart);
router.put("/incrementCartQuantity", fetchUser, incrementCartQuantity);
router.put("/decrementCartQuantity", fetchUser, decrementCartQuantity);

module.exports = router;