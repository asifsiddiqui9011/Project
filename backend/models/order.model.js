// const mongoose = require("mongoose");

// const Order = mongoose.model('orders',{
//     Items:{
//         type:Object,
//         require:true,
//     },
//     Address:{
//         type:Object,
//         required:true,
//     },
//     Payment:{
//         type:Object,
//         required:true,
//     },
//     Status:{
//         type:String,
//         required:true,
//     },
//     total:{
//         type:String,
//         required:true,
//     },
//     subTotal:{
//         type:String,
//         required:true,
//     },
//     User:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Users"
//     },
//     mobile:{
//         type:String,
//     },
//     orderDate:{
//         type:Date,
//         default:Date.now,
//     },
//     expectedDate:{
//         type:Date,
//         default: () => {
//             const currentDate = new Date();
//             currentDate.setDate(currentDate.getDate() + 3); 
//             return currentDate;
//           }
//     }
// })
// module.exports=Order;



// const mongoose = require("mongoose");

// const Order = mongoose.model('orders',{
//     Items:{
//         type:Object,
//         require:true,
//     },
//     Address:{
//         type:Object,
//         required:true,
//     },
//     Payment:{
//         type:Object,
//         required:true,
//     },
//     Status:{
//         type:String,
//         required:true,
//     },
//     total:{
//         type:String,
//         required:true,
//     },
//     subTotal:{
//         type:String,
//         required:true,
//     },
//     User:{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"Users"
//     },
//     mobile:{
//         type:String,
//     },
//     deliveryBoy: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "adminUser"
//     },
//     orderDate:{
//         type:Date,
//         default:Date.now,
//     },
//     expectedDate:{
//         type:Date,
//         default: () => {
//             const currentDate = new Date();
//             currentDate.setDate(currentDate.getDate() + 3); 
//             return currentDate;
//           }
//     },
    
// });
// module.exports=Order;


const mongoose = require("mongoose");

const Order = mongoose.model('orders', {
    Items: [{
        title: {
            type: String,
            required: true
        },
        image: {
            type: String,
            required: true
        },
        quantity: {
            type: String,
            required: true
        },
        price: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        review: {
            type: Boolean,
            default: false
        }
    }],
    Address: {
        houseNo: {
            type: String,
            required: true
        },
        locality: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        state: {
            type: String,
            required: true
        },
        zipCode: {
            type: String,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
        },
        mobile: {
            type: String
        }
    },
    Payment: {
        type: Object,
        required: true,
    },
    Status: {
        type: String,
        enum: ["ordered", "shipped", "delivered", "cancelled"],
        required: true,
    },
    total: {
        type: String,
        required: true,
    },
    subTotal: {
        type: String,
        required: true,
    },
    User: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users"
    },
    mobile: {
        type: String,
    },
    deliveryBoy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "adminUser"
    },
    orderDate: {
        type: Date,
        default: Date.now,
    },
    expectedDate: {
        type: Date,
        default: () => {
            const currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + 3);
            return currentDate;
        }
    },
    cancellation: {
        type: Boolean,
        default: false
    }
});
module.exports=Order;