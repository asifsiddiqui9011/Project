// const mongoose = require("mongoose");

// // Define the product schema with timestamps enabled
// const ProductSchema = new mongoose.Schema({
//     id: {
//         type: String,
//     },
//     title: {
//         type: String,
//         required: true,
//     },
//     images: { 
//         type: Object, 
//         required: true 
//     },
//     description: {
//         type: String,
//         required: true,
//     },
//     detaildescription: {
//         type: String,
//     },
//     price: {
//         type: Number,
//         required: true,
//     },
//     category: {
//         type: String,
//         required: true,
//     },
//     subcategory: {
//         type: String,
//         required: true,
//     },
//     quantity: {
//         type: Number,
//         required: true,
//     },
//     tags: {
//         type: String,
//         required: true,
//     },
//     date: {
//         type: Date,
//         default: Date.now,
//     },
//     available: {
//         type: Boolean,
//         default: true,
//     },
//     reviews: [{
//         type: mongoose.Schema.Types.ObjectId,
//         ref: "reviews"
//     }],
// }, { timestamps: true }); // This adds createdAt and updatedAt automatically

// const Product = mongoose.model("Product", ProductSchema);
// module.exports = Product;


const mongoose = require("mongoose");

// Custom validator to ensure the images array does not exceed 4 entries
function arrayLimit(val) {
  return val.length <= 4;
}

const ProductSchema = new mongoose.Schema({
  id: {
    type:String, // String to accommodate prefixes and model numbers
    required: true,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  images: {
    type: [
      {
        image_url: {
          type: String,
          required: true,
        },
        image_name: {
          type: String,
          required: true,
        },
      },
    ],
    validate: {
      validator: arrayLimit,
      message: "You can upload up to 4 images only.",
    },
  },
  description: {
    type: String,
    required: true,
  },
  detaildescription: {
    type: String,
  },
  features: {
    type: [String],
    default: [],
  },
  benefits: {
    type: [String],
    default: [],
  },
  price: {
    type: Number,
    required: true,
  },
  costPrice: {
    type: Number,
    default: 0,
  },
  sellingPrice: {
    type: Number,
    default: 0,
  },
  discount: {
    type: Number,
    default: 0, // Represented as a percentage (e.g., 10 for 10% discount)
  },
  category: {
    type: String,
    required: true,
  },
  subcategory: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  tags: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "reviews",
    },
  ],
  attributes: {
    type: Object,
    default: {},
  },
  sales: {
    orderCount: {
      type: Number,
      default: 0,
    },
    unitsSold: {
      type: Number,
      default: 0,
    },
  },
}, { timestamps: true });

const Product = mongoose.model("Product", ProductSchema);
module.exports = Product;