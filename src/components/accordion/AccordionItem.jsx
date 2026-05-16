import { useState } from "react";
import { useTranslation } from "react-i18next";

export default function AccordionItem({ model }) {
  const [open, setOpen] = useState(false);
  const { t } = useTranslation();

  return (
    <div className="bg-white dark:bg-zinc-800 border border-gray-300 dark:border-zinc-700 rounded-2xl overflow-hidden transition">

      <button
        onClick={() => setOpen(!open)}
        className="w-full text-left px-6 py-4 flex justify-between items-center text-gray-900 dark:text-white font-semibold"
      >
        {model}
        <span className="text-xl">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="px-6 pb-6 pt-1 space-y-4 text-gray-700 dark:text-gray-300">

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {t("specs.cpu", "CPU")}
            </h4>
            <p>Apple A‑series chip</p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {t("specs.camera", "Camera")}
            </h4>
            <p>Main camera specs</p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {t("specs.battery", "Battery")}
            </h4>
            <p>Battery performance</p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {t("specs.colors", "Colors")}
            </h4>
            <p>Available colors</p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {t("specs.benchmark", "Benchmarks")}
            </h4>
            <p>Performance benchmark</p>
          </div>

          <div>
            <h4 className="font-bold text-gray-900 dark:text-white">
              {t("specs.review", "Review")}
            </h4>
            <p>Short review summary</p>
          </div>

        </div>
      )}
    </div>
  );
}
