import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { useProducts } from "../hooks/useProducts";
import ProductCard from "../components/product/ProductCard";
import FilterBar from "../components/FilterBar";

const Products = () => {
  const { i18n } = useTranslation();
  const [searchParams] = useSearchParams();
  const brand = searchParams.get("brand");
  const isRTL = i18n.language === "fa";

  const { products, loading, error } = useProducts(brand || undefined);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-10 h-10 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-500">{isRTL ? "خطا در بارگذاری" : "Error loading"}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold mb-8">
        {brand ? `${brand} ${isRTL ? "محصولات" : "Products"}` : isRTL ? "همه محصولات" : "All Products"}
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {products?.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default Products;
