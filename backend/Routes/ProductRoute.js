const express = require('express');
const multer = require("multer");
const { cloudinary, storage } = require("../cloudConfig");
const upload = multer({ storage: storage });
const router = express.Router();
const {
    addProduct,
    removeproduct,
    allproducts,
    updateProductImages,
    updateProduct,
    editImage
  } = require("../controllers/ProductController");
  
  
router.post("/addproduct", addProduct);
router.post("/edit-image", upload.single('product'), editImage);
router.get("/allproducts",  allproducts);
router.patch('/update-product-images/:id',updateProductImages); 
router.put('/update-product/:id',updateProduct);
router.delete("/removeproduct", removeproduct);

module.exports = router;