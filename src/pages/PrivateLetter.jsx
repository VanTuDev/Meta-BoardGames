import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import { motion } from "framer-motion";
import "antd/dist/reset.css";

export default function PrivateLetter() {
   const navigate = useNavigate();
   const [opened, setOpened] = useState(false);
   const [music] = useState(new Audio("/nha-nhac-hue.mp3"));

   useEffect(() => {
      if (opened) {
         music.volume = 0.5;
         music.loop = true;
         music.play();
      }
      return () => music.pause();
   }, [opened]);

   const paragraphs = [
      `Nếu bạn đang đọc những dòng này, hẳn là bạn đã vượt qua bảy chặng hành trình của Huyền Hoàng Box rồi, đúng không nào? 
    Chúc mừng bạn - người đã kiên nhẫn mở từng cánh cửa, giải từng ẩn số, và dấn bước qua bảy chặng đường đầy kỳ thú.`,
      `Và giờ đây, khi những manh mối cuối cùng đã hé lộ, hãy để M.ETA cùng bạn bước tiếp một đoạn ngắn nữa thôi…
    một đoạn đường không còn thử thách, mà chỉ có những câu chuyện được kể bằng hơi thở của thời gian.`,
      `Ba câu chuyện, ba lát cắt của quá khứ, cùng giao hòa trong một điểm đến - Huế,
    nơi đất, trời và con người gặp nhau trong vẻ đẹp lặng lẽ mà vĩnh hằng.`,
      `“Bạn có nghe thấy không? Tiếng trống vang vọng từ xa, như đang mở đầu cho một triều đại mới…”`,
      `Sau bao năm binh đao và chia cắt, năm 1802, Nguyễn Phúc Ánh – vị chúa cuối cùng của dòng họ Nguyễn ở Đàng Trong,
    đã đánh bại nhà Tây Sơn, thống nhất giang sơn và lên ngôi, lấy niên hiệu là Gia Long...`,
      `Triều Nguyễn tồn tại hơn một thế kỷ... Đến năm 1945, khi vua Bảo Đại thoái vị, triều Nguyễn khép lại hành trình hơn 140 năm thăng trầm –
    để lại sau lưng một giai đoạn đầy dấu ấn trong lịch sử dân tộc.`,
      `“Triều Nguyễn đã lùi vào dĩ vãng… nhưng Huế vẫn ở đây – trầm mặc, dịu dàng,
    và vẫn kể lại câu chuyện ấy mỗi ngày, cho những ai chịu lắng nghe.”`,
      `“Nếu nói triều Nguyễn là một bản trường ca, thì Minh Mạng chính là chương rực rỡ nhất trong bản nhạc ấy.”`,
      `Vua Minh Mạng (Nguyễn Phúc Đảm) lên ngôi năm 1820... ông là người đã định hình đất nước, quy củ hóa hành chính và giáo dục.`,
      `Ông không chỉ dựng nên cơ đồ, mà còn để lại một công trình – nơi mà mỗi viên gạch, mỗi con đường đều mang hơi thở của ông.
    Đó chính là Lăng Minh Mạng – Hiếu Lăng.`,
      `“Hít một hơi thật sâu nhé… Bạn có cảm nhận thấy không? Không khí nơi đây khác hẳn – yên bình, cân bằng và tĩnh tại.”`,
      `Lăng Minh Mạng tọa lạc trên núi Cẩm Khê, cách trung tâm Huế khoảng 12 km...
    Tất cả hòa quyện giữa núi, sông, hồ, cây – như một bức tranh “thiên – địa – nhân hợp nhất”.`,
      `“Bước vào Lăng Minh Mạng là bước vào một giấc mộng – giấc mộng của một vị vua yêu cái đẹp, yêu sự hài hòa,
    và tin rằng cái chết không phải là kết thúc, mà là sự trở về.”`,
      `Vậy là chúng ta đã đến cuối cùng của hành trình rồi đấy.
    Hành trình của thời gian, của văn hóa, và của những điều khiến Huế mãi mãi là Huyền Hoàng –
    nơi quá khứ chưa bao giờ thật sự ngủ yên.`,
   ];

   return (
      <div
         className="relative min-h-screen w-full flex items-center justify-center bg-cover bg-center text-[#f1e6d0]"
         style={{ backgroundImage: `url('/hue-bg.jpg')` }}
      >
         {/* Nút quay lại */}
         <div className="absolute top-4 left-4 z-[10001]">
            <Button
               onClick={() => navigate(-1)}
               className="!bg-black/60 !text-yellow-300 !border !border-yellow-500 hover:!bg-black hover:!text-yellow-200 !rounded-full px-4 py-1"
            >
               Quay lại
            </Button>
         </div>
         {!opened && (
            <motion.div
               initial={{ opacity: 0, scale: 0.9 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1 }}
               className="text-center"
            >
               <h1 className="text-3xl mb-8 text-yellow-300 font-heading tracking-widest drop-shadow-lg">
                  HUYỀN HOÀNG BOX
               </h1>
               <Button
                  type="primary"
                  size="large"
                  onClick={() => setOpened(true)}
                  className="!bg-gradient-to-r !from-yellow-500 !to-amber-600 !text-black !font-bold !rounded-full px-8 py-6 hover:scale-105 transition-all"
               >
                  MỞ BỨC THƯ
               </Button>
            </motion.div>
         )}

         {opened && (
            <motion.div
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ duration: 1.5 }}
               className="backdrop-blur-md bg-black/70 p-8 md:p-12 rounded-2xl shadow-2xl max-w-3xl max-h-[85vh] overflow-y-auto border border-yellow-600"
            >
               <h1 className="text-center text-2xl md:text-3xl text-yellow-400 mb-6 font-semibold font-heading">
                  Bức Thư Của Huyền Hoàng Box
               </h1>

               {paragraphs.map((text, index) => (
                  <motion.p
                     key={index}
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: 0.5 + index * 0.4 }}
                     className="text-justify mb-4 leading-relaxed"
                  >
                     {text}
                  </motion.p>
               ))}
            </motion.div>
         )}
      </div>
   );
}
