import "./Orderitem.css"
import Cktmbtn from "./../../buttons/cktmbtn"
import {MyTimeline} from "../timeline.jsx"
import { useContext, useEffect, useState } from "react"
import { ShopContext } from "../../../context/shopContext.jsx"

function Orderitem ({id,add,items,total,subTotal,orderDate,expectedDate,status}) {
    

    const {url} = useContext(ShopContext);
    const [x,setx]= useState('')
    const [tems,setItems] = useState([])

    useEffect(()=>{
        if(add){
            setx(add)
            // console.log(x.city)
        }
        if(items){
            setItems(items)
            // console.log(tems,"tems")
        }
    })

    const handleCancelOrder = async () => {
        if (status === "delivered") {
            alert("Order is delivered and cannot be cancelled now");
            return;
        }
        const orderId = id;
        if (!orderId) {
            console.error("Order ID is missing");
            return;
        }
        try {
            const token = localStorage.getItem("auth-token");
            const response = await fetch(`${url}/cancelorder`, {
                method: "PUT",
                headers: { 
                  "Content-Type": "application/json",
                  "auth-token": token
                },
                body: JSON.stringify({ orderId })
            });
            const data = await response.json();
            if (!data.success) {
                throw new Error(data.message);
            }
            alert("Order cancelled successfully");
            console.log("Order cancelled successfully:", data.order);
        } catch (error) {
            console.error("Error cancelling order:", error);
        }
    };

    return (
        <div className="orderitem">
            {tems.map((e, i) => {
                return (
                    <div key={i} className="product-details">
                        <img src={e.image} alt="" className="productimg" />
                        <p id="ordername">{e.title}</p>
                        <p>{e.quantity}</p>
                        <p id="orderadd">{e.description}</p>
                        <h2>Rs{e.price}</h2>
                    </div>
                );
            })}
            <div className="totalamount">
                <p><b>Order date:- </b>{orderDate}</p>
                <p><b>Expected date:- &nbsp;</b>{expectedDate}</p>
                <p><b>Sub Total :- &nbsp;&nbsp;&nbsp;</b>{subTotal}</p>
                <p><b>Shipping Charges:- </b>Free</p>
                <p><b>Total Amount :- </b>{total}</p>
                <p>
                    <b>Address :- </b> {x.houseNO} {x.city} {x.locality} {x.zipCode}
                </p>
            </div>
            <MyTimeline Status={`${status}`} />
            {status !== "cancelled" && (
                <Cktmbtn
                    title={'CANCEL ORDER'}
                    onClick={handleCancelOrder}
                    style={{ width: "150px", margin: "10px 500px" }}
                />
            )}
        </div>
    )
}


export default Orderitem;