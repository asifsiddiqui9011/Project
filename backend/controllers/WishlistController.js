 const Users = require('../models/user.model')
 
 
 
//  //creating endpoint for adding products in wishlistdata
//  exports.addtowishlist = async (req,res)=>{
//     let userData = await Users.findOne({_id:req.user.id});
//     userData.wishlistData[req.body.itemId] +=1;
//     await Users.findByIdAndUpdate({_id:req.user.id},{wishlistData:userData.wishlistData});
//     res.send("Added")
//  }
 
//  //creating end point to remove product from wishlistData
// exports.removefromwishlist = async (req, res) => {
//    try {
//       if (!req.body.itemId) {
//          return res.status(400).json({ message: "itemId is required" });
//       }
      
//       const userData = await Users.findOne({ _id: req.user.id });
//       if (!userData) {
//          return res.status(404).json({ message: "User not found" });
//       }
      

//       if (userData.wishlistData[req.body.itemId] > 0) {
//          userData.wishlistData[req.body.itemId] = 0;
//          await Users.findByIdAndUpdate({ _id: req.user.id }, { wishlistData: userData.wishlistData });
//          console.log("Removed");
//          return res.send("Removed");
//       } else {
//          return res.status(400).json({ message: "Item does not exist in wishlist" });
//       }
//    } catch (err) {
//       res.status(500).json({ message: "Something went wrong", error: err });
//    }
// };

//  //creating endpoint to get wishlist data
//  exports.getwishlist = async (req,res)=>{
//    //  console.log("GetWishList");
//     let userData = await Users.findOne({_id:req.user.id});
//     res.json(userData.wishlistData);
//  }


exports.addtowishlist = async (req, res) => {
   try {
     const { itemId } = req.body;
     if (!itemId) {
       return res.status(400).json({ message: "itemId is required" });
     }
 
     let userData = await Users.findOne({ _id: req.user.id });
     if (!userData) {
       return res.status(404).json({ message: "User not found" });
     }
 
     // Add the item by setting its value to true
     userData.wishlistData.set(itemId, true);
     await userData.save();
 
     return res.status(200).json({ message: "Item added to wishlist" });
   } catch (error) {
     console.error("Error in addtowishlist: ", error);
     return res.status(500).json({ message: "Something went wrong", error });
   }
 };


 exports.removefromwishlist = async (req, res) => {
   try {
     const { itemId } = req.body;
     if (!itemId) {
       return res.status(400).json({ message: "itemId is required" });
     }
 
     const userData = await Users.findOne({ _id: req.user.id });
     if (!userData) {
       return res.status(404).json({ message: "User not found" });
     }
 
     // Check if the item exists in the wishlist
     if (userData.wishlistData.get(itemId)) {
       userData.wishlistData.delete(itemId);
       await userData.save();
       return res.status(200).json({ message: "Item removed from wishlist" });
     } else {
       return res.status(400).json({ message: "Item does not exist in wishlist" });
     }
   } catch (err) {
     console.error("Error in removefromwishlist: ", err);
     return res.status(500).json({ message: "Something went wrong", error: err });
   }
 }; 


 exports.getwishlist = async (req, res) => {
   try {
     let userData = await Users.findOne({ _id: req.user.id });
     if (!userData) {
       return res.status(404).json({ message: "User not found" });
     }
     
     // Convert the Map to an object for response
     const wishlistObj =(userData.wishlistData);
     return res.status(200).json(wishlistObj);
   } catch (error) {
     console.error("Error in getwishlist: ", error);
     return res.status(500).json({ message: "Something went wrong", error });
   }
 };