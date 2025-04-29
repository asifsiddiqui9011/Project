const express = require('express');
const router = express.Router();
const {
    addAddress,
    getAddresses,
    // getAddressById,
    // updateAddress,
    // deleteAddress
  
  } = require("../controllers/AddressController");
  
  
router.post("/addaddress", addAddress);
router.get("/getAddresses",  getAddresses);
// router.get("//:id",  getAddressById,);
// router.put("//:id", updateAddress);
// router.delete("//:id", deleteAddress);

module.exports = router;




