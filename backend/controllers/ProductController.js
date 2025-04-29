const Product = require("../models/products.model")
const { cloudinary } = require("../cloudConfig");
// exports.addProduct = async (req, res)=>{
//     let products = await Product.find({});
//     let id;
//     if(products.length>0)
//     { 
//         let last_product_array = products.slice(-1);
//         let last_product = last_product_array[0];
//         id = last_product.id+1;
//     }
//     else{
//        id=1;  
//     }
//     const product = new Product({
//         id:id,
//         title:req.body.title,
//         images:req.body.images,
//         description:req.body.description,
//         detaildescription:req.body.detaildescription,
//         price:req.body.price,
//         category:req.body.category,
//         tags:req.body.tags,
//         subcategory:req.body.subcategory,
//         quantity:req.body.quantity,
//     });
//     // console.log(product);
//     await product.save();
//     // console.log("saved");
//     res.json({
//         success:true,
//         title:req.body.title,
//     })
// };


exports.addProduct = async (req, res) => {
    try {
      // Validate required fields.
      const requiredFields = [
        "title",
        "images",
        "description",
        "price",
        "category",
        "subcategory",
        "quantity",
        "tags"
      ];
      for (const field of requiredFields) {
        if (!req.body[field]) {
          return res.status(400).json({
            success: false,
            message: `${field} is required.`
          });
        }
      }
  
      // Validate images array: must be an array with no more than 4 items.
      if (!Array.isArray(req.body.images) || req.body.images.length > 4) {
        return res.status(400).json({
          success: false,
          message: "images must be an array with up to 4 entries."
        });
      }
  
      // Generate product ID based on the last product.
      const lastProduct = await Product.findOne().sort({ date: -1 });
      let newIdNumber = 1; // Default if no product exists.
      if (lastProduct && lastProduct.id) {
        const idParts = lastProduct.id.split("-");
        // idParts should be like ["PR", "0001"] or ["PR", "0001", "1067R"]
        let numericPart = 0;
        if (idParts.length > 1) {
          numericPart = parseInt(idParts[1], 10);
        }
        if (isNaN(numericPart)) {
          numericPart = 0;
        }
        newIdNumber = numericPart + 1;
      }
      // Pad the new id number to 4 digits.
      const paddedNumber = String(newIdNumber).padStart(4, "0");
      let modelPart = "";
      if (req.body.attributes && req.body.attributes.modelNumber) {
        modelPart = "-" + req.body.attributes.modelNumber.toUpperCase();
      }
      // Construct the new product ID.
      const productId = `PR-${paddedNumber}${modelPart}`;
  
      // Attach the generated id to req.body
      req.body.id = productId;
  
      // Create a new product directly from req.body.
      const product = new Product(req.body);
  
      // Save the product to the database.
      await product.save();
  
      res.status(201).json({
        success: true,
        message: "Product created successfully.",
        product
      });
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({
        success: false,
        message: error.message
      });
    }
  };


  
//API for deleting products
// exports.removeproduct = async (req, res) => {
//   try {
//     // Validate required field id
//     if (!req.body.id) {
//       return res.status(400).json({
//         success: false,
//         message: "Product id is required."
//       });
//     }

//     const product = await Product.findOneAndDelete({id:req.body.id });

//     if (!product) {
//       return res.status(404).json({
//         success: false,
//         message: "Product not found."
//       });
//     }

//     res.status(200).json({
//       success: true,
//       message: "Product deleted successfully.",
//       product
//     });
//   } catch (error) {
//     console.error("Error deleting product:", error);
//     res.status(500).json({
//       success: false,
//       message: error.message
//     });
//   }
// }


exports.removeproduct = async (req, res) => {
  try {
    // Validate required field id
    if (!req.body.id) {
      return res.status(400).json({
        success: false,
        message: "Product id is required."
      });
    }

    // Find the product by id
    const product = await Product.findOne({ id: req.body.id });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found."
      });
    }

    // Delete associated images from Cloudinary if any exist
    if (product.images && Array.isArray(product.images)) {
      for (const img of product.images) {
        if (img.image_url) {
          const fileNameWithExt = img.image_url.substring(img.image_url.lastIndexOf("/") + 1);
          const publicIdWithoutExt = fileNameWithExt.split(".")[0];
          const folder = "AiGadgets/products";
          const publicIdToDelete = `${folder}/${publicIdWithoutExt}`;
          const result = await cloudinary.uploader.destroy(publicIdToDelete);
          console.log("Image deleted successfully from Cloudinary:", result);
        }
      }
    }

    // Delete the product from the database after images are removed
    const deletedProduct = await Product.findOneAndDelete({ id: req.body.id });

    res.status(200).json({
      success: true,
      message: "Product and its images deleted successfully.",
      product: deletedProduct
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};


//get all products
exports.allproducts = async (req,res)=>{
    try {
        let products = await Product.find({}).populate({
            path: "reviews",
            populate: {
            path: "user",
            select: "name profileImage"
            }
        });
        // console.log(products,"all products fetched");
           res.send(products);
    } catch (error) {
        console.log(error)
    }
   
}



// app.post("/edit-image", upload.single('product'), (req, res) => {
//     // Extract the old image URL from the request body
//     const oldImageUrl = req.body.oldImageUrl;
  
//     if (oldImageUrl) {
//       // Assume the old image URL is of the form:
//       // "http://localhost:8080/images/filename.ext"
//       const oldFileName = oldImageUrl.split("/").pop();
//       // Construct the file path to the image on disk.
//       const oldFilePath = path.join(__dirname, "upload", "images", oldFileName);
  
//       // Check if the file exists and then delete it.
//       fs.access(oldFilePath, fs.constants.F_OK, (err) => {
//         if (!err) {
//           fs.unlink(oldFilePath, (err) => {
//             if (err) {
//               console.error("Error deleting old image:", err);
//               // Optionally, you can send a warning without aborting the entire operation.
//             } else {
//               console.log("Old image deleted successfully:", oldFilePath);
//             }
//           });
//         } else {
//           console.log("Old image file not found:", oldFilePath);
//         }
//       });
//     }
  
//     // Check if a new image file was uploaded
//     if (!req.file) {
//       return res
//         .status(400)
//         .json({ success: 0, message: "No new image file was uploaded." });
//     }
  
//     // Create a new image object from the file uploaded.
//     const newImageObj = {
//       image_url: `http://localhost:${port}/images/${req.file.filename}`,
//       image_name: req.file.originalname
//     };
  
//     // Return the new image data.
//     res.json({ success: 1, newImage: newImageObj });
//   });
  



/////////////////////////////////////////////////////////////////////////////////////////////////

// Endpoint to handle a single image edit.
exports.editImage = async (req, res) => {
  try {
    const oldImageUrl = req.body.oldImageUrl;

    if (oldImageUrl) {
      // Extract the public ID from the old image URL.
      const fileNameWithExt = oldImageUrl.substring(oldImageUrl.lastIndexOf("/") + 1);
      const publicIdWithoutExt = fileNameWithExt.split(".")[0];
      const folder = "AiGadgets/products";
      const publicIdToDelete = `${folder}/${publicIdWithoutExt}`;

      // Delete the old image from Cloudinary.
      const result = await cloudinary.uploader.destroy(publicIdToDelete);
      console.log("Old image deleted successfully from Cloudinary:", result);
    }

    if (!req.file) {
      return res.status(400).json({
        success: 0,
        message: "No new image file was uploaded.",
      });
    }

    // Build new image object from Cloudinary's response.
    const newImageObj = {
      image_url: req.file.path, 
      image_name: req.file.originalname,
    };

    res.json({ success: 1, newImage: newImageObj });
  } catch (error) {
    console.error("Internal Error in /edit-image:", error);
    res.status(500).json({
      success: 0,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};


//edit image api .................................................................................

// Update Product Endpoint
exports.updateProduct = async (req, res) => {
    const productId = req.params.id;
    const updatedData = req.body;
  
    try {
      // Find the product by ID and update its details
      const updatedProduct = await Product.findByIdAndUpdate(
        productId,
        updatedData,
        { new: true, runValidators: true }
      );
  
      if (!updatedProduct) {
        return res
          .status(404)
          .json({ success: 0, message: "Product not found for the given ID." });
      }
  
      res.status(200).json({
        success: 1,
        message: "Product updated successfully.",
        updatedProduct
      });
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({
        success: 0,
        message: "Error updating product. Please try again later.",
        error: error.message
      });
    }
  };
  


// PATCH endpoint to update only the images array of a product.
exports.updateProductImages = async (req, res) => {
  const productId = req.params.id;
  const { images } = req.body;  // Expecting images to be an array of image objects

  // Validate images in the request body.
  if (!images || !Array.isArray(images)) {
    return res.status(400).json({
      success: 0,
      message: "Invalid images data provided. It must be an array."
    });
  }

  try {
    // Update only the products images field
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      { images },
      { new: true, runValidators: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: 0,
        message: "Product not found for the given ID."
      });
    }

    res.status(200).json({
      success: 1,
      message: "Product images updated successfully.",
      updatedProduct
    });
  } catch (error) {
    console.error("Error updating product images:", error);
    res.status(500).json({
      success: 0,
      message: "Failed to update product images. Please try again later.",
      error: error.message
    });
  }
};



