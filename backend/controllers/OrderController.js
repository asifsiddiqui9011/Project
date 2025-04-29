const Order = require('../models/order.model')
const Users = require('../models/user.model')
const Review = require('../models/review.model');
const Product = require('../models/products.model');

//Api for Order
exports.orders = async (req, res) => {
    let orders = await Order.find({});
    let id;
    if (orders.length > 0) { 
        let last_order_array = orders.slice(-1);
        let last_order = last_order_array[0];
        id = last_order.id + 1;
    } else {
        id = 1;
    }
    const userID = req.user.id;
    const Mobile = req.user.mobile;
    const order = new Order({
        Items: req.body.Items,
        Address: req.body.Address,
        Payment: req.body.Payment,
        Status: req.body.Status,
        total: req.body.total,
        subTotal: req.body.subTotal,
        mobile: Mobile,
        User: userID,
    });
    
    await order.save();
    let objId = order.id;
    
    // Push order id to user's Order array and clear the cartData field
    await Users.findByIdAndUpdate(userID, {
        $push: { Order: objId },
        $set: { cartData: {} }
    });
    
    res.json({
        success: true,
        status: req.body.status,
    });
}


//get all orders 
exports.allorders = async (req,res)=>{
    let orders = await Order.find({});
   // console.log(orders,"all order fetched");
    res.send(orders);
}


//update order status
exports.updateorderstatus = async (req, res) => {
    try {
        let orderId = req.body.id;
        let status = req.body.status;
        if (!orderId || !status) {
            return res.status(400).json({
                success: false,
                message: 'Order ID and status are required'
            });
        }
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { $set: { Status: status } },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }
        res.json({
            success: true,
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


exports.addReview = async (req, res) => {
    const userID = req.user.id;
    const { review, rating, product } = req.body; // "product" is assumed to be the order item _id

    try {
        // Ensure that the product in the order items has been delivered
        const deliveredOrder = await Order.findOne({
            User: userID,
            Status: "delivered",
            "Items._id": product
        });

        if (!deliveredOrder) {
            return res.status(400).json({
                success: false,
                message: "Product has not been delivered yet"
            });
        }

        // Create and save the new review
        const newReview = new Review({
            review,
            rating,
            user: userID,
            product
        });
        await newReview.save();

        // Update the product document by adding the new review using the product id field
        await Product.findOneAndUpdate(
            { _id: product },
            { $push: { reviews: newReview._id } }
        );
        // Mark the review field as true for that particular order item
        await Order.findOneAndUpdate(
            { User: userID, Status: "delivered", "Items._id": product },
            { $set: { "Items.$.review": true } },
            { new: true }
        );

        res.json({ success: true, review: newReview });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// assign a delivery boy to an order
exports.assignDeliveryBoy = async (req, res) => {
    const { orderId, deliveryBoyId } = req.body;
    console.log(orderId, deliveryBoyId, "orderId, deliveryBoyId")
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { deliveryBoy: deliveryBoyId },
            { new: true }
        );
        if (!updatedOrder) {
            return res.status(404).json({ success: false, message: 'Order not found' });
        }
        res.json({ success: true, order: updatedOrder });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};


exports.updatePaymentStatus = async (req, res) => {
    try {
        const { id, paymentStatus } = req.body;
        if (!id || !paymentStatus) {
            return res.status(400).json({
                success: false,
                message: 'Order ID and payment status are required'
            });
        }

        // Update the Payment object's status property instead of replacing the entire Payment object
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { $set: { "Payment.status": paymentStatus } },
            { new: true }
        );

        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: 'Order not found'
            });
        }

        res.json({
            success: true,
            message: 'Payment Status Updated',
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};



exports.cancelOrder = async (req, res) => {
    try {
        const { orderId } = req.body;
        if (!orderId) {
            return res.status(400).json({
                success: false,
                message: "Order ID is required"
            });
        }
        
        const updatedOrder = await Order.findByIdAndUpdate(
            orderId,
            { 
                cancellation: true,
                Status: "cancelled"
            },
            { new: true }
        );
        
        if (!updatedOrder) {
            return res.status(404).json({
                success: false,
                message: "Order not found"
            });
        }
        
        res.json({
            success: true,
            message: "Order cancelled successfully",
            order: updatedOrder
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};