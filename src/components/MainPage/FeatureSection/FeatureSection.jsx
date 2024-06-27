// src/components/FeatureSection.jsx
import React from "react";
import PropTypes from "prop-types";
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./FeatureSection.css";

function FeatureSection(props) {
  const { title, description, images } = props;

  return (
    <div className="feature-section">
      <h2>{title}</h2>
      <p>{description}</p>
      <div className="carousel-container">
        <Carousel 
          showArrows={true} 
          autoPlay={true} 
          infiniteLoop={true} 
          showThumbs={false}
          className="custom-carousel"
        >
          {images.map((imageSrc, index) => (
            <div key={index}>
              <img
                src={imageSrc}
                alt={`Feature ${index}`}
                className="feature-image"
              />
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
}

FeatureSection.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default FeatureSection;
