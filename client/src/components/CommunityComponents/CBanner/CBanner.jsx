


import React, { useContext, useState } from 'react';
import './CBanner.css';
import bannerImage from '../../../assets/community banner.png';
import { ShopContext } from '../../../context/shopContext';

const CBanner = ({ handleSetProduct = () => {} }) => {
    const { allProducts } = useContext(ShopContext);
    const [searchValue, setSearchValue] = useState("");
    const [foundProduct, setFoundProduct] = useState(null);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setSearchValue(value);

        if (value.trim() === "") {
            setFoundProduct(null);
            handleSetProduct(null);
            return;
        }

        const product = allProducts.find(
            (product) =>
                product.id.toString() === value ||
                product.attributes.modelNumber.toLowerCase() === value.toLowerCase()
        );

        setFoundProduct(product);
        handleSetProduct(product);
    };

    return (
        <div
            className="c-banner"
            style={{
                backgroundImage: `url(${bannerImage})`,
                backgroundSize: 'contain',
                backgroundPosition: 'center'
            }}
        >
            <input
                type="text"
                className="c-banner__input"
                placeholder="enter your product id or model number"
                value={searchValue}
                onChange={handleInputChange}
            />
            {foundProduct && (
                <div className="c-banner__product-details">
                    <h3>{foundProduct.name}</h3>
                    <p>ID: {foundProduct.id}</p>
                    <p>Model: {foundProduct.modelNumber}</p>
                    {/* Additional product details can be rendered here */}
                </div>
            )}
        </div>
    );
};

export default CBanner;
