// src/components/FeatureSection.jsx
import React from "react";
import "./FeatureSection.css";

function FeatureSection({ title, description, images }) {
  return (
    <div className="feature-section">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="images-container">
        {images.map((imageSrc, index) => (
          <img
            key={index}
            src={imageSrc}
            alt={`Feature ${index}`}
            className="feature-image"
          />
        ))}
      </div>
    </div>
  );
}

export default FeatureSection;
