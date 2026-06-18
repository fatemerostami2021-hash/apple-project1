import React from 'react';
import { useTranslation } from 'react-i18next';

export default function AirpodsPage() {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "fa";

  return (
    <div className="min-h-screen bg-transparent py-20 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white mb-4">
          🎧 {isRTL ? 'ایرپادز' : 'AirPods'}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 text-lg">
          {isRTL ? 'صفحه ایرپادز در حال ساخت...' : 'AirPods page coming soon...'}
        </p>
        <div className="mt-8 p-8 bg-white/40 dark:bg-black/30 rounded-2xl backdrop-blur-sm border border-white/60 dark:border-white/10">
          <p className="text-sm text-gray-400">
            {isRTL ? 'به زودی با جدیدترین ایرپادز‌ها بازمی‌گردیم' : 'Coming soon with the latest AirPods'}
          </p>
        </div>
      </div>
    </div>
  );
}
