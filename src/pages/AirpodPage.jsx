import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import AccordionItem from "../../components/accordion/AccordionItem";
import { useKeenSlider } from "keen-slider/react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet";
import "keen-slider/keen-slider.min.css";
import { Link } from "react-router-dom";
import { HiOutlineShoppingBag } from "react-icons/hi";

export default function AirpodPage() {

  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRtl = i18n.language === "fa";

  const [activeImages,setActiveImages] = useState({});

  const [sliderRef] = useKeenSlider({
    loop:true,
    slides:{ perView:3, spacing:15 },
    breakpoints:{
      "(max-width:768px)":{ slides:{ perView:2 } }
    }
  });

  // ✅ تابع خرید → به سبد خرید
  const handleBuy = () => {
    navigate('/cart');
  };

  const models = [

    {
      id:1,
      slug:"airpods-max",
      name:"AirPods Max",
      img:"/assets/airpod/airpod-max.png",
      price:"549",
      rating:4.8,
      colors:["#e5e5e5","#3b3b3b","#8e8e8e"],
      gallery:[
        "/assets/airpod/airpod-max.png",
        "/assets/airpod/headphone-apple.png",
        "/assets/airpod/apple-airpod.png"
      ],
      description:{
        fa:"ایرپاد مکس هدفون پرچمدار اپل با کیفیت صدای فوق‌العاده و نویز کنسلینگ فعال است.",
        en:"AirPods Max delivers high‑fidelity audio with industry‑leading Active Noise Cancellation."
      }
    },

    {
      id:2,
      slug:"airpods-pro",
      name:"AirPods Pro",
      img:"/assets/airpod/apple-airpod.png",
      price:"249",
      rating:4.7,
      colors:["#ffffff","#e5e5e5"],
      gallery:[
        "/assets/airpod/apple-airpod.png",
        "/assets/airpod/headphone-apple.png",
        "/assets/airpod/airpod-max.png"
      ],
      description:{
        fa:"ایرپاد پرو با طراحی سبک، نویز کنسلینگ و صدای شفاف تجربه شنیداری عالی ارائه می‌دهد.",
        en:"AirPods Pro offers immersive sound, adaptive transparency and active noise cancellation."
      }
    },

    {
      id:3,
      slug:"airpods",
      name:"AirPods",
      img:"/assets/airpod/headphone-apple.png",
      price:"179",
      rating:4.6,
      colors:["#ffffff","#f2f2f2"],
      gallery:[
        "/assets/airpod/headphone-apple.png",
        "/assets/airpod/apple-airpod.png",
        "/assets/airpod/airpod-max.png"
      ],
      description:{
        fa:"ایرپاد استاندارد اپل با اتصال سریع و باتری طولانی.",
        en:"Standard Apple AirPods with seamless pairing and long battery life."
      }
    }

  ];

  const handleGalleryClick = (modelName,img)=>{
    setActiveImages(prev => ({ ...prev,[modelName]:img }));
  };

  return (

    <main className={`min-h-screen transition-colors duration-500 overflow-x-hidden ${isRtl ? 'font-vazir':'font-sans'}`}>

      <Helmet>
        <title>AirPods Collection | Apple World</title>
        <meta name="description" content="Explore Apple AirPods lineup including AirPods Max and AirPods Pro."/>
      </Helmet>

      {/* HERO */}
      <section className="relative w-full min-h-[50vh] flex items-center justify-center px-6">

        <div className="text-center max-w-3xl">

          <motion.h1
            initial={{opacity:0,y:40}}
            animate={{opacity:1,y:0}}
            transition={{duration:0.8}}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6"
          >
            AirPods
          </motion.h1>

          <p className="text-lg opacity-80">
            Wireless audio. Magical experience.
          </p>

        </div>

      </section>


      {/* PRODUCTS */}
      <section id="models" className="max-w-[1400px] mx-auto px-6 py-20 space-y-40">

        {models.map((m)=>{

          const activeImage = activeImages[m.name] || m.img;

          return(

            <article key={m.name} className="grid lg:grid-cols-12 gap-12 items-start border-b pb-28 border-gray-200 dark:border-gray-800">

              {/* LEFT */}
              <div className="lg:col-span-5 sticky top-24">

                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImage}
                    src={activeImage}
                    initial={{opacity:0,scale:.9}}
                    animate={{opacity:1,scale:1}}
                    exit={{opacity:0}}
                    className="w-[80%] mx-auto"
                  />
                </AnimatePresence>

                <div className="flex justify-center gap-4 mt-12">

                  {m.gallery.map((img,i)=>(
                    <img
                      key={i}
                      src={img}
                      onClick={()=>handleGalleryClick(m.name,img)}
                      className={`w-20 h-20 p-2 border rounded-xl cursor-pointer ${
                        activeImage === img ? "border-blue-500":"border-transparent opacity-50"
                      }`}
                    />
                  ))}

                </div>

              </div>

              {/* RIGHT */}
              <div className="lg:col-span-7 space-y-8">

                <h2 className="text-5xl font-black">{m.name}</h2>

                <p className="text-blue-600 font-bold">${m.price}</p>

                <p className="max-w-xl opacity-80">
                  {isRtl ? m.description.fa : m.description.en}
                </p>

                <div className="flex flex-wrap gap-4">
                  {/* ✅ دکمه مشاهده → به صفحه محصول */}
                  <Link
                    to={`/airpods/${m.slug}`}
                    className="px-6 py-3 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition"
                  >
                    {isRtl ? "مشاهده" : "Learn More"}
                  </Link>

                  {/* ✅ دکمه خرید → به سبد خرید */}
                  <button
                    onClick={handleBuy}
                    className="px-6 py-3 rounded-full bg-amber-500 text-black hover:bg-amber-600 transition flex items-center gap-2 font-bold"
                  >
                    <HiOutlineShoppingBag size={18} />
                    {isRtl ? "خرید" : "Buy Now"}
                  </button>
                </div>

                <div className="bg-gray-100/50 dark:bg-gray-900/50 p-8 rounded-3xl">
                  <AccordionItem model={m.name}/>
                </div>

                {/* SLIDER */}
                <div ref={sliderRef} className="keen-slider">

                  {models.filter(x=>x.name !== m.name).map((item)=>(
                    <div key={item.name} className="keen-slider__slide p-4">

                      <Link
                        to={`/airpods/${item.slug}`}
                        className="block text-center border rounded-2xl p-6 hover:border-blue-500 transition"
                      >
                        <img src={item.img} className="h-24 mx-auto mb-4"/>
                        <p className="font-bold text-sm">{item.name}</p>
                        <p className="text-blue-600 text-xs">${item.price}</p>
                      </Link>

                    </div>
                  ))}

                </div>

              </div>

            </article>

          )

        })}

      </section>

    </main>
  );
}
