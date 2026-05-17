import { useState } from "react";
import { useTranslation } from "react-i18next";
import AccordionItem from "../../components/accordion/AccordionItem";
import { useKeenSlider } from "keen-slider/react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet"; // برای سئو عالی
import "keen-slider/keen-slider.min.css";

// Assets
import logo from "../../assets/iphone/iphone-logo.png";
import ip17pm from "../../assets/iphone/iphone-17-pro-max.png";
import ip17p from "../../assets/iphone/iphone-17-pro.png";
import ip17 from "../../assets/iphone/iphone-17.png";
import ip16pm from "../../assets/iphone/iphone-16-pro-max.png";
import ip16p from "../../assets/iphone/iphone-16-pro.png";
import ip16 from "../../assets/iphone/iphone-16.png";
import ip15pm from "../../assets/iphone/iphone-15-pro-max.png";
import ip15p from "../../assets/iphone/iphone-15-pro.png";
import ip15 from "../../assets/iphone/iphone-15.png";
import ip14pm from "../../assets/iphone/iphone-14-pro-max.png";
import ip14p from "../../assets/iphone/iphone-14-pro.png";
import ip14 from "../../assets/iphone/iphone-14.png";
import ip13pm from "../../assets/iphone/iphone-13-pro-max.png";
import ip13p from "../../assets/iphone/iphone-13-pro.png";
import ip13 from "../../assets/iphone/iphone-13.png";
import ip12pm from "../../assets/iphone/iphone-12-pro-max.png";
import ip12p from "../../assets/iphone/iphone-12-pro.png";
import ip12 from "../../assets/iphone/iphone-12.png";
import { Link } from "react-router-dom";


export default function IphonePage() {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === "fa";
  
  const [activeImages, setActiveImages] = useState({});

  const [sliderRef] = useKeenSlider({
    loop: true,
    slides: { perView: 4, spacing: 15 },
    breakpoints: {
      "(max-width:1024px)": { slides: { perView: 3 } },
      "(max-width:768px)": { slides: { perView: 2 } },
    },
  });

  const models = [
 {

  id: 17,
  slug: "iphone-17-pro-max",
  buyLink: "https://www.apple.com/iphone/",
  officialLink: "https://www.apple.com/iphone/",
  name: "iPhone 17 Pro Max",

  img: ip17pm,
  price: "1199",
  rating: 4.9,
  pop: "98%",
  colors: ["#2c2c2c", "#e3e5e3", "#d4af37"],
  gallery: [ip17pm, ip17p, ip17],
  description: {
    fa: "آیفون ۱۷ پرو مکس جدیدترین و پیشرفته‌ترین نسل آیفون است که برای کاربرانی طراحی شده که بهترین‌ها را می‌خواهند. این مدل با پردازنده قدرتمند نسل جدید، سرعتی فوق‌العاده در اجرای برنامه‌ها و بازی‌ها ارائه می‌دهد. صفحه‌نمایش بزرگ و بسیار باکیفیت آن تجربه‌ای چشم‌نواز برای تماشای ویدیو و کارهای روزمره فراهم می‌کند. سیستم دوربین پیشرفته آن امکان ثبت عکس‌ها و ویدیوهای حرفه‌ای را حتی در نور کم فراهم می‌کند. اگر به دنبال قدرتمندترین و مدرن‌ترین آیفون هستید، آیفون ۱۷ پرو مکس یکی از بهترین انتخاب‌هاست.",
    en: "The iPhone 17 Pro Max represents the most advanced generation of Apple smartphones. Built for users who expect the best, it features a powerful next‑generation processor that delivers exceptional performance for apps, gaming, and multitasking. The large high‑quality display offers stunning visuals for videos and everyday use. Its advanced camera system captures professional‑level photos and videos, even in challenging lighting conditions. If you want the most powerful and modern iPhone experience, the iPhone 17 Pro Max is a top choice."
  }
},
{

  id: 16,
 slug: "iphone-16-pro-max",
  buyLink: "https://www.apple.com/iphone/",
  officialLink: "https://www.apple.com/iphone/",
  name: "iPhone 16 Pro Max",

  img: ip16pm,
  price: "1099",
  rating: 4.8,
  pop: "95%",
  colors: ["#1f1f1f", "#8e8e8e", "#00438a"],
  gallery: [ip16pm, ip16p, ip16],
  description: {
    fa: "آیفون ۱۶ پرو مکس ترکیبی از قدرت، طراحی زیبا و فناوری‌های پیشرفته اپل است. این گوشی با پردازنده قدرتمند خود عملکردی سریع و روان در تمام کارها از بازی تا چندوظیفگی ارائه می‌دهد. نمایشگر باکیفیت آن تصاویر را با رنگ‌های زنده و جزئیات بالا نمایش می‌دهد. دوربین حرفه‌ای آن نیز به شما اجازه می‌دهد عکس‌هایی شفاف و طبیعی ثبت کنید. این مدل برای کسانی مناسب است که یک گوشی قدرتمند، مدرن و قابل اعتماد می‌خواهند.",
    en: "The iPhone 16 Pro Max blends power, premium design, and Apple’s advanced technologies. Equipped with a powerful processor, it delivers smooth and responsive performance for gaming, multitasking, and everyday tasks. Its high‑quality display presents vibrant colors and sharp details, making everything look stunning. The professional camera system allows you to capture clear and natural photos in any situation. This model is ideal for users who want a powerful, modern, and reliable smartphone."
  }
},
{

  id: 15,
 slug: "iphone-15-pro-max",
  buyLink: "https://www.apple.com/iphone/",
  officialLink: "https://www.apple.com/iphone/",
  name: "iPhone 15 Pro Max",

  img: ip15pm,
  price: "999",
  rating: 4.7,
  pop: "92%",
  colors: ["#000000", "#7d7d7d", "#2e4053"],
  gallery: [ip15pm, ip15p, ip15],
  description: {
    fa: "آیفون ۱۵ پرو مکس یکی از محبوب‌ترین مدل‌های آیفون است که طراحی سبک‌تر و بدنه مقاوم‌تری دارد. عملکرد سریع و بهینه آن باعث می‌شود اجرای برنامه‌ها و بازی‌ها بسیار روان باشد. دوربین قدرتمند آن امکان ثبت تصاویر با کیفیت بالا و زوم بهتر را فراهم می‌کند. صفحه‌نمایش بزرگ و روشن آن برای تماشای فیلم، بازی و کارهای روزمره بسیار ایده‌آل است. این مدل انتخابی عالی برای کاربرانی است که به دنبال ترکیبی از قدرت، زیبایی و کارایی هستند.",
    en: "The iPhone 15 Pro Max is one of the most popular iPhone models, featuring a lighter design and a more durable body. Its optimized performance ensures smooth operation for apps, games, and daily tasks. The powerful camera system allows you to capture high‑quality photos with improved zoom capabilities. Its large and bright display is perfect for watching movies, gaming, and everyday use. This model is an excellent choice for users seeking a balance of power, design, and efficiency."
  }
},
{

  id: 14,
  slug: "iphone-14-pro-max",
  buyLink: "https://www.apple.com/iphone/",
  officialLink: "https://www.apple.com/iphone/",
  name: "iPhone 14 Pro Max",

  img: ip14pm,
  price: "899",
  rating: 4.7,
  pop: "88%",
  colors: ["#3b3b3b", "#f5f5f7", "#594f63"],
  gallery: [ip14pm, ip14p, ip14],
  description: {
    fa: "آیفون ۱۴ پرو مکس با طراحی مدرن و ویژگی‌های نوآورانه یکی از مدل‌های پرطرفدار اپل محسوب می‌شود. صفحه‌نمایش باکیفیت آن تجربه‌ای روان و جذاب در استفاده روزمره فراهم می‌کند. دوربین پیشرفته این گوشی تصاویر بسیار واضح و حرفه‌ای ثبت می‌کند. عملکرد سریع پردازنده آن نیز باعث می‌شود کار با برنامه‌ها و بازی‌ها بدون تأخیر انجام شود. این گوشی انتخابی مناسب برای کسانی است که یک آیفون قدرتمند و قابل اعتماد می‌خواهند.",
    en: "The iPhone 14 Pro Max stands out with its modern design and innovative Apple features. Its high‑quality display delivers a smooth and enjoyable experience for everyday use. The advanced camera system captures extremely clear and professional photos. With a fast and efficient processor, apps and games run smoothly without delays. This device is a great option for users looking for a powerful and dependable iPhone."
  }
},
{

  id: 13,
slug: "iphone-13-pro-max",
  buyLink: "https://www.apple.com/iphone/",
  officialLink: "https://www.apple.com/iphone/",
  name: "iPhone 13 Pro Max",

  img: ip13pm,
  price: "799",
  rating: 4.6,
  pop: "85%",
  colors: ["#272d33", "#f2f2f2", "#4b5e48"],
  gallery: [ip13pm, ip13p, ip13],
  description: {
    fa: "آیفون ۱۳ پرو مکس به خاطر باتری قدرتمند و عملکرد پایدار خود بسیار محبوب شده است. این گوشی با پردازنده قدرتمند اپل عملکردی سریع و بدون لگ ارائه می‌دهد. دوربین سه‌گانه آن امکان ثبت تصاویر با جزئیات بالا و ویدیوهای سینمایی را فراهم می‌کند. نمایشگر روان آن تجربه‌ای بسیار لذت‌بخش در اسکرول کردن و بازی ایجاد می‌کند. اگر به دنبال آیفونی با عملکرد عالی و دوام باتری بالا هستید، این مدل انتخابی بسیار مناسب است.",
    en: "The iPhone 13 Pro Max became extremely popular thanks to its long‑lasting battery and stable performance. Powered by Apple’s advanced processor, it delivers fast and smooth operation without lag. The triple‑camera system captures highly detailed photos and cinematic‑quality videos. Its smooth display makes scrolling, gaming, and everyday use incredibly enjoyable. If you want an iPhone with excellent performance and impressive battery life, this model is a great option."
  }
},
{

  id: 12,
slug: "iphone-12-pro-max",
  buyLink: "https://www.apple.com/iphone/",
  officialLink: "https://www.apple.com/iphone/",
  name: "iPhone 12 Pro Max",

  img: ip12pm,
  price: "699",
  rating: 4.5,
  pop: "80%",
  colors: ["#1d2327", "#f5f5f7", "#215e7c"],
  gallery: [ip12pm, ip12p, ip12],
  description: {
    fa: "آیفون ۱۲ پرو مکس آغازگر طراحی مدرن آیفون با لبه‌های تخت و ظاهر جذاب بود. این مدل با پردازنده قدرتمند خود هنوز هم عملکردی سریع و قابل اعتماد ارائه می‌دهد. صفحه‌نمایش OLED آن تصاویر را با کیفیت بالا و رنگ‌های دقیق نمایش می‌دهد. دوربین آن نیز برای عکاسی روزمره و ثبت لحظات با کیفیت بسیار مناسب است. این گوشی گزینه‌ای عالی برای کسانی است که می‌خواهند با هزینه کمتر وارد دنیای آیفون شوند.",
    en: "The iPhone 12 Pro Max introduced Apple’s modern flat‑edge design and remains a stylish and capable smartphone. Its powerful processor still delivers fast and reliable performance for everyday tasks. The OLED display produces vibrant colors and sharp visuals for videos and apps. Its camera system is great for capturing everyday moments with impressive quality. This model is an excellent choice for users who want to enter the iPhone ecosystem at a more affordable price."
  }
}
];

  const handleGalleryClick = (modelName, img) => {
    setActiveImages(prev => ({ ...prev, [modelName]: img }));
  };

  return (
    <main className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${isRtl ? 'font-vazir' : 'font-sans'}`}>
      <Helmet>
        <title>iPhone Evolution | Apple World</title>
        <meta name="description" content="بررسی و مقایسه نسل‌های مختلف آیفون از سری ۱۲ تا ۱۷ پرو مکس با جدیدترین تکنولوژی‌های اپل" />
        <meta name="keywords" content="iPhone 17 Pro Max, iPhone 16, Apple, iOS, آیفون ۱۷، مقایسه آیفون، گوشی هوشمند" />
      </Helmet>

      {/* HERO SECTION - Cinematic Side-by-Side */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center px-6 overflow-hidden">
        <div className="max-w-[1300px] w-full flex flex-col md:flex-row items-center justify-center gap-12 lg:gap-24">
          
          {/* LOGO - Much Larger & Floating */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1, type: "spring" }}
            whileHover={{ scale: 1.1, rotate: 5 }}
            className="flex-shrink-0"
          >
            <img 
              src={logo} 
              alt="Apple Brand Logo" 
              className="w-32 md:w-48 lg:w-64 drop-shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:invert"
            />
          </motion.div>

          {/* TEXT - High Visibility & Animated */}
          <div className={`text-center md:text-left ${isRtl ? 'md:text-right' : 'md:text-left'}`}>
           <motion.h1
  initial={{ opacity: 0, x: isRtl ? 50 : -50 }}
  animate={{ opacity: 1, x: 0 }}
  transition={{ delay: 0.3, duration: 0.8 }}
  className="text-6xl md:text-8xl font-black tracking-tighter uppercase mb-4 bg-clip-text text-transparent bg-gradient-to-b from-black to-gray-400 dark:from-white dark:to-gray-600"
>
  {t("iphonePage.hero.title1")} <br />
  <span className="text-blue-600 hover:text-blue-500 transition-colors duration-300">
    {t("iphonePage.hero.title2")}
  </span>
</motion.h1>

<motion.p
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.6 }}
  className="max-w-xl text-lg md:text-xl font-medium opacity-80 leading-relaxed"
>
  {t("iphonePage.hero.subtitle")}
</motion.p>

          </div>
        </div>
      </section>

      {/* PRODUCTS LOOP */}
     <section id="models" className="max-w-[1400px] mx-auto px-6 py-20 space-y-40">

        {models.map((m) => {
          const activeImage = activeImages[m.name] || m.img;
          return (
            <article key={m.name} className="grid lg:grid-cols-12 gap-12 items-start border-b pb-28 border-gray-200 dark:border-gray-800">
              
              {/* LEFT SIDE - Media */}
              <div className="lg:col-span-5 sticky top-24">
                <div className="relative group">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={activeImage}
                      src={activeImage}
                      alt={m.name}
                      initial={{ opacity: 0, scale: 0.9, y: 20 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ scale: 1.02 }}
                      className="w-[85%] mx-auto drop-shadow-[0_30px_60px_rgba(0,0,0,0.15)] transition-all duration-700"
                    />
                  </AnimatePresence>
                  
             <Link
  to={`/iphone/compare?model=${encodeURIComponent(m.slug)}`}
  className="absolute -top-4 -right-4 bg-blue-600 text-white p-4 rounded-2xl shadow-xl text-xs font-bold rotate-12 hover:rotate-0 transition-transform"
>
  + {t("iphonePage.compare")}
</Link>

                </div>

                {/* DYNAMIC GALLERY */}
                <div className="flex justify-center gap-4 mt-12">
                  {m.gallery.map((img, index) => (
                    <motion.img
                      key={index}
                      src={img}
                      whileHover={{ y: -5 }}
                      alt={`${m.name} view ${index}`}
                      onClick={() => handleGalleryClick(m.name, img)}
                      className={`w-20 h-20 p-2 border-2 rounded-2xl cursor-pointer transition-all ${
                        activeImage === img ? "border-blue-500 bg-blue-50/50 scale-110 shadow-lg" : "border-transparent opacity-50 grayscale hover:grayscale-0"
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* RIGHT SIDE - Content */}
              <div className="lg:col-span-7 space-y-10">
                <div className={isRtl ? 'text-right' : 'text-left'}>
                <h2 className="text-5xl font-black mb-6 flex items-center gap-4">
  <Link to={`/iphone/${m.slug}`} className="hover:text-blue-600 transition-colors">
    {m.name}
  </Link>

  <span className="text-sm bg-green-100 text-green-700 px-3 py-1 rounded-full">
    {t("iphonePage.newGen")}
  </span>
</h2>

                  
<div className={`flex flex-wrap gap-4 mb-6 ${isRtl ? "justify-end" : "justify-start"}`}>

<a
  href={m.buyLink}
  target="_blank"
  rel="noopener noreferrer"
  className="px-6 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-500 transition-colors"
>
  {isRtl ? "خرید" : "Buy Now"}
</a>

<Link
  to={`/blog/${m.slug}`}
  className="
    inline-flex items-center justify-center
    px-6 py-3 rounded-full
    font-extrabold tracking-wide
    text-sm md:text-base
    text-black dark:text-black
    bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500
    border border-yellow-300/80
    shadow-md shadow-yellow-500/20
    transition-all duration-300 ease-in-out
    hover:scale-105 hover:shadow-xl hover:shadow-yellow-500/30
    hover:from-yellow-300 hover:via-amber-300 hover:to-yellow-400
    active:scale-95
    focus:outline-none focus:ring-2 focus:ring-yellow-400/60
  "
>
  {t("readMore")}
</Link>



<Link
  to={`/iphone/compare?model=${encodeURIComponent(m.slug)}`}
  className="px-6 py-3 rounded-full border border-blue-600 text-blue-600 font-semibold hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
>
  {t("iphonePage.compare")}
</Link>

</div>



                  <div className="flex gap-4 mb-4">
                    {m.colors.map(color => (
                      <div key={color} style={{backgroundColor: color}} className="w-8 h-8 rounded-full border-2 border-white shadow-xl cursor-pointer hover:scale-125 transition-transform" />
                    ))}
                  </div>
                </div>

                <div className="bg-gray-100/50 dark:bg-gray-900/50 p-8 rounded-[2.5rem] backdrop-blur-sm border border-white/20">
                  <div className="flex items-center gap-3 mb-8">
                    <span className="bg-blue-600 text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest">Specifications</span>
                    <div className="h-[1px] flex-1 bg-gray-300 dark:bg-gray-700"></div>
                  </div>
                  <AccordionItem model={m.name} />
                </div>

             {/* SIMILAR SLIDER */}
<div className="pt-10">
<h4 className="text-2xl font-bold mb-8 flex justify-between items-center">
  {t("iphonePage.discover")}

    <a href="#models" className="text-sm text-blue-600 hover:underline">
      Explore All Models
    </a>
  </h4>

  <div ref={sliderRef} className="keen-slider">
    {models.filter(x => x.name !== m.name).map((item) => (
      <div key={item.name} className="keen-slider__slide px-2">

        <Link
          to={`/iphone/${item.slug}`}
          className="block bg-white/10 dark:bg-black/10 border border-gray-200 dark:border-gray-800 rounded-3xl p-6 text-center hover:bg-white dark:hover:bg-gray-800 transition-all duration-500 shadow-sm hover:shadow-2xl"
        >
          <img
            src={item.img}
            className="h-32 mx-auto object-contain mb-4"
            alt={item.name}
          />

          <p className="text-sm font-black mb-1">{item.name}</p>

          <p className="text-blue-600 font-bold text-xs">
            ${item.price}
          </p>
        </Link>

      </div>
    ))}
  </div>
</div>

              </div>
            </article>
          )
        })}
      </section>

      {/* VIDEO EXPERIENCE */}
      <section className="py-32 px-6">
        <div className="max-w-[1200px] mx-auto text-center">
          <motion.h2 
            initial={{ opacity: 0 }} 
            whileInView={{ opacity: 1 }}
            className="text-5xl font-black mb-16"
          >
            Cinematic Experience
          </motion.h2>
          <div className="relative aspect-video rounded-[3rem] overflow-hidden shadow-[0_100px_150px_-50px_rgba(0,0,0,0.5)] border-[12px] border-white dark:border-gray-800">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/TX9qSaGXFyg?autoplay=0&mute=1"
              title="iPhone Global Experience"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      {/* FOOTER BRANDING */}
      <section className="py-24 text-center">
         <h3 className="text-gray-200 dark:text-gray-800 text-[12vw] font-black tracking-tighter select-none opacity-50">APPLE IPHONE</h3>
      </section>
    </main>
  );
}
