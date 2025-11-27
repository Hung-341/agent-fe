import { motion } from "framer-motion";

export function TypingIndicator() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="flex gap-3 justify-start"
      data-testid="typing-indicator"
    >
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
      
      <div className="bg-muted px-4 py-3 rounded-2xl rounded-tl-md">
        <div className="flex gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-muted-foreground/50 rounded-full"
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                delay: i * 0.15,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  );
}
