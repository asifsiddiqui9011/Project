import React from 'react';
import './UnderConstruction.css'; // Ensure this file is in the same folder (or adjust path accordingly)
import underConstructionImage from '../../assets/community banner.png'; // Replace with your image path
const UnderConstruction = () => {
  return (
    <div className="under-construction-container">
      {/* Image can be replaced with any custom image asset */}
      <img
        src={underConstructionImage}
        alt="Under Construction"
        className="under-construction-image"
      />
      <h1 className="under-construction-header">Under Construction</h1>
      <p className="under-construction-text">
        This page is currently under development. Please check back soon for updates!
      </p>
    </div>
  );
};

export default UnderConstruction;