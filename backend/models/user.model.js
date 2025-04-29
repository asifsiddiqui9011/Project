// const mongoose = require("mongoose");


// //Schema for user model

// const Users = mongoose.model('Users',{
//     name:{
//         type:String,
//         required:true,
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//     },
//     password:{
//         type:String,  
//     },
//     cartData:{
//         type:Object,
//     },
//     wishlistData:{
//         type:Object,
//     },
//     profileImage:{
//         type:String,
//     },
//     mobile:{
//         type:String
//     },
//     address:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"addresses"
//     }],
//     reviews:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"reviews",
//     }],
//     Order:[{
//         type:mongoose.Schema.Types.ObjectId,
//         ref:"orders",
//     }],
//     date:{
//         type:Date,
//         default:Date.now,
//     }
// })

// module.exports=Users;




const mongoose = require("mongoose");


//Schema for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,  
    },
    cartData: {
        type: Map, // Map is ideal for key-value pairs
        of: Number, // Each value (quantity) should be a number
        default: {},
    },
    wishlistData: {
        type: Map,
        of: Boolean, // Each value (e.g., true) indicates presence in the wishlist
        default: {},
    },
    profileImage:{
        type:String,
    },
    mobile:{
        type:String
    },
    address:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"addresses"
    }],
    reviews:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"reviews",
    }],
    Order:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"orders",
    }],
    date:{
        type:Date,
        default:Date.now,
    }
})

module.exports=Users;