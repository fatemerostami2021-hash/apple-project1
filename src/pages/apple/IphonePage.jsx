import { useTranslation } from "react-i18next";
import AccordionItem from "../../components/accordion/AccordionItem";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import hero from "../../assets/iphone/iphone-main.png";
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

export default function IphonePage() {

const { t } = useTranslation();

const [sliderRef] = useKeenSlider({
loop: true,
slides: {
perView: 4,
spacing: 20,
},
breakpoints: {
"(max-width:1200px)": { slides:{ perView:3 }},
"(max-width:768px)": { slides:{ perView:2 }},
"(max-width:500px)": { slides:{ perView:1 }},
},
});

const models = [
{ name:"iPhone 17 Pro Max", img: ip17pm },
{ name:"iPhone 17 Pro", img: ip17p },
{ name:"iPhone 17", img: ip17 },

{ name:"iPhone 16 Pro Max", img: ip16pm },
{ name:"iPhone 16 Pro", img: ip16p },
{ name:"iPhone 16", img: ip16 },

{ name:"iPhone 15 Pro Max", img: ip15pm },
{ name:"iPhone 15 Pro", img: ip15p },
{ name:"iPhone 15", img: ip15 },

{ name:"iPhone 14 Pro Max", img: ip14pm },
{ name:"iPhone 14 Pro", img: ip14p },
{ name:"iPhone 14", img: ip14 },

{ name:"iPhone 13 Pro Max", img: ip13pm },
{ name:"iPhone 13 Pro", img: ip13p },
{ name:"iPhone 13", img: ip13 },

{ name:"iPhone 12 Pro Max", img: ip12pm },
{ name:"iPhone 12 Pro", img: ip12p },
{ name:"iPhone 12", img: ip12 },
];

return (

<main className="min-h-screen">

{/* HERO */}

<section className="max-w-[1500px] mx-auto px-6 py-28 text-center">

<img src={logo} className="mx-auto w-16 mb-6"/>

<h1 className="text-6xl font-bold mb-6 tracking-tight">
{t("menu.apple.iphone")}
</h1>

<p className="text-gray-500 max-w-xl mx-auto mb-16">
The complete evolution of the iPhone. Explore every generation with
full specifications, reviews and cinematic visuals.
</p>

<img
src={hero}
className="mx-auto w-[520px] hover:scale-105 transition duration-500"
/>

</section>


{/* PRODUCT DETAILS */}

<section className="max-w-[1500px] mx-auto px-6 py-24 space-y-32">

{models.map((m)=>(

<div
key={m.name}
className="grid lg:grid-cols-2 gap-16 items-center border-b pb-24"
>

<div className="text-center">

<img
src={m.img}
alt={m.name}
className="w-[360px] mx-auto hover:scale-105 transition duration-500"
/>

<h3 className="text-3xl font-semibold mt-8">
{m.name}
</h3>

</div>

<div className="space-y-6">

<h4 className="text-2xl font-semibold">
Specifications
</h4>

<AccordionItem model={m.name} />

<h4 className="text-2xl font-semibold pt-6">
Similar iPhones
</h4>

<div ref={sliderRef} className="keen-slider">

{models
.filter(x => x.name !== m.name)
.slice(0,6)
.map((item)=>(
<div
key={item.name}
className="keen-slider__slide border rounded-2xl p-4 text-center hover:shadow-xl transition"
>

<img
src={item.img}
className="h-[120px] mx-auto object-contain"
/>

<p className="mt-4 text-sm font-medium">
{item.name}
</p>

</div>
))}

</div>

</div>

</div>

))}

</section>


{/* VIDEO */}

<section className="max-w-[1200px] mx-auto px-6 py-24">

<h2 className="text-4xl font-semibold text-center mb-12">
iPhone Experience
</h2>

<div className="aspect-video rounded-3xl overflow-hidden shadow-2xl">

<iframe
className="w-full h-full"
src="https://www.youtube.com/embed/TX9qSaGXFyg"
title="iPhone review"
allowFullScreen
/>

</div>

</section>

</main>
);
}
