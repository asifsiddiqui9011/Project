
import "./Community.css";
import QueryCard from "../../components/CommunityComponents/QueryCard/QueryCard";
import CBanner from "../../components/CommunityComponents/CBanner/CBanner";
import CProductInfo from "../../components/CommunityComponents/CProductInfo/CProductInfo";
import React, { useState } from "react";


const Community = () => {
  
  const [products, setProducts] = useState({});

  const handleSetProduct = (newProduct) => {
    setProducts((prevProducts) => ({...prevProducts, ...newProduct}));
  };

  console.log(products,"pppppppp");
  return (
    <div>
      <CBanner handleSetProduct={handleSetProduct}/> 
      <CProductInfo product = {products}/>
      <CProductInfo products={products}/>
    <h1>Trending Discussions</h1>  
    <QueryCard/>
    <QueryCard/>
    <QueryCard/>  
    <h1>Recent Discssion</h1>
    <QueryCard/>
    <QueryCard/>  
    </div>
  )
}

export default Community
