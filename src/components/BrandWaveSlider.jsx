import React, { useMemo, useRef } from "react";
import { useTranslation } from "react-i18next";

import { brands } from "../data/brandsData";
import "../styles/brand-wave-slider.css";

const BrandWaveSlider = () => {

  const { i18n, t } = useTranslation();

  const trackRef = useRef(null);

  const isFa = i18n.language.startsWith("fa");

  /* duplicate enough items for seamless loop */
  const loopBrands = useMemo(() => {

    return [
      ...brands,
      ...brands,
      ...brands,
      ...brands,
    ];

  }, []);

  /* restart animation manually */
  const restartSlider = () => {

    if (!trackRef.current) return;

    trackRef.current.style.animation = "none";

    void trackRef.current.offsetWidth;

    trackRef.current.style.animation = "";

  };

  return (

    <section className="brand-wave-section">

      {/* HEADER */}
      <div className="brand-header">

        <h2
          className="brand-title"
          onMouseEnter={restartSlider}
          onClick={restartSlider}
        >
          {t("featuredBrands")}
        </h2>

      </div>

      {/* SLIDER */}
      <div className="brand-slider">

        <div
          ref={trackRef}
          className={`brand-track ${isFa ? "rtl" : "ltr"}`}
        >

          {loopBrands.map((brand, index) => {

            const Icon = brand.icon;

            return (

              <a
                key={`${brand.id}-${index}`}
                href={brand.url}
                target="_blank"
                rel="noopener noreferrer"
                className="brand-item"
                style={{
                  "--brand-color": brand.color
                }}
              >

                {/* ICON */}
                <div className="brand-icon-wrap">

                  <Icon
                    className="brand-logo"
                    style={{
                      color: brand.color
                    }}
                  />

                </div>

                {/* NAME */}
                <span className="brand-name">
                  {isFa
                    ? brand.name_fa
                    : brand.name_en}
                </span>

              </a>

            );

          })}

        </div>

      </div>

      {/* WAVE */}
      <div className="brand-wave-svg">

        <svg
          viewBox="0 0 1440 160"
          preserveAspectRatio="none"
        >

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
