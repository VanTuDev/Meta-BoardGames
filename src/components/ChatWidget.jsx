import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
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

   // Cập nhật tin nhắn ban đầu khi đổi ngôn ngữ
   useEffect(() => {
      setMessages([
         { id: 1, sender: "bot", text: t("components.ChatWidget.initialMessage") },
      ]);
   }, [locale, t]);

   // Lấy dữ liệu sản phẩm từ i18n
   const getProductsContext = () => {
      const products = t("sections.Products.products") || [];
      if (!Array.isArray(products) || products.length === 0) return "";

      if (locale === "vi") {
         const context = products.map((p) => {
            return `- ${p.name}: ${p.category}. ${p.description} Số người chơi: ${p.players}, Độ tuổi: ${p.age}, Thời gian: ${p.time}. Chất liệu: ${p.material}.`;
         }).join("\n");
         return `Thông tin về các sản phẩm Huyền Hoàng:\n${context}\n\nHuyền Hoàng là một bộ board games về lịch sử và văn hóa Việt Nam thời Nguyễn, được phát triển bởi Maztermind.`;
      } else {
         const context = products.map((p) => {
            return `- ${p.name}: ${p.category}. ${p.description} Players: ${p.players}, Age: ${p.age}, Duration: ${p.time}. Materials: ${p.material}.`;
         }).join("\n");
         return `Information about Huyền Hoàng products:\n${context}\n\nHuyền Hoàng is a board game series about Vietnamese history and culture during the Nguyễn Dynasty, developed by Maztermind.`;
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
            ? `Bạn là trợ lý AI chuyên tư vấn về các sản phẩm board games Huyền Hoàng của Maztermind. Hãy trả lời câu hỏi của khách hàng một cách thân thiện và chuyên nghiệp bằng tiếng Việt.

${productsContext}

Một số câu hỏi thường gặp:
- "Huyền Hoàng là gì?" hoặc "Huyền Hoàng là gì": Huyền Hoàng là bộ board games về lịch sử và văn hóa Việt Nam thời Nguyễn, bao gồm 3 sản phẩm chính: Huyền Hoàng Box, Huyền Hoàng Map, và Huyền Hoàng Card.
- "Các sản phẩm huyền hoàng" hoặc "sản phẩm": Hiện tại có 3 sản phẩm: Huyền Hoàng Box (Giải đố – Phiêu lưu khám phá), Huyền Hoàng Map (Khám phá - Nhập vai - Giáo dục), và Huyền Hoàng Card (Chiến thuật – Suy luận – Đấu trí).
- "Ai là người sáng lập ra trò chơi này" hoặc "ai tạo ra": Huyền Hoàng được phát triển bởi công ty Maztermind.

Hãy trả lời ngắn gọn, dễ hiểu và thân thiện. Nếu không biết câu trả lời, hãy nói bạn sẽ tìm hiểu thêm.`
            : `You are an AI assistant specializing in Huyền Hoàng board games products from Maztermind. Answer customer questions in a friendly and professional manner in English.

${productsContext}

Common questions:
- "What is Huyền Hoàng?" or "What is Huyen Hoang": Huyền Hoàng is a board game series about Vietnamese history and culture during the Nguyễn Dynasty, including 3 main products: Huyền Hoàng Box, Huyền Hoàng Map, and Huyền Hoàng Card.
- "Huyền Hoàng products" or "products": Currently there are 3 products: Huyền Hoàng Box (Puzzle – Adventure Exploration), Huyền Hoàng Map (Exploration - Role-playing - Education), and Huyền Hoàng Card (Strategy – Deduction – Mind Games).
- "Who created this game" or "who made": Huyền Hoàng is developed by Maztermind company.

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

   return (
      <div className="fixed bottom-4 right-4 z-50">
         {/* Nút nổi */}
         {!open && (
            <button
               aria-label={t("components.ChatWidget.openChat")}
               className="rounded-full bg-[#610C40] text-white p-4 shadow-lg hover:bg-[#4a0a31] transition"
               onClick={() => setOpen(true)}
            >
               <MessageCircle className="w-6 h-6" />
            </button>
         )}

         {/* Cửa sổ chat */}
         {open && (
            <div className="w-[320px] sm:w-[360px] h-[420px] bg-white shadow-2xl rounded-lg overflow-hidden">
               <div className="flex items-center justify-between px-4 py-3 bg-[#610C40] text-white">
                  <span className="font-semibold">{t("components.ChatWidget.title")}</span>
                  <button aria-label={t("components.ChatWidget.closeChat")} onClick={() => setOpen(false)} className="hover:opacity-80 transition">
                     <X className="w-5 h-5" />
                  </button>
               </div>
               <div className="p-3 h-[320px] overflow-y-auto space-y-2 bg-gray-50">
                  {messages.length === 1 && !loading && (
                     <div className="space-y-2 mb-3">
                        <p className="text-xs font-semibold text-gray-600 mb-2">
                           {t("components.ChatWidget.sampleQuestions.title")}
                        </p>
                        {t("components.ChatWidget.sampleQuestions.questions")?.map((question, idx) => (
                           <button
                              key={idx}
                              onClick={() => onSend(question)}
                              className="w-full text-left px-3 py-2 text-xs bg-white border border-gray-200 rounded-md hover:bg-gray-50 hover:border-[#610C40] transition text-gray-700"
                              disabled={loading}
                           >
                              {question}
                           </button>
                        ))}
                     </div>
                  )}
                  {messages.map((m) => (
                     <div key={m.id} className={`max-w-[80%] px-3 py-2 rounded-md text-sm ${m.sender === "me" ? "ml-auto bg-[#e5d6a3]" : "bg-white border"}`}>
                        {m.sender === "bot" ? parseMarkdown(m.text) : m.text}
                     </div>
                  ))}
                  {loading && (
                     <div className="max-w-[80%] px-3 py-2 rounded-md text-sm bg-white border">
                        <span className="inline-block animate-pulse">
                           {locale === "vi" ? "Đang suy nghĩ..." : "Thinking..."}
                        </span>
                     </div>
                  )}
               </div>
               <div className="border-t p-2 flex items-center gap-2">
                  <input
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && !loading && onSend()}
                     disabled={loading}
                     className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 disabled:opacity-50 disabled:cursor-not-allowed"
                     placeholder={t("components.ChatWidget.placeholder")}
                  />
                  <button
                     onClick={onSend}
                     disabled={loading}
                     className="bg-[#610C40] text-white rounded-md p-2 hover:bg-[#4a0a31] transition disabled:opacity-50 disabled:cursor-not-allowed"
                     aria-label={t("components.ChatWidget.send")}
                  >
                     <Send className="w-4 h-4" />
                  </button>
               </div>
            </div>
         )}
      </div>
   );
};

export default ChatWidget;


