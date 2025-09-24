import React, { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

const ChatWidget = () => {
   const [open, setOpen] = useState(false);
   const [message, setMessage] = useState("");
   const [messages, setMessages] = useState([
      { id: 1, sender: "bot", text: "Xin chào! Tôi có thể giúp gì cho bạn?" },
   ]);

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
               aria-label="Open chat"
               className="rounded-full bg-[#5a442a] text-white p-4 shadow-lg hover:bg-[#3e2f1e]"
               onClick={() => setOpen(true)}
            >
               <MessageCircle className="w-6 h-6" />
            </button>
         )}

         {/* Cửa sổ chat */}
         {open && (
            <div className="w-[320px] sm:w-[360px] h-[420px] bg-white shadow-2xl rounded-lg overflow-hidden">
               <div className="flex items-center justify-between px-4 py-3 bg-[#5a442a] text-white">
                  <span className="font-semibold">Hỗ trợ</span>
                  <button aria-label="Close chat" onClick={() => setOpen(false)}>
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
                     className="flex-1 border rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                     placeholder="Nhập tin nhắn..."
                  />
                  <button
                     onClick={onSend}
                     className="bg-[#5a442a] text-white rounded-md p-2 hover:bg-[#3e2f1e]"
                     aria-label="Send"
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


