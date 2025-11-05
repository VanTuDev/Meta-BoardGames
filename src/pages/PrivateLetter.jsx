import { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";
import "tailwindcss/tailwind.css";

export default function PrivateLetterMobile() {
   const [showCards, setShowCards] = useState([false, false, false, false]);
   const canvasRef = useRef(null);

   useEffect(() => {
      // Hiện lần lượt 4 card
      showCards.forEach((_, i) => {
         setTimeout(() => {
            setShowCards((prev) => {
               const updated = [...prev];
               updated[i] = true;
               return updated;
            });
         }, i * 4000);
      });

      // --- PHÁO HOA ---
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");

      const resizeCanvas = () => {
         canvas.width = window.innerWidth;
         canvas.height = window.innerHeight;
      };
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);

      let fireworks = [];
      let particles = [];
      let hue = 120;
      let timerTick = 0;
      let timerTotal = 20;

      const random = (min, max) => Math.random() * (max - min) + min;
      const distance = (x1, y1, x2, y2) =>
         Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);

      function Firework(sx, sy, tx, ty) {
         this.x = sx;
         this.y = sy;
         this.sx = sx;
         this.sy = sy;
         this.tx = tx;
         this.ty = ty;
         this.distanceToTarget = distance(sx, sy, tx, ty);
         this.distanceTraveled = 0;
         this.coordinates = Array(3).fill([this.x, this.y]);
         this.angle = Math.atan2(ty - sy, tx - sx);
         this.speed = 3;
         this.acceleration = 1.05;
         this.brightness = random(60, 90);
      }

      Firework.prototype.update = function (index) {
         this.coordinates.pop();
         this.coordinates.unshift([this.x, this.y]);
         this.speed *= this.acceleration;
         const vx = Math.cos(this.angle) * this.speed;
         const vy = Math.sin(this.angle) * this.speed;
         this.distanceTraveled = distance(
            this.sx,
            this.sy,
            this.x + vx,
            this.y + vy
         );

         if (this.distanceTraveled >= this.distanceToTarget) {
            createParticles(this.tx, this.ty);
            fireworks.splice(index, 1);
         } else {
            this.x += vx;
            this.y += vy;
         }
      };

      Firework.prototype.draw = function () {
         ctx.beginPath();
         ctx.moveTo(
            this.coordinates[this.coordinates.length - 1][0],
            this.coordinates[this.coordinates.length - 1][1]
         );
         ctx.lineTo(this.x, this.y);
         ctx.strokeStyle = `hsl(${hue}, 100%, ${this.brightness}%)`;
         ctx.stroke();
      };

      function Particle(x, y) {
         this.x = x;
         this.y = y;
         this.coordinates = Array(5).fill([this.x, this.y]);
         this.angle = random(0, Math.PI * 2);
         this.speed = random(2, 12);
         this.friction = 0.94;
         this.gravity = 0.7;
         this.hue = random(hue - 30, hue + 30);
         this.brightness = random(60, 100);
         this.alpha = 1;
         this.decay = random(0.007, 0.01);
      }

      Particle.prototype.update = function (index) {
         this.coordinates.pop();
         this.coordinates.unshift([this.x, this.y]);
         this.speed *= this.friction;
         this.x += Math.cos(this.angle) * this.speed;
         this.y += Math.sin(this.angle) * this.speed + this.gravity;
         this.alpha -= this.decay;
         if (this.alpha <= this.decay) particles.splice(index, 1);
      };

      Particle.prototype.draw = function () {
         ctx.beginPath();
         ctx.moveTo(
            this.coordinates[this.coordinates.length - 1][0],
            this.coordinates[this.coordinates.length - 1][1]
         );
         ctx.lineTo(this.x, this.y);
         ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
         ctx.stroke();
      };

      const createParticles = (x, y) => {
         let particleCount = 60;
         while (particleCount--) particles.push(new Particle(x, y));
      };

      const loop = () => {
         requestAnimationFrame(loop);
         hue += 0.5;
         ctx.globalCompositeOperation = "destination-out";
         ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
         ctx.fillRect(0, 0, canvas.width, canvas.height);
         ctx.globalCompositeOperation = "lighter";

         fireworks.forEach((f, i) => {
            f.draw();
            f.update(i);
         });
         particles.forEach((p, i) => {
            p.draw();
            p.update(i);
         });

         if (timerTick >= timerTotal) {
            const launches = 3;
            for (let i = 0; i < launches; i++) {
               fireworks.push(
                  new Firework(
                     canvas.width / 2,
                     canvas.height,
                     random(0, canvas.width),
                     random(0, canvas.height / 2)
                  )
               );
            }
            timerTick = 0;
         } else {
            timerTick++;
         }
      };
      loop();

      return () => {
         window.removeEventListener("resize", resizeCanvas);
         fireworks = [];
         particles = [];
         ctx.clearRect(0, 0, canvas.width, canvas.height);
      };
   }, []);

   // Nội dung giữ nguyên như bạn yêu cầu
   const cards = [
      {
         title: "Cải cách hành chính",
         text: "Bỏ các đinh, trấn, thành lập 31 tỉnh trên cả nước; hoàn thiện bộ máy quản lý, đặt chức quan, quy định lương bổng và cấp tiền dưỡng liêm để tránh tham nhũng.",
      },
      {
         title: "Phát triển kinh tế",
         text: "Khuyến khích khai hoang lấn biển, đẩy mạnh thủy lợi, đào sông, hoàn chỉnh hệ thống đê điều, hoàn thiện sổ ruộng đất (địa bạ), quy định lại chế độ thuế.",
      },
      {
         title: "Quân sự và chủ quyền",
         text: "Tăng cường phòng thủ, xây dựng pháo đài (như Trấn Hải, Định Hải, Điện Hải), cử đội tàu đi thăm dò và tuần thám Hoàng Sa và Trường Sa.",
      },
      {
         title: "Văn hóa - Giáo dục",
         text: "Lập Quốc Sử Quán, Quốc tử giám, mở các khoa thi Tiến sĩ.",
      },
   ];

   const cornerPositions = [
      "top-5 left-5",
      "top-5 right-5",
      "bottom-5 left-5",
      "bottom-5 right-5",
   ];

   return (
      <div className="relative w-full h-screen flex items-center justify-center bg-black overflow-hidden">
         {/* Nền */}
         <img
            src="/imgs/Background/backgroundprivateletter.jpg"
            alt="Background"
            className="absolute top-0 left-0 w-full h-full object-cover opacity-90 z-0"
         />

         {/* Pháo hoa */}
         <canvas
            ref={canvasRef}
            className="absolute top-0 left-0 w-full h-full z-10 pointer-events-none mix-blend-overlay"
         ></canvas>

         {/* Ảnh trung tâm – to hơn */}
         <img
            src="/imgs/PrivateLetter/anhgiuaprivateletter-removebg-preview.png"
            alt="Ảnh trung tâm"
            className="absolute z-20 w-[400vw] max-w-[800px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 object-contain"
         />

         {/* 4 card ở 4 góc */}
         {cards.map(
            (card, i) =>
               showCards[i] && (
                  <motion.div
                     key={i}
                     initial={{ opacity: 0, scale: 0.8 }}
                     animate={{ opacity: 1, scale: 1 }}
                     transition={{ duration: 0.8 }}
                     className={`absolute ${cornerPositions[i]} z-30 
                w-[44vw] h-[30vh] bg-gradient-to-b from-[#852f1e] to-[#90311e]
                text-white p-6 rounded-xl border border-yellow-500 
                shadow-lg flex flex-col justify-center text-center`}
                  >
                     <h2 className="text-yellow-300 text-[14px] font-bold mb-1 leading-tight">
                        {card.title}
                     </h2>
                     <p className="text-[11px] leading-snug">{card.text}</p>
                  </motion.div>
               )
         )}
      </div>
   );
}
