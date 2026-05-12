import {
  FaApple,
  FaInstagram,
  FaLinkedin,
  FaTelegram,
  FaWhatsapp
} from "react-icons/fa";

import { Link } from "react-router-dom";
import { useTheme } from "../../../store/theme";
import { useTranslation } from "react-i18next";

import { navigationConfig } from "@/config/navigation/navigation.config";
import { getFooterNavigation } from "@/config/navigation/navigation.helpers";


export default function Footer() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const gold = "#d4af37";

  const footerItems = getFooterNavigation(navigationConfig);

  return (
    <footer
      className={`
        w-full mt-24 pt-14 pb-8 transition-all duration-300
        ${theme === "dark"
          ? "bg-black text-white"
          : "bg-[#f5f5f7] text-black"}
      `}
    >
      {/* TOP SECTION */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 md:grid-cols-4 gap-14">

        {/* BRAND */}
        <div className="flex flex-col gap-5">
          <FaApple
            size={50}
            style={{
              color: theme === "dark" ? gold : "#333",
              filter: theme === "dark"
                ? "drop-shadow(0 0 10px rgba(212,175,55,0.7))"
                : "none",
              transition: "0.3s"
            }}
          />

          <p className="opacity-70 leading-7 text-sm md:text-base font-light">
            {t("footer.storeDesc")}
          </p>
        </div>

        {/* NAV LINKS (Dynamic) */}
        <div className="flex flex-col gap-3">
          <h3 className="text-lg font-semibold opacity-80 mb-2">
            {t("footer.linksTitle")}
          </h3>

          {footerItems.map(item => (
            <Link
              key={item.id}
              to={item.path}
              className="hover:text-yellow-500 transition text-[15px] opacity-80"
            >
              {t(item.labelKey)}
            </Link>
          ))}
        </div>

        {/* SOCIAL */}
        <div className="flex flex-col gap-6">
          <h3 className="text-lg font-semibold opacity-80">
            {t("footer.socialTitle")}
          </h3>

          <div className="flex gap-6 text-2xl">
            <FaInstagram className="cursor-pointer hover:text-yellow-500 transition" />
            <FaLinkedin className="cursor-pointer hover:text-yellow-500 transition" />
            <FaTelegram className="cursor-pointer hover:text-yellow-500 transition" />
            <FaWhatsapp className="cursor-pointer hover:text-yellow-500 transition" />
          </div>
        </div>

        {/* LOCATION */}
        <div className="flex flex-col gap-4">
          <h3 className="text-lg font-semibold opacity-80">
            {t("footer.locationTitle")}
          </h3>

          <p className="opacity-70 text-sm leading-6">
            {t("footer.locationAddress")}
          </p>

          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3..."
            className="w-full rounded-xl"
            style={{
              height: "120px",
              border: "none",
              filter: theme === "dark"
                ? "brightness(0.8) contrast(1.1)"
                : "none"
            }}
            loading="lazy"
          />
        </div>

      </div>

      {/* SEPARATOR */}
      <div className="w-full mt-12 flex justify-center">
        <div
          className="h-[1px] w-[85%] opacity-40"
          style={{
            background:
              theme === "dark"
                ? "linear-gradient(90deg, transparent, #d4af37, transparent)"
                : "linear-gradient(90deg, transparent, #999, transparent)"
          }}
        />
      </div>

      {/* COPYRIGHT */}
      <div className="text-center mt-8 opacity-60 text-sm">
        © 2026 Apple Store — All Rights Reserved
      </div>

    </footer>
  );
}
