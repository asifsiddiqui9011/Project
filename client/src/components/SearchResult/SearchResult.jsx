import React, { useContext } from 'react';
import { ShopContext } from '../../context/shopContext';
import { useLocation } from 'react-router-dom';
import './SearchResult.css';
import Cards from '../ScrollDiv/Cards';

function SearchResult() {
    const { allProducts } = useContext(ShopContext);

    const { search } = useLocation();
    const query = new URLSearchParams(search).get('query');
    const filteredProducts = allProducts.filter(product =>
        product.title.toLowerCase().includes(query.toLowerCase())
    );

    return (
        <div className="search-result-container">
            <h1>Search Results</h1>
            <div className="search-result-grid">
                {filteredProducts.length > 0 ? (
                    filteredProducts.map(item => (
                        <Cards 
                            key={item.id}
                            id={item.id}
                            title={item.title}
                            price={item.price}
                            image={item.image || item.images[0]}
                            description={item.description}
                        />
                    ))
                ) : (
                    <p className="search-result-no-match">No product found</p>
                )}
            </div>
            
        </div>
    );
}

export default SearchResult;