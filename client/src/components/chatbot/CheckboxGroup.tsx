import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CheckboxGroupProps {
  options: string[];
  onSubmit: (selected: string[]) => void;
  disabled?: boolean;
}

export function CheckboxGroup({ options, onSubmit, disabled }: CheckboxGroupProps) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (option: string) => {
    setSelected((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    if (selected.length > 0) {
      onSubmit(selected);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-3"
    >
      <div className="flex flex-wrap gap-2 justify-end">
        {options.map((option, index) => {
          const isSelected = selected.includes(option);
          return (
            <motion.button
              key={option}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              type="button"
              onClick={() => toggleOption(option)}
              disabled={disabled}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                isSelected
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-background text-foreground border-border hover:border-primary/50"
              }`}
              data-testid={`checkbox-${option.replace(/\s+/g, '-').toLowerCase()}`}
            >
              <div
                className={`w-4 h-4 rounded border flex items-center justify-center transition-all ${
                  isSelected
                    ? "bg-primary-foreground border-primary-foreground"
                    : "border-current"
                }`}
              >
                {isSelected && <Check className="w-3 h-3 text-primary" />}
              </div>
              {option}
            </motion.button>
          );
        })}
      </div>
      <div className="flex justify-end">
        <Button
          onClick={handleSubmit}
          disabled={disabled || selected.length === 0}
          size="sm"
          className="rounded-full"
          data-testid="button-submit-channels"
        >
          <Send className="w-4 h-4 mr-2" />
          Xác nhận ({selected.length})
        </Button>
      </div>
    </motion.div>
  );
}
