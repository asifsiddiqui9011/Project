
import { createContext, useEffect } from "react";
import { useState } from "react";
import { VoiceProvider } from "../VoiceContext/VoiceContext";


export const ShopContext = createContext(null);


const getDefaultCart = () => ({});
const getDefaultWishList = () => ({});


 
const ShopContextProvider = (props) => {
    
    const url = "https://ai-gadget.onrender.com/api"
    const [allProducts,setAllProducts] = useState([]);
    const [cartItems, setCartItems] = useState(getDefaultCart());
    const [wishListItems, setWishListItems] = useState(getDefaultWishList());
    const [userData,setUserData] = useState('');
    const addrs = userData.address
 

    useEffect(()=>{
        fetch(`${url}/allproducts`)
        .then((response)=>response.json())
        .then((data)=>setAllProducts(data))

        if(localStorage.getItem('auth-token')){
            fetch(`${url}/getcart`,{
                method:"GET",
                headers:{
                    Accept:'applocation/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                }
            })
            .then((response)=>response.json())
            .then((data)=>setCartItems(data));
        }

        if(localStorage.getItem('auth-token')){
            fetch(`${url}/getwishlist`,{
                method:"GET",
                headers:{
                    Accept:'applocation/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                }
            })
            .then((response)=>response.json())
            .then((data)=>setWishListItems(data));
        }

        if(localStorage.getItem('auth-token')){
            fetch(`${url}/getuserdetails`,{
                method:"GET",
                headers:{
                    Accept:'applocation/form-data',
                    'auth-token':`${localStorage.getItem('auth-token')}`,
                    'Content-Type':'application/json',
                }
            })
            .then((response)=>response.json())
            .then((data)=>setUserData(data));
        }
    },[])




  // Adds an item to the wishlist (stored as a boolean flag)
  const addToWishList = (itemId) => {
    setWishListItems((prev) => ({ ...prev, [itemId]: true }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/addtowishlist`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.error("Error in addToWishList:", error));
    }
  };

  // Removes an item entirely from the wishlist
  const removeFromWishList = (itemId) => {
    setWishListItems((prev) => {
      const newWishList = { ...prev };
      delete newWishList[itemId];
      return newWishList;
    });
    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/removefromwishlist`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          alert("Item successfully removed from wishlist");
        })
        .catch((error) =>
          console.error("Error while removing item from wishlist:", error)
        );
    }
  };

  // ------------------ CART FUNCTIONS ------------------
  

  const addToCart = (itemId) => {
    setCartItems((prev) => {
      if (prev[itemId]) {
        // If the item is already in the cart, remove it
        const newCart = { ...prev };
        delete newCart[itemId];
        return newCart;
      } else {
        // If the item is not in the cart, add it with quantity 1
        return { ...prev, [itemId]: 1 };
      }
    });
  
    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/togglecartitem`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) =>
          console.error("Error while toggling cart item:", error)
        );
    }
  };
  // Increments the quantity of a cart item (or adds it with count 1 if not already present)
  const incrementCartItem = (itemId) => {
    setCartItems((prev) => ({ ...prev, [itemId]: (prev[itemId] || 0) + 1 }));
    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/incrementCartQuantity`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) =>
          console.error("Error while incrementing cart item:", error)
        );
    }
  };

  // Decrements the quantity of a cart item with a minimum of 1.
  // (If the count is 1, the function does nothing.)
  const decrementCartItem = (itemId) => {
    setCartItems((prev) => {
      const currentCount = prev[itemId] || 0;
      if (currentCount > 1) {
        return { ...prev, [itemId]: currentCount - 1 };
      }
      // Optionally, you can inform the user that the minimum has been reached
      return prev;
    });
    if (localStorage.getItem("auth-token")) {
      // Note: This endpoint should correspond to the decrement functionality
      fetch(`${url}/decrementCartQuantity`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) =>
          console.error("Error while decrementing cart item:", error)
        );
    }
  };

  // Removes an item entirely from the cart, regardless of its count
  const removeItemFromCart = (itemId) => {
    setCartItems((prev) => {
      const newCart = { ...prev };
      delete newCart[itemId];
      return newCart;
    });
    if (localStorage.getItem("auth-token")) {
      fetch(`${url}/removefromcart`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "auth-token": localStorage.getItem("auth-token"),
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ itemId }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) =>
          console.error("Error while removing cart item:", error)
        );
    }
  };

  // ------------------ UTILITY FUNCTIONS ------------------

  // Calculates the total cart amount by multiplying the quantity of each item with its price.
  const getTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        // Adjust the match if product id is a string or a number
        let itemInfo = allProducts.find(
          (product) => product.id === Number(item) || product.id === item
        );
        if (itemInfo) {
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount;
  };

  // Computes the total number of items in the cart.
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        totalItems += cartItems[item];
      }
    }
    return totalItems;
  };

  // Returns the total number of items stored in the wishlist.
  // Since wishlist stores true/false, we simply count the keys.
  const getTotalWishListItems = () => {
    let totalItems = 0;
    for (const item in wishListItems) {
      if (wishListItems[item]) {
        totalItems++;
      }
    }
    return totalItems;
  };

    //Order context
    const [order,setOrder] = useState({
        Items:[],
        Address:"",
        Payment:{status:"",mode:""},
        Status:"",
        total:"",
        subTotal:""

    })
    //console.log(order,"shioo")

    const handleOrderItems = ()=>{
        for( const items in cartItems){
            if(cartItems[items]>0)
                {
                let itemInfo = allProducts.find((product)=> product.id ===(items) )
                //console.log(cartItems[items],"cartquanty")
                setOrder((prev)=>({...prev,Items:[...prev.Items,
                    {_id:`${itemInfo._id}`,
                    title:`${itemInfo.title}`,
                    image:`${itemInfo.images[0].image_url}`,
                    quantity:`${cartItems[items]}`,
                    price:`${cartItems[items]*itemInfo.price}`,
                    description:`${itemInfo.description}`,
                    review:false}]}))      
                }
        }setOrder((prev)=>({...prev,total:getTotalCartAmount().toLocaleString('en-IN')}))
        setOrder((prev)=>({...prev,subTotal:getTotalCartAmount().toLocaleString('en-IN')}))
    }

    const handleOrderAddress =(e)=>{
      setOrder((prev)=>({...prev,Address:e}))   
     }
     

    const handleOrderStatus = (event) => {
        const value  = event;
        let updatedOrder = { ...order }; // Create a copy

        if (value === "Cash on Delivery") {
            updatedOrder.Status = "ordered";
            updatedOrder.Payment = { status: "Pending", mode: "Cash on Delivery" };
        } else if (value === "Pay Now") {
            updatedOrder.Status = "ordered";
            updatedOrder.Payment = { paymentId:'',status: "Paid", mode: "Pay Now",method:"Razorpay" };
        }

        setOrder(updatedOrder);
    };
       
       const[component,setComponent] = useState('')

       const componentHandler = (e)=>{
        setComponent(e)
        console.log(component,"component")
       }

       const [shippingAdd,setShippingAdd] = useState()
       const [selected,setSelected]=useState('')
       const handleship = (e)=>{
        setShippingAdd(e)
        setSelected(`${e._id}`)
      
      }


   const contextValue = {setOrder,decrementCartItem,removeItemFromCart,incrementCartItem,addrs,url,order,component,shippingAdd,handleship,selected,componentHandler,handleOrderStatus,handleOrderAddress,handleOrderItems,getTotalWishListItems,getTotalCartItems,getTotalCartAmount,userData,allProducts,cartItems,wishListItems,addToCart,addToWishList,removeFromWishList};
    
    return (
        <ShopContext.Provider value={contextValue}>
            {/* <VoiceProvider> */}
            {props.children}
            {/* </VoiceProvider> */}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;