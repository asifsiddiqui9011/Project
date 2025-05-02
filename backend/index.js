const port = 8080;
const express = require("express");
const app = express();
const multer = require("multer");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const fs = require('fs');
const path = require("path");
const cors = require("cors");


// const Users = require("./models/user.model")
// // const Product = require("./models/products.model")
// const fetchUser = require("./middleware/fetchuser.js")
// const Address = require("./models/address.model.js")
// const Order = require("./models/order.model.js")
const Product = require("./models/products.model.js")
const userRoute = require('./Routes/UserRoute');
const ProductRoute = require('./Routes/ProductRoute');
const CartRoute = require('./Routes/CartRoute');
const WishlistRoute = require('./Routes/WishlistRoute');
const OrderRoute = require('./Routes/OrderRoute');
const adminUserRoute = require('./Routes/adminUserRoute.js')
//const {storage} = require('./cloudConfig')
const { cloudinary, storage } = require("./cloudConfig");


//websocket implementation 
const WebSocket = require("ws");
const { searchProducts } = require("./controllers/searchController");





app.use(express.json());
app.use(cors());


// database connection with MongoDb 
const MONGO_URL = "mongodb+srv://asifsiddiqui9011:AiGadgets1402@cluster0.sszjpbi.mongodb.net/Ai-Gadgets";
  
main()
   .then( () => {
    console.log("connected to db");
   })
   .catch((err) => {
    console.log(err);
   });

async function main(){
    await mongoose.connect(MONGO_URL);
}


//API Creation
app.get("/",(req,res)=>{
    res.send("Express App is Running")
})

app.use("/api", userRoute);
app.use("/api", ProductRoute);
app.use("/api", OrderRoute);
app.use("/api", CartRoute);
app.use("/api", WishlistRoute);
app.use("/api",adminUserRoute);



// // Serve static files for images
app.use('/images', express.static('upload/images'));




// Create the multer instance using Cloudinary storage.
const upload = multer({ storage: storage });


// Upload endpoint: accepts up to 5 files under the field "product"
app.post("/upload", upload.array("product", 5), (req, res) => {
  const files = req.files;
  if (!files || files.length === 0) {
    return res.status(400).json({
      success: 0,
      message: "No files were uploaded.",
    });
  }

  // Each file now contains a 'path' property with the Cloudinary URL.
  const imageObjs = files.map((file) => ({
    image_url: file.path,     
    image_name: file.originalname,
  }));

  // console.log("Image objects:", imageObjs);

  res.json({ success: 1, image_urls: imageObjs });
});

//razor pay code.....................................................
const Razorpay = require("razorpay");
const { start } = require("repl");
const instance = new Razorpay({
    
  key_id: "rzp_test_sa8DMo52wpFlUJ",
  key_secret: "caynGGFKuHUgr1KHt1y2dA9u",
});

app.post("/create-razorpay-order", async (req, res) => {
  const options = {
    amount: req.body.amount * 100,
    currency: "INR",
  };
  // console.log(options,"options");
  try {
    const order = await instance.orders.create(options);
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



app.listen(port,(error)=>{
    if (!error) {
        console.log("server running on port"+port)
    }
    else
    {
        console.log("error:"+error)
    }
})

