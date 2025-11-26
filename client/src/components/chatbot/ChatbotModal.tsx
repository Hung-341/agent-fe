import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  CheckCircle2,
  Bot,
  RefreshCw,
  Mail,
  Phone,
  User,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ChatMessage } from "./ChatMessage";
import { TypingIndicator } from "./TypingIndicator";
import { QuickReplyChips } from "./QuickReplyChips";
import { ChatInput } from "./ChatInput";
import { CheckboxGroup } from "./CheckboxGroup";
import { ProgressBar } from "./ProgressBar";
import type { ChatMessage as ChatMessageType } from "@shared/schema";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";

interface ChatbotModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type ChatStep = {
  id: string;
  type: "assistant" | "quick_reply" | "input" | "checkbox";
  message?: string;
  options?: string[];
  inputType?: "text" | "email" | "tel";
  field: string;
  placeholder?: string;
};

const chatScript: ChatStep[] = [
  {
    id: "greeting",
    type: "assistant",
    message:
      "Xin chào! Tôi là AI Sales Agent. Rất vui được hỗ trợ bạn nhận báo giá cho giải pháp AI bán hàng.",
    field: "greeting",
  },
  {
    id: "name_prompt",
    type: "assistant",
    message: "Để bắt đầu, cho tôi biết tên của bạn nhé?",
    field: "name_prompt",
  },
  {
    id: "name",
    type: "input",
    inputType: "text",
    field: "name",
    placeholder: "Nhập tên của bạn...",
  },
  {
    id: "sku_question",
    type: "assistant",
    message:
      "Cảm ơn bạn! Doanh nghiệp của bạn hiện đang có bao nhiêu sản phẩm (SKU)?",
    field: "sku_question",
  },
  {
    id: "sku_range",
    type: "quick_reply",
    options: ["Dưới 50 SKU", "50 - 200 SKU", "200 - 1000 SKU", "Trên 1000 SKU"],
    field: "skuRange",
  },
  {
    id: "channels_question",
    type: "assistant",
    message:
      "Tuyệt vời! Bạn đang bán hàng trên những kênh nào? (Có thể chọn nhiều)",
    field: "channels_question",
  },
  {
    id: "channels",
    type: "checkbox",
    options: [
      "Website",
      "Facebook",
      "Zalo",
      "Shopee",
      "Lazada",
      "TikTok Shop",
      "Khác",
    ],
    field: "channels",
  },
  {
    id: "email_question",
    type: "assistant",
    message: "Để gửi báo giá chi tiết, vui lòng cho tôi email của bạn:",
    field: "email_question",
  },
  {
    id: "email",
    type: "input",
    inputType: "email",
    field: "email",
    placeholder: "example@company.com",
  },
  {
    id: "phone_question",
    type: "assistant",
    message: "Và số điện thoại để tư vấn viên liên hệ khi cần:",
    field: "phone_question",
  },
  {
    id: "phone",
    type: "input",
    inputType: "tel",
    field: "phone",
    placeholder: "0912 345 678",
  },
];

const inputSteps = chatScript.filter((s) => s.type !== "assistant");
const totalInputSteps = inputSteps.length;

export function ChatbotModal({ isOpen, onClose }: ChatbotModalProps) {
  const [, setLocation] = useLocation();
  const [messages, setMessages] = useState<ChatMessageType[]>([]);
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [collectedData, setCollectedData] = useState<Record<string, unknown>>(
    {}
  );
  const [showInput, setShowInput] = useState(false);
  const [currentInputStep, setCurrentInputStep] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const hasStarted = useRef(false);
  const isProcessing = useRef(false);

  const submitLeadMutation = useMutation({
    mutationFn: async (data: {
      name: string;
      email: string;
      phone: string;
      skuRange: string;
      channels: string[];
      additionalInfo: string | null;
    }) => {
      const response = await apiRequest("POST", "/api/leads", data);
      return response.json();
    },
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping, showInput]);

  const addAssistantMessage = useCallback((content: string) => {
    const newMessage: ChatMessageType = {
      id: `assistant-${Date.now()}-${Math.random()}`,
      role: "assistant",
      content,
      type: "text",
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const addUserMessage = useCallback((content: string) => {
    const newMessage: ChatMessageType = {
      id: `user-${Date.now()}-${Math.random()}`,
      role: "user",
      content,
      type: "text",
    };
    setMessages((prev) => [...prev, newMessage]);
  }, []);

  const processStep = useCallback(
    async (stepIndex: number, data: Record<string, unknown>) => {
      if (isProcessing.current) return;

      if (stepIndex >= chatScript.length) {
        isProcessing.current = true;
        setIsTyping(true);
        await new Promise((resolve) => setTimeout(resolve, 800));
        setIsTyping(false);

        const leadData = {
          name: (data.name as string) || "",
          email: (data.email as string) || "",
          phone: (data.phone as string) || "",
          skuRange: (data.skuRange as string) || "",
          channels: (data.channels as string[]) || [],
          additionalInfo: null,
        };

        try {
          await submitLeadMutation.mutateAsync(leadData);
        } catch (error) {
          console.error("Failed to submit lead:", error);
        }

        addAssistantMessage(
          `Cảm ơn ${
            data.name || "bạn"
          }! Chúng tôi đã nhận thông tin của bạn.\n\nĐội ngũ tư vấn sẽ liên hệ qua ${
            data.email || "email"
          } hoặc ${
            data.phone || "số điện thoại"
          } trong vòng 24 giờ để gửi báo giá chi tiết.\n\nChúc bạn một ngày tốt lành!`
        );
        setIsComplete(true);
        isProcessing.current = false;
        return;
      }

      const step = chatScript[stepIndex];

      if (step.type === "assistant") {
        isProcessing.current = true;
        setShowInput(false);
        setIsTyping(true);
        await new Promise((resolve) =>
          setTimeout(resolve, 600 + Math.random() * 400)
        );
        setIsTyping(false);

        if (step.message) {
          addAssistantMessage(step.message);
        }

        isProcessing.current = false;
        const nextIndex = stepIndex + 1;
        setCurrentStepIndex(nextIndex);

        await new Promise((resolve) => setTimeout(resolve, 200));
        processStep(nextIndex, data);
      } else {
        const inputIndex = inputSteps.findIndex((s) => s.id === step.id);
        setCurrentInputStep(inputIndex + 1);
        setShowInput(true);
      }
    },
    [addAssistantMessage, submitLeadMutation]
  );

  useEffect(() => {
    if (isOpen && !hasStarted.current) {
      hasStarted.current = true;
      setMessages([]);
      setCurrentStepIndex(0);
      setIsComplete(false);
      setCollectedData({});
      setShowInput(false);
      setCurrentInputStep(0);
      isProcessing.current = false;

      setTimeout(() => {
        processStep(0, {});
      }, 300);
    }
  }, [isOpen, processStep]);

  const handleUserResponse = async (value: string | string[]) => {
    const currentStep = chatScript[currentStepIndex];

    const displayValue = Array.isArray(value) ? value.join(", ") : value;
    addUserMessage(displayValue);

    const newData = {
      ...collectedData,
      [currentStep.field]: value,
    };
    setCollectedData(newData);

    setShowInput(false);

    await new Promise((resolve) => setTimeout(resolve, 300));

    const nextIndex = currentStepIndex + 1;
    setCurrentStepIndex(nextIndex);
    processStep(nextIndex, newData);
  };

  const handleReset = () => {
    setMessages([]);
    setCurrentStepIndex(0);
    setIsTyping(false);
    setIsComplete(false);
    setCollectedData({});
    setShowInput(false);
    setCurrentInputStep(0);
    hasStarted.current = false;
    isProcessing.current = false;

    setTimeout(() => {
      hasStarted.current = true;
      processStep(0, {});
    }, 100);
  };

  const handleClose = () => {
    hasStarted.current = false;
    isProcessing.current = false;
    onClose();
  };

  const handleViewDetails = () => {
    hasStarted.current = false;
    isProcessing.current = false;
    onClose();
    setLocation("/thank-you");
  };

  const currentStep = chatScript[currentStepIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            data-testid="chatbot-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-auto md:bottom-6 md:right-6 md:top-auto md:left-auto md:w-full md:max-w-lg md:h-[85vh] md:max-h-[600px] z-50 flex flex-col bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
            data-testid="chatbot-modal"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm">AI Sales Agent</h3>
                  <p className="text-xs text-muted-foreground">
                    Tư vấn báo giá
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                data-testid="button-close-chatbot"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Progress Bar */}
            {!isComplete && (
              <ProgressBar
                currentStep={currentInputStep}
                totalSteps={totalInputSteps}
              />
            )}

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))}

              {isTyping && <TypingIndicator />}

              {/* Completion State */}
              {isComplete && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-chart-2/10 flex items-center justify-center mb-4">
                    <CheckCircle2 className="w-8 h-8 text-chart-2" />
                  </div>
                  <h4 className="font-semibold text-lg mb-2">
                    Đã nhận thông tin!
                  </h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Chúng tôi sẽ liên hệ trong 24 giờ
                  </p>

                  {/* Summary of collected data */}
                  <div className="w-full max-w-xs bg-muted/50 rounded-lg p-4 mb-4 text-left space-y-2">
                    <div className="flex items-center gap-2 text-sm">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Tên:</span>
                      <span
                        className="font-medium"
                        data-testid="text-collected-name"
                      >
                        {(collectedData.name as string) || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Email:</span>
                      <span
                        className="font-medium"
                        data-testid="text-collected-email"
                      >
                        {(collectedData.email as string) || "-"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">SĐT:</span>
                      <span
                        className="font-medium"
                        data-testid="text-collected-phone"
                      >
                        {(collectedData.phone as string) || "-"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 w-full max-w-xs">
                    <Button
                      onClick={handleViewDetails}
                      className="w-full"
                      data-testid="button-view-details"
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      Xem chi tiết
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        onClick={handleClose}
                        className="flex-1"
                        data-testid="button-close-complete"
                      >
                        Đóng
                      </Button>
                      <Button
                        variant="outline"
                        onClick={handleReset}
                        className="flex-1"
                        data-testid="button-start-new"
                      >
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Mới
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Fixed Input Area at Bottom */}
            {showInput && currentStep && !isComplete && (
              <div className="border-t border-border bg-background p-3">
                {currentStep.type === "quick_reply" && currentStep.options && (
                  <QuickReplyChips
                    options={currentStep.options}
                    onSelect={handleUserResponse}
                  />
                )}

                {currentStep.type === "input" && currentStep.inputType && (
                  <ChatInput
                    inputType={currentStep.inputType}
                    placeholder={
                      currentStep.placeholder || "Nhập câu trả lời..."
                    }
                    onSubmit={handleUserResponse}
                  />
                )}

                {currentStep.type === "checkbox" && currentStep.options && (
                  <CheckboxGroup
                    options={currentStep.options}
                    onSubmit={handleUserResponse}
                  />
                )}
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
