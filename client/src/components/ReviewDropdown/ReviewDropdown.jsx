// import React, { useContext, useState } from "react";
// import { ShopContext } from "../../context/shopContext.jsx";
// import "./ReviewDropdown.css";
// import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// const ReviewDropdown = () => {
//   const { userData } = useContext(ShopContext);
//   const [showDropdown, setShowDropdown] = useState(false);
//   // Object mapping product IDs to whether their review form is open
//   const [openReviewForms, setOpenReviewForms] = useState({});
//   // Object mapping product IDs to their review input values
//   const [reviewData, setReviewData] = useState({});

//   // Extract delivered products from orders in userData
//   const deliveredProducts = [];
//   if (userData.Order) {
//     userData.Order.forEach((order) => {
//       if (order.Status === "delivered") {
//         // Assuming order.Items is an array of products
//         order.Items.forEach((item) => {
//           deliveredProducts.push(item);
//         });
//       }
//     });
//   }

//   const toggleReviewForm = (productId) => {
//     setOpenReviewForms((prev) => ({
//       ...prev,
//       [productId]: !prev[productId],
//     }));
//   };

//   const handleReviewChange = (productId, field, value) => {
//     setReviewData((prev) => ({
//       ...prev,
//       [productId]: {
//         ...prev[productId],
//         [field]: value,
//       },
//     }));
//   };

//   const handleSubmitReview = async (productId) => {
//     const { rating, review } = reviewData[productId] || {};
//     if (!rating || !review) {
//       alert("Please provide both rating and review.");
//       return;
//     }
//     try {
//       // Update the endpoint as needed.
//       const response = await fetch("/api/review", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ rating, review, product: productId }),
//       });
//       const data = await response.json();
//       if (data.success) {
//         alert("Review submitted successfully!");
//         // Close the form after successful submission
//         setOpenReviewForms((prev) => ({ ...prev, [productId]: false }));
//       } else {
//         alert(data.message || "Failed to submit review");
//       }
//     } catch (error) {
//       console.error("Error submitting review:", error);
//       alert("Error submitting review");
//     }
//   };

//   return (
//     <div className="review-dropdown">
//       <h2 onClick={() => setShowDropdown(!showDropdown)} style={{ cursor: "pointer" }}>
//         Review Delivered Products{" "}
//         <span className="down-arrow">{showDropdown ? "▲" : <MdOutlineKeyboardArrowDown style={{padding:'0px',margin:'0px',fontSize:'40px'}}/>}</span>
//       </h2>
//       {showDropdown && (
//         <div className="review-list">
//           {deliveredProducts.length > 0 ? (
//             deliveredProducts.map((product) => (
//               <div key={product._id} className="review-item">
//                 <div className="product-details">
//                   {product.image && (
//                     <img src={product.image} alt={product.name} className="product-image" />
//                   )}
//                   <h3>{product.name}</h3>
//                 </div>
//                 <button onClick={() => toggleReviewForm(product._id)}>
//                   {openReviewForms[product._id] ? "Hide Review Form" : "Write Review"}
//                 </button>
//                 {openReviewForms[product._id] && (
//                   <div className="review-form">
//                     <input
//                       type="number"
//                       placeholder="Rating (1-5)"
//                       min="1"
//                       max="5"
//                       value={reviewData[product._id]?.rating || ""}
//                       onChange={(e) =>
//                         handleReviewChange(product._id, "rating", e.target.value)
//                       }
//                     />
//                     <textarea
//                       placeholder="Write your review here..."
//                       value={reviewData[product._id]?.review || ""}
//                       onChange={(e) =>
//                         handleReviewChange(product._id, "review", e.target.value)
//                       }
//                     ></textarea>
//                     <div className="form-buttons">
//                       <button onClick={() => toggleReviewForm(product._id)}>Cancel</button>
//                       <button onClick={() => handleSubmitReview(product._id)}>
//                         Submit Review
//                       </button>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             ))
//           ) : (
//             <p>No delivered products available for review.</p>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ReviewDropdown;

import React, { useContext, useState } from "react";
import { ShopContext } from "../../context/shopContext.jsx";
import { FaStar } from "react-icons/fa";
import "./ReviewDropdown.css";
import Cktmbtn from "../buttons/cktmbtn.jsx";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";
// StarRating component for displaying clickable stars
const StarRating = ({ rating, onRatingChange }) => {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="star-rating">
      {stars.map((star) => (
        <span
          key={star}
          onClick={() => onRatingChange(star)}
          style={{
            cursor: "pointer",
            color: star <= rating ? "#ffc104" : "#e4e5e9",
            fontSize: "1.5em",
          }}
        >
          <FaStar />
        </span>
      ))}
    </div>
  );
};

const ReviewDropdown = () => {
  const { userData,url } = useContext(ShopContext);
  const [showDropdown, setShowDropdown] = useState(false);
  // Object mapping product IDs to whether their review form is open
  const [openReviewForms, setOpenReviewForms] = useState({});
  // Object mapping product IDs to their review input values (rating and review text)
  const [reviewData, setReviewData] = useState({});

  // Extract delivered products from orders in userData
  const deliveredProducts = [];
  if (userData.Order) {
    userData.Order.forEach((order) => {
      if (order.Status === "delivered") {
        // Assuming order.Items is an array of product objects with _id, image, and name
        order.Items.forEach((item) => {
          if (item.review ===false){
            deliveredProducts.push(item);
          }
          
          console.log(item)
        });
      }
    });
  }

  const toggleReviewForm = (productId) => {
    setOpenReviewForms((prev) => ({
      ...prev,
      [productId]: !prev[productId],
    }));
  };

  const handleReviewChange = (productId, field, value) => {
    setReviewData((prev) => ({
      ...prev,
      [productId]: {
        ...prev[productId],
        [field]: value,
      },
    }));
  };

  const handleSubmitReview = async (productId) => {
    const { rating, review } = reviewData[productId] || {};
    if (!rating || !review) {
      alert("Please provide both a rating and review.");
      return;
    }
    try {
      const response = await fetch(`${url}/review`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
          'auth-token': localStorage.getItem('auth-token')
         },
        body: JSON.stringify({ rating, review, product: productId }),
      });
      const data = await response.json();
      if (data.success) {
        alert("Review submitted successfully!");
        // Close the form after successful submission
        setOpenReviewForms((prev) => ({ ...prev, [productId]: false }));
      } else {
        alert(data.message || "Failed to submit review");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Error submitting review");
    }
  };

  return (
    <div className="review-dropdown">
      <h2
        onClick={() => setShowDropdown(!showDropdown)}
        style={{ cursor: "pointer" }}
      >
        Review Delivered Products{" "}
        <span className="down-arrow">{showDropdown ? <MdOutlineKeyboardArrowDown style={{rotate:'180deg'}}/>:<MdOutlineKeyboardArrowDown/>}</span>
      </h2>
      {showDropdown && (
        <div className="review-list">
          {deliveredProducts.length > 0 ? (
            deliveredProducts.map((product) => (
              <div key={product._id} className="review-item">
                <div className="product-details">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="product-image"
                    />
                  )}
                  <h3>{product.title}</h3>
                  <p>{product.quantity}</p>
                  <Cktmbtn onClick={() => toggleReviewForm(product._id)} title={openReviewForms[product._id]
                    ? "Hide Review Form"
                    : "Write Review"} style={{fontSize:'1rem'}}/>
                </div>
                
                {openReviewForms[product._id] && (
                  <div className="review-form">
                    <StarRating
                      rating={reviewData[product._id]?.rating || 0}
                      onRatingChange={(star) =>
                        handleReviewChange(product._id, "rating", star)
                      }
                    />
                    <textarea
                      placeholder="Write your review here..."
                      value={reviewData[product._id]?.review || ""}
                      onChange={(e) =>
                        handleReviewChange(product._id, "review", e.target.value)
                      }
                    ></textarea>
                    <div className="form-buttons">
                      <Cktmbtn onClick={() => toggleReviewForm(product._id)} title={'Cancel'}/>
                        
                      
                      <Cktmbtn onClick={() => handleSubmitReview(product._id)}  title={'Submit'}/>
                    </div>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p>No delivered products available for review.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ReviewDropdown;

