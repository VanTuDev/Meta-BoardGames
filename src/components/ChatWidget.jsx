import React, { useState, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { useI18n } from "../i18n";

const ChatWidget = () => {
   const { t, locale } = useI18n();
   const [open, setOpen] = useState(false);
   const [message, setMessage] = useState("");
   const [messages, setMessages] = useState([
      { id: 1, sender: "bot", text: t("components.ChatWidget.initialMessage") },
   ]);

   // Cập nhật tin nhắn ban đầu khi đổi ngôn ngữ
   useEffect(() => {
      setMessages([
         { id: 1, sender: "bot", text: t("components.ChatWidget.initialMessage") },
      ]);
   }, [locale, t]);

   const onSend = () => {
      const text = message.trim();
      if (!text) return;
      setMessages((prev) => [...prev, { id: Date.now(), sender: "me", text }]);
      setMessage("");
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
                  {messages.map((m) => (
                     <div key={m.id} className={`max-w-[80%] px-3 py-2 rounded-md text-sm ${m.sender === "me" ? "ml-auto bg-[#e5d6a3]" : "bg-white border"}`}>
                        {m.text}
                     </div>
                  ))}
               </div>
               <div className="border-t p-2 flex items-center gap-2">
                  <input
                     value={message}
                     onChange={(e) => setMessage(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && onSend()}
                     className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                     placeholder={t("components.ChatWidget.placeholder")}
                  />
                  <button
                     onClick={onSend}
                     className="bg-[#610C40] text-white rounded-md p-2 hover:bg-[#4a0a31] transition"
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


