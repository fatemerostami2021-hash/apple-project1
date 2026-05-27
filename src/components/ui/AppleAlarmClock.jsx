import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaBellSlash } from "react-icons/fa";

export default function AppleAlarmClock() {

  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmActive, setAlarmActive] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const audioRef = useRef(null);
  const tickRef = useRef(null);
  const alarmTimeout = useRef(null);
  const clockRef = useRef(null);

  useEffect(() => {

    const timer = setInterval(() => {

      const now = new Date();
      setTime(now);

      if (tickRef.current) {
        tickRef.current.currentTime = 0;
        tickRef.current.play().catch(()=>{});
      }

      if (alarmTime && alarmActive && !isRinging) {
        const currentHM = now.toTimeString().slice(0,5);
        if (currentHM === alarmTime) triggerAlarm();
      }

    },1000);

    return () => {
      clearInterval(timer);
      if (alarmTimeout.current) clearTimeout(alarmTimeout.current);
    };

  },[alarmTime,alarmActive,isRinging]);

  const handleMouseMove = (e) => {
    if (!clockRef.current) return;
    const rect = clockRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    setMousePos({ x: x * 15, y: y * 15 });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: 0, y: 0 });
  };

  const triggerAlarm = () => {

    setIsRinging(true);

    if(audioRef.current){
      audioRef.current.loop=true;
      audioRef.current.play().catch(()=>{});
    }

    alarmTimeout.current=setTimeout(()=>{
      clearAlarm();
    },120000);

  };

  const handleSetAlarm=(e)=>{
    e.preventDefault();
    if(alarmTime){
      setAlarmActive(true);
      setIsRinging(false);
    }
  };

  const clearAlarm=()=>{

    setAlarmActive(false);
    setIsRinging(false);

    if(audioRef.current){
      audioRef.current.pause();
      audioRef.current.currentTime=0;
    }

    if(alarmTimeout.current){
      clearTimeout(alarmTimeout.current);
    }

  };

  const seconds=time.getSeconds();
  const minutes=time.getMinutes();
  const hours=time.getHours();

  const secDeg=seconds*6;
  const minDeg=minutes*6+seconds*0.1;
  const hourDeg=(hours%12)*30+minutes*0.5;

  return (

<div className="flex flex-col items-center gap-4 select-none">

<audio ref={audioRef} src="/sounds/alarm.mp3" preload="auto"/>
<audio ref={tickRef} src="/sounds/tick.mp3" preload="auto"/>

<div
ref={clockRef}
onMouseMove={handleMouseMove}
onMouseLeave={handleMouseLeave}
onClick={()=>setIsFocused(!isFocused)}
className={`relative flex items-center justify-center cursor-pointer transition-all duration-500
${isFocused ? "w-[230px] h-[250px] scale-110" : "w-[170px] h-[190px]"}`}
style={{
  perspective: "1000px"
}}
>

<div
className={`w-full h-full rounded-[38px] p-[6px] transition-all duration-300
${isFocused ? "shadow-[0_0_30px_rgba(255,255,255,0.3)]" : ""}
${isRinging
? "bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-300"
: "bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400"}
`}
style={{
  transform: `rotateX(${-mousePos.y}deg) rotateY(${mousePos.x}deg)`,
  transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
  boxShadow: isFocused 
    ? "0 20px 60px rgba(0,0,0,0.6), 0 0 40px rgba(100,100,100,0.2)" 
    : "0 10px 40px rgba(0,0,0,0.5)"
}}
>

<div className="w-full h-full bg-black rounded-[32px] p-[4px] flex items-center justify-center">

<div 
  className={`relative w-full h-full rounded-[28px] bg-[#0c0c0e] flex items-center justify-center transition-transform duration-500 ${isFocused ? "scale-110" : ""}`}
  style={{
    boxShadow: `
      inset 0 2px 10px rgba(255,255,255,0.03),
      inset 0 -2px 10px rgba(0,0,0,0.8)
    `
  }}
>

{/* خطوط دقیقه (Minute Markers) */}
{Array.from({length:60}).map((_,i)=>{

const angle=i*6;
const rad=(angle-90)*(Math.PI/180);
const r=isFocused?65:48;
const length = i % 5 === 0 ? (isFocused ? 10 : 8) : (isFocused ? 5 : 4);
const width = i % 5 === 0 ? 2 : 1;

const x1=r*Math.cos(rad);
const y1=r*Math.sin(rad);

return(

<div
key={i}
className="absolute"
style={{
  width: `${width}px`,
  height: `${length}px`,
  background: i % 5 === 0 ? "#ffffff" : "#555555",
  transformOrigin: "center center",
  transform: `translate(-50%, -50%) translate(${x1}px, ${y1}px) rotate(${angle}deg)`,
  left: "50%",
  top: "50%",
  borderRadius: "2px"
}}
/>

);

})}

{/* اعداد ساعت */}
{Array.from({length:12}).map((_,i)=>{

const num=i+1;
const angle=num*30;
const rad=(angle-90)*(Math.PI/180);
const r=isFocused?52:38;

const x=r*Math.cos(rad);
const y=r*Math.sin(rad);

return(

<span
key={num}
className={`absolute font-bold font-mono transition-all duration-400
${isFocused
? "text-[12px] text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.8)]"
: "text-[8px] text-gray-400"}
`}
style={{transform:`translate(${x}px,${y}px)`}}
>
{num}
</span>

);

})}

{/* عقربه‌ها */}
<div className="absolute inset-0 flex items-center justify-center">

{/* عقربه ساعت */}
<div
className="absolute bg-white rounded-full origin-bottom"
style={{
  width: "3px",
  height: "30px",
  transform:`rotate(${hourDeg}deg) translateY(-15px)`,
  transition:"transform 0.7s cubic-bezier(.4,2,.3,1)",
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
  clipPath: "polygon(40% 0%, 60% 0%, 55% 100%, 45% 100%)"
}}
/>

{/* عقربه دقیقه */}
<div
className="absolute bg-white rounded-full origin-bottom"
style={{
  width: "2px",
  height: "42px",
  transform:`rotate(${minDeg}deg) translateY(-21px)`,
  transition:"transform 0.6s cubic-bezier(.4,2,.3,1)",
  filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.8))",
  clipPath: "polygon(40% 0%, 60% 0%, 55% 100%, 45% 100%)"
}}
/>

{/* عقربه ثانیه */}
<div
className="absolute origin-bottom"
style={{
  width: "1px",
  height: "46px",
  background: "linear-gradient(to bottom, #ff3b30 0%, #ff3b30 80%, rgba(255,59,48,0.7) 100%)",
  transform:`rotate(${secDeg}deg) translateY(-22px)`,
  transition:"transform 0.15s linear",
  filter: "drop-shadow(0 0 6px rgba(255,59,48,0.9))"
}}
/>

{/* دایره مرکزی */}
<div 
  className="absolute rounded-full z-10"
  style={{
    width: "10px",
    height: "10px",
    background: "radial-gradient(circle at 30% 30%, #ff6b60, #ff3b30 50%, #cc0000)",
    boxShadow: "0 0 12px rgba(255,59,48,0.9), inset 0 1px 3px rgba(255,255,255,0.4), inset 0 -1px 3px rgba(0,0,0,0.4)",
    border: "1px solid rgba(255,255,255,0.2)"
  }}
/>

</div>

{/* نمایش الارم */}
{alarmActive && (
<div className="absolute top-[20px] flex flex-col items-center">
<FaBell size={10} className="text-[#d4af37] drop-shadow-[0_0_8px_rgba(212,175,55,0.8)]"/>
<span className="text-[8px] text-[#d4af37] font-mono drop-shadow-[0_0_4px_rgba(212,175,55,0.6)]">{alarmTime}</span>
</div>
)}

{/* نمایش زمان دیجیتال - بولدتر */}
<div className="absolute bottom-[20px] bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg border border-white/10">
<span className="text-[10px] font-mono font-extrabold text-white tracking-wide drop-shadow-[0_0_8px_rgba(255,255,255,0.9)]">
{time.toLocaleTimeString('en-US', { hour12: false })}
</span>
</div>

</div>
</div>
</div>
</div>

{/* پنل تنظیمات - کوچکتر */}
<div className="w-[160px] backdrop-blur-md bg-white/5 border border-white/10 rounded-lg p-2.5 flex flex-col gap-1.5">

{isRinging ? (

<button
onClick={clearAlarm}
className="w-full py-1.5 bg-red-600 hover:bg-red-700 text-white text-[10px] font-bold rounded-md animate-pulse transition-colors"
>
DISMISS
</button>

) : (

<form onSubmit={handleSetAlarm} className="flex flex-col gap-1.5">

<div className="flex justify-between text-[9px] opacity-70 text-white items-center">
<span>{alarmActive ? "Armed" : "Alarm"}</span>
{alarmActive ? <FaBell size={8} className="text-amber-500"/> : <FaBellSlash size={8} className="text-gray-400"/>}
</div>

<input
type="time"
value={alarmTime}
onChange={(e)=>setAlarmTime(e.target.value)}
className="bg-black/40 border border-white/10 rounded text-[10px] text-center py-1.5 text-white focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all"
/>

<div className="grid grid-cols-2 gap-1">

<button
type="submit"
className="bg-amber-500 hover:bg-amber-600 text-black text-[9px] font-bold py-1 rounded transition-colors"
>
ARM
</button>

<button
type="button"
onClick={clearAlarm}
className="bg-white/10 hover:bg-white/20 text-white text-[9px] py-1 rounded transition-colors"
>
CLEAR
</button>

</div>

</form>

)}

</div>

</div>

  );
}
