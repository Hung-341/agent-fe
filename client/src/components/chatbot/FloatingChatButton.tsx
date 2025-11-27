import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FloatingChatButtonProps {
  onClick: () => void;
}

export function FloatingChatButton({ onClick }: FloatingChatButtonProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
      className="hidden md:block fixed bottom-6 right-6 z-30"
    >
      <motion.div
        animate={{
          boxShadow: [
            "0 0 0 0 rgba(72, 70, 157, 0.4)",
            "0 0 0 15px rgba(72, 70, 157, 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          repeatDelay: 1,
        }}
        className="rounded-full"
      >
        <Button
          onClick={onClick}
          size="lg"
          className="w-16 h-16 rounded-full shadow-lg shadow-primary/25 text-white"
          style={{ background: 'linear-gradient(to right, #48469d, #633e91, #c62b94)' }}
          data-testid="button-floating-chat"
        >
          <MessageCircle className="w-6 h-6" />
        </Button>
      </motion.div>
    </motion.div>
  );
}
