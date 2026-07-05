import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";

import { brands } from "../data/brandsData";
import "../styles/brand-wave-slider.css";

const BrandWaveSlider = () => {
  const { i18n, t } = useTranslation();
  const isFa = i18n.language.startsWith("fa");

  /*
    هر ردیف از کل لیست برندها استفاده می‌کنه (نه نصفش) و چند بار پشت‌سرهم
    تکرار میشه تا عرض ترک همیشه از عرض صفحه بیشتر باشه (حتی رو مانیتور عریض).
    تعداد تکرار باید زوج باشه تا ترفند لوپ -50% درست کار کنه.
  */
  const rowTop = useMemo(() => {
    if (!brands || brands.length === 0) return [];
    return [...brands, ...brands, ...brands, ...brands, ...brands, ...brands];
  }, []);

  const rowBottom = useMemo(() => {
    if (!brands || brands.length === 0) return [];
    const shifted = [...brands.slice(1), brands[0]];
    return [...shifted, ...shifted, ...shifted, ...shifted, ...shifted, ...shifted];
  }, []);

  const renderItem = (brand, index) => {
    const Icon = brand.icon;
    return (
      <a
        key={`${brand.id}-${index}`}
        href={brand.url}
        target="_blank"
        rel="noopener noreferrer"
        className="brand-item"
        style={{ "--brand-color": brand.color }}
      >
        <div className="brand-icon-wrap">
          <Icon className="brand-icon" style={{ color: brand.color }} />
        </div>
        <span className="brand-name">
          {isFa ? brand.name_fa : brand.name_en}
        </span>
      </a>
    );
  };

  return (
    <section className="brand-wave-section">
      <div className="brand-header">
        <h2 className="brand-title">{t("featuredBrands")}</h2>
      </div>

      <div className="brand-slider">
        <div className="brand-row">
          <div className={`brand-track brand-track--row1 ${isFa ? "rtl" : "ltr"}`}>
            {rowTop.map((brand, index) => renderItem(brand, index))}
          </div>
        </div>

        <div className="brand-row">
          <div className={`brand-track brand-track--row2 ${isFa ? "rtl" : "ltr"}`}>
            {rowBottom.map((brand, index) => renderItem(brand, index))}
          </div>
        </div>
      </div>

      <div className="brand-wave-svg">
        <svg viewBox="0 0 1440 160" preserveAspectRatio="none">
          <path
            d="M0,96L80,90.7C160,85,320,75,480,80C640,85,800,107,960,112C1120,117,1280,107,1360,101.3L1440,96L1440,160L0,160Z"
            fill="currentColor"
            opacity="0.06"
          />
        </svg>
      </div>
    </section>
  );
};

export default BrandWaveSlider;