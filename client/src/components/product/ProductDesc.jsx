// import "./ProductDesc.css";
// import { ShopContext } from "../../context/shopContext";
// import { useParams } from "react-router-dom";
// import { useContext, useEffect, useState } from "react";

// import Cktmbtn from "../buttons/cktmbtn";
// import { FaShoppingCart } from "react-icons/fa";
// import 'primeicons/primeicons.css';
// import RelatedProduct from "./RelatedProduct";

// import product1 from "../Assests/product1.png"
// import product2 from "../Assests/product2.png"
// import product3 from "../Assests/product3.png"
// import Review from "./reviews/Review";

// function ProductDesc(props) {
//     const {allProducts, addToCart,addToWishList} = useContext(ShopContext);
//     const {productId} = useParams();

   
//         const product = allProducts.find((e)=> e.id === (productId));
//         // console.log(product,allProducts)
//         if (!product) {
//             return <div>Loading....................</div>;
//         }

//     const [selectImage,setSelectImage] = useState('')

//     const SelectImageHandler = (e)=>{
//         setSelectImage(e)
//     }
    
//     useEffect(()=>{
//             if(product) {
//                 setSelectImage(product.image || (product.images && product.images.length > 0 ? product.images[0] : product1));
//             }
//         },[product])


//         const imageUrl = product?.images?.[0]?.image_url;
//         console.log(imageUrl);
        
      
//     // console.log(product,'product')
//     const reviews = product.reviews;
//     return (
//         <>
//             <div className="ProductDesc">
//                 <div className="imgreview">
//                     <div className="product_img">
//                         <div className="productimages">
//                             <img 
//                                 src={product?.images?.[0] || product?.image || product1} 
//                                 alt="" 
//                                 id="miniimg" 
//                                 onClick={() => { SelectImageHandler(product?.images?.[0] || product?.image || product1) }} 
//                             />
//                             <img 
//                                 src={product?.images?.[1] || product?.image || product1}  
//                                 alt="" 
//                                 id="miniimg" 
//                                 onClick={() => { SelectImageHandler(product?.images?.[1] || product?.image || product1) }} 
//                             />
//                             <img 
//                                 src={product?.images?.[2] || product?.image || product1} 
//                                 alt="" 
//                                 id="miniimg" 
//                                 onClick={() => { SelectImageHandler(product?.images?.[2] || product?.image || product1) }} 
//                             />
//                             <img 
//                                 src={product?.images?.[3] || product?.image || product1} 
//                                 alt="" 
//                                 id="miniimg" 
//                                 onClick={() => { SelectImageHandler(product?.images?.[3] || product?.image || product1) }}
//                             />
//                         </div>
//                         <img 
//                             src={ imageUrl || selectImage || product?.images?.[0] || product?.image || product1 } 
//                             alt="Proimg" 
//                             id="largeimg" 
//                         /> 
//                     </div>
//                     <div className="ProductReview">
//                         <div>
//                             <h2>Reviews</h2>
//                             <hr />
//                             {reviews && reviews.map((e, i) => {
//                                 return <Review key={i} name={e.user.name} profileImage={e.user.profileImage} review={e.review} rating={e.rating}/>
//                             })}
//                             <Review name={"John Doe"}/>
//                             <Review name={"sky walker"}/>
//                         </div>
//                     </div>
//                 </div>
//                 <div className="productDetails">
//                     <h1>{product.title}</h1>
//                     <p>{product.description}</p>
//                     <div className="productPrice">
//                         <h2>RS. {product.price.toLocaleString('en-IN')}</h2>
//                         <Cktmbtn title="Buy"/>
//                         <Cktmbtn 
//                             onClick={() => { addToWishList(product.id) }} 
//                             title={<i className="pi pi-heart" id="icons" style={{ fontSize: '2rem' }}></i>} 
//                             style={{ width:"45px", height:"40px" }}
//                         />
//                         <Cktmbtn  
//                             onClick={() => { addToCart(product.id) }} 
//                             title={<FaShoppingCart className="carticon"/>} 
//                             style={{ width:"45px", height:"40px" }}
//                         />
//                     </div>
//                     <div className="aboutProduct">
//                         <p>{product.detaildescription}</p>
//                         <ul>
//                             <li>Product Name - {product.title}</li>
//                             <li>Weight - 15Kg</li>
//                             <li>Version - 3.0.2.3</li>
//                             <li>Color - Black</li>
//                             <li>Voice accessible - Yes</li>
//                             <li>Wifi connectivity - Available</li>
//                             <li>Automated - Yes</li>
//                         </ul>
//                     </div>

//                     <h3>Features</h3>
//                     {product?.features?.length ? (
//                         <ul>
//                             {product.features.map((feature, index) => (
//                                 <li key={`feature-${index}`}>{feature}</li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>No features available.</p>
//                     )}

//                     <h3>Benefits</h3>
//                     {product?.benefits?.length ? (
//                         <ul>
//                             {product.benefits.map((benefit, index) => (
//                                 <li key={`benefit-${index}`}>{benefit}</li>
//                             ))}
//                         </ul>
//                     ) : (
//                         <p>No benefits available.</p>
//                     )}

//                     <h3>Attributes</h3>
//                     {product?.attributes && Object.keys(product.attributes).length ? (
//                         <table 
//                             className="attributes-table" 
//                             style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}
//                         >
//                             <thead>
//                                 <tr>
//                                     <th style={{ border: '1px solid black', padding: '5px' }}>Attribute</th>
//                                     <th style={{ border: '1px solid black', padding: '5px' }}>Value</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {Object.entries(product.attributes).map(([key, value], index) => (
//                                     <tr key={`attr-${index}`}>
//                                         <td style={{ border: '1px solid black', padding: '5px' }}>{key}</td>
//                                         <td style={{ border: '1px solid black', padding: '5px' }}>
//                                             {Array.isArray(value) ? value.join(", ") : value.toString()}
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     ) : (
//                         <p>No attributes available.</p>
//                     )}

//                 </div>
//             </div>

//             <h2>Related Products</h2>
//             <hr /><br />
//             <RelatedProduct category={product.category}/>
//         </>
//     )
// }


// export default ProductDesc;




import "./ProductDesc.css";
import { ShopContext } from "../../context/shopContext";
import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

import Cktmbtn from "../buttons/cktmbtn";
import { FaShoppingCart } from "react-icons/fa";
import 'primeicons/primeicons.css';
import RelatedProduct from "./RelatedProduct";
import Loader from "../Loader/Loader";

import product1 from "../Assests/product1.png"
import product2 from "../Assests/product2.png"
import product3 from "../Assests/product3.png"
import Review from "./reviews/Review";

function ProductDesc(props) {
    const {allProducts, addToCart,addToWishList} = useContext(ShopContext);
    const {productId} = useParams();

   
        const product = allProducts.find((e)=> e.id === (productId));
        // console.log(product,allProducts)
        if (!product) {
            return  <Loader/>;
            
        }
    console.log(product, "product")
    const [selectImage,setSelectImage] = useState('')

    const SelectImageHandler = (e)=>{
        setSelectImage(e)
    }
    
    useEffect(()=>{
            if(product) {
                setSelectImage(product?.images?.[0]?.image_url ||product.image || (product.images && product.images.length > 0 ? product.images[0] : product1));
            }
        },[product])


        const imageUrl = product?.images?.[0]?.image_url;
        console.log(imageUrl);
        
      
    // console.log(product,'product')
    const reviews = product.reviews;
    console.log(reviews, "reviews")
    return (
        <>
       
            <div className="ProductDesc">
                <div className="imgreview">
                    <div className="product_img">
                        <div className="productimages">
                            <img 
                                src={product?.images?.[0]?.image_url|| product?.images?.[0] || product?.image || product1} 
                                alt="" 
                                id="miniimg" 
                                onClick={() => { SelectImageHandler(product?.images?.[0]?.image_url ||product?.images?.[0] || product?.image || product1) }} 
                            />
                            <img 
                                src={product?.images?.[1]?.image_url ||product?.images?.[1] || product?.image || product1}  
                                alt="" 
                                id="miniimg" 
                                onClick={() => { SelectImageHandler(product?.images?.[1]?.image_url ||product?.images?.[1] || product?.image || product1) }} 
                            />
                            <img 
                                src={product?.images?.[2]?.image_url|| product?.images?.[2] || product?.image || product1} 
                                alt="" 
                                id="miniimg" 
                                onClick={() => { SelectImageHandler( product?.images?.[2]?.image_url ||product?.images?.[2] || product?.image || product1) }} 
                            />
                            <img 
                                src={product?.images?.[3]?.image_url|| product?.images?.[3] || product?.image || product1} 
                                alt="" 
                                id="miniimg" 
                                onClick={() => { SelectImageHandler(product?.images?.[3]?.image_url ||product?.images?.[3] || product?.image || product1) }}
                            />
                        </div>
                        <img 
                            src={ selectImage || product?.images?.[0] || product?.image || product1 } 
                            alt="Proimg" 
                            id="largeimg" 
                        /> 
                    </div>
                    {/* <div className="ProductReview">
                        <div>
                            <h2>Reviews</h2>
                            <hr />
                            {reviews && reviews.map((e, i) => {
                                return <Review key={i} name={e.user.name} profileImage={e.user.profileImage} review={e.review} rating={e.rating}/>
                            })}
                            <Review name={"John Doe"}/>
                            <Review name={"sky walker"}/> 
                        </div>
                    </div> */}
                </div>
                <div className="productDetails">
                    <h1>{product.title}</h1>
                    <p>{product.description}</p>

                    <div className="productPrice">
                        <h2>RS. {product.price.toLocaleString('en-IN')}</h2>
                        <Cktmbtn title="Buy"/>
                        <Cktmbtn 
                            onClick={() => { addToWishList(product.id) }} 
                            title={<i className="pi pi-heart" id="icons" style={{ fontSize: '2rem' }}></i>} 
                            style={{ width:"45px", height:"40px" }}
                        />
                        <Cktmbtn  
                            onClick={() => { addToCart(product.id) }} 
                            title={<FaShoppingCart className="carticon"/>} 
                            style={{ width:"45px", height:"40px" }}
                        />
                    </div>
                    <div className="aboutProduct">
                        <p>{product.detaildescription}</p>
                    </div>

                    <h3>Features</h3>
                    {product?.features?.length ? (
                        <ul>
                            {product.features.map((feature, index) => (
                                <li key={`feature-${index}`}>{feature}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No features available.</p>
                    )}

                    <h3>Benefits</h3>
                    {product?.benefits?.length ? (
                        <ul>
                            {product.benefits.map((benefit, index) => (
                                <li key={`benefit-${index}`}>{benefit}</li>
                            ))}
                        </ul>
                    ) : (
                        <p>No benefits available.</p>
                    )}

                    <h3>Attributes</h3>
                    {product?.attributes && Object.keys(product.attributes).length ? (
                        <table 
                            className="attributes-table" 
                            style={{ border: '1px solid black', borderCollapse: 'collapse', width: '100%' }}
                        >
                            <thead>
                                <tr>
                                    <th style={{ border: '1px solid black', padding: '5px' }}>Attribute</th>
                                    <th style={{ border: '1px solid black', padding: '5px' }}>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {Object.entries(product.attributes).map(([key, value], index) => (
                                    <tr key={`attr-${index}`}>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>{key}</td>
                                        <td style={{ border: '1px solid black', padding: '5px' }}>
                                            {Array.isArray(value) ? value.join(", ") : value.toString()}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No attributes available.</p>
                    )}

                </div>
            </div>
            <h2>Related Products</h2>
            <hr /><br />
            <RelatedProduct category={product.category}/>
        </>
    )
}


export default ProductDesc;