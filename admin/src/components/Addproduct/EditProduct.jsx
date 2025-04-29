// import { useState } from "react";
// import "./Addproduct.css"
// import imageselect from "../../assets/imageselector.jpg"
// import { useParams } from "react-router-dom";
// import { useContext } from "react";
// import { AdminContext } from "../../Context/AdminContext";

// function EditProduct() {

//     const [image,setImage] = useState(false);
//     const [image1,setImage1] = useState(false);
//     const [image2,setImage2] = useState(false);
//     const [image3,setImage3] = useState(false);


//     const{allproducts}= useContext(AdminContext);
//     const {productId} = useParams();
//     const product = allproducts.find((e)=> e._id === productId)
//     const [updatedProduct,setUpdatedProduct] = useState({...product})
//     console.log(updatedProduct,"updatedd")


  

//   console.log(image,"image")

//   const imageHandler = (e)=>{
//         setImage(e.target.files[0]);
//     }

//   const image1Handler = (e)=>{
//       setImage1(e.target.files[0]);
//   }

//   const image2Handler = (e)=>{
//     setImage2(e.target.files[0]);
// }

//   const image3Handler = (e)=>{
//   setImage3(e.target.files[0]);
// }

//     const changeHandler = (e)=>{
//         setUpdatedProduct({...updatedProduct,[e.target.name]:e.target.value})  
//     }

//     const Add_Product = async ()=>{
//         console.log(updatedProduct);
//         let responseData=[''];
//         let product = updatedProduct;

//         let formData = new FormData();
//         formData.append('product',image);
        
  
      
        
//         await fetch('http://localhost:8080/api/upload',{
//           method:'POST',
//           headers:{
//             Accept:'application/json',
//           },
//         body:formData,
//         }).then((resp)=> resp.json()).then((data)=>{responseData=data})
          
//         if(responseData.success)
//         {
  
//           product.image = responseData.image_url;
      
//           // console.log(product);
//           await fetch('http://localhost:8080/api/UpdateProduct',{
//           method:'PUT',
//           headers:{
//             Accept:'application/json',
//             'Content-Type':'application/json',
//           },
//           body:JSON.stringify(product),
//         }).then((resp)=>resp.json())
//           .then((data)=>{
//           data.success?alert("Product Updated"):alert("Failed in Updating Product")
//         })
//       }
//     }

    

//   return (
//     <div className="add-product">
//       <div className="addproduct-itemfield">
//         <p>Product Title:</p>

//         <input value={updatedProduct.title} onChange={changeHandler} type="text" name="title" placeholder="Enter product title" />
//         <p>Product Description:</p>
//         <input value={updatedProduct.description} onChange={changeHandler}type="text" name="description" placeholder="Enter Product description" />
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Price:</p>
//         <input value={updatedProduct.price} onChange={changeHandler} type="text" name="price" placeholder="Type here" />
//         <p>Quantity:</p>
//         <input value={updatedProduct.quantity} onChange={changeHandler} type="text" name="quantity" placeholder="Type here" />
//         <p>Tags:</p>
//         <input value={updatedProduct.tags} onChange={changeHandler} type="text" name="tags" placeholder="Type here tags" />
//       </div>
//       <div className="addproduct-itemfield">
//          <p>Product Category:</p>
//          <select value={updatedProduct.category} onChange={changeHandler} name="category" id="add-product-selector">
//             <option value="house">House</option>
//             <option value="office">Office</option>
//         </select>
//         {console.log(updatedProduct.category,"product category")}
//         <p>Product SubCategory:</p>
//          {
//           updatedProduct.category==="house"?
//          <select value={updatedProduct.subcategory} onChange={changeHandler}name="subcategory" id="add-product-selector">
//             <option value="living">living</option>
//             <option value="kitchen">kitchen</option>
//             <option value="bedroom">bedroom</option>
//             <option value="bathroom">bathroom</option>
//         </select>
//            :
//         <select value={updatedProduct.subcategory} onChange={changeHandler}name="subcategory" id="add-product-selector">
//             <option value="conference">conference</option>
//             <option value="security">security</option>
//             <option value="research">research</option>
//             <option value="desk">desk</option>
//             <option value="washroom">washroom</option>
//         </select>
//         }
//       </div>
//       <div>
//         <span>
//          <p>Detail Description:</p>
//           <textarea onChange={changeHandler} value={updatedProduct.detaildescription} name="detaildescription" id="text-area" cols="100" rows="5"></textarea>
//         </span>
//       </div>
//       <h2>Select Images</h2>
//       <hr />
//       <div className="addproduct-itemfield">

//         <label htmlFor="file-input">
//             <img src={image?URL.createObjectURL(image):updatedProduct.image} alt="input img" className="input-image"/>   
//         </label>
//         <input onChange= {imageHandler} type="file" name="image" id="file-input" hidden/>
//         <label htmlFor="file-input1">
//             <img src={image1?URL.createObjectURL(image1):updatedProduct.image} alt="input img1" className="input-image"/>   
    
//        </label>
//         <input onChange= {image1Handler} type="file" name="image" id="file-input1" hidden/>
//         <label htmlFor="file-input2">
//             <img src={image2?URL.createObjectURL(image2):updatedProduct.image} alt="input img2" className="input-image"/>   
//         </label>
//         <input onChange= {image2Handler} type="file" name="image" id="file-input2" hidden/>
//         <label htmlFor="file-input3">
//             <img src={image3?URL.createObjectURL(image3):updatedProduct.image} alt="input img3" className="input-image"/>   
//         </label>
//         <input onChange= {image3Handler} type="file" name="image" id="file-input3" hidden/>
//       </div>
//       <button onClick={()=>{Add_Product()}}className="addproduct-btn">Update</button>
//     </div>
//   )
// }
// export default EditProduct;






import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../../Context/AdminContext";
import "./Addproduct.css";
import imageselect from "../../assets/imageselector.jpg";

function EditProduct() {
  // Get product data from context and URL params.
  const { allproducts } = useContext(AdminContext);
  const { productId } = useParams();
  const product = allproducts.find((e) => e._id === productId);

  // Local state to store updated product details.
  const [updatedProduct, setUpdatedProduct] = useState({ ...product });

  // Handler for text, number, and select fields.
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handler for fields that contain comma separated values.
  const arrayFieldHandler = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setUpdatedProduct((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  // Handler for product attribute fields.
  const attributeHandler = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [name]: value,
      },
    }));
  };

  // Update product details without images.
  const updateProductDetails = async () => {
    try {
      const productToUpdate = {
        ...updatedProduct,
        price: parseFloat(updatedProduct.price),
        costPrice: parseFloat(updatedProduct.costPrice || 0),
        sellingPrice: parseFloat(
          updatedProduct.sellingPrice || updatedProduct.price
        ),
        discount: parseFloat(updatedProduct.discount || 0),
        quantity: parseInt(updatedProduct.quantity),
      };

      const response = await fetch(
        `http://localhost:8080/api/update-product/${product._id}`,
        {
          method: "PUT",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(productToUpdate),
        }
      );

      const data = await response.json();
      data.success
        ? alert("Product updated successfully!")
        : alert("Failed to update product details.");
    } catch (error) {
      console.error("Error updating product details:", error);
      alert("Error updating product details.");
    }
  };

  return (
    <div className="add-product">
      <h1>Edit Product</h1>
      <div className="addproduct-itemfield">
        <label>
          Product Title:
          <input
            type="text"
            name="title"
            placeholder="Type Product title"
            value={updatedProduct.title}
            onChange={changeHandler}
          />
        </label>
        <label>
          Product Description:
          <input
            type="text"
            name="description"
            placeholder="Type Product description"
            value={updatedProduct.description}
            onChange={changeHandler}
          />
        </label>
      </div>

      <div className="addproduct-itemfield">
        <label>
          Price:
          <input
            type="text"
            name="price"
            placeholder="Price"
            value={updatedProduct.price}
            onChange={changeHandler}
          />
        </label>
        <label>
          Cost Price:
          <input
            type="text"
            name="costPrice"
            placeholder="Cost Price"
            value={updatedProduct.costPrice || ""}
            onChange={changeHandler}
          />
        </label>
        <label>
          Selling Price:
          <input
            type="text"
            name="sellingPrice"
            placeholder="Selling Price"
            value={updatedProduct.sellingPrice || ""}
            onChange={changeHandler}
          />
        </label>
        <label>
          Discount (%):
          <input
            type="text"
            name="discount"
            placeholder="Discount"
            value={updatedProduct.discount || ""}
            onChange={changeHandler}
          />
        </label>
        <label>
          Quantity:
          <input
            type="text"
            name="quantity"
            placeholder="Quantity"
            value={updatedProduct.quantity}
            onChange={changeHandler}
          />
        </label>
        <label>
          Tags:
          <input
            type="text"
            name="tags"
            placeholder="Tags (comma separated)"
            value={updatedProduct.tags}
            onChange={changeHandler}
          />
        </label>
      </div>

      <div className="addproduct-itemfield">
        <label>
          Product Category:
          <select
            name="category"
            value={updatedProduct.category}
            onChange={changeHandler}
          >
            <option value="house">House</option>
            <option value="office">Office</option>
          </select>
        </label>
        <label>
          Product SubCategory:
          <select
            name="subcategory"
            value={updatedProduct.subcategory}
            onChange={changeHandler}
          >
            {updatedProduct.category === "house" ? (
              <>
                <option value="living">Living</option>
                <option value="kitchen">Kitchen</option>
                <option value="bedroom">Bedroom</option>
                <option value="bathroom">Bathroom</option>
              </>
            ) : (
              <>
                <option value="conference">Conference</option>
                <option value="security">Security</option>
                <option value="research">Research</option>
                <option value="desk">Desk</option>
                <option value="washroom">Washroom</option>
              </>
            )}
          </select>
        </label>
      </div>

      <div className="addproduct-textarea">
        <label>
          Detail Description:
          <textarea
            name="detaildescription"
            placeholder="Type detailed product description"
            value={updatedProduct.detaildescription}
            onChange={changeHandler}
          />
        </label>
      </div>

      <div className="addproduct-itemfield">
        <label>
          Features (comma separated):
          <input
            type="text"
            placeholder="Feature1, Feature2"
            onChange={(e) => arrayFieldHandler(e, "features")}
            defaultValue={
              updatedProduct.features
                ? updatedProduct.features.join(", ")
                : ""
            }
          />
        </label>
        <label>
          Benefits (comma separated):
          <input
            type="text"
            placeholder="Benefit1, Benefit2"
            onChange={(e) => arrayFieldHandler(e, "benefits")}
            defaultValue={
              updatedProduct.benefits
                ? updatedProduct.benefits.join(", ")
                : ""
            }
          />
        </label>
      </div>

      <div className="addproduct-itemfield">
        <label>
          Material:
          <input
            type="text"
            placeholder="Material (e.g., Stainless Steel)"
            name="material"
            onChange={attributeHandler}
            defaultValue={updatedProduct.attributes?.material || ""}
          />
        </label>
        <label>
          Brand Name:
          <input
            type="text"
            placeholder="Brand Name"
            name="brandName"
            onChange={attributeHandler}
            defaultValue={updatedProduct.attributes?.brandName || ""}
          />
        </label>
        <label>
          Model Number:
          <input
            type="text"
            placeholder="Model Number"
            name="modelNumber"
            onChange={attributeHandler}
            defaultValue={updatedProduct.attributes?.modelNumber || ""}
          />
        </label>
      </div>

      <div className="addproduct-itemfield">
        <label>
          Key Attributes (comma separated):
          <input
            type="text"
            placeholder="Key Attribute1, Key Attribute2"
            onChange={(e) => arrayFieldHandler(e, "keyAttributes")}
            defaultValue={
              updatedProduct.keyAttributes
                ? updatedProduct.keyAttributes.join(", ")
                : ""
            }
          />
        </label>
      </div>

      <button onClick={updateProductDetails} className="addproduct-btn">
        Update Product Details
      </button>
    </div>
  );
}

export default EditProduct;
