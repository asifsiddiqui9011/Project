const express = require('express');
const fetchUser = require("../middleware/fetchuser");
const router = express.Router();
const {
    orders,
    allorders,
    updateorderstatus,
    addReview,
    assignDeliveryBoy,
    updatePaymentStatus,
    cancelOrder
  } = require("../controllers/OrderController");
  
  
router.post("/orders",fetchUser, orders);
router.get("/allorders",  allorders);
// router.get("//:id",  getAddressById,);
router.put("/updateorderstatus", updateorderstatus);
// router.delete("//:id", deleteAddress);
router.patch("/assignDeliveryBoy", assignDeliveryBoy);
router.put("/updatePaymentStatus", updatePaymentStatus);
router.put("/cancelorder",fetchUser, cancelOrder);

router.post("/review",fetchUser, addReview);

module.exports = router;