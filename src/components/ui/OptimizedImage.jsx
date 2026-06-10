import React, { useState, useEffect } from "react";

const PLACEHOLDER = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%231f2937'/%3E%3Ctext x='50%25' y='50%25' fill='%239ca3af' text-anchor='middle' dominant-baseline='middle' font-size='14'%3E📷 No Image%3C/text%3E%3C/svg%3E";

const OptimizedImage = React.memo(({
  src,
  alt = "",
  className = "",
  width,
  height,
  priority = false,
  fallback,
  style = {},
  onLoad,
  objectFit = "contain",
}) => {
  const fb = fallback || PLACEHOLDER;
  const [imgSrc, setImgSrc] = useState(src || fb);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (src && src !== imgSrc) {
      setImgSrc(src);
      setLoaded(false);
      setError(false);
    }
  }, [src]);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    console.warn(`Failed to load image: ${imgSrc}`);
    setImgSrc(fb);
    setError(true);
    setLoaded(true);
  };

  return (
    <div className={`relative overflow-hidden ${className}`} style={{ width, height, ...style }}>
      {!loaded && (
        <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 dark:from-gray-800 dark:via-gray-700 dark:to-gray-800 animate-pulse">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
        </div>
      )}
      <img
        src={imgSrc}
        alt={alt || "product image"}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "low"}
        decoding="async"
        width={width}
        height={height}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full transition-all duration-500 ${
          objectFit === "cover" ? "object-cover" : "object-contain"
        } ${loaded ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}
        style={{ willChange: "transform, opacity" }}
      />
    </div>
  );
});

OptimizedImage.displayName = "OptimizedImage";

// Add shimmer animation style
if (typeof document !== "undefined") {
  const styleSheet = document.createElement("style");
  styleSheet.textContent = `
    @keyframes shimmer {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(100%); }
    }
    .animate-shimmer {
      animation: shimmer 1.5s infinite;
    }
  `;
  document.head.appendChild(styleSheet);
}

export default OptimizedImage;
