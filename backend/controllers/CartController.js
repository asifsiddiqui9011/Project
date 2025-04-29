const Users = require('../models/user.model')



// //creating endpoint for adding products in cartdata
// exports.addtocart=async (req,res)=>{
//     let userData = await Users.findOne({_id:req.user.id});
//     userData.cartData[req.body.itemId] +=1;
//     await Users.findByIdAndUpdate({_id:req.user.id},{cartData:userData.cartData});
//     res.send("Added")
//  }  

//  //creating end point to remove product from cartData
// exports.removefromcart = async (req, res) => {
//    try {
//       // Check if itemId is provided
//       if (!req.body.itemId) {
//          return res.status(400).send("itemId is required");
//       }
      
//       let userData = await Users.findOne({ _id: req.user.id });
//       if (!userData) {
//          return res.status(404).send("User not found");
//       }
      
//       // Check if the item exists in cartData and has a value greater than 0
//       if (userData.cartData[req.body.itemId] > 0) {
//          userData.cartData[req.body.itemId] -= 1;
//          await Users.findByIdAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//          return res.send("Removed");
//       } else {
//          return res.status(400).send("Item not found in cart or already at zero");
//       }
//    } catch (error) {
//       console.error("Error in removefromcart:", error);
//       res.status(500).send("Internal Server Error");
//    }
// }

 //creating endpoint to get card data
 exports.getcart = async (req,res)=>{
   //  console.log("GetCart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
 }




// exports.addToCart = async (req, res) => {
//    try {
//        let userData = await Users.findOne({ _id: req.user.id });

//        if (!userData) {
//            return res.status(404).send("User not found");
//        }

//        const { itemId } = req.body;

//        if (!itemId) {
//            return res.status(400).send("itemId is required");
//        }

//        // Increment the quantity of the product or initialize it to 1
//        const currentCount = userData.cartData.get(itemId) || 0;
//        userData.cartData.set(itemId, currentCount + 1);

//        await userData.save();
//        res.status(200).send("Added to cart");
//    } catch (error) {
//        console.error("Error in addToCart:", error);
//        res.status(500).send("Internal Server Error");
//    }
// }; 


exports.toggleCartItem = async (req, res) => {
    try {
        let userData = await Users.findOne({ _id: req.user.id });

        if (!userData) {
            return res.status(404).send("User not found");
        }

        const { itemId } = req.body;

        if (!itemId) {
            return res.status(400).send("itemId is required");
        }

        // Check if the item already exists in the cart
        if (userData.cartData.has(itemId)) {
            // If the item is in the cart, remove it
            userData.cartData.delete(itemId);
            await userData.save();
            return res.status(200).send("Item removed from cart");
        } else {
            // If the item is not in the cart, add it with quantity 1
            userData.cartData.set(itemId, 1);
            await userData.save();
            return res.status(200).send("Item added to cart");
        }
    } catch (error) {
        console.error("Error in toggleCartItem:", error);
        res.status(500).send("Internal Server Error");
    }
};



exports.removeFromCart = async (req, res) => {
   try {
       let userData = await Users.findOne({ _id: req.user.id });

       if (!userData) {
           return res.status(404).send("User not found");
       }

       const { itemId } = req.body;

       if (!itemId) {
           return res.status(400).send("itemId is required");
       }

       // Check if the item exists in cartData
       if (userData.cartData.has(itemId)) {
           userData.cartData.delete(itemId); // Remove the item directly
           await userData.save();
           return res.status(200).send("Item removed from cart");
       } else {
           return res.status(400).send("Item not found in cart");
       }
   } catch (error) {
       console.error("Error in removeFromCart:", error);
       res.status(500).send("Internal Server Error");
   }
};



exports.incrementCartQuantity = async (req, res) => {
   try {
       let userData = await Users.findOne({ _id: req.user.id });

       if (!userData) {
           return res.status(404).send("User not found");
       }

       const { itemId } = req.body;

       if (!itemId) {
           return res.status(400).send("itemId is required");
       }

       // Increment the quantity of the product or initialize it to 1
       const currentCount = userData.cartData.get(itemId) || 0;
       userData.cartData.set(itemId, currentCount + 1);

       await userData.save();
       res.status(200).send("Quantity increased");
   } catch (error) {
       console.error("Error in incrementCartQuantity:", error);
       res.status(500).send("Internal Server Error");
   }
};




exports.decrementCartQuantity = async (req, res) => {
   try {
       let userData = await Users.findOne({ _id: req.user.id });

       if (!userData) {
           return res.status(404).send("User not found");
       }

       const { itemId } = req.body;

       if (!itemId) {
           return res.status(400).send("itemId is required");
       }

       // Check if the item exists in cartData
       const currentCount = userData.cartData.get(itemId);

       if (currentCount && currentCount > 1) {
           userData.cartData.set(itemId, currentCount - 1);
           await userData.save();
           return res.status(200).send("Quantity decreased");
       } else if (currentCount === 1) {
           return res.status(400).send("Minimum quantity is 1. Cannot reduce further.");
       } else {
           return res.status(400).send("Item not found in cart");
       }
   } catch (error) {
       console.error("Error in decrementCartQuantity:", error);
       res.status(500).send("Internal Server Error");
   }
};