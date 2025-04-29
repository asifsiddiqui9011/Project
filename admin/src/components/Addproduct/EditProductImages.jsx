// import React, { useState } from "react";
// // import "./EditProductImages.css"; // Create this file for your styling.
// import imageselect from "../../assets/imageselector.jpg";
// import { useContext } from "react"; // Default image if none exists
// import { useParams } from "react-router-dom";
// import { AdminContext } from "../../Context/AdminContext"; // Import your context

// function EditProductImages() {
//   const { allproducts } = useContext(AdminContext);
//   const { productId } = useParams();
//   const product = allproducts.find((e) => e._id === productId);

//   const [productImages, setProductImages] = useState(product?.images || []);
//   const [newFiles, setNewFiles] = useState({
//     0: null,
//     1: null,
//     2: null,
//     3: null,
//   });

//   const handleFileChange = (index, e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setNewFiles((prev) => ({ ...prev, [index]: file }));
//     }
//   };

//   const updateImage = async (index) => {
//     if (!newFiles[index]) {
//       alert(`Please select a new image for Image ${index + 1}.`);
//       return;
//     }

//     const formData = new FormData();
//     formData.append("product", newFiles[index]);

//     const oldImageUrl =
//       productImages[index] && productImages[index].image_url
//         ? productImages[index].image_url
//         : "";
//     formData.append("oldImageUrl", oldImageUrl);

//     try {
//       const response = await fetch("http://localhost:8080/edit-image", {
//         method: "POST",
//         headers: { Accept: "application/json" },
//         body: formData,
//       });
//       const data = await response.json();
//       if (data.success) {
//         alert(`Image ${index + 1} updated successfully.`);
//         const newImgs = [...productImages];
//         newImgs[index] = data.newImage;
//         setProductImages(newImgs);
//         setNewFiles((prev) => ({ ...prev, [index]: null }));
//       } else {
//         alert(`Failed to update Image ${index + 1}.`);
//       }
//     } catch (error) {
//       console.error(`Error updating image ${index + 1}:`, error);
//       alert(`Error updating Image ${index + 1}.`);
//     }
//   };

//   const patchProductImages = async () => {
//     try {
//       const response = await fetch(
//         `http://localhost:8080/api/update-product-images/${product._id}`,
//         {
//           method: "PATCH",
//           headers: {
//             Accept: "application/json",
//             "Content-Type": "application/json",
//           },
//           body: JSON.stringify({ images: productImages }),
//         }
//       );
//       const data = await response.json();
//       if (data.success) {
//         alert("Product images updated successfully in the product record.");
//       } else {
//         alert("Failed to update product images record.");
//       }
//     } catch (error) {
//       console.error("Error updating product images record:", error);
//       alert("Error updating product images record.");
//     }
//   };

//   return (
//     <div className="edit-product-images">
//       <h2>Edit Product Images</h2>
//       <div className="images-container">
//         {[0, 1, 2, 3].map((index) => (
//           <div className="image-slot" key={index}>
//             <p>Image {index + 1}:</p>
//             <label htmlFor={`file-input-${index}`}>
//               <img
//                 src={
//                   newFiles[index]
//                     ? URL.createObjectURL(newFiles[index])
//                     : productImages[index]
//                     ? productImages[index].image_url
//                     : imageselect
//                 }
//                 alt={`Image ${index + 1}`}
//                 className="editable-image"
//               />
//             </label>
//             <input
//               type="file"
//               id={`file-input-${index}`}
//               accept="image/*"
//               style={{ display: "none" }}
//               onChange={(e) => handleFileChange(index, e)}
//             />
//             {newFiles[index] && (
//               <button onClick={() => updateImage(index)}>
//                 Update Image {index + 1}
//               </button>
//             )}
//           </div>
//         ))}
//       </div>
//       <hr />
//       <button onClick={patchProductImages}>Save All Images</button>
//     </div>
//   );
// }

// export default EditProductImages;



import React, { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { AdminContext } from "../../Context/AdminContext";
import imageselect from "../../assets/imageselector.jpg";
import "./Addproduct.css"

function EditProductImages() {
  // Get the product from context and route parameters.
  const { allproducts } = useContext(AdminContext);
  const { productId } = useParams();
  const product = allproducts.find((e) => e._id === productId);

  // Initialize productImages from the current product (or use an empty array).
  const [productImages, setProductImages] = useState(product?.images || []);
  // newFiles holds any newly selected file per image slot (we assume 4 slots).
  const [newFiles, setNewFiles] = useState({
    0: null,
    1: null,
    2: null,
    3: null,
  });

  // Triggered when a file is selected. It updates the newFiles state.
  const handleFileChange = (index, e) => {
    const file = e.target.files[0];
    if (file) {
      setNewFiles((prev) => ({ ...prev, [index]: file }));
    }
  };

  // When the user presses update for a specific image slot, this function sends the new file.
  const updateImage = async (index) => {
    if (!newFiles[index]) {
      alert(`Please select a new image for Image ${index + 1}.`);
      return;
    }

    // Build form data with the new file and the old image URL.
    const formData = new FormData();
    formData.append("product", newFiles[index]);
    const oldImageUrl =
      productImages[index] && productImages[index].image_url
        ? productImages[index].image_url
        : "";
    formData.append("oldImageUrl", oldImageUrl);

    try {
      const response = await fetch("http://localhost:8080/api/edit-image", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        // alert(`Image ${index + 1} updated successfully.`);
        // Replace the updated image in our product images array.
        const newImgs = [...productImages];
        newImgs[index] = data.newImage;
        setProductImages(newImgs);
        // Clear the temporary file for this slot.
        setNewFiles((prev) => ({ ...prev, [index]: null }));
      } else {
        alert(`Failed to update Image ${index + 1}.`);
      }
    } catch (error) {
      console.error(`Error updating image ${index + 1}:`, error);
      alert(`Error updating Image ${index + 1}.`);
    }
  };

  // PATCH the updated images array into the product record.
  const patchProductImages = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/update-product-images/${product._id}`,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ images: productImages }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Product images updated successfully in the product record.");
      } else {
        alert("Failed to update product images record.");
      }
    } catch (error) {
      console.error("Error updating product images record:", error);
      alert("Error updating product images record.");
    }
  };

  return (
    <div className="edit-product-images">
      <h2>Edit Product Images</h2>
      <div className="images-container">
        {[0, 1, 2, 3].map((index) => (
          <div className="image-slot" key={index}>
            <p>Image {index + 1}:</p>
            <label htmlFor={`file-input-${index}`}>
              <img
                src={
                  newFiles[index]
                    ? URL.createObjectURL(newFiles[index])
                    : productImages[index]
                    ? productImages[index].image_url
                    : imageselect
                }
                alt={`Image ${index + 1}`}
                className="editable-image"
              />
            </label>
            <input
              type="file"
              id={`file-input-${index}`}
              accept="image/*"
              style={{ display: "none" }}
              onChange={(e) => handleFileChange(index, e)}
            />
            {newFiles[index] && (
              <button onClick={() => updateImage(index)}>
                Update Image {index + 1}
              </button>
            )}
          </div>
        ))}
      </div>
      <hr />
      <button onClick={patchProductImages}>Save All Images</button>
    </div>
  );
}

export default EditProductImages;