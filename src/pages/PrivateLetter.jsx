import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

export default function PrivateLetterMobile() {
   const [visibleChunks, setVisibleChunks] = useState(0);
   const canvasRef = useRef(null);

   const chunks = [
      `Nếu bạn đang đọc những dòng này, hẳn là bạn đã vượt qua bảy chặng hành trình của Huyền Hoàng Box rồi, đúng không nào?
Chúc mừng bạn - người đã kiên nhẫn mở từng cánh cửa, giải từng ẩn số, và dấn bước qua bảy chặng đường đầy kỳ thú.
Và giờ đây, khi những manh mối cuối cùng đã hé lộ, hãy để M.ETA cùng bạn bước tiếp một đoạn ngắn nữa thôi…`,
      `Ba câu chuyện, ba lát cắt của quá khứ, cùng giao hòa trong một điểm đến - Huế, nơi đất, trời và con người gặp nhau trong vẻ đẹp lặng lẽ mà vĩnh hằng.`,
      `1. Lịch sử triều Nguyễn
“Bạn có nghe thấy không? Tiếng trống vang vọng từ xa, như đang mở đầu cho một triều đại mới...”
Sau bao năm binh đao, năm 1802, Nguyễn Phúc Ánh thống nhất giang sơn, lấy hiệu là Gia Long, mở đầu triều Nguyễn - triều đại phong kiến cuối cùng của Việt Nam.
Huế được chọn làm kinh đô – trái tim của quốc gia.
Đến năm 1945, vua Bảo Đại thoái vị, khép lại hơn 140 năm thăng trầm.`,
      `2. Lịch sử vua Minh Mạng
“Nếu nói triều Nguyễn là một bản trường ca, thì Minh Mạng chính là chương rực rỡ nhất.”
Vua Minh Mạng lên ngôi năm 1820, kiến tạo nền hành chính, văn hóa, giáo dục vững vàng.
Ông được xem là vị minh quân để lại dấu ấn sâu đậm nhất – người định hình triều Nguyễn bằng trí tuệ và kỷ cương.`,
      `3. Nét kiến trúc lăng Minh Mạng
“Hít một hơi thật sâu nhé… Bạn có cảm nhận thấy không? Không khí nơi đây khác hẳn – yên bình, cân bằng và tĩnh tại.”
Lăng Minh Mạng – Hiếu Lăng – là kiệt tác của kiến trúc và triết lý phương Đông.
Tất cả hòa quyện giữa núi, sông, hồ, cây – như một bức tranh “thiên – địa – nhân hợp nhất”.
Bước vào lăng Minh Mạng là bước vào giấc mộng của một vị vua yêu cái đẹp.`,
      `Vậy là chúng ta đã đến cuối hành trình rồi.
Hành trình của thời gian, của văn hóa, và của những điều khiến Huế mãi là Huyền Hoàng – nơi quá khứ chưa bao giờ thật sự ngủ yên.`,
   ];

   useEffect(() => {
      chunks.forEach((_, i) => {
         setTimeout(() => setVisibleChunks((prev) => prev + 1), i * 6000);
      });

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      const resize = () => {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      };
      resize();
      window.addEventListener("resize", resize);

      let particles = [];
      const random = (min, max) => Math.random() * (max - min) + min;

      const loop = () => {
         requestAnimationFrame(loop);
         ctx.globalCompositeOperation = "destination-out";
         ctx.fillStyle = "rgba(0, 0, 0, 0.3)";
         ctx.fillRect(0, 0, canvas.width, canvas.height);
         ctx.globalCompositeOperation = "lighter";
         particles.forEach((p, i) => {
            p.x += Math.cos(p.angle) * p.speed;
            p.y += Math.sin(p.angle) * p.speed + p.gravity;
            p.alpha -= p.decay;
            if (p.alpha <= 0) particles.splice(i, 1);
            ctx.beginPath();
            ctx.arc(p.x, p.y, 2, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${p.hue}, 100%, ${p.brightness}%, ${p.alpha})`;
            ctx.fill();
         });
         if (Math.random() < 0.05) {
            for (let i = 0; i < 60; i++) {
               particles.push({
                  x: random(0, canvas.width),
                  y: random(0, canvas.height / 2),
                  angle: random(0, Math.PI * 2),
                  speed: random(2, 8),
                  gravity: 0.1,
                  hue: random(0, 360),
                  brightness: random(60, 100),
                  alpha: 1,
                  decay: random(0.005, 0.01),
               });
            }
         }
      };
      loop();

      return () => {
         window.removeEventListener("resize", resize);
         ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
   }, []);

   return (
      <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
         {/* Nền */}
         <img
            src="/imgs/Background/backgroundprivateletter.jpg"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-90"
            alt="Background"
         />
         {/* Canvas pháo hoa */}
         <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full mix-blend-overlay pointer-events-none"
         />
         {/* Khung thư */}
         <div
            className="relative z-20 w-[90%] sm:w-[80%] max-w-[600px]
            bg-[#610C04]/95 backdrop-blur-md text-yellow-100 
            rounded-2xl p-4 sm:p-6 border border-yellow-500 
            shadow-[0_0_20px_rgba(255,215,0,0.3)]
            overflow-y-auto h-[85vh] sm:h-[90vh] custom-scrollbar"
         >
            <h1 className="text-center text-lg sm:text-xl font-bold mb-4 text-yellow-300">
               Thư từ Huyền Hoàng
            </h1>

            {chunks.slice(0, visibleChunks).map((chunk, i) => (
               <motion.p
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                  className="mb-5 text-[13px] sm:text-[15px] leading-relaxed whitespace-pre-line"
               >
                  {chunk}
               </motion.p>
            ))}
         </div>

         {/* Custom Scrollbar */}
         <style jsx global>{`
            .custom-scrollbar::-webkit-scrollbar {
               width: 6px;
            }
            .custom-scrollbar::-webkit-scrollbar-thumb {
               background: linear-gradient(180deg, #f6d567, #b98916);
               border-radius: 4px;
            }
            .custom-scrollbar::-webkit-scrollbar-track {
               background: rgba(0, 0, 0, 0.2);
            }
            @media (max-width: 640px) {
               .custom-scrollbar::-webkit-scrollbar {
                  display: none;
               }
            }
         `}</style>
      </div>
   );
}
