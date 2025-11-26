import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

interface QuickReplyChipsProps {
  options: string[];
  onSelect: (option: string) => void;
  disabled?: boolean;
}

export function QuickReplyChips({ options, onSelect, disabled }: QuickReplyChipsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-wrap gap-2 justify-end"
    >
      {options.map((option, index) => (
        <motion.div
          key={option}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <Button
            variant="outline"
            size="sm"
            onClick={() => onSelect(option)}
            disabled={disabled}
            className="rounded-full px-4 py-2 text-sm font-medium border-primary/30 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            data-testid={`quick-reply-${option.replace(/\s+/g, '-').toLowerCase()}`}
          >
            {option}
          </Button>
        </motion.div>
      ))}
    </motion.div>
  );
}
