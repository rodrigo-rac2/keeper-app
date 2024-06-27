// src/components/Button.jsx
import React from "react";
import PropTypes from "prop-types";
import "./Button.css";

function Button(props) {
  const { onClick, children, className = "" } = props;
  return (
    <button className={`button ${className}`} onClick={onClick}>
      {children}
    </button>
  );
};

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Button;
