import "./cartitem.css";
import Cktmbtn from "../buttons/cktmbtn";
import { ShopContext } from "../../context/shopContext";
import { useParams } from "react-router-dom";
import { useContext, useState } from "react";


function Cartitem(props){
      const {cartItems,removeItemFromCart,decrementCartItem,incrementCartItem,} = useContext(ShopContext)
    return (
        <div className="cartdiv">
            <div>
                <img src={props.image} className="cartimgdiv" alt="" />
            </div>
            <div className="cartdesc">
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                <div className="cartprice">
                    <Cktmbtn title='Quantity'/>
                   <div className="cart-Quantity-btns">
                        <button
                            onClick={() => {
                                if (cartItems[props.id] > 1)
                                    decrementCartItem(props.id, cartItems[props.id] - 1);
                            }}
                           
                        ></button>
                    
                            <p>{cartItems[props.id]}</p>
                        
                        <button
                            onClick={() =>
                                incrementCartItem(props.id, cartItems[props.id] + 1)
                            }
                        ></button>
                   </div>
                    <Cktmbtn
                        onClick={() => {
                            removeItemFromCart(props.id);
                        }}
                        title="Remove"
                    />
                    <h1>
                        {(props.price * cartItems[props.id]).toLocaleString("en-IN")}
                    </h1>
                </div>
            </div>
        </div>
    );
}

export default Cartitem;