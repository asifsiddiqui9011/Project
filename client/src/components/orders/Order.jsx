// import "./Order.css"
// import Orderitem from "./orderitem/Orderitem"
// import { ShopContext } from "../../context/shopContext"
// import { useContext, useEffect, useState} from "react"

// const Order = () => {
//   const {userData} = useContext(ShopContext)
//   const [order,setOrder] = useState()
//   useEffect(()=>{
//     if(userData.Order){
//       setOrder(userData.Order)
//     }
//   },[userData.Order])

//   return (
//     <div className="order-div">
//         <h1>Track Your Orders</h1>
//         <hr />
//         <div className="order-desc">
//           <p>picture</p>
//           <p id="ordername">Name</p>
//           <p>Quantity</p>
//           <p id="orderadd">Description</p>
//           <p>Price</p>
//         </div>
//         {order &&(
//           order.map((e,i)=>{
          
//             return (
//             <div key={i} >
//                  <Orderitem key={i} add={e.Address} items={e.Items} total={e.total} subTotal={e.subTotal} orderDate={e.orderDate} expectedDate={e.expectedDate} status={e.Status}/>
//               </div> )
//           })
//         )}

//     </div>
//   )
// }

// export default Order


import "./Order.css";
import Orderitem from "./orderitem/Orderitem";
import { ShopContext } from "../../context/shopContext";
import { useContext, useEffect, useState } from "react";
import { MdOutlineKeyboardArrowDown } from "react-icons/md";


const Order = () => {
  const { userData } = useContext(ShopContext);
  const [order, setOrder] = useState([]);
  const [showOrders, setShowOrders] = useState(false);

  useEffect(() => {
    if (userData.Order) {
      setOrder(userData.Order);
    }
  }, [userData.Order]);

  return (
    <div className="order-div">
           <h2 className="order-header"
              onClick={() => setShowOrders(!showOrders)}
              style={{ cursor: "pointer" }}
            >
              Track Your Orders{" "}
              <span className="down-arrow">{showOrders ? <MdOutlineKeyboardArrowDown style={{rotate:'180deg'}}/>:<MdOutlineKeyboardArrowDown/>}</span>
            </h2>
      
      {showOrders && (
        <>
          <div className="order-desc">
            <p>Picture</p>
            <p id="ordername">Name</p>
            <p>Quantity</p>
            <p id="orderadd">Description</p>
            <p>Price</p>
          </div>
          {order.length > 0 ? (
            order.map((e, i) => (
              <div key={i}>
                <Orderitem
                  id={e._id}
                  key={i}
                  add={e.Address}
                  items={e.Items}
                  total={e.total}
                  subTotal={e.subTotal}
                  orderDate={e.orderDate}
                  expectedDate={e.expectedDate}
                  status={e.Status}
                />
              </div>
            ))
          ) : (
            <p>No orders found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Order;
