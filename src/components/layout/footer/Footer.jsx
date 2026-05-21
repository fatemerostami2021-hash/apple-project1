import { FaApple, FaInstagram, FaLinkedin, FaTelegram, FaWhatsapp } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useTheme } from "../../../store/theme";
import { useTranslation } from "react-i18next";
import { navigationConfig } from "@/config/navigation/navigation.config";
import { getFooterNavigation } from "@/config/navigation/navigation.helpers";
import AppleAlarmClock from "@/components/ui/AppleAlarmClock";

export default function Footer() {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const gold = "#d4af37";
  const footerItems = getFooterNavigation(navigationConfig);

  return (
    <footer
      className={`
        w-full mt-12 pt-10 pb-6 transition-all duration-300
        ${theme === "dark" ? "bg-black text-white" : "bg-[#f5f5f7] text-black"}
      `}
    >
      {/* TOP SECTION: کاهش گپ و پدینگ برای ارتفاع کمتر */}
      <div className="max-w-7xl mx-auto px-6 md:px-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8 items-start">

        {/* COL 1: BRAND */}
        <div className="flex flex-col gap-3">
          <FaApple size={40} style={{ color: theme === "dark" ? gold : "#333" }} />
          <p className="opacity-70 text-xs leading-6 font-light">{t("footer.storeDesc")}</p>
        </div>

        {/* COL 2: LINKS */}
        <div className="flex flex-col gap-2">
          <h3 className="text-md font-semibold opacity-80">{t("footer.linksTitle")}</h3>
          {footerItems.map(item => (
            <Link key={item.id} to={item.path} className="hover:text-yellow-500 transition text-sm opacity-80">
              {t(item.labelKey)}
            </Link>
          ))}
        </div>

        {/* COL 3: SOCIAL */}
        <div className="flex flex-col gap-3">
          <h3 className="text-md font-semibold opacity-80">{t("footer.socialTitle")}</h3>
          <div className="flex gap-4 text-xl">
            <FaInstagram className="cursor-pointer hover:text-yellow-500" />
            <FaLinkedin className="cursor-pointer hover:text-yellow-500" />
            <FaTelegram className="cursor-pointer hover:text-yellow-500" />
            <FaWhatsapp className="cursor-pointer hover:text-yellow-500" />
          </div>
        </div>

        {/* COL 4: MAP */}
        <div className="flex flex-col gap-2">
          <h3 className="text-md font-semibold opacity-80">{t("footer.locationTitle")}</h3>
          <iframe
            title="map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3..."
            className="w-full rounded-lg h-[100px]"
            style={{ border: "none", filter: theme === "dark" ? "brightness(0.8)" : "none" }}
            loading="lazy"
          />
        </div>

        {/* COL 5: CLOCK (ساعت و کنترل‌ها کنار هم) */}
        <div className="flex flex-col gap-2">
          <h3 className="text-md font-semibold opacity-80">Alarm Clock</h3>
          <AppleAlarmClock />
        </div>

      </div>

      <div className="w-full mt-8 opacity-60 text-center text-xs">© 2026 Apple Store — All Rights Reserved</div>
    </footer>
  );
}
