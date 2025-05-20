import { ShopContext } from "../../context/shopContext";
import { useContext,useState } from "react";
import { Link } from "react-router-dom";



import { FaShoppingCart } from "react-icons/fa";
import "./WishCard.css";
import Cktmbtn from "../buttons/cktmbtn";

function WishCard(props){
    const {removeFromWishList,addToCart} = useContext(ShopContext)
    const [iswishActive, setIsWishActive] = useState(false);
    const [iscartActive, setIsCartActive] = useState(false);
    return(
        <div className="wishcard">
            <Link to={`/product/${props.id}`} style={{textDecoration:"none", textDecorationColor:"none"}}> 
                <div className="wishcardimg">
                <img src={props.image} alt="" />
                </div>
                <div className="description">
                    <h3>{props.title}</h3>
                    <p >{props.description} </p>
                </div>
            </Link>
            <div className="wishcardPrice">
                <h1>Rs.{props.price.toLocaleString('en-IN')}</h1>
                 <div onClick={() => setIsWishActive(!iswishActive)}>
               {iswishActive ? <i onClick={()=>{removeFromWishList(props.id)}} className="pi pi-heart-fill" id='icons' ></i> :<i onClick={()=>{addToWishList(props.id)}} className="pi pi-heart" id='icons' ></i> }
                  </div>
                  <div onClick={() => setIsCartActive(!iscartActive)}>
               {iscartActive ? <i id="icons"><FaShoppingCart className="carticon"/></i> :<i onClick={()=>{addToCart(props.id)}} className="pi pi-shopping-cart" id='icons' ></i>}
                  </div>
            </div>
        </div>
    )
}

export default WishCard;