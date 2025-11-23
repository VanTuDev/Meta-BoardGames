import React, { useState, useEffect, useRef } from "react";
import { X, Send } from "lucide-react";
import { useI18n } from "../i18n";

const API_KEY = import.meta.env.VITE_GOOGLE_AI_API_KEY;


// Parse markdown text thành JSX
const parseMarkdown = (text) => {
   if (!text) return text;

   // Helper function để parse bold trong một đoạn text
   const parseBold = (str) => {
      const parts = str.split(/(\*\*[^*]+\*\*)/g);
      return parts.map((part, idx) => {
         if (part.startsWith("**") && part.endsWith("**")) {
            const boldText = part.slice(2, -2);
            return <strong key={idx} className="font-bold">{boldText}</strong>;
         }
         return <span key={idx}>{part}</span>;
      });
   };

   // Tách text thành các phần dựa trên số thứ tự (1., 2., 3., etc.)
   // Tách tại vị trí trước số thứ tự tiếp theo
   const parts = text.split(/\s+(?=\d+\.\s+)/);

   // Kiểm tra xem có phải danh sách đánh số không (ít nhất 2 phần và phần đầu bắt đầu bằng số)
   if (parts.length > 1 && /^\d+\.\s+/.test(parts[0])) {
      return (
         <div className="space-y-2">
            {parts.map((part, idx) => {
               const trimmed = part.trim();
               if (!trimmed) return null;
               return (
                  <div key={idx} className="leading-relaxed">
                     {parseBold(trimmed)}
                  </div>
               );
            })}
         </div>
      );
   }

   // Không có danh sách đánh số, chỉ parse bold và xuống dòng
   const lines = text.split(/\n/);
   if (lines.length > 1) {
      return (
         <div className="space-y-1">
            {lines.map((line, idx) => (
               <div key={idx} className="leading-relaxed">
                  {parseBold(line.trim())}
               </div>
            ))}
         </div>
      );
   }

   // Chỉ có bold, không có xuống dòng
   return <span>{parseBold(text)}</span>;
};

const ChatWidget = () => {
   const { t, locale } = useI18n();
   const [open, setOpen] = useState(false);
   const [message, setMessage] = useState("");
   const [messages, setMessages] = useState([
      { id: 1, sender: "bot", text: t("components.ChatWidget.initialMessage") },
   ]);
   const [loading, setLoading] = useState(false);
   const scrollRef = useRef(null);

   // Cập nhật tin nhắn ban đầu khi đổi ngôn ngữ
   useEffect(() => {
      setMessages([
         { id: 1, sender: "bot", text: t("components.ChatWidget.initialMessage") },
      ]);
   }, [locale, t]);

   // Tự động scroll xuống cuối khi có tin nhắn mới
   useEffect(() => {
      if (scrollRef.current) {
         scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
   }, [messages, loading]);

   // Lấy dữ liệu sản phẩm từ i18n
   const getProductsContext = () => {
      const products = t("sections.Products.products") || [];
      if (!Array.isArray(products) || products.length === 0) return "";

      if (locale === "vi") {
         const context = products.map((p) => {
            return `- ${p.name}: ${p.category}. ${p.description} Số người chơi: ${p.players}, Độ tuổi: ${p.age}, Thời gian: ${p.time}. Chất liệu: ${p.material}.`;
         }).join("\n");
         return `Thông tin về các sản phẩm Huyền Hoàng:\n${context}\n\nHuyền Hoàng là một bộ board games về lịch sử và văn hóa Việt Nam thời Nguyễn, được phát triển bởi M.ETA.`;
      } else {
         const context = products.map((p) => {
            return `- ${p.name}: ${p.category}. ${p.description} Players: ${p.players}, Age: ${p.age}, Duration: ${p.time}. Materials: ${p.material}.`;
         }).join("\n");
         return `Information about Huyền Hoàng products:\n${context}\n\nHuyền Hoàng is a board game series about Vietnamese history and culture during the Nguyễn Dynasty, developed by M.ETA.`;
      }
   };

   // Gửi tin nhắn đến AI
   const sendToAI = async (userMessage) => {
      try {
         if (!API_KEY) {
            throw new Error("API_KEY is not configured");
         }
         setLoading(true);
         // Dynamic import để tránh lỗi build
         const { GoogleGenAI } = await import("@google/genai");
         const ai = new GoogleGenAI({ apiKey: API_KEY });

         const productsContext = getProductsContext();
         const systemPrompt = locale === "vi"
            ? `Bạn là trợ lý AI chuyên tư vấn về các sản phẩm board games Huyền Hoàng của M.ETA. Hãy trả lời câu hỏi của khách hàng một cách thân thiện và chuyên nghiệp bằng tiếng Việt.

${productsContext}

Một số câu hỏi thường gặp:
- "Huyền Hoàng là gì?" hoặc "Huyền Hoàng là gì": Huyền Hoàng là bộ board games về lịch sử và văn hóa Việt Nam thời Nguyễn, bao gồm 3 sản phẩm chính: Huyền Hoàng Box, Huyền Hoàng Map, và Huyền Hoàng Card.
- "Các sản phẩm huyền hoàng" hoặc "sản phẩm": Hiện tại có 3 sản phẩm: Huyền Hoàng Box (Giải đố – Phiêu lưu khám phá), Huyền Hoàng Map (Khám phá - Nhập vai - Giáo dục), và Huyền Hoàng Card (Chiến thuật – Suy luận – Đấu trí).
- "Ai là người sáng lập ra trò chơi này" hoặc "ai tạo ra": Huyền Hoàng được phát triển bởi công ty M.ETA.

Hãy trả lời ngắn gọn, dễ hiểu và thân thiện. Nếu không biết câu trả lời, hãy nói bạn sẽ tìm hiểu thêm.`
            : `You are an AI assistant specializing in Huyền Hoàng board games products from M.ETA. Answer customer questions in a friendly and professional manner in English.

${productsContext}

Common questions:
- "What is Huyền Hoàng?" or "What is Huyen Hoang": Huyền Hoàng is a board game series about Vietnamese history and culture during the Nguyễn Dynasty, including 3 main products: Huyền Hoàng Box, Huyền Hoàng Map, and Huyền Hoàng Card.
- "Huyền Hoàng products" or "products": Currently there are 3 products: Huyền Hoàng Box (Puzzle – Adventure Exploration), Huyền Hoàng Map (Exploration - Role-playing - Education), and Huyền Hoàng Card (Strategy – Deduction – Mind Games).
- "Who created this game" or "who made": Huyền Hoàng is developed by M.ETA company.

Answer briefly, clearly, and friendly. If you don't know the answer, say you will find out more.`;

         const questionLabel = locale === "vi" ? "Khách hàng hỏi" : "Customer asks";
         const answerLabel = locale === "vi" ? "Trả lời" : "Answer";
         const prompt = `${systemPrompt}\n\n${questionLabel}: ${userMessage}\n\n${answerLabel}:`;

         const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
         });
         const text = response.text;

         setMessages((prev) => [
            ...prev,
            { id: Date.now(), sender: "bot", text: text.trim() },
         ]);
      } catch (error) {
         console.error("AI Error:", error);
         const errorMessage = locale === "vi"
            ? "Xin lỗi, tôi gặp lỗi khi xử lý. Vui lòng thử lại sau."
            : "Sorry, I encountered an error. Please try again later.";
         setMessages((prev) => [
            ...prev,
            { id: Date.now(), sender: "bot", text: errorMessage },
         ]);
      } finally {
         setLoading(false);
      }
   };

   const onSend = async (messageText = null) => {
      const text = (messageText || message).trim();
      if (!text || loading) return;

      // Thêm tin nhắn của user
      setMessages((prev) => [...prev, { id: Date.now(), sender: "me", text }]);
      setMessage("");

      // Gửi đến AI
      await sendToAI(text);
   };

   const logoSrc = "/imgs/Logo/logo.png";
   const patternSrc = "/imgs/Background/Background.png";

   return (
      <div className="fixed bottom-6 right-6 z-50">
         {!open && (
            <button
               aria-label={t("components.ChatWidget.openChat")}
               onClick={() => setOpen(true)}
               className="relative flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#9B4CFF] bg-[#F4DFAF] shadow-2xl transition hover:scale-105 hover:shadow-[0px_10px_30px_rgba(155,76,255,0.35)]"
            >
               <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white shadow-inner">
                  <img src={logoSrc} alt="M.ETA" className="h-10 w-10 object-contain" />
               </div>
            </button>
         )}

         {open && (
            <div
               className="relative flex h-[480px] w-[340px] flex-col overflow-hidden rounded-[28px] border-[3px] border-[#9B4CFF] bg-[#F8EAD1] shadow-[0px_18px_45px_rgba(112,26,26,0.35)] sm:h-[520px] sm:w-[380px]"
               style={{
                  backgroundImage: `url(${patternSrc})`,
                  backgroundSize: "320px",
               }}
            >
               <div className="flex items-center justify-between bg-[#781B1B] px-5 py-4 text-white">
                  <span className="text-base font-semibold uppercase tracking-wide">
                     {t("components.ChatWidget.title")}
                  </span>
                  <button
                     aria-label={t("components.ChatWidget.closeChat")}
                     onClick={() => setOpen(false)}
                     className="rounded-full border border-white/50 p-1 transition hover:scale-110 hover:bg-white/10"
                  >
                     <X className="h-4 w-4" />
                  </button>
               </div>

               <div className="flex flex-1 min-h-0 gap-3 px-4 pb-4 pt-3">

                  <div className="flex-1 min-h-0">
                     <div className="flex h-full flex-col overflow-hidden">
                        <div ref={scrollRef} className="flex-1 min-h-0 space-y-3 overflow-y-auto px-4 py-3 custom-scrollbar">
                           {messages.map((m) => (
                              <div
                                 key={m.id}
                                 className={`flex items-start gap-2 ${m.sender === "me" ? "ml-auto flex-row-reverse" : ""}`}
                              >
                                 {m.sender === "bot" && (
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-[0px_4px_12px_rgba(120,27,27,0.2)]">
                                       <img src={logoSrc} alt="M.ETA" className="h-6 w-6 object-contain" />
                                    </div>
                                 )}
                                 <div
                                    className={`max-w-[84%] rounded-[20px] px-4 py-3 text-sm leading-relaxed shadow-[0px_10px_25px_rgba(135,76,26,0.12)] ${m.sender === "me"
                                       ? "bg-[#A6672A] text-white"
                                       : "bg-white/95 text-[#4B2B0F]"
                                       }`}
                                 >
                                    {m.sender === "bot" ? parseMarkdown(m.text) : m.text}
                                 </div>
                              </div>
                           ))}

                           {loading && (
                              <div className="flex items-start gap-2">
                                 <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/90 shadow-[0px_4px_12px_rgba(120,27,27,0.2)]">
                                    <img src={logoSrc} alt="M.ETA" className="h-6 w-6 object-contain" />
                                 </div>
                                 <div className="max-w-[84%] rounded-[20px] bg-white/95 px-4 py-3 text-sm text-[#4B2B0F] shadow-[0px_10px_25px_rgba(135,76,26,0.12)]">
                                    <span className="inline-block animate-pulse">
                                       {locale === "vi" ? "Đang suy nghĩ..." : "Thinking..."}
                                    </span>
                                 </div>
                              </div>
                           )}

                           {messages.length === 1 && !loading && (
                              <div className="space-y-3 pt-2">
                                 <p className="text-xs font-semibold uppercase tracking-wide text-[#874C1A]">
                                    {t("components.ChatWidget.sampleQuestions.title")}
                                 </p>
                                 {t("components.ChatWidget.sampleQuestions.questions")?.map((question, idx) => (
                                    <button
                                       key={idx}
                                       onClick={() => onSend(question)}
                                       disabled={loading}
                                       className="w-full rounded-[18px] border border-[#F0C676]/60 bg-white/40 px-3 py-2 text-left text-xs font-medium text-[#874C1A]/70 transition hover:opacity-100 hover:-translate-y-[1px] hover:border-[#9B4CFF]/80 hover:text-[#6A2A15] hover:bg-white/60 hover:shadow-md"
                                    >
                                       {question}
                                    </button>
                                 ))}
                              </div>
                           )}
                        </div>

                        <div className="flex items-center gap-3 border-t border-[#F0C676] bg-[#F3DAB3]/70 px-4 py-3">
                           <input
                              value={message}
                              onChange={(e) => setMessage(e.target.value)}
                              onKeyDown={(e) => e.key === "Enter" && !loading && onSend()}
                              disabled={loading}
                              className="h-10 flex-1 rounded-full border border-[#F0C676] bg-white/90 px-4 text-sm text-[#874C1A] placeholder:text-[#B58A4C] focus:outline-none focus:ring-2 focus:ring-[#9B4CFF]/60 disabled:opacity-60"
                              placeholder={t("components.ChatWidget.placeholder")}
                           />
                           <button
                              onClick={onSend}
                              disabled={loading}
                              aria-label={t("components.ChatWidget.send")}
                              className="flex h-10 w-10 items-center justify-center rounded-full bg-[#781B1B] text-white shadow-[0px_10px_20px_rgba(120,27,27,0.35)] transition hover:scale-105 disabled:opacity-60"
                           >
                              <Send className="h-4 w-4" />
                           </button>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default ChatWidget;


