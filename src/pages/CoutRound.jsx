import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function CoutRound() {
   const navigate = useNavigate();
   const { round } = useParams();

   const initial = useMemo(() => {
      const parsed = parseInt(round, 10);
      return Number.isFinite(parsed) ? parsed : 1;
   }, [round]);

   const [value, setValue] = useState(initial);

   useEffect(() => {
      setValue(initial);
   }, [initial]);

   const updateUrl = (next) => {
      // Giữ không âm, có thể chỉnh sửa theo yêu cầu
      const safe = Number.isFinite(next) ? next : 0;
      if (safe <= 0) {
         navigate(`/cout-round`, { replace: true });
      } else {
         navigate(`/cout-round/${safe}`, { replace: true });
      }
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

   return (
      <div className="min-h-screen w-full flex flex-col items-center justify-center" style={{ backgroundColor: "#90311e" }}>
         <h1 className="text-white text-5xl sm:text-7xl font-bold mb-8 select-none">Round {value}</h1>

         <div className="flex gap-6">
            <button
               onClick={onDecrease}
               aria-label="Decrease round"
               className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/30 text-white text-4xl sm:text-5xl flex items-center justify-center border border-white/30 hover:bg-black/40 active:scale-95 transition"
            >
               −
            </button>
            <button
               onClick={onIncrease}
               aria-label="Increase round"
               className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/30 text-white text-4xl sm:text-5xl flex items-center justify-center border border-white/30 hover:bg-black/40 active:scale-95 transition"
            >
               +
            </button>
         </div>
      </div>
   );
}


