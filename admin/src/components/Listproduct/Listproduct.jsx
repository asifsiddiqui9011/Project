// import { useContext, useEffect, useState } from "react";
// import "./Listproduct.css"
// import { Link } from "react-router-dom";
// import { AdminContext } from "../../Context/AdminContext";


// function Listproduct() {

//   const{allproducts,remove_product}= useContext(AdminContext);

//   return (
//     <div className="list-product">
//       <h1>All Product List</h1>
//       <div className="productlist-format">
//         <p id="price">Product</p>
//         <p id="title">Title</p>
//         <p id="price">Price (Rs)</p>
//         <p id="price">Category</p>
//         <p id="price">Subcategory</p>
//         <p id="price">Remove</p>
//       </div>
//       <div className="productlist-allproducts">
//         <hr />
//         {allproducts.map((product,index)=>{
//           console.log(product,"prdt")
//           return(
//             <div key={index} className="productlist-format">
//                 <img src={product.image || product.images[0]} alt="" className="listproduct-image"/>
//                 <p id="title">{product.title}</p>
//                 <p id="price">{product.price}</p>
//                 <p id="price">{product.category}</p>
//                 <p id="price">{product.subcategory}</p>
//                 <button id="remove" onClick={()=>{remove_product(product.id)}}>Remove</button>
//                 <Link to={`/edit/${product._id}`}><button id="remove">Edit</button></Link>
//                 <Link to={`/edit-images/${product._id}`}><button id="remove">EditImages</button></Link>
//             </div>
//           )
//         })}
//       </div>
//     </div>
//   )
// }

// export default Listproduct;




import { useContext } from "react";
import "./Listproduct.css";
import { Link } from "react-router-dom";
import { AdminContext } from "../../Context/AdminContext";

function Listproduct() {
  const { allproducts, remove_product } = useContext(AdminContext);
  console.log(allproducts, "allproducts");

  return (
    <div className="list-product-container">
      <h1 className="product-list-title">All Product List</h1>
      <table className="products-table">
        <thead className="products-table-head">
          <tr className="products-header-row">
            <th className="product-image-header">Product</th>
            <th className="product-title-header">Title</th>
            <th className="product-price-header">Price (Rs)</th>
            <th className="product-category-header">Category</th>
            <th className="product-subcategory-header">Subcategory</th>
            <th className="product-action-header">Actions</th>
          </tr>
        </thead>
        <tbody className="products-table-body">
          {allproducts.map((product, index) => (
            <tr key={index} className="product-row">
              <td className="product-image-cell">
                <img
                  src={product.images[0].image_url }
                  alt={product.title}
                  className="product-image"
                />
              </td>
              <td className="product-title-cell">{product.title}</td>
              <td className="product-price-cell">{product.price}</td>
              <td className="product-category-cell">{product.category}</td>
              <td className="product-subcategory-cell">{product.subcategory}</td>
              <td className="product-action-cell">
                <button 
                  className="product-remove-button" 
                  onClick={() => remove_product(product.id)}
                >
                  Remove
                </button>
                <Link to={`/edit/${product._id}`}>
                  <button className="product-edit-button">Edit</button>
                </Link>
                <Link to={`/edit-images/${product._id}`}>
                  <button className="product-edit-images-button">Edit Images</button>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Listproduct;