import { useState, useEffect } from "react";
import { getFooter } from "../api/index";

const DEFAULT = {
  email: "fatimarostami963369@gmail.com",
  phone: "+98 917 789 2994",
  location: "Shiraz, Iran",
  locationFa: "شیراز، ایران",
  brandName: "Apple Store",
  tagline: "Premium Tech Experience",
  taglineFa: "تجربه فناوری پریمیوم",
  description: "A premium destination for Apple and Samsung products.",
  descriptionFa: "مرجع تخصصی محصولات اپل و سامسونگ با طراحی مدرن.",
  socialLinks: {
    linkedin:  "https://www.linkedin.com/in/fatemeh-rostami963/",
    instagram: "https://www.instagram.com/fateme.rosttamii",
    telegram:  "https://t.me/fitness_mindset",
    whatsapp:  "https://wa.me/989177892994",
  },
  copyrightText:   "All rights reserved.",
  copyrightTextFa: "تمامی حقوق محفوظ است.",
  designerName:    "Fatemeh Rostami",
  designerNameFa:  "فاطمه رستمی",
};

export function useFooter() {
  const [footer,  setFooter]  = useState(DEFAULT);
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  useEffect(() => {
    let cancelled = false;
    getFooter()
      .then(res => { 
        if (!cancelled) {
          setFooter({ ...DEFAULT, ...res.data }); 
        }
      })
      .catch(err => { 
        if (!cancelled) {
          console.error('❌ خطا در دریافت فوتر:', err.message);
          setError(err.message); 
        }
      })
      .finally(() => { 
        if (!cancelled) setLoading(false); 
      });
    return () => { cancelled = true; };
  }, []);

  return { footer, loading, error };
}
