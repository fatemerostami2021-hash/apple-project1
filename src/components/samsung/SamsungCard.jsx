import React from "react";
import { motion } from "framer-motion";
import "./SamsungCard.css";

const SamsungCard = ({ product, isRTL, onOpen }) => {

  const getLangText = (textObj) => {
    if (!textObj) return "";
    return isRTL ? textObj.fa : textObj.en;
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
          style={{
            background: `radial-gradient(circle, ${product.color}55, transparent 70%)`
          }}
        />

        <img
          src={`/images/samsung-pic/${product.thumbnail}`}
          alt={getLangText(product.name)}
          className="samsung-card-image"
        />

      </div>

      <div className="samsung-card-content">

        <span className="samsung-card-category">
          {isRTL ? product.categoryFa : product.category}
        </span>

        <h3 className="samsung-card-title">
          {getLangText(product.name)}
        </h3>

        <p className="samsung-card-description">
          {getLangText(product.shortDesc)}
        </p>

        <div className="samsung-card-quote">
          “{getLangText(product.motivationalText)}”
        </div>

        <div className="samsung-card-bottom">

          <div className="samsung-card-price-box">

            <span className="samsung-card-price-label">
              {isRTL ? "شروع از" : "Starting at"}
            </span>

            <span className="samsung-card-price">
              ${product.price}
            </span>

          </div>

          <button
            className="samsung-card-btn"
            onClick={() => onOpen(product)}
          >
            {getLangText(product.buttonText)}
          </button>

        </div>

      </div>

    </motion.div>
  );
};

export default SamsungCard;
