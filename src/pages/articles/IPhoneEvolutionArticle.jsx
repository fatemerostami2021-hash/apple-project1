import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const GENERATIONS = [
  {
    gen: "12",
    genFa: "۱۲",
    chip: "A14 Bionic",
    cpu: 1583,
    gpu: 9832,
    camera: "12MP Triple",
    zoom: "2.5x",
    body: "Stainless Steel",
    bodyFa: "فولاد ضدزنگ",
    slug: "iphone-12-pro-max",
    img: "/assets/images/iphones/ip12pm/ip12pm-1.jpg",
    year: "2020",
  },
  {
    gen: "13",
    genFa: "۱۳",
    chip: "A15 Bionic",
    cpu: 1707,
    gpu: 14386,
    camera: "12MP Triple",
    zoom: "3x",
    body: "Stainless Steel",
    bodyFa: "فولاد ضدزنگ",
    slug: "iphone-13-pro-max",
    img: "/assets/images/iphones/ip13pm/ip13pm-1.jpg",
    year: "2021",
  },
  {
    gen: "14",
    genFa: "۱۴",
    chip: "A16 Bionic",
    cpu: 1879,
    gpu: 17476,
    camera: "48MP Triple",
    zoom: "3x",
    body: "Stainless Steel",
    bodyFa: "فولاد ضدزنگ",
    slug: "iphone-14-pro-max",
    img: "/assets/images/iphones/ip14pm/ip14pm-1.jpg",
    year: "2022",
  },
  {
    gen: "15",
    genFa: "۱۵",
    chip: "A17 Pro",
    cpu: 2297,
    gpu: 21874,
    camera: "48MP Triple",
    zoom: "5x",
    body: "Titanium",
    bodyFa: "تیتانیوم",
    slug: "iphone-15-pro-max",
    img: "/assets/images/iphones/ip15pm/ip15pm-1.jpg",
    year: "2023",
  },
  {
    gen: "16",
    genFa: "۱۶",
    chip: "A18 Pro",
    cpu: 2897,
    gpu: 31240,
    camera: "48MP Triple",
    zoom: "5x",
    body: "Titanium",
    bodyFa: "تیتانیوم",
    slug: "iphone-16-pro-max",
    img: "/assets/images/iphones/ip16pm/ip16pm-1.jpg",
    year: "2024",
  },
  {
    gen: "17",
    genFa: "۱۷",
    chip: "A19 Pro",
    cpu: 3210,
    gpu: 52795,
    camera: "48MP Triple",
    zoom: "4x + 8x",
    body: "Aluminum + Titanium",
    bodyFa: "آلومینیوم + تیتانیوم",
    slug: "iphone-17-pro-max",
    img: "/assets/images/iphones/ip17pm/ip17pm-1.jpg",
    year: "2026",
  },
];

export default function IPhoneEvolutionArticle() {
  const { i18n } = useTranslation();
  const isRtl = i18n.language === "fa";

  const heroRef = useRef(null);
  const sectionsRef = useRef([]);
  const tableRowsRef = useRef([]);
  const cardsRef = useRef([]);

  const addSection = (el) => {
    if (el && !sectionsRef.current.includes(el)) {
      sectionsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Sections scroll fade
      sectionsRef.current.forEach((el) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });

      // Table rows stagger
      const rows = tableRowsRef.current.filter(Boolean);
      if (rows.length) {
        gsap.fromTo(
          rows,
          { opacity: 0, x: isRtl ? 30 : -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.45,
            stagger: 0.07,
            ease: "power2.out",
            scrollTrigger: {
              trigger: rows[0],
              start: "top 85%",
            },
          }
        );
      }

      // Generation cards stagger
      const cards = cardsRef.current.filter(Boolean);
      if (cards.length) {
        gsap.fromTo(
          cards,
          { opacity: 0, scale: 0.9 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.55,
            stagger: 0.09,
            ease: "back.out(1.5)",
            scrollTrigger: {
              trigger: cards[0],
              start: "top 85%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [isRtl]);

  return (
    <article
      dir={isRtl ? "rtl" : "ltr"}
      className="max-w-4xl mx-auto px-4 py-12 text-gray-900 dark:text-gray-100"
    >
      {/* ───── Hero ───── */}
      <header ref={heroRef} className="mb-16 text-center">
        <span className="inline-block bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide">
          Apple · Pro Max · 2020–2026
        </span>

        <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-4">
          {isRtl ? "سیر تکامل آیفون پرو مکس" : "iPhone Pro Max Evolution"}
        </h1>
        <p className="text-xl md:text-2xl text-blue-500 dark:text-blue-400 font-semibold mb-6">
          {isRtl ? "از نسل ۱۲ تا ۱۷" : "From Generation 12 to 17"}
        </p>
        <p className="text-base text-gray-500 dark:text-gray-400 max-w-2xl mx-auto leading-8">
          {isRtl
            ? "شش نسل، شش جهش. بررسی تطبیقی کامل‌ترین خط پرچمدار اپل از منظر تراشه، دوربین، معماری حرارتی و جایگاه رقابتی."
            : "Six generations, six leaps. A full comparative review of Apple's flagship line from chip, camera, thermal architecture, and competitive positioning."}
        </p>

        <img
          src="/assets/images/iphones/ip17pm/ip17pm-1.jpg"
          alt="iPhone 17 Pro Max"
          className="mt-10 w-full max-h-[420px] object-cover rounded-2xl shadow-2xl"
        />

        {/* Meta */}
        <div className="flex items-center justify-center gap-6 mt-6 text-sm text-gray-400 dark:text-gray-500">
          <span>📅 {isRtl ? "۱۴۰۵/۰۳/۰۳" : "2026-05-24"}</span>
          <span>⏱ {isRtl ? "۱۸ دقیقه مطالعه" : "18 min read"}</span>
          <span>🏷 Apple</span>
        </div>
      </header>

      {/* ───── Abstract ───── */}
      <section
        ref={addSection}
        className="mb-14 bg-gray-50 dark:bg-gray-800/60 rounded-2xl p-8 border border-gray-200 dark:border-gray-700"
      >
        <h2 className="text-lg font-bold mb-4 text-blue-600 dark:text-blue-400 uppercase tracking-wider">
          {isRtl ? "چکیده" : "Abstract"}
        </h2>
        <p className="leading-9 text-gray-700 dark:text-gray-300">
          {isRtl
            ? "آیفون پرو مکس در فاصله ۲۰۲۰ تا ۲۰۲۶ دو دوره متمایز را پشت سر گذاشت: دوره اول (نسل‌های ۱۲ تا ۱۴) با تمرکز بر بهینه‌سازی تدریجی تراشه و دوربین، و دوره دوم (نسل‌های ۱۵ تا ۱۷) با بازنگری بنیادین در متریال بدنه، معماری حرارتی و استراتژی دوربین تله‌فوتو. نسل ۱۷ با A19 Pro و جهش ۶۹ درصدی گرافیکی نسبت به نسل ۱۶، نقطه اوج این مسیر است و تعریف «پرچمدار» را از «بهترین مشخصات» به «توانایی بی‌وقفه» تغییر داده است."
            : "The iPhone Pro Max went through two distinct phases between 2020 and 2026: the first phase (generations 12–14) focused on incremental chip and camera optimization, and the second phase (generations 15–17) involved a fundamental rethink of body materials, thermal architecture, and telephoto strategy. Generation 17 with A19 Pro and a 69% GPU leap over generation 16 represents the peak of this journey, redefining 'flagship' from 'best specs' to 'sustained capability'."}
        </p>
      </section>

      {/* ───── Introduction ───── */}
      <section ref={addSection} className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          {isRtl ? "مقدمه: دو دوره متمایز" : "Introduction: Two Distinct Eras"}
        </h2>
        <p className="leading-9 text-gray-700 dark:text-gray-300 mb-8">
          {isRtl
            ? "وقتی اپل در سپتامبر ۲۰۲۰ آیفون ۱۲ پرو مکس را معرفی کرد، کمتر کسی تصور می‌کرد که این خط محصول در عرض شش سال چنین تحول بنیادینی را تجربه کند. مسیر از A14 Bionic تا A19 Pro نه یک خط مستقیم، بلکه داستان دو استراتژی کاملاً متفاوت است."
            : "When Apple introduced the iPhone 12 Pro Max in September 2020, few anticipated the fundamental transformation this product line would undergo in six years. The journey from A14 Bionic to A19 Pro is not a straight line — it's the story of two completely different strategies."}
        </p>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-6 border border-slate-200 dark:border-slate-700">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-sm font-bold">
                ۱
              </span>
              <h3 className="font-bold text-slate-700 dark:text-slate-300">
                {isRtl ? "دوره اول: نسل ۱۲ تا ۱۴" : "Era 1: Gen 12–14"}
              </h3>
            </div>
            <p className="text-sm leading-8 text-gray-600 dark:text-gray-400">
              {isRtl
                ? "بهینه‌سازی تدریجی با حفظ فرم‌فکتور فولادی. هر نسل بهبود قابل اندازه‌گیری در CPU و GPU داشت اما تحول بنیادین رخ نداد. نقطه عطف این دوره، ورود سنسور ۴۸ مگاپیکسل در نسل ۱۴ بود که پایه‌گذار دوره بعدی شد."
                : "Incremental optimization while maintaining the steel form factor. Each generation had measurable CPU and GPU improvements but no fundamental transformation. The turning point was the 48MP sensor in generation 14, which laid the foundation for the next era."}
            </p>
          </div>

          <div className="bg-blue-50 dark:bg-blue-950/60 rounded-xl p-6 border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-8 h-8 rounded-full bg-blue-200 dark:bg-blue-800 flex items-center justify-center text-sm font-bold text-blue-700 dark:text-blue-300">
                ۲
              </span>
              <h3 className="font-bold text-blue-700 dark:text-blue-300">
                {isRtl ? "دوره دوم: نسل ۱۵ تا ۱۷" : "Era 2: Gen 15–17"}
              </h3>
            </div>
            <p className="text-sm leading-8 text-gray-600 dark:text-gray-400">
              {isRtl
                ? "بازنگری بنیادین با ورود تیتانیوم در نسل ۱۵، معماری حرارتی پیشرفته در نسل ۱۶، و استراتژی جدید تله‌فوتو در نسل ۱۷. این دوره تعریف «پرچمدار» را از «بهترین مشخصات» به «توانایی بی‌وقفه» تغییر داد."
                : "Fundamental rethink with titanium in generation 15, advanced thermal architecture in generation 16, and a new telephoto strategy in generation 17. This era shifted the definition of 'flagship' from 'best specs' to 'sustained capability'."}
            </p>
          </div>
        </div>
      </section>

      {/* ───── Generation Cards ───── */}
      <section ref={addSection} className="mb-14">
        <h2 className="text-2xl font-bold mb-8">
          {isRtl ? "نگاهی به هر نسل" : "A Look at Each Generation"}
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {GENERATIONS.map((g, i) => (
            <Link
              key={g.gen}
              to={`/products/${g.slug}`}
              ref={(el) => (cardsRef.current[i] = el)}
              className="group rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="relative overflow-hidden">
                <img
                  src={g.img}
                  alt={`iPhone ${g.gen} Pro Max`}
                  className="w-full h-36 object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-2 end-2 bg-black/60 text-white text-xs px-2 py-0.5 rounded-full">
                  {g.year}
                </span>
              </div>
              <div className="p-3 bg-white dark:bg-gray-900">
                <p className="font-bold text-sm">
                  {isRtl
                    ? `آیفون ${g.genFa} پرو مکس`
                    : `iPhone ${g.gen} Pro Max`}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                  {g.chip}
                </p>
                <p className="text-xs text-gray-400 dark:text-gray-500 mt-0.5">
                  {isRtl ? g.bodyFa : g.body}
                </p>
                <span className="inline-block mt-2 text-xs text-blue-500 dark:text-blue-400 font-medium group-hover:underline">
                  {isRtl ? "مشاهده محصول ←" : "View Product →"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ───── Chip Analysis ───── */}
      <section ref={addSection} className="mb-14">
        <h2 className="text-2xl font-bold mb-4">
          {isRtl
            ? "تحلیل تراشه: از A14 تا A19 Pro"
            : "Chip Analysis: A14 to A19 Pro"}
        </h2>
        <p className="leading-9 text-gray-700 dark:text-gray-300 mb-8">
          {isRtl
            ? "در شش نسل، عملکرد تک‌هسته‌ای ۱۰۳٪ و عملکرد گرافیکی ۴۳۷٪ رشد کرد. اما توزیع این رشد یکنواخت نبود — نسل ۱۷ تنها در GPU جهش ۶۹ درصدی نسبت به نسل قبل داشت که بزرگ‌ترین جهش تک‌نسلی در تاریخ آیفون پرو مکس است."
            : "Across six generations, single-core performance grew 103% and GPU performance grew 437%. But this growth was not evenly distributed — generation 17 alone saw a 69% GPU leap over the previous generation, the largest single-generation jump in iPhone Pro Max history."}
        </p>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {[
                  isRtl ? "نسل" : "Gen",
                  isRtl ? "تراشه" : "Chip",
                  isRtl ? "CPU تک‌هسته" : "Single-Core",
                  isRtl ? "رشد CPU" : "CPU Growth",
                  isRtl ? "GPU" : "GPU",
                  isRtl ? "رشد GPU" : "GPU Growth",
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-start font-semibold whitespace-nowrap"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GENERATIONS.map((g, i) => {
                const prev = GENERATIONS[i - 1];
                const cpuGrowth = prev
                  ? `+${Math.round(((g.cpu - prev.cpu) / prev.cpu) * 100)}%`
                  : "—";
                const gpuGrowth = prev
                  ? `+${Math.round(((g.gpu - prev.gpu) / prev.gpu) * 100)}%`
                  : "—";
                const isLatest = g.gen === "17";

                return (
                  <tr
                    key={g.gen}
                    ref={(el) => (tableRowsRef.current[i] = el)}
                    className={`border-t border-gray-200 dark:border-gray-700 transition-colors ${
                      isLatest
                        ? "bg-blue-50 dark:bg-blue-950/50"
                        : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                    }`}
                  >
                    <td className="px-4 py-3 font-medium">
                      <Link
                        to={`/products/${g.slug}`}
                        className="text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
                      >
                        {isRtl
                          ? `آیفون ${g.genFa} پرو مکس`
                          : `iPhone ${g.gen} Pro Max`}
                      </Link>
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 whitespace-nowrap">
                      {g.chip}
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {g.cpu.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-gray-500 dark:text-gray-400 text-xs">
                      {cpuGrowth}
                    </td>
                    <td className="px-4 py-3 font-mono">
                      {g.gpu.toLocaleString()}
                    </td>
                    <td
                      className={`px-4 py-3 font-semibold text-xs ${
                        isLatest
                          ? "text-green-600 dark:text-green-400"
                          : "text-gray-500 dark:text-gray-400"
                      }`}
                    >
                      {gpuGrowth}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Highlight box */}
        <div className="mt-6 bg-green-50 dark:bg-green-950/50 border border-green-200 dark:border-green-800 rounded-xl p-5 flex gap-4 items-start">
          <span className="text-2xl">📈</span>
          <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
            {isRtl
              ? "جهش ۶۹ درصدی GPU در نسل ۱۷ نتیجه مستقیم معماری جدید 3nm نسل دوم است. برای مقایسه، میانگین رشد GPU در نسل‌های ۱۲ تا ۱۶ حدود ۳۵٪ بود."
              : "The 69% GPU leap in generation 17 is a direct result of the new second-generation 3nm architecture. For comparison, the average GPU growth across generations 12–16 was around 35%."}
          </p>
        </div>
      </section>

      {/* ───── Thermal Architecture ───── */}
      <section ref={addSection} className="mb-14">
        <h2 className="text-2xl font-bold mb-4">
          {isRtl
            ? "معماری حرارتی: بازگشت به آلومینیوم"
            : "Thermal Architecture: Return to Aluminum"}
        </h2>
        <p className="leading-9 text-gray-700 dark:text-gray-300 mb-8">
          {isRtl
            ? "یکی از جنجالی‌ترین تصمیمات اپل در نسل ۱۷، بازگشت به فریم آلومینیومی بود — متریالی که آخرین بار در آیفون ۱۴ استفاده شده بود. اما این بار هدف متفاوت بود: آلومینیوم هدایت حرارتی بهتری نسبت به تیتانیوم دارد و در ترکیب با محفظه بخار نسل جدید، پایداری عملکرد را به ۹۰٪ رساند."
            : "One of Apple's most controversial decisions in generation 17 was returning to an aluminum frame — a material last used in iPhone 14. But this time the goal was different: aluminum has better thermal conductivity than titanium, and combined with the new-generation vapor chamber, it pushed performance sustainability to 90%."}
        </p>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            {
              label: isRtl ? "نسل ۱۲–۱۴" : "Gen 12–14",
              material: isRtl ? "فولاد ضدزنگ" : "Stainless Steel",
              thermal: isRtl ? "خنک‌سازی پایه" : "Basic Cooling",
              sustained: "~65%",
              color: "gray",
            },
            {
              label: isRtl ? "نسل ۱۵–۱۶" : "Gen 15–16",
              material: isRtl ? "تیتانیوم" : "Titanium",
              thermal: isRtl ? "محفظه بخار" : "Vapor Chamber",
              sustained: "~78%",
              color: "blue",
            },
            {
              label: isRtl ? "نسل ۱۷" : "Gen 17",
              material: isRtl ? "آلومینیوم + تیتانیوم" : "Aluminum + Titanium",
              thermal: isRtl ? "محفظه بخار نسل ۲" : "Vapor Chamber Gen 2",
              sustained: "~90%",
              color: "green",
            },
          ].map((item) => (
            <div
              key={item.label}
              className={`rounded-xl p-5 border ${
                item.color === "green"
                  ? "bg-green-50 dark:bg-green-950/50 border-green-200 dark:border-green-800"
                  : item.color === "blue"
                  ? "bg-blue-50 dark:bg-blue-950/50 border-blue-200 dark:border-blue-800"
                  : "bg-gray-50 dark:bg-gray-800/60 border-gray-200 dark:border-gray-700"
              }`}
            >
              <p className="font-bold text-sm mb-3">{item.label}</p>
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">
                {item.material}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-500 mb-3">
                {item.thermal}
              </p>
              <div className="flex items-center gap-2">
                <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      item.color === "green"
                        ? "bg-green-500"
                        : item.color === "blue"
                        ? "bg-blue-500"
                        : "bg-gray-400"
                    }`}
                    style={{ width: item.sustained }}
                  />
                </div>
                <span className="text-xs font-bold">{item.sustained}</span>
              </div>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
                {isRtl ? "پایداری عملکرد" : "Sustained Performance"}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ───── Camera Evolution ───── */}
      <section ref={addSection} className="mb-14">
        <h2 className="text-2xl font-bold mb-4">
          {isRtl
            ? "تکامل دوربین: از ۱۲ مگاپیکسل تا سیستم دوگانه تله‌فوتو"
            : "Camera Evolution: From 12MP to Dual Telephoto"}
        </h2>
        <p className="leading-9 text-gray-700 dark:text-gray-300 mb-8">
          {isRtl
            ? "مسیر دوربین آیفون پرو مکس سه فاز داشت: فاز اول (نسل ۱۲–۱۳) با سنسور ۱۲ مگاپیکسل و زوم محدود، فاز دوم (نسل ۱۴–۱۶) با جهش به ۴۸ مگاپیکسل و زوم ۵x، و فاز سوم (نسل ۱۷) با معرفی سیستم دوگانه تله‌فوتو ۴x+۸x."
            : "The iPhone Pro Max camera journey had three phases: phase one (gen 12–13) with 12MP sensor and limited zoom, phase two (gen 14–16) with the jump to 48MP and 5x zoom, and phase three (gen 17) introducing the dual telephoto 4x+8x system."}
        </p>

        <div className="space-y-3">
          {GENERATIONS.map((g) => (
            <div
              key={g.gen}
              className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700"
            >
              <span className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center text-xs font-bold text-blue-700 dark:text-blue-300 shrink-0">
                {isRtl ? g.genFa : g.gen}
              </span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">
                  {isRtl ? `آیفون ${g.genFa} پرو مکس` : `iPhone ${g.gen} Pro Max`}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {g.camera} · {isRtl ? "زوم" : "Zoom"}: {g.zoom}
                </p>
              </div>
              <div className="text-end shrink-0">
                <span
                  className={`text-xs font-bold px-2 py-1 rounded-full ${
                    g.gen === "17"
                      ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                      : g.gen >= "14"
                      ? "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}
                >
                  {g.zoom}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 bg-purple-50 dark:bg-purple-950/50 border border-purple-200 dark:border-purple-800 rounded-xl p-5 flex gap-4 items-start">
          <span className="text-2xl">📷</span>
          <p className="text-sm leading-7 text-gray-700 dark:text-gray-300">
            {isRtl
              ? "سیستم دوگانه تله‌فوتو نسل ۱۷ (۴x + ۸x) اولین بار در تاریخ آیفون دو لنز تله‌فوتو مجزا را ارائه می‌دهد. این تصمیم نتیجه مستقیم بازخورد کاربران حرفه‌ای بود که از شکاف بین ۵x و دیجیتال زوم شکایت داشتند."
              : "The generation 17 dual telephoto system (4x + 8x) is the first time in iPhone history to offer two separate telephoto lenses. This decision was a direct result of feedback from professional users who complained about the gap between 5x and digital zoom."}
          </p>
        </div>
      </section>

      {/* ───── Full Comparison Table ───── */}
      <section ref={addSection} className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          {isRtl ? "جدول مقایسه کامل" : "Full Comparison Table"}
        </h2>

        <div className="overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
          <table className="w-full text-xs md:text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                {[
                  isRtl ? "نسل" : "Gen",
                  isRtl ? "تراشه" : "Chip",
                  isRtl ? "دوربین" : "Camera",
                  isRtl ? "زوم" : "Zoom",
                  isRtl ? "بدنه" : "Body",
                  isRtl ? "سال" : "Year",
                ].map((h) => (
                  <th key={h} className="px-3 py-3 text-start font-semibold whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {GENERATIONS.map((g) => (
                <tr
                  key={g.gen}
                  className={`border-t border-gray-200 dark:border-gray-700 transition-colors ${
                    g.gen === "17"
                      ? "bg-blue-50 dark:bg-blue-950/50 font-semibold"
                      : "hover:bg-gray-50 dark:hover:bg-gray-800/50"
                  }`}
                >
                  <td className="px-3 py-3">
                    <Link
                      to={`/products/${g.slug}`}
                      className="text-blue-600 dark:text-blue-400 hover:underline whitespace-nowrap"
                    >
                      {isRtl ? `آیفون ${g.genFa} PM` : `iPhone ${g.gen} PM`}
                    </Link>
                  </td>
                  <td className="px-3 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {g.chip}
                  </td>
                  <td className="px-3 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {g.camera}
                  </td>
                  <td className="px-3 py-3 whitespace-nowrap">
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                        g.gen === "17"
                          ? "bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300"
                          : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                      }`}
                    >
                      {g.zoom}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                    {isRtl ? g.bodyFa : g.body}
                  </td>
                  <td className="px-3 py-3 text-gray-500 dark:text-gray-500">
                    {g.year}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* ───── Verdict ───── */}
      <section ref={addSection} className="mb-14">
        <h2 className="text-2xl font-bold mb-6">
          {isRtl ? "نتیجه‌گیری" : "Verdict"}
        </h2>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/60 dark:to-indigo-950/60 rounded-2xl p-8 border border-blue-200 dark:border-blue-800 mb-8">
          <p className="leading-9 text-gray-700 dark:text-gray-300 mb-6">
            {isRtl
              ? "آیفون ۱۷ پرو مکس نه فقط بهترین آیفون تاریخ، بلکه نقطه‌ای است که اپل در آن ثابت کرد «پرچمدار» دیگر به معنای «بیشترین مگاپیکسل» یا «سریع‌ترین تراشه» نیست. پایداری ۹۰٪ عملکرد، سیستم دوگانه تله‌فوتو و معماری حرارتی نسل دوم، این دستگاه را به ابزاری تبدیل کرده که در بلندمدت بهتر از رقبا عمل می‌کند."
              : "The iPhone 17 Pro Max is not just the best iPhone ever made — it's the point where Apple proved that 'flagship' no longer means 'most megapixels' or 'fastest chip'. The 90% sustained performance, dual telephoto system, and second-generation thermal architecture make this a device that outperforms competitors over the long run."}
          </p>

          <div className="grid grid-cols-3 gap-4 text-center">
            {[
              {
                value: "103%",
                label: isRtl ? "رشد CPU (۶ نسل)" : "CPU Growth (6 gen)",
              },
              {
                value: "437%",
                label: isRtl ? "رشد GPU (۶ نسل)" : "GPU Growth (6 gen)",
              },
              {
                value: "90%",
                label: isRtl ? "پایداری عملکرد" : "Sustained Performance",
              },
            ].map((stat) => (
              <div key={stat.label} className="bg-white/60 dark:bg-black/20 rounded-xl p-4">
                <p className="text-2xl font-extrabold text-blue-600 dark:text-blue-400">
                  {stat.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 leading-5">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ───── Related Products CTA ───── */}
      <section ref={addSection} className="mb-8">
        <h2 className="text-xl font-bold mb-6">
          {isRtl ? "مشاهده محصولات" : "Browse Products"}
        </h2>
        <div className="flex flex-wrap gap-3">
          {GENERATIONS.map((g) => (
            <Link
              key={g.gen}
              to={`/products/${g.slug}`}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200 hover:shadow-md ${
                g.gen === "17"
                  ? "bg-blue-600 text-white border-blue-600 hover:bg-blue-700"
                  : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500"
              }`}
            >
              {isRtl ? `آیفون ${g.genFa} پرو مکس` : `iPhone ${g.gen} Pro Max`}
            </Link>
          ))}
        </div>
      </section>
    </article>
  );
}
