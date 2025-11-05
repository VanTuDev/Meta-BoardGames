import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CoutRound() {
   const navigate = useNavigate();
   const { round } = useParams();

   const initial = useMemo(() => {
      const parsed = parseInt(round, 10);
      return Number.isFinite(parsed) ? parsed : 0;
   }, [round]);

   const [value, setValue] = useState(initial);
   const [isLandscape, setIsLandscape] = useState(window.innerWidth > window.innerHeight);

   useEffect(() => {
      const handleResize = () => {
         setIsLandscape(window.innerWidth > window.innerHeight);
      };
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
   }, []);

   useEffect(() => {
      setValue(initial);
   }, [initial]);

   const updateUrl = (next) => {
      const safe = Number.isFinite(next) ? next : 0;
      navigate(`/cout-round/${safe}`, { replace: true });
   };

   const onIncrease = () => {
      const next = value + 1;
      setValue(next);
      updateUrl(next);
   };

   const onDecrease = () => {
      const next = Math.max(0, value - 1);
      setValue(next);
      updateUrl(next);
   };

   // Format thành 2 chữ số
   const formatted = String(value).padStart(2, "0");

   return (
      <div
         className={`min-h-screen w-full flex items-center justify-center bg-cover bg-center bg-no-repeat transition-all duration-300`}
         style={{
            backgroundImage: "url('/imgs/Background/Background.png')",
         }}
      >
         {/* Khi màn hình ngang */}
         <div
            className={`flex ${isLandscape ? "flex-row" : "flex-col"
               } items-center justify-center gap-12`}
         >
            {/* Nút giảm */}
            <button
               onClick={onDecrease}
               aria-label="Decrease round"
               className="w-20 h-20 rounded-full bg-black/40 text-white text-5xl flex items-center justify-center border border-white/30 hover:bg-black/50 active:scale-95 transition"
            >
               −
            </button>

            {/* Hiển thị Round 00 */}
            <h1 className="text-red-700 text-7xl sm:text-8xl font-extrabold select-none text-center drop-shadow-xl tracking-wider">
               {formatted}
            </h1>

            {/* Nút tăng */}
            <button
               onClick={onIncrease}
               aria-label="Increase round"
               className="w-20 h-20 rounded-full bg-black/40 text-white text-5xl flex items-center justify-center border border-white/30 hover:bg-black/50 active:scale-95 transition"
            >
               +
            </button>
         </div>
      </div>
   );
}
