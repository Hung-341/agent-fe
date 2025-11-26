import { useState } from "react";
import { motion } from "framer-motion";
import { Send, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  inputType: "text" | "email" | "tel";
  placeholder: string;
  onSubmit: (value: string) => void;
  disabled?: boolean;
}

export function ChatInput({ inputType, placeholder, onSubmit, disabled }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  const validateInput = (val: string): boolean => {
    if (!val.trim()) {
      setError("Vui lòng nhập thông tin");
      return false;
    }

    if (inputType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(val)) {
        setError("Email không hợp lệ");
        return false;
      }
    }

    if (inputType === "tel") {
      const phoneRegex = /^[0-9]{9,11}$/;
      const cleanPhone = val.replace(/[\s-]/g, "");
      if (!phoneRegex.test(cleanPhone)) {
        setError("Số điện thoại không hợp lệ (9-11 số)");
        return false;
      }
    }

    setError("");
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateInput(value)) {
      onSubmit(value);
      setValue("");
    }
  };

  return (
    <motion.form
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="space-y-2"
    >
      <div className="flex gap-2">
        <Input
          type={inputType}
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            if (error) setError("");
          }}
          placeholder={placeholder}
          disabled={disabled}
          className={`flex-1 ${error ? "border-destructive focus-visible:ring-destructive" : ""}`}
          data-testid={`chat-input-${inputType}`}
        />
        <Button
          type="submit"
          size="icon"
          disabled={disabled || !value.trim()}
          data-testid="button-send-message"
        >
          <Send className="w-4 h-4" />
        </Button>
      </div>
      {error && (
        <motion.div
          initial={{ opacity: 0, y: -5 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-1 text-destructive text-sm"
        >
          <AlertCircle className="w-3 h-3" />
          <span>{error}</span>
        </motion.div>
      )}
    </motion.form>
  );
}
