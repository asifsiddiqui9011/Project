// import { useContext } from "react"
// import Cktmbtn from "../buttons/cktmbtn"
// import "./Payment.css"
// import {  Link, } from "react-router-dom"
// import { ShopContext } from "../../context/shopContext"

// const Payment = () => {
//   const{handleOrderStatus,order,} = useContext(ShopContext)

//   const PlaceOrder = async ()=>{
//     // console.log(order,"order")
//     await fetch('http://localhost:8080/orders',{
//       method:'POST',
//       headers:{
//         Accept:'application/json',
//         'auth-token':`${localStorage.getItem('auth-token')}`,
//         'Content-Type':'application/json',
//       },
//       body:JSON.stringify(order),
//     }).then((resp)=>resp.json())
//       .then((data)=>{
//       data.success?alert("Order Placed"):alert("Failed")
//     })

//    }
//   return (
//     <div className='paydiv'>
//       <input type="radio" onClick={handleOrderStatus} ></input>
//       <h2>Cash on Delivery</h2>
//       <h2>Pay using UPI</h2>
//       <h2>Pay Using Net Banking</h2>
//       <h2>Pay using Card</h2>
//       <Link to={"/../../home/UserProfile"}><Cktmbtn onClick={PlaceOrder} title="Place Order"/></Link>
//     </div>
//   )
// }

// export default Payment


// import "./Payment.css";
// import { useContext } from "react"
// import Cktmbtn from "../buttons/cktmbtn"
// import "./Payment.css"
// import {  Link, } from "react-router-dom"
// import { ShopContext } from "../../context/shopContext"
// import { useEffect } from "react";

// const Payment = () => {

//   const{handleOrderStatus,order,getTotalCartAmount} = useContext(ShopContext)
    

  
   


//     const PlaceOrder = async ()=>{
//       // console.log(order,"order")
//       await fetch('http://localhost:8080/orders',{
//         method:'POST',
//         headers:{
//           Accept:'application/json',
//           'auth-token':`${localStorage.getItem('auth-token')}`,
//           'Content-Type':'application/json',
//         },
//         body:JSON.stringify(order),
//       }).then((resp)=>resp.json())
//         .then((data)=>{
//         data.success?alert("Order Placed"):alert("Failed")
//       })
  
//      }
  
//     useEffect(() => {
//       const script = document.createElement("script");
//       script.src = "https://checkout.razorpay.com/v1/checkout.js";
//       script.async = true;
//       document.body.appendChild(script);
//     }, []);
    
   
//     const handlePayment = async () => {
//       const amount = getTotalCartAmount();
//       if (amount) {
//         const response = await fetch(
//           "http://localhost:8080/create-razorpay-order",
//           {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//             },
//             body: JSON.stringify({ amount:amount }),
//           }
//         );
//         const order = await response.json();
      
//       console.log(amount);
//       const options = {
//         key: "rzp_test_IkQ05srWvb4TiT",
//         amount: order.amount,
//         currency: order.currency,
//         name: "Ai-Gadgets",
//         order_id: order.id,
//         handler: function (response) {
//           alert(`Payment ID: ${response.razorpay_payment_id}`);
//         },
//       };
  
//       if (order && order.id) {
//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       } else {
//         alert("Failed to create order. Please try again.");
//       }
//     }
//     };
  
//   return (
//     <div className="paydiv">
//       <input type="radio" onClick={handleOrderStatus}></input>
//       <h2>Cash on Delivery</h2>
//       <h2>Pay using UPI</h2>
//       <h2>Pay Using Net Banking</h2>
//       <h2>Pay using Card</h2>
//       <Cktmbtn onClick={handlePayment} title="Pay with Razorpay" />
//       <Link to={"/../../home/UserProfile"}><Cktmbtn onClick={PlaceOrder} title="Place Order"/></Link>
//     </div>
//   );
// };

// export default Payment; 





// import "./Payment.css";
// import { useContext, useEffect } from "react";
// import Cktmbtn from "../buttons/cktmbtn";
// import { Link } from "react-router-dom";
// import { ShopContext } from "../../context/shopContext";

// const Payment = () => {
//   const { handleOrderStatus, order, getTotalCartAmount, userAddress } = useContext(ShopContext);

//   console.log(order, "order");


//   const PlaceOrder = async () => {
//     await fetch("http://localhost:8080/orders", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "auth-token": `${localStorage.getItem("auth-token")}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(order),
//     })
//       .then((resp) => resp.json())
//       .then((data) => {
//         data.success ? alert("Order Placed") : alert("Failed");
//       });
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "https://checkout.razorpay.com/v1/checkout.js";
//     script.async = true;
//     document.body.appendChild(script);
//   }, []);

//   const handlePayment = async () => {
//     const amount = getTotalCartAmount();
//     if (amount) {
//       const response = await fetch("http://localhost:8080/create-razorpay-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ amount: amount }),
//       });
//       const order = await response.json();

//       const options = {
//         key: "rzp_test_IkQ05srWvb4TiT",
//         amount: order.amount,
//         currency: order.currency,
//         name: "Ai-Gadgets",
//         order_id: order.id,
//         handler: function (response) {
//           alert(`Payment ID: ${response.razorpay_payment_id}`);
//         },
//       };

//       if (order && order.id) {
//         const rzp = new window.Razorpay(options);
//         rzp.open();
//       } else {
//         alert("Failed to create order. Please try again.");
//       }
//     }
//   };

//   return (
//     <div
//       className="payment-container"
//     >
//       <div
//         className="payment-details"
//       >
//         <h2>Shipping Address</h2>
//         <p>{order.Address && order.Address.houseNo}</p>
//         <p>{order.Address && order.Address.locality}</p>
//         <p>{order.Address && order.Address.zipCode}</p>
//         <h3>Total Amount: ₹{getTotalCartAmount()}</h3>
//         {/* <h2>Cash on Delivery  <input type="radio" onClick={handleOrderStatus} /></h2>
//         <h2>Pay Now <input type="radio" onClick={handleOrderStatus} /></h2> */}
//         <h2>Cash on Delivery <input type="radio" name="paymentMethod" value="Cash on Delivery" onClick={handleOrderStatus} /></h2>
//         <h2>Pay Now <input type="radio" name="paymentMethod" value="Pay Now" onClick={handleOrderStatus} /></h2>
//         <Cktmbtn onClick={handlePayment} title="Pay Now" style={{width:"fit-content"}} />
//         <Link to="/home/UserProfile">
//           <Cktmbtn onClick={PlaceOrder} title="Place Order" style={{width:"fit-content"}} />
//         </Link>
//       </div>
//       <div
//         className="order-summary"
//       >
//         <h2>Order Details</h2>
//         {order.Items?.map((item) => (
//           <div key={item.id} className="order-item" style={{ display: "flex", marginBottom: "15px", alignItems: "center" }}>
//             <img
//               src={item.image}
//               alt={item.title}
//               className="order-item-img"
//             />
//             <div>
//               <h3>{item.title}</h3>
//               <p>Quantity: {item.quantity}</p>
//               <p>Price: ₹{item.price}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Payment;





import "./Payment.css";
import { useContext, useEffect, useState } from "react";
import Cktmbtn from "../buttons/cktmbtn";
import { ShopContext } from "../../context/shopContext";
import Loader from "../Loader/Loader";
import { useParams } from "react-router-dom";
import { use } from "react";
import { useNavigate } from "react-router-dom";

const Payment = () => {
  const { setOrder,order, url,getTotalCartAmount,cartItems,allProducts,addrs,handleOrderAddress,handleOrderItems,handleOrderStatus } = useContext(ShopContext);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [selectedAddress, setSelectedAddress] = useState({});
  const { addressId } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    if (addrs && addressId) {
      const Address = addrs.find((add) => add._id === addressId);
      setSelectedAddress(Address);
      handleOrderAddress(Address);
    }
  }, [addrs, addressId]);
  
  // useEffect(() => {
  //   if (allProducts && !order.Items) {  
  //     handleOrderItems();
  //     }
  // }, [allProducts]); 
  // console.log(order,"order")
  
  useEffect(() => {
    if (paymentMethod) {
    handleOrderStatus(paymentMethod);}   
  }, [paymentMethod]);
  
  console.log(order, "order");

  // Helper function to place the order via your backend API
  const PlaceOrder = async () => {
    await fetch(`${url}/orders`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "auth-token": `${localStorage.getItem("auth-token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    })
      .then((resp) => resp.json())
      .then((data) => {
        data.success ? alert("Order Placed") : alert("Failed to place order");
      });
      navigate("/home/UserProfile");
  };

  // Load Razorpay checkout script on mount
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  // Function to initiate Razorpay payment. It returns a promise.
  const handlePayment = async () => {
    const amount = getTotalCartAmount();
    const updatedOrder = {...order}
    if (!amount) {
      alert("Invalid amount");
      throw new Error("Invalid amount");
    }
    try {
      const response = await fetch(`http://localhost:8080/create-razorpay-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount: amount }),
      });
      const orderResponse = await response.json();

      if (orderResponse && orderResponse.id) {
        return new Promise((resolve, reject) => {
          const options = {
            key: "rzp_test_sa8DMo52wpFlUJ",
            amount: orderResponse.amount,
            currency: orderResponse.currency,
            name: "Ai-Gadgets",
            order_id: orderResponse.id,
            handler: function (response) {
              // Payment succeeded
              alert(`Payment successful: ${response.razorpay_payment_id}`); 
              resolve(response);
              updatedOrder.Payment.paymentId = response.razorpay_payment_id;
              setOrder(updatedOrder)
            },
            modal: {
              ondismiss: function () {
                alert("Payment cancelled");
                reject(new Error("Payment cancelled by user"));
              },
            },
          };
          const rzp = new window.Razorpay(options);
          rzp.open();
        });
      } else {
        alert("Failed to create Razorpay order. Please try again.");
        throw new Error("Failed to create Razorpay order");
      }
    } catch (error) {
      alert("Error in payment: " + error.message);
      throw error;
    }
  };

  // Combined handler for the Place Order button.
  // It branches based on the selected payment method.
  const handlePlaceOrderClick = async () => {
    if (paymentMethod === "Cash on Delivery") {
      // Simply place the order with COD
      await PlaceOrder();
    } else if (paymentMethod === "Pay Now") {
      try {
        // Proceed with Razorpay payment flow first.
        await handlePayment();
        // If the payment succeeds, then place the order.
        await PlaceOrder();
       
      } catch (error) {
        // The error is already alerted in handlePayment;
        // no order is placed.
        console.error("Payment error:", error);
      }
    }
  };

  return (
    <div className="payment-container">
      <div className="payment-details">
        <h2>Shipping Address</h2>
        {selectedAddress && (
          <>
            <p>{selectedAddress.houseNo}</p>
            <p>{selectedAddress.locality}</p>
            <p>{selectedAddress.zipCode}</p>
          </>
        )}
        <h3>Total Amount: ₹{getTotalCartAmount()}</h3>
        <h2>
          <label>
            Cash on Delivery{" "}
            <input
              type="radio"
              name="paymentMethod"
              value="Cash on Delivery"
              checked={paymentMethod === "Cash on Delivery"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </label>
        </h2>
        <h2>
          <label>
            Pay Now{" "}
            <input
              type="radio"
              name="paymentMethod"
              value="Pay Now"
              checked={paymentMethod === "Pay Now"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
          </label>
        </h2>
        <Cktmbtn
          onClick={handlePlaceOrderClick}
          title="Place Order"
          style={{ width: "25em" }}
        />
      </div>
      <div className="order-summary">
      
        <h2>Order Details</h2>
        {!allProducts || allProducts.length === 0 &&(
           <Loader />
        )}
        {allProducts?.map((item) => {
          if(cartItems[item.id] > 0){
            return (
              <div
                key={item.id}
                className="order-item"
                style={{ display: "flex", marginBottom: "15px", alignItems: "center" }}
              >
                <img src={item.image} alt={item.title} className="order-item-img" />
                <div>
                  <h3>{item.title}</h3>
                  <p>Quantity: {item.quantity}</p>
                  <p>Price: ₹{item.price}</p>
                </div>
              </div>
            );
          }
        })}
        
      </div>
    </div>
  );
};

export default Payment;