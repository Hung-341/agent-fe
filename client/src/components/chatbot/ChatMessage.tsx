import { motion } from "framer-motion";
import type { ChatMessage as ChatMessageType } from "@shared/schema";

interface ChatMessageProps {
  message: ChatMessageType;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAssistant = message.role === "assistant";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isAssistant ? "justify-start" : "justify-end"}`}
      data-testid={`chat-message-${message.role}-${message.id}`}
    >
      {isAssistant && (
        <div 
          className="w-8 h-8 flex-shrink-0 rounded-full overflow-hidden"
          style={{ background: 'linear-gradient(to right, #48469d, #633e91, #c62b94)' }}
        >
          <div className="w-full h-full flex items-center justify-center">
            <img
              src="/AICI-square.png"
              alt="AICI"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}
      
      <div
        className={`max-w-[80%] px-4 py-3 rounded-2xl ${
          isAssistant
            ? "bg-muted text-foreground rounded-tl-md"
            : "text-white rounded-tr-md"
        }`}
        style={!isAssistant ? { background: 'linear-gradient(to right, #48469d, #633e91, #c62b94)' } : undefined}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
      </div>
    </motion.div>
  );
}
