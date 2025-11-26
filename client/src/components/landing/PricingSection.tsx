import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface PricingSectionProps {
  onOpenChat: () => void;
}

const pricingPlans = [
  {
    name: "Gói Cơ Bản",
    price: "Liên hệ",
    period: "",
    description: "Phù hợp cho doanh nghiệp vừa và nhỏ",
    features: [
      "500 cuộc trò chuyện/tháng",
      "Tích hợp đa kênh",
      "AI học dưới 20 sản phẩm",
      "AI Agent tư vấn tự động",
      "Dự đoán ý định mua hàng",
      "Tự động tạo đơn hàng",
      "Hỗ trợ sau bán hàng",
      "Tự báo admin khi case khó",
      "Chuyển đổi AI ↔ người thật",
      "Quản lý qua Google Sheet",
    ],
    notIncluded: ["AI học trên 100 sản phẩm", "Tích hợp CRM trực tiếp"],
    highlighted: false,
  },
  {
    name: "Gói Nâng Cao",
    price: "Liên hệ",
    period: "",
    description: "Giải pháp toàn diện cho mọi quy mô",
    features: [
      "Tất cả tính năng Gói Cơ Bản",
      "AI học dưới 100 sản phẩm",
      "Tích hợp CRM trực tiếp",
      "Tự động lên đơn trên CRM",
      "Phân tích chuyên sâu",
      "Omnichannel đầy đủ",
      "Tư vấn chiến lược",
      "Priority support",
    ],
    notIncluded: [],
    highlighted: true,
    badge: "Được đề xuất",
  },
  {
    name: "Giải Pháp Ngành",
    price: "Tùy chỉnh",
    period: "",
    description: "Tối ưu cho từng ngành cụ thể",
    features: [
      "E-commerce: Tự động hóa bán hàng",
      "Spa/Thẩm mỹ: Quản lý lịch hẹn",
      "Giáo dục: Giới thiệu khóa học",
      "Tùy chỉnh theo quy trình riêng",
      "Tích hợp hệ thống có sẵn",
      "AI training chuyên biệt",
      "Account manager riêng",
      "Support 24/7",
      "SLA cam kết",
      "Bảo mật nâng cao",
    ],
    notIncluded: [],
    highlighted: false,
  },
];

export function PricingSection({ onOpenChat }: PricingSectionProps) {
  return (
    <section id="pricing" className="py-24 bg-muted/30">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Bảng giá <span className="text-primary">linh hoạt</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Lựa chọn gói phù hợp với quy mô doanh nghiệp của bạn. Tất cả gói đều
            có 14 ngày dùng thử miễn phí.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={plan.highlighted ? "md:-mt-4" : ""}
            >
              <Card
                className={`h-full flex flex-col relative ${
                  plan.highlighted
                    ? "border-primary shadow-xl shadow-primary/10"
                    : "hover:shadow-lg transition-shadow duration-300"
                }`}
              >
                {plan.badge && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <Badge className="bg-primary text-primary-foreground px-4 py-1">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {plan.badge}
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-8 pt-8">
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-end justify-center gap-1">
                    {plan.price !== "Liên hệ" ? (
                      <>
                        <span className="text-4xl font-bold">{plan.price}</span>
                        <span className="text-muted-foreground mb-1">
                          ₫/{plan.period}
                        </span>
                      </>
                    ) : (
                      <span className="text-4xl font-bold">{plan.price}</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <ul className="space-y-3 mb-8 flex-1">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <Check className="w-5 h-5 text-chart-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                    {plan.notIncluded.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-3 opacity-40"
                      >
                        <Check className="w-5 h-5 flex-shrink-0 mt-0.5" />
                        <span className="text-sm line-through">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    onClick={onOpenChat}
                    className={`w-full ${
                      plan.highlighted ? "" : "variant-outline"
                    }`}
                    variant={plan.highlighted ? "default" : "outline"}
                    size="lg"
                  >
                    {plan.price === "Liên hệ"
                      ? "Liên hệ tư vấn"
                      : "Bắt đầu dùng thử"}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-center mt-12"
        ></motion.div>
      </div>
    </section>
  );
}
