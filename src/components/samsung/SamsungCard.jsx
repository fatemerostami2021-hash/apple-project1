import React from "react";
import { motion } from "framer-motion";
import "./SamsungCard.css";

const PLACEHOLDER = "/images/placeholder.png";

const SamsungCard = ({ product, isRTL, onOpen }) => {

  const getLangText = (textObj) => {
    if (!textObj) return "";
    return isRTL ? textObj.fa : textObj.en;
  };

  // مسیر عکس (از دیتابیس میاد)
  let imagePath = product.thumbnail || product.image || PLACEHOLDER;
  
  // اگه مسیر با / شروع نشد، اضافه کن
  if (imagePath && !imagePath.startsWith('/')) {
    imagePath = '/' + imagePath;
  }

  const cardColor = product.color || "#4A90FF";
  const description = getLangText(product.description) || getLangText(product.shortDesc) || "";
  const buttonText = getLangText(product.buttonText) || (isRTL ? "مشاهده محصول" : "View Product");

  const handleImageError = (e) => {
    console.warn(`Failed to load image: ${imagePath}`);
    e.target.src = PLACEHOLDER;
  };

  return (
    <motion.div
      className="samsung-card"
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -10, scale: 1.03 }}
    >
      <div className="samsung-card-top">
        <div
          className="samsung-card-glow"
          style={{ background: `radial-gradient(circle, ${cardColor}55, transparent 70%)` }}
        />
        
        <img
          src={imagePath}
          alt={getLangText(product.name)}
          className="samsung-card-image"
          onError={handleImageError}
          loading="lazy"
        />
      </div>

      <div className="samsung-card-content">
        <span className="samsung-card-category">
          {product.category || (isRTL ? "محصول" : "Product")}
        </span>

        <h3 className="samsung-card-title">
          {getLangText(product.name)}
        </h3>

        <p className="samsung-card-description">
          {description}
        </p>

        <div className="samsung-card-bottom">
          <div className="samsung-card-price-box">
            <span className="samsung-card-price-label">
              {isRTL ? "شروع از" : "Starting at"}
            </span>
            <span className="samsung-card-price">
              ${product.price?.toLocaleString()}
            </span>
          </div>

          <button
            className="samsung-card-btn"
            onClick={() => onOpen(product)}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default SamsungCard;
