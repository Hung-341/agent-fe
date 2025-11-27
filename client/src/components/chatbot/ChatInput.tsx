import { useState } from "react";
import { motion } from "framer-motion";
import { Send, AlertCircle, SkipForward } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// Validation rules cho từng field
type ValidationRule = {
  type: "integer" | "number" | "currency" | "string";
  required: boolean;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
};

const fieldValidationRules: Record<string, ValidationRule> = {
  avgMonthlyUnits: {
    type: "string",
    required: true,
    minLength: 3,
    maxLength: 200,
    pattern: /^(?!([aA]+|[0-9]+)$).*$/,
    patternMessage: "Vui lòng nhập đầy đủ thông tin (số khách và tỷ lệ khách cũ)",
  },
  avgRevenue: {
    type: "currency",
    required: true,
    min: 1000,
    max: 1000000000,
  },
  salesHeadcount: {
    type: "integer",
    required: true,
    min: 0,
    max: 5000,
  },
  avgCommission: {
    type: "number",
    required: true,
    min: 0,
    max: 100,
  },
  avgCloseRate: {
    type: "string",
    required: true,
    minLength: 3,
    maxLength: 200,
    pattern: /^(?!([aA]+|[0-9]+)$).*$/,
    patternMessage: "Vui lòng nhập đầy đủ tỷ lệ chốt đơn (khách cũ và khách mới)",
  },
  salesKpi: {
    type: "string",
    required: false,
    minLength: 0,
    maxLength: 2000,
    pattern: /^(?!([aA]+|[0-9]+)$).*$/,
    patternMessage: "Vui lòng nhập nội dung có ý nghĩa",
  },
};

interface ChatInputProps {
  inputType: "text" | "email" | "tel";
  placeholder: string;
  onSubmit: (value: string) => void;
  disabled?: boolean;
  fieldName?: string;
}

export function ChatInput({ inputType, placeholder, onSubmit, disabled, fieldName }: ChatInputProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState("");

  // Lấy validation rule cho field hiện tại
  const rule = fieldName ? fieldValidationRules[fieldName] : undefined;
  const isOptional = rule?.required === false;

  // Parse số từ chuỗi (hỗ trợ format VN: 500,000 hoặc 500.000)
  const parseNumber = (val: string): number | null => {
    const cleaned = val.replace(/[^0-9.,\-]/g, "").replace(/\./g, "").replace(/,/g, ".");
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  };

  // Parse số tiền VND (hỗ trợ: 500.000, 500,000, 500 000, 500000 VND/VNĐ/đ/đồng)
  const parseCurrency = (val: string): number | null => {
    // Loại bỏ ký hiệu tiền tệ và khoảng trắng thừa
    const cleaned = val
      .replace(/\s*(VND|VNĐ|đồng|đ)\s*/gi, "")
      .replace(/\s+/g, "")  // Loại bỏ khoảng trắng (format: 500 000)
      .replace(/\./g, "")   // Loại bỏ dấu chấm phân cách nghìn (format: 500.000)
      .replace(/,/g, "");   // Loại bỏ dấu phẩy phân cách nghìn (format: 500,000)
    
    const num = parseFloat(cleaned);
    return isNaN(num) ? null : num;
  };

  const validateInput = (val: string): boolean => {
    const trimmedVal = val.trim();

    // Kiểm tra field optional - cho phép bỏ qua
    if (!trimmedVal && isOptional) {
      setError("");
      return true;
    }

    // Kiểm tra required
    if (!trimmedVal) {
      setError("Vui lòng nhập thông tin");
      return false;
    }

    // Validation theo inputType cơ bản
    if (inputType === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(trimmedVal)) {
        setError("Email không hợp lệ");
        return false;
      }
    }

    if (inputType === "tel") {
      const phoneRegex = /^[0-9]{9,11}$/;
      const cleanPhone = trimmedVal.replace(/[\s\-]/g, "");
      if (!phoneRegex.test(cleanPhone)) {
        setError("Số điện thoại không hợp lệ (9-11 số)");
        return false;
      }
    }

    // Validation theo field-specific rules
    if (rule) {
      // Validate số nguyên
      if (rule.type === "integer") {
        const num = parseNumber(trimmedVal);
        if (num === null || !Number.isInteger(num)) {
          setError("Vui lòng nhập số nguyên");
          return false;
        }
        if (rule.min !== undefined && num < rule.min) {
          setError(`Giá trị tối thiểu là ${rule.min.toLocaleString("vi-VN")}`);
          return false;
        }
        if (rule.max !== undefined && num > rule.max) {
          setError(`Giá trị tối đa là ${rule.max.toLocaleString("vi-VN")}`);
          return false;
        }
      }

      // Validate số thực (bao gồm phần trăm)
      if (rule.type === "number") {
        const num = parseNumber(trimmedVal);
        if (num === null) {
          setError("Vui lòng nhập số hợp lệ");
          return false;
        }
        if (rule.min !== undefined && num < rule.min) {
          setError(`Giá trị tối thiểu là ${rule.min.toLocaleString("vi-VN")}`);
          return false;
        }
        if (rule.max !== undefined && num > rule.max) {
          setError(`Giá trị tối đa là ${rule.max.toLocaleString("vi-VN")}`);
          return false;
        }
      }

      // Validate số tiền (currency) - hỗ trợ format VND
      if (rule.type === "currency") {
        const num = parseCurrency(trimmedVal);
        if (num === null) {
          setError("Vui lòng nhập số tiền hợp lệ (VD: 500.000 hoặc 500000 VND)");
          return false;
        }
        if (rule.min !== undefined && num < rule.min) {
          setError(`Số tiền tối thiểu là ${rule.min.toLocaleString("vi-VN")} VND`);
          return false;
        }
        if (rule.max !== undefined && num > rule.max) {
          setError(`Số tiền tối đa là ${rule.max.toLocaleString("vi-VN")} VND`);
          return false;
        }
      }

      // Validate string length
      if (rule.type === "string") {
        if (rule.minLength !== undefined && trimmedVal.length < rule.minLength) {
          setError(`Tối thiểu ${rule.minLength} ký tự`);
          return false;
        }
        if (rule.maxLength !== undefined && trimmedVal.length > rule.maxLength) {
          setError(`Tối đa ${rule.maxLength} ký tự`);
          return false;
        }
      }

      // Validate pattern
      if (rule.pattern && trimmedVal && !rule.pattern.test(trimmedVal)) {
        setError(rule.patternMessage || "Nội dung không hợp lệ");
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

  const handleSkip = () => {
    if (isOptional) {
      onSubmit("");
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
          className={`flex-1 ${error ? "border-destructive focus-visible:ring-destructive" : "focus-visible:ring-[#48469d]"}`}
          style={{ borderColor: error ? undefined : '#48469d40' }}
          data-testid={`chat-input-${inputType}`}
        />
        {isOptional && (
          <Button
            type="button"
            size="icon"
            variant="outline"
            onClick={handleSkip}
            disabled={disabled}
            title="Bỏ qua"
            data-testid="button-skip"
          >
            <SkipForward className="w-4 h-4" />
          </Button>
        )}
        <Button
          type="submit"
          size="icon"
          disabled={disabled || (!value.trim() && !isOptional)}
          className="text-white"
          style={{ background: 'linear-gradient(to right, #48469d, #633e91, #c62b94)' }}
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
