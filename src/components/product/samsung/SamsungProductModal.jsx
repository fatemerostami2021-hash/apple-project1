import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./SamsungProductModal.css";

const SamsungProductModal = ({ product, isOpen, onClose, isRTL }) => {

  const getLangText = (textObj) => {
    if (!textObj) return "";
    return isRTL ? textObj.fa : textObj.en;
  };

  return (
    <AnimatePresence>
      {isOpen && product && (

        <motion.div
          className="samsung-modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >

          <motion.div
            className="samsung-modal"
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.35 }}
            onClick={(e) => e.stopPropagation()}
          >

            <button
              className="samsung-modal-close"
              onClick={onClose}
            >
              ✕
            </button>

            {/* IMAGE SIDE */}
            <div className="samsung-modal-image-side">

              <div
                className="samsung-modal-glow"
                style={{
                  background: `radial-gradient(circle, ${product.color}55, transparent 70%)`
                }}
              />

              <img
                src={`/images/samsung-pic/${product.heroImage || product.thumbnail}`}
                alt={getLangText(product.name)}
                className="samsung-modal-image"
              />

            </div>

            {/* CONTENT */}
            <div className="samsung-modal-content">

              <span className="samsung-modal-category">
                {isRTL ? product.categoryFa : product.category}
              </span>

              <h2 className="samsung-modal-title">
                {getLangText(product.name)}
              </h2>

              <p className="samsung-modal-description">
                {getLangText(product.shortDesc)}
              </p>

              <div className="samsung-modal-quote">
                “{getLangText(product.motivationalText)}”
              </div>

              {/* PRICE */}
              <div className="samsung-modal-price-box">

                <span className="samsung-modal-price-label">
                  {isRTL ? "قیمت" : "Price"}
                </span>

                <span className="samsung-modal-price">
                  ${product.price}
                </span>

              </div>

              {/* FEATURES */}
              <div className="samsung-modal-features">

                <div className="feature-item">
                  ⚡ {isRTL ? "قدرت پردازش Galaxy AI" : "Galaxy AI Performance"}
                </div>

                <div className="feature-item">
                  🎬 {isRTL ? "تجربه سینمایی" : "Cinematic Experience"}
                </div>

                <div className="feature-item">
                  🔋 {isRTL ? "باتری هوشمند نسل جدید" : "Next‑Gen Smart Battery"}
                </div>

                <div className="feature-item">
                  📱 {isRTL ? "طراحی پریمیوم سامسونگ" : "Premium Samsung Design"}
                </div>

              </div>

              {/* ACTIONS */}
              <div className="samsung-modal-actions">

                <a
                  href={product.detailsLink}
                  className="samsung-modal-btn primary"
                >
                  {getLangText(product.buttonText)}
                </a>

                <button
                  className="samsung-modal-btn secondary"
                  onClick={onClose}
                >
                  {isRTL ? "بستن" : "Close"}
                </button>

              </div>

            </div>

          </motion.div>

        </motion.div>

      )}
    </AnimatePresence>
  );
};

export default SamsungProductModal;
