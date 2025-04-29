import { ShopContext } from "../../context/shopContext";
import { useContext } from "react";
import Empty from "../Emptypage/Empty";
import cartbag from "../Assests/wishbag.png"
import Loader from "../Loader/Loader";

import WishCard from "./WishCard";
import "./WishList.css"


function WishList(){
    const {allProducts,wishListItems,getTotalWishListItems} = useContext(ShopContext)

    if(!allProducts || allProducts.length===0){
        return  <Loader/>
    }
    return(
        <div className="wishlistdiv">
        {getTotalWishListItems()===0?<Empty image={cartbag}  message={"Your Wishlist Is Empty Now!!!..."}/>:""}
           {allProducts.map((e)=> {
                    if(wishListItems[e.id]>0){
                        return <WishCard key={e.id} id={e.id} title={e.title} price={e.price} image={e.images[0].image_url} description={e.description}  />
                    }
                    
                }
            )}
        </div>
    )
}


export default WishList;