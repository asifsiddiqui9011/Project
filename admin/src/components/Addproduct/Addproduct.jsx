// import { useState } from "react";
// import "./Addproduct.css"
// import imageselect from "../../assets/imageselector.jpg"

// function Addproduct() {

//     const [image,setImage] = useState(false);
//     const [image1,setImage1] = useState(false);
//     const [image2,setImage2] = useState(false);
//     const [image3,setImage3] = useState(false);
//     const [productDetails,setProductDetails] = useState({
//         title:"",
//         description:"",
//         price:'',
//         image:"",
//         image1:"",
//         image2:"",
//         image3:"",
//         category:"house",
//         subcategory:"living",
//         quantity:''
//     })

  

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
//       setProductDetails({...productDetails,[e.target.name]:e.target.value})  
//     }

//     const Add_Product = async ()=>{
        
//         console.log(productDetails);
//         let responseData=[''];
//         let product = productDetails;

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
//           await fetch('http://localhost:8080/api/addproduct',{
//           method:'POST',
//           headers:{
//             Accept:'application/json',
//             'Content-Type':'application/json',
//           },
//           body:JSON.stringify(product),
//         }).then((resp)=>resp.json())
//           .then((data)=>{
//           data.success?alert("Product Added"):alert("Failed")
//         })
//       }
//     }

    

//   return (
//     <div className="add-product">
//       <div className="addproduct-itemfield">
//         <p>Product Title:</p>

//         <input value={productDetails.title} onChange={changeHandler} type="text" name="title" placeholder="Type Product title" />
//         <p>Product Description:</p>
//         <input value={productDetails.description} onChange={changeHandler}type="text" name="description" placeholder="Type Product description" />
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Price:</p>
//         <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder="Type here" />
//         <p>Quantity:</p>
//         <input value={productDetails.quantity} onChange={changeHandler} type="text" name="quantity" placeholder="Type here" />
//         <p>Tags:</p>
//         <input value={productDetails.tags} onChange={changeHandler} type="textarea" name="tags" placeholder="Type here tags" />
//       </div>
//       <div className="addproduct-itemfield">
//          <p>Product Category:</p>
//          <select value={productDetails.category} onChange={changeHandler} name="category" id="add-product-selector">
//             <option value="house">House</option>
//             <option value="office">Office</option>
//         </select>
//         {console.log(productDetails.category,"product category")}
//         <p>Product SubCategory:</p>
//          {
//           productDetails.category==="house"?
//          <select value={productDetails.subcategory} onChange={changeHandler}name="subcategory" id="add-product-selector">
//             <option value="living">living</option>
//             <option value="kitchen">kitchen</option>
//             <option value="bedroom">bedroom</option>
//             <option value="bathroom">bathroom</option>
//         </select>
//            :
//         <select value={productDetails.subcategory} onChange={changeHandler}name="subcategory" id="add-product-selector">
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
//           <textarea onChange={changeHandler} value={productDetails.detaildescription} name="detaildescription" id="text-area" cols="100" rows="5"></textarea>
//         </span>
//       </div>
//       <h2>Select Images</h2>
//       <hr />
//       <div className="addproduct-itemfield">

//         <label htmlFor="file-input">
//             <img src={image?URL.createObjectURL(image):imageselect} alt="input img" className="input-image"/>   
//         </label>
//         <input onChange= {imageHandler} type="file" name="image" id="file-input" hidden/>
//         <label htmlFor="file-input1">
//             <img src={image1?URL.createObjectURL(image1):imageselect} alt="input img1" className="input-image"/>   
    
//        </label>
//         <input onChange= {image1Handler} type="file" name="image" id="file-input1" hidden/>
//         <label htmlFor="file-input2">
//             <img src={image2?URL.createObjectURL(image2):imageselect} alt="input img2" className="input-image"/>   
//         </label>
//         <input onChange= {image2Handler} type="file" name="image" id="file-input2" hidden/>
//         <label htmlFor="file-input3">
//             <img src={image3?URL.createObjectURL(image3):imageselect} alt="input img3" className="input-image"/>   
//         </label>
//         <input onChange= {image3Handler} type="file" name="image" id="file-input3" hidden/>
//       </div>
//       <button onClick={()=>{Add_Product()}}className="addproduct-btn">ADD</button>
//     </div>
//   )
// }
// export default Addproduct;



// import { useState } from "react";
// import "./Addproduct.css"
// import imageselect from "../../assets/imageselector.jpg"

// function Addproduct() {


//     const [images,setImages] = useState([]);

//     const [productDetails,setProductDetails] = useState({
//         title:"",
//         description:"",
//         price:'',
//         images:{},
//         category:"house",
//         subcategory:"living",
//         quantity:''
//     })

//   const imagesHandler = (e)=>{
//       setImages((prev)=>({...prev,[e.target.name]:e.target.files[0]}));
//   }




//     const changeHandler = (e)=>{
//       setProductDetails({...productDetails,[e.target.name]:e.target.value})  
//     }

//     const Add_Product = async ()=>{
        
//         console.log(productDetails);
//         let responseData=[''];
//         let product = productDetails;

//         let formData = new FormData();
//         formData.append('product',images.image0);
//         formData.append('product',images.image1);
//         formData.append('product',images.image2);
//         formData.append('product',images.image3);
        
    
//         await fetch('http://localhost:8080/upload',{
//           method:'POST',
//           headers:{
//             Accept:'application/json',
//           },
//         body:formData,
//         }).then((resp)=> resp.json()).then((data)=>{responseData=data})
//         console.log(formData,"formdata")
//         if(responseData.success)
//         {
  
//           // product.image = responseData.image_url;
//           product.images = responseData.image_urls;
//           console.log(product,"product saved data ",responseData.image_urls,responseData)
      
//           // console.log(product);
//           await fetch('http://localhost:8080/api/addproduct',{
//           method:'POST',
//           headers:{
//             Accept:'application/json',
//             'Content-Type':'application/json',
//           },
//           body:JSON.stringify(product),
//         }).then((resp)=>resp.json())
//           .then((data)=>{
//           data.success?alert("Product Added"):alert("Failed")
//         })
//       }
//     }

    

//   return (
//     <div className="add-product">
//       <div className="addproduct-itemfield">
//         <p>Product Title:</p>

//         <input value={productDetails.title} onChange={changeHandler} type="text" name="title" placeholder="Type Product title" />
//         <p>Product Description:</p>
//         <input value={productDetails.description} onChange={changeHandler}type="text" name="description" placeholder="Type Product description" />
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Price:</p>
//         <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder="Type here" />
//         <p>Quantity:</p>
//         <input value={productDetails.quantity} onChange={changeHandler} type="text" name="quantity" placeholder="Type here" />
//         <p>Tags:</p>
//         <input value={productDetails.tags} onChange={changeHandler} type="textarea" name="tags" placeholder="Type here tags" />
//       </div>
//       <div className="addproduct-itemfield">
//          <p>Product Category:</p>
//          <select value={productDetails.category} onChange={changeHandler} name="category" id="add-product-selector">
//             <option value="house">House</option>
//             <option value="office">Office</option>
//         </select>
//         {console.log(productDetails.category,"product category")}
//         <p>Product SubCategory:</p>
//          {
//           productDetails.category==="house"?
//          <select value={productDetails.subcategory} onChange={changeHandler}name="subcategory" id="add-product-selector">
//             <option value="living">living</option>
//             <option value="kitchen">kitchen</option>
//             <option value="bedroom">bedroom</option>
//             <option value="bathroom">bathroom</option>
//         </select>
//            :
//         <select value={productDetails.subcategory} onChange={changeHandler}name="subcategory" id="add-product-selector">
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
//           <textarea onChange={changeHandler} value={productDetails.detaildescription} name="detaildescription" id="text-area" cols="100" rows="5"></textarea>
//         </span>
//       </div>
//       <h2>Select Images</h2>
//       <hr />
//       <div className="addproduct-itemfield">

//         <label htmlFor="file-input">
//             <img src={images.image0?URL.createObjectURL(images.image0):imageselect} alt="input img" className="input-image"/>   
//         </label>
//         <input onChange= {imagesHandler} type="file" name="image0" id="file-input" hidden/>
//         <label htmlFor="file-input1">
//             <img src={images.image1?URL.createObjectURL(images.image1):imageselect} alt="input img1" className="input-image"/>   
    
//        </label>
//         <input onChange= {imagesHandler} type="file" name="image1" id="file-input1" hidden/>
//         <label htmlFor="file-input2">
//             <img src={images.image2?URL.createObjectURL(images.image2):imageselect} alt="input img2" className="input-image"/>   
//         </label>
//         <input onChange= {imagesHandler} type="file" name="image2" id="file-input2" hidden/>
//         <label htmlFor="file-input3">
//             <img src={images.image3?URL.createObjectURL(images.image3):imageselect} alt="input img3" className="input-image"/>   
//         </label>
//         <input onChange= {imagesHandler} type="file" name="image3" id="file-input3" hidden/>
//       </div>
//       <button onClick={()=>{Add_Product()}}className="addproduct-btn">ADD</button>

//     </div>
//   )
// }
// export default Addproduct;





// import { useState } from "react";
// import "./Addproduct.css";
// import imageselect from "../../assets/imageselector.jpg";

// function Addproduct() {
//   // Store the selected image files by key (e.g., "image0", "image1", etc.)
//   const [images, setImages] = useState({});

//   // Store product details. We keep images as an empty array initially.
//   const [productDetails, setProductDetails] = useState({
//     title: "",
//     description: "",
//     price: "",
//     images: [], // This will be set to an array of image objects returned from the backend.
//     category: "house",
//     subcategory: "living",
//     quantity: "",
//     detaildescription: "",
//     tags: ""
//   });

//   // When the file input changes, update the images state.
//   // (We're storing the file objects directly – you could add previews if desired.)
//   const imagesHandler = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setImages((prev) => ({ ...prev, [e.target.name]: file }));
//     }
//   };

//   // Handler for text, textarea, and select inputs.
//   const changeHandler = (e) => {
//     setProductDetails({ ...productDetails, [e.target.name]: e.target.value });
//   };

//   // Function to add the product.
//   // This function will upload any selected images, then add the returned image data (an array of image objects)
//   // to the product details before sending the complete product JSON to the API.
//   const Add_Product = async () => {
//     console.log("Product Details (before image upload):", productDetails);

//     // Build FormData and append each available image file.
//     const formData = new FormData();
//     let hasImage = false;
//     if (images.image0) {
//       formData.append("product", images.image0);
//       hasImage = true;
//     }
//     if (images.image1) {
//       formData.append("product", images.image1);
//       hasImage = true;
//     }
//     if (images.image2) {
//       formData.append("product", images.image2);
//       hasImage = true;
//     }
//     if (images.image3) {
//       formData.append("product", images.image3);
//       hasImage = true;
//     }

//     // Check if at least one image file was appended.
//     if (!hasImage) {
//       alert("FormData missing: No images were selected for upload.");
//       return;
//     }

//     try {
//       // Upload images to the backend.
//       const uploadResp = await fetch("http://localhost:8080/upload", {
//         method: "POST",
//         headers: {
//           Accept: "application/json"
//           // Do not set Content-Type manually; the browser will add the multipart boundary.
//         },
//         body: formData,
//       });
//       const uploadData = await uploadResp.json();
//       console.log("Upload response:", uploadData);

//       if (uploadData.success) {
//         // Assign the returned array of image objects
//         // (with keys image_url and image_name) to the product details.
//         const updatedProduct = { ...productDetails, images: uploadData.image_urls };
//         console.log("Final Product Data:", updatedProduct);

//         // Save the complete product details to your product API endpoint.
//         const productResp = await fetch("http://localhost:8080/api/addproduct", {
//           method: "POST",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json"
//           },
//           body: JSON.stringify(updatedProduct),
//         });
//         const productData = await productResp.json();
//         console.log("Product creation response:", productData);
//         productData.success ? alert("Product Added") : alert("Failed to add product");
//       } else {
//         alert("Image upload failed.");
//       }
//     } catch (error) {
//       console.error("Error creating product:", error);
//       alert("Error occurred while adding product.");
//     }
//   };

//   return (
//     <div className="add-product">
//       <div className="addproduct-itemfield">
//         <p>Product Title:</p>
//         <input
//           value={productDetails.title}
//           onChange={changeHandler}
//           type="text"
//           name="title"
//           placeholder="Type Product title"
//         />
//         <p>Product Description:</p>
//         <input
//           value={productDetails.description}
//           onChange={changeHandler}
//           type="text"
//           name="description"
//           placeholder="Type Product description"
//         />
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Price:</p>
//         <input
//           value={productDetails.price}
//           onChange={changeHandler}
//           type="text"
//           name="price"
//           placeholder="Type here"
//         />
//         <p>Quantity:</p>
//         <input
//           value={productDetails.quantity}
//           onChange={changeHandler}
//           type="text"
//           name="quantity"
//           placeholder="Type here"
//         />
//         <p>Tags:</p>
//         <input
//           value={productDetails.tags}
//           onChange={changeHandler}
//           type="textarea"
//           name="tags"
//           placeholder="Type here tags"
//         />
//       </div>
//       <div className="addproduct-itemfield">
//         <p>Product Category:</p>
//         <select
//           value={productDetails.category}
//           onChange={changeHandler}
//           name="category"
//           id="add-product-selector"
//         >
//           <option value="house">House</option>
//           <option value="office">Office</option>
//         </select>
//         {console.log(productDetails.category, "product category")}
//         <p>Product SubCategory:</p>
//         {productDetails.category === "house" ? (
//           <select
//             value={productDetails.subcategory}
//             onChange={changeHandler}
//             name="subcategory"
//             id="add-product-selector"
//           >
//             <option value="living">living</option>
//             <option value="kitchen">kitchen</option>
//             <option value="bedroom">bedroom</option>
//             <option value="bathroom">bathroom</option>
//           </select>
//         ) : (
//           <select
//             value={productDetails.subcategory}
//             onChange={changeHandler}
//             name="subcategory"
//             id="add-product-selector"
//           >
//             <option value="conference">conference</option>
//             <option value="security">security</option>
//             <option value="research">research</option>
//             <option value="desk">desk</option>
//             <option value="washroom">washroom</option>
//           </select>
//         )}
//       </div>
//       <div>
//         <span>
//           <p>Detail Description:</p>
//           <textarea
//             onChange={changeHandler}
//             value={productDetails.detaildescription}
//             name="detaildescription"
//             id="text-area"
//             cols="100"
//             rows="5"
//           ></textarea>
//         </span>
//       </div>
//       <h2>Select Images</h2>
//       <hr />
//       <div className="addproduct-itemfield">
//         <label htmlFor="file-input">
//           <img
//             src={
//               images.image0
//                 ? URL.createObjectURL(images.image0)
//                 : imageselect
//             }
//             alt="input img"
//             className="input-image"
//           />
//         </label>
//         <input
//           onChange={imagesHandler}
//           type="file"
//           name="image0"
//           id="file-input"
//           hidden
//         />
//         <label htmlFor="file-input1">
//           <img
//             src={
//               images.image1
//                 ? URL.createObjectURL(images.image1)
//                 : imageselect
//             }
//             alt="input img1"
//             className="input-image"
//           />
//         </label>
//         <input
//           onChange={imagesHandler}
//           type="file"
//           name="image1"
//           id="file-input1"
//           hidden
//         />
//         <label htmlFor="file-input2">
//           <img
//             src={
//               images.image2
//                 ? URL.createObjectURL(images.image2)
//                 : imageselect
//             }
//             alt="input img2"
//             className="input-image"
//           />
//         </label>
//         <input
//           onChange={imagesHandler}
//           type="file"
//           name="image2"
//           id="file-input2"
//           hidden
//         />
//         <label htmlFor="file-input3">
//           <img
//             src={
//               images.image3
//                 ? URL.createObjectURL(images.image3)
//                 : imageselect
//             }
//             alt="input img3"
//             className="input-image"
//           />
//         </label>
//         <input
//           onChange={imagesHandler}
//           type="file"
//           name="image3"
//           id="file-input3"
//           hidden
//         />
//       </div>
//       <button onClick={Add_Product} className="addproduct-btn">
//         ADD
//       </button>
//     </div>
//   );
// }

// export default Addproduct;







import { useState } from "react";
import "./Addproduct.css";
import imageselect from "../../assets/imageselector.jpg";

function Addproduct() {
  const [images, setImages] = useState({});
  const [productDetails, setProductDetails] = useState({
    title: "",
    description: "",
    detaildescription: "",
    features: [],
    benefits: [],
    price: "",
    costPrice: "",
    sellingPrice: "",
    discount: "",
    category: "house",
    subcategory: "living",
    quantity: "",
    tags: "",
    attributes: {},
    images: [],
  });

  const imagesHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({
        ...prev,
        [e.target.name]: file,
      }));
    }
  };

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const arrayFieldHandler = (e, field) => {
    const values = e.target.value.split(",").map((item) => item.trim());
    setProductDetails((prev) => ({
      ...prev,
      [field]: values,
    }));
  };

  const attributeHandler = (e) => {
    const { name, value } = e.target;
    setProductDetails((prev) => ({
      ...prev,
      attributes: {
        ...prev.attributes,
        [name]: value,
      },
    }));
  };

  const Add_Product = async () => {
    console.log("Uploading product...");
    const imageKeys = Object.keys(images);

    const uploadedImages = imageKeys.map((key, index) => ({
      image_url: URL.createObjectURL(images[key]),
      image_name: `Image ${index + 1}`,
    }));

    const finalProduct = {
      ...productDetails,
      images: uploadedImages,
      price: parseFloat(productDetails.price),
      costPrice: parseFloat(productDetails.costPrice || 0),
      sellingPrice: parseFloat(productDetails.sellingPrice || productDetails.price),
      discount: parseFloat(productDetails.discount || 0),
      quantity: parseInt(productDetails.quantity),
    };

    console.log("Final Product JSON:", finalProduct);
  };

  return (
    <div className="add-product">
      <h1>Add Product</h1>
      <div className="addproduct-itemfield">
        <label>
          Product Title:
          <input value={productDetails.title} onChange={changeHandler} type="text" name="title" placeholder="Type Product title" />
        </label>
        <label>
          Product Description:
          <input value={productDetails.description} onChange={changeHandler} type="text" name="description" placeholder="Type Product description" />
        </label>
      </div>

      <div className="addproduct-itemfield">
        <label>
          Price:
          <input value={productDetails.price} onChange={changeHandler} type="text" name="price" placeholder="Type price" />
        </label>
        <label>
          Cost Price:
          <input value={productDetails.costPrice} onChange={changeHandler} type="text" name="costPrice" placeholder="Cost price" />
        </label>
        <label>
          Selling Price:
          <input value={productDetails.sellingPrice} onChange={changeHandler} type="text" name="sellingPrice" placeholder="Selling price" />
        </label>
        <label>
          Discount (%):
          <input value={productDetails.discount} onChange={changeHandler} type="text" name="discount" placeholder="Discount" />
        </label>
        <label>
          Quantity:
          <input value={productDetails.quantity} onChange={changeHandler} type="text" name="quantity" placeholder="Quantity" />
        </label>
        <label>
          Tags:
          <input value={productDetails.tags} onChange={changeHandler} type="text" name="tags" placeholder="Tags (comma separated)" />
        </label>
      </div>

      <div className="addproduct-itemfield">
        <label>
          Product Category:
          <select value={productDetails.category} onChange={changeHandler} name="category">
            <option value="house">House</option>
            <option value="office">Office</option>
          </select>
        </label>
        <label>
          Product SubCategory:
          <select value={productDetails.subcategory} onChange={changeHandler} name="subcategory">
            {productDetails.category === "house" ? (
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
          <textarea onChange={changeHandler} value={productDetails.detaildescription} name="detaildescription" placeholder="Type detailed product description" />
        </label>
      </div>

      <div className="addproduct-itemfield">
        <label>
          Features (comma separated):
          <input type="text" onChange={(e) => arrayFieldHandler(e, "features")} placeholder="Feature1, Feature2" />
        </label>
        <label>
          Benefits (comma separated):
          <input type="text" onChange={(e) => arrayFieldHandler(e, "benefits")} placeholder="Benefit1, Benefit2" />
        </label>
      </div>

      <div className="addproduct-itemfield">
        <label>
          Material:
          <input type="text" onChange={attributeHandler} name="material" placeholder="Material (e.g., Stainless Steel)" />
        </label>
        <label>
          Brand Name:
          <input type="text" onChange={attributeHandler} name="brandName" placeholder="Brand Name" />
        </label>
        <label>
          Model Number:
          <input type="text" onChange={attributeHandler} name="modelNumber" placeholder="Model Number" />
        </label>
      </div>

      <h2>Select Images</h2>
      <hr />
      <div className="addproduct-itemfield">
        {[0, 1, 2, 3].map((index) => (
          <label htmlFor={`file-input${index}`} key={index}>
            <img
              src={images[`image${index}`] ? URL.createObjectURL(images[`image${index}`]) : imageselect}
              alt={`input img${index}`}
              className="input-image"
            />
            <input
              onChange={imagesHandler}
              type="file"
              name={`image${index}`}
              id={`file-input${index}`}
              hidden
            />
          </label>
        ))}
      </div>

      <button onClick={Add_Product} className="addproduct-btn">ADD</button>
    </div>
  );
}

export default Addproduct;