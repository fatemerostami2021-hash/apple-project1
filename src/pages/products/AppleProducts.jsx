import { motion } from "framer-motion";
import { appleProducts as appleProductsData } from "../../data/products";
import QuickViewModal from "../components/QuickViewModal";



const appleProducts = [
  {
    id: "apple1",
    name: {
      fa: "آیفون ۱۷: ارزشی بی‌نظیر برای کاربران عادی",
      en: "iPhone 17: Incredible value for everyday users",
    },
    description: {
      fa: "نسلی تازه از آیفون با عملکرد سریع، طراحی جذاب و تجربه‌ای روان برای استفاده روزمره.",
      en: "A new generation iPhone with fast performance, refined design, and a smooth everyday experience.",
    },
    image: "/images/iphone17-pro.png",
    price: 999,
  },
  {
    id: "apple2",
    name: {
      fa: "آیفون ۱۷ پرو مکس: اوج قدرت و قابلیت",
      en: "iPhone 17 Pro Max: The peak of power and capability",
    },
    description: {
      fa: "پیشرفته‌ترین آیفون برای کاربران حرفه‌ای با نمایشگر بزرگ، دوربین قدرتمند و پردازنده‌ای فوق‌العاده.",
      en: "The most advanced iPhone for pro users, featuring a larger display, powerful cameras, and top-tier performance.",
    },
    image: "/images/iphone17-pro-max.png",
    price: 1399,
  },
  {
    id: "apple3",
    name: {
      fa: "آیفون ۱۷ پرو مکس مشکی",
      en: "iPhone 17 Pro Max Black",
    },
    description: {
      fa: "نسخه‌ای خاص با رنگ مشکی جذاب، طراحی پریمیوم و قدرتی خیره‌کننده.",
      en: "A striking black edition with premium design and outstanding power.",
    },
    image: "/images/iphone-17-pro-max-black.png",
    price: 1449,
  },
  {
    id: "apple4",
    name: {
      fa: "اپل واچ SE 3: بهترین ساعت هوشمند اقتصادی اپل",
      en: "Apple Watch SE 3: The best budget Apple smartwatch",
    },
    description: {
      fa: "انتخابی هوشمند برای پایش سلامتی، فعالیت روزانه و اتصال سریع به اکوسیستم اپل.",
      en: "A smart choice for health tracking, daily activity, and seamless Apple ecosystem integration.",
    },
    image: "/images/apple-watch-ultra.png",
    price: 299,
  },
  {
    id: "apple5",
    name: {
      fa: "مک‌بوک ایر M4: لپ‌تاپی قدرتمند و مقرون‌به‌صرفه",
      en: "MacBook Air M4: Powerful and cost-effective laptop",
    },
    description: {
      fa: "سبک، سریع و ایده‌آل برای کار، تحصیل و تولید محتوا با قدرت تراشه M4.",
      en: "Lightweight, fast, and ideal for work, study, and content creation powered by the M4 chip.",
    },
    image: "/images/mac-pro-m4.png",
    price: 1299,
  },
  {
    id: "apple6",
    name: {
      fa: "آی‌مک ۲۴ اینچ نقره‌ای",
      en: "iMac 24-inch Silver",
    },
    description: {
      fa: "کامپیوتر همه‌کاره اپل با طراحی مینیمال، نمایشگر چشم‌نواز و عملکرد فوق‌العاده.",
      en: "Apple’s all-in-one desktop with a minimalist design, stunning display, and impressive performance.",
    },
    image: "/images/imac-24-silver.png",
    price: 1599,
  },
];

const AppleProducts = ({
  setSelectedProduct,
  getLangText,
  isRTL,
  i18n,
}) => {
  return (
    <section className="relative py-10 md:py-14 bg-gradient-to-b from-white via-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
          className={`text-center mb-8 ${isRTL ? "font-[Vazirmatn]" : ""}`}
        >
          <h2 className="text-2xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {i18n.language === "fa"
              ? "ویترین محصولات اپل"
              : "Apple Products Showcase"}
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-5">
          {appleProducts.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.08 }}
              viewport={{ once: true }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setSelectedProduct(product)}
              className="group relative bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden"
            >
              <div className="flex items-center justify-center h-32 md:h-36 mb-3">
                <img
                  src={product.image}
                  alt={getLangText(product.name)}
                  className="max-h-full max-w-full object-contain transition-transform duration-300 group-hover:scale-105"
                  onError={(e) => {
                    e.target.src = "/images/placeholder.png";
                  }}
                />
              </div>

              <div className={isRTL ? "text-right" : "text-left"}>
                <h3 className="text-sm font-semibold text-gray-900 line-clamp-2">
                  {getLangText(product.name)}
                </h3>

                <p className="mt-2 text-xs text-gray-600 line-clamp-3">
                  {getLangText(product.description)}
                </p>

                <div className="mt-3 flex items-center justify-between">
                  <span className="text-sm font-bold text-gray-900">
                    ${product.price}
                  </span>

                  <span className="text-xs text-blue-600 font-medium">
                    {i18n.language === "fa" ? "مشاهده" : "View"}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
<QuickViewModal
  product={selectedProduct}
  onClose={() => setSelectedProduct(null)}
/>


export default AppleProducts;
