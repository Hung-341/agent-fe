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
  // Greeting
  {
    id: "greeting",
    type: "assistant",
    message:
      "Xin chào! Tôi là Customer Service Agent. Rất vui được hỗ trợ bạn nhận báo giá cho giải pháp AI bán hàng.",
    field: "greeting",
  },
  {
    id: "intro",
    type: "assistant",
    message:
      "Trước tiên mình xin phép thu thập một vài thông tin nhanh để đề xuất gói phù hợp nhất cho bạn.",
    field: "intro",
  },
  {
    id: "privacy_commitment",
    type: "assistant",
    message:
      "Mọi thông tin bạn cung cấp sẽ được bảo mật tuyệt đối và chỉ sử dụng cho mục đích tư vấn.",
    field: "privacy_commitment",
  },

  // Thông tin công ty & liên hệ
  {
    id: "contact_info_transition",
    type: "assistant",
    message:
      "Đầu tiên, cho mình xin một vài thông tin cơ bản về công ty và cách liên hệ với bạn nhé.",
    field: "contact_info_transition",
  },
  {
    id: "company_name_prompt",
    type: "assistant",
    message: "Tên công ty của bạn là gì?",
    field: "company_name_prompt",
  },
  {
    id: "company_name",
    type: "input",
    inputType: "text",
    field: "companyName",
    placeholder: "Nhập tên công ty...",
  },
  {
    id: "contact_name_prompt",
    type: "assistant",
    message: "Mình có thể biết tên của bạn để tiện trao đổi không?",
    field: "contact_name_prompt",
  },
  {
    id: "contact_name",
    type: "input",
    inputType: "text",
    field: "name",
    placeholder: "Nhập tên của bạn...",
  },
  {
    id: "contact_transition",
    type: "assistant",
    message:
      "Cảm ơn bạn. Mình xin thêm vài thông tin liên hệ để gửi báo giá chi tiết.",
    field: "contact_transition",
  },
  {
    id: "contact_email_prompt",
    type: "assistant",
    message: "Bạn có thể cho mình xin email để gửi thông tin và báo giá?",
    field: "contact_email_prompt",
  },
  {
    id: "contact_email",
    type: "input",
    inputType: "email",
    field: "email",
    placeholder: "example@company.com",
  },
  {
    id: "contact_phone_prompt",
    type: "assistant",
    message: "Số điện thoại nào tiện để bên mình liên hệ khi cần?",
    field: "contact_phone_prompt",
  },
  {
    id: "contact_phone",
    type: "input",
    inputType: "tel",
    field: "phone",
    placeholder: "0912 345 678",
  },

  // Thông tin kinh doanh
  {
    id: "business_transition",
    type: "assistant",
    message:
      "Rồi, bây giờ mình tìm hiểu qua hoạt động kinh doanh của công ty nhé.",
    field: "business_transition",
  },
  {
    id: "business_products_prompt",
    type: "assistant",
    message: "Công ty bạn đang kinh doanh đơn hàng thuộc lĩnh vực nào?",
    field: "business_products_prompt",
  },
  {
    id: "business_products",
    type: "input",
    inputType: "text",
    field: "businessProducts",
    placeholder: "Mô tả lĩnh vực kinh doanh...",
  },
  {
    id: "sku_range_prompt",
    type: "assistant",
    message: "Số lượng loại đơn hàng/SKU của công ty bạn nằm trong khoảng nào?",
    field: "sku_range_prompt",
  },
  {
    id: "sku_range",
    type: "quick_reply",
    options: ["Dưới 50", "50 - 200", "200 - 1000", "Trên 1000"],
    field: "skuRange",
  },
  {
    id: "customer_volume_transition",
    type: "assistant",
    message:
      "Hiểu rõ lưu lượng khách sẽ giúp mình tính toán chính xác hơn.",
    field: "customer_volume_transition",
  },
  {
    id: "avg_monthly_units_prompt",
    type: "assistant",
    message:
      "Trung bình mỗi tháng có bao nhiêu khách hàng liên hệ qua tin nhắn, và trong số đó tỷ lệ khách hàng cũ chiếm bao nhiêu phần trăm?",
    field: "avg_monthly_units_prompt",
  },
  {
    id: "avg_monthly_units",
    type: "input",
    inputType: "text",
    field: "avgMonthlyUnits",
    placeholder: "Ví dụ: 200 khách/tháng, 30% khách cũ",
  },
  {
    id: "avg_revenue_prompt",
    type: "assistant",
    message: "Doanh thu trung bình cho mỗi đơn hàng khoảng bao nhiêu?",
    field: "avg_revenue_prompt",
  },
  {
    id: "avg_revenue",
    type: "input",
    inputType: "text",
    field: "avgRevenue",
    placeholder: "Ví dụ: 500.000 VNĐ",
  },

  // Thông tin đội sales
  {
    id: "sales_team_transition",
    type: "assistant",
    message:
      "Tiếp theo, mình cần vài thông tin về đội sales hiện tại.",
    field: "sales_team_transition",
  },
  {
    id: "sales_headcount_prompt",
    type: "assistant",
    message: "Hiện tại đội sales của công ty có bao nhiêu người?",
    field: "sales_headcount_prompt",
  },
  {
    id: "sales_headcount",
    type: "input",
    inputType: "text",
    field: "salesHeadcount",
    placeholder: "Ví dụ: 10",
  },
  {
    id: "avg_commission_prompt",
    type: "assistant",
    message: "Hoa hồng trung bình cho mỗi đơn hàng là khoảng bao nhiêu phần trăm?",
    field: "avg_commission_prompt",
  },
  {
    id: "avg_commission",
    type: "input",
    inputType: "text",
    field: "avgCommission",
    placeholder: "Ví dụ: 5%",
  },

  // Hiệu suất sales
  {
    id: "sales_process_transition",
    type: "assistant",
    message:
      "Cảm ơn bạn. Giờ mình sẽ hỏi thêm một chút về quy trình bán hàng.",
    field: "sales_process_transition",
  },
  {
    id: "avg_closing_time_prompt",
    type: "assistant",
    message: "Một sale thường mất bao lâu để tư vấn và chốt được một đơn hàng?",
    field: "avg_closing_time_prompt",
  },
  {
    id: "avg_closing_time",
    type: "quick_reply",
    options: ["Dưới 5 phút", "5 - 15 phút", "15 - 30 phút", "Trên 30 phút"],
    field: "avgClosingTime",
  },
  {
    id: "avg_close_rate_prompt",
    type: "assistant",
    message:
      "Tỷ lệ chốt đơn trung bình của bộ phận sales đối với khách hàng cũ và khách hàng mới lần lượt là bao nhiêu phần trăm?",
    field: "avg_close_rate_prompt",
  },
  {
    id: "avg_close_rate",
    type: "input",
    inputType: "text",
    field: "avgCloseRate",
    placeholder: "Ví dụ: Khách cũ 50%, khách mới 20%",
  },

  // Nhân sự sales
  {
    id: "hr_transition",
    type: "assistant",
    message:
      "Mình cần nốt vài thông tin về nhân sự để hoàn thiện phân tích.",
    field: "hr_transition",
  },
  {
    id: "avg_sales_tenure_prompt",
    type: "assistant",
    message: "Một nhân sự sales thường gắn bó trung bình bao lâu?",
    field: "avg_sales_tenure_prompt",
  },
  {
    id: "avg_sales_tenure",
    type: "quick_reply",
    options: ["Dưới 3 tháng", "3 - 6 tháng", "6 - 12 tháng", "Trên 12 tháng"],
    field: "avgSalesTenure",
  },
  {
    id: "onboarding_time_prompt",
    type: "assistant",
    message: "Một nhân sự sales mới cần bao lâu để bắt đầu bán được?",
    field: "onboarding_time_prompt",
  },
  {
    id: "onboarding_time",
    type: "quick_reply",
    options: ["Dưới 1 tuần", "1 - 2 tuần", "2 - 4 tuần", "Trên 1 tháng"],
    field: "onboardingTime",
  },

  // KPI
  {
    id: "kpi_transition",
    type: "assistant",
    message:
      "Câu cuối cùng để hoàn chỉnh bức tranh tổng quan.",
    field: "kpi_transition",
  },
  {
    id: "sales_kpi_prompt",
    type: "assistant",
    message: "Những KPI chính mà đội sales đang theo dõi là gì?",
    field: "sales_kpi_prompt",
  },
  {
    id: "sales_kpi",
    type: "input",
    inputType: "text",
    field: "salesKpi",
    placeholder: "Ví dụ: Doanh số, tỷ lệ chốt, số cuộc gọi...",
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
      companyName: string;
      name: string;
      email: string;
      phone: string;
      businessProducts: string;
      skuRange: string;
      avgMonthlyUnits: string;
      avgRevenue: string;
      salesHeadcount: string;
      avgCommission: string;
      avgClosingTime: string;
      avgCloseRate: string;
      avgSalesTenure: string;
      onboardingTime: string;
      salesKpi: string;
    }) => {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbyVD4V3QDzLOPtEnWbLqe8UVHIc7cYYfWMio-AnGq9K7geqem4UjJTflKjn6-gQuVU/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      return response;
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
          companyName: (data.companyName as string) || "",
          name: (data.name as string) || "",
          email: (data.email as string) || "",
          phone: (data.phone as string) || "",
          businessProducts: (data.businessProducts as string) || "",
          skuRange: (data.skuRange as string) || "",
          avgMonthlyUnits: (data.avgMonthlyUnits as string) || "",
          avgRevenue: (data.avgRevenue as string) || "",
          salesHeadcount: (data.salesHeadcount as string) || "",
          avgCommission: (data.avgCommission as string) || "",
          avgClosingTime: (data.avgClosingTime as string) || "",
          avgCloseRate: (data.avgCloseRate as string) || "",
          avgSalesTenure: (data.avgSalesTenure as string) || "",
          onboardingTime: (data.onboardingTime as string) || "",
          salesKpi: (data.salesKpi as string) || "",
        };

        try {
          await submitLeadMutation.mutateAsync(leadData);
        } catch (error) {
          console.error("Failed to submit lead:", error);
        }

        addAssistantMessage(
          `Cảm ơn ${
            data.name || "bạn"
          }! Chúng tôi đã nhận thông tin của ${
            data.companyName || "công ty bạn"
          }.\n\nĐội ngũ tư vấn sẽ liên hệ qua ${
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
          setTimeout(resolve, 1000)
        );
        setIsTyping(false);

        if (step.message) {
          addAssistantMessage(step.message);
        }

        isProcessing.current = false;
        const nextIndex = stepIndex + 1;
        setCurrentStepIndex(nextIndex);

        await new Promise((resolve) => setTimeout(resolve, 300));
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

  // Chỉ ẩn modal, không reset state
  const handleBackdropClick = () => {
    onClose();
  };

  // Reset state và đóng modal khi nhấn nút X
  const handleClose = () => {
    hasStarted.current = false;
    isProcessing.current = false;
    setMessages([]);
    setCurrentStepIndex(0);
    setIsTyping(false);
    setIsComplete(false);
    setCollectedData({});
    setShowInput(false);
    setCurrentInputStep(0);
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
            onClick={handleBackdropClick}
            className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40"
            data-testid="chatbot-backdrop"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed inset-4 md:inset-auto md:bottom-6 md:right-6 md:top-auto md:left-auto md:w-full md:max-w-lg md:h-[85vh] md:max-h-[600px] z-50 flex flex-col bg-background rounded-2xl shadow-2xl overflow-hidden"
            style={{ border: '2px solid transparent', backgroundClip: 'padding-box', boxShadow: '0 0 0 2px rgba(72, 70, 157, 0.3), 0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
            data-testid="chatbot-modal"
          >
            {/* Header */}
            <div 
              className="flex items-center justify-between px-4 py-3 text-white"
              style={{ background: 'linear-gradient(to right, #48469d, #633e91, #c62b94)' }}
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white overflow-hidden">
                  <img
                    src="/AICI-square.png"
                    alt="AICI Sales Agent"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-semibold text-sm text-white">AICI Sales Agent</h3>
                  <p className="text-xs text-white/80">
                    Tư vấn báo giá
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClose}
                className="text-white hover:bg-white/20"
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
                      <Bot className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Công ty:</span>
                      <span
                        className="font-medium"
                        data-testid="text-collected-company"
                      >
                        {(collectedData.companyName as string) || "-"}
                      </span>
                    </div>
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
                    fieldName={currentStep.field}
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
