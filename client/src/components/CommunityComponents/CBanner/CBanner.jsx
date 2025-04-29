import React from 'react';
import './CBanner.css';

const CBanner = () => {
    return (
        <div className="c-banner">
            <input
                type="text"
                className="c-banner__input"
                placeholder="enter your product id or model mnumber"
            />
        </div>
    );
};

export default CBanner;
