import React, { useState, useEffect, useRef } from "react";
import { FaBell, FaBellSlash } from "react-icons/fa";

export default function AppleAlarmClock() {

  const [time, setTime] = useState(new Date());
  const [alarmTime, setAlarmTime] = useState("");
  const [alarmActive, setAlarmActive] = useState(false);
  const [isRinging, setIsRinging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const audioRef = useRef(null);
  const tickRef = useRef(null);
  const alarmTimeout = useRef(null);

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
onClick={()=>setIsFocused(!isFocused)}
className={`relative flex items-center justify-center cursor-pointer transition-all duration-500
${isFocused ? "w-[230px] h-[250px] scale-110" : "w-[170px] h-[190px]"}`}
>

<div
className={`w-full h-full rounded-[38px] p-[6px] transition-all duration-500
${isFocused ? "shadow-[0_0_30px_rgba(255,255,255,0.3)]" : ""}
${isRinging
? "bg-gradient-to-br from-yellow-400 via-amber-500 to-yellow-300"
: "bg-gradient-to-br from-gray-300 via-gray-100 to-gray-400"}
`}
>

<div className="w-full h-full bg-black rounded-[32px] p-[4px] flex items-center justify-center">

<div className={`relative w-full h-full rounded-[28px] bg-[#0c0c0e] flex items-center justify-center transition-transform duration-500 ${isFocused ? "scale-110" : ""}`}>

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

<div className="absolute inset-0 flex items-center justify-center">

<div
className="absolute w-[3px] h-[30px] bg-white rounded-full origin-bottom"
style={{
transform:`rotate(${hourDeg}deg) translateY(-15px)`,
transition:"transform 0.7s cubic-bezier(.4,2,.3,1)"
}}
/>

<div
className="absolute w-[2px] h-[42px] bg-white rounded-full origin-bottom"
style={{
transform:`rotate(${minDeg}deg) translateY(-21px)`,
transition:"transform 0.6s cubic-bezier(.4,2,.3,1)"
}}
/>

<div
className="absolute w-[1px] h-[46px] bg-amber-500 origin-bottom"
style={{
transform:`rotate(${secDeg}deg) translateY(-22px)`,
transition:"transform 0.15s linear"
}}
/>

<div className="absolute w-[5px] h-[5px] bg-amber-500 rounded-full"/>

</div>

{alarmActive && (
<div className="absolute top-[20px] flex flex-col items-center">
<FaBell size={10} className="text-[#d4af37]"/>
<span className="text-[8px] text-[#d4af37] font-mono">{alarmTime}</span>
</div>
)}

<div className="absolute bottom-[20px] bg-black/40 px-2 py-[2px] rounded">
<span className="text-[8px] font-mono text-gray-300">
{time.toLocaleTimeString()}
</span>
</div>

</div>
</div>
</div>
</div>

<div className="w-[180px] backdrop-blur-md bg-white/5 border border-white/10 rounded-xl p-3 flex flex-col gap-2">

{isRinging ? (

<button
onClick={clearAlarm}
className="w-full py-2 bg-red-600 text-white text-xs font-bold rounded-lg animate-pulse"
>
DISMISS ALARM
</button>

) : (

<form onSubmit={handleSetAlarm} className="flex flex-col gap-2">

<div className="flex justify-between text-[10px] opacity-70">
<span>{alarmActive ? "Alarm Armed" : "Set Alarm"}</span>
{alarmActive ? <FaBell/> : <FaBellSlash/>}
</div>

<input
type="time"
value={alarmTime}
onChange={(e)=>setAlarmTime(e.target.value)}
className="bg-black/40 border border-white/10 rounded text-xs text-center"
/>

<div className="grid grid-cols-2 gap-1">

<button
type="submit"
className="bg-amber-500 text-black text-[10px] font-bold py-1 rounded"
>
ARM
</button>

<button
type="button"
onClick={clearAlarm}
className="bg-white/10 text-white text-[10px] py-1 rounded"
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
