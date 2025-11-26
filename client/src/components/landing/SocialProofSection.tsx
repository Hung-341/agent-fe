import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Nguyễn Văn Minh",
    role: "CEO, TechViet JSC",
    content: "AI Sales Agent đã giúp chúng tôi tăng 40% tỷ lệ chuyển đổi khách hàng trong 3 tháng đầu triển khai. Đội ngũ sales giờ có thể tập trung vào các deal lớn hơn.",
    rating: 5,
    initials: "NM",
  },
  {
    name: "Trần Thị Hương",
    role: "Marketing Director, ShopNow",
    content: "Chatbot hoạt động mượt mà trên cả website và Facebook. Khách hàng rất hài lòng với tốc độ phản hồi và độ chính xác của thông tin.",
    rating: 5,
    initials: "TH",
  },
  {
    name: "Lê Hoàng Nam",
    role: "Founder, StartupX",
    content: "Giải pháp tuyệt vời cho startup như chúng tôi. Tiết kiệm chi phí nhân sự đáng kể mà vẫn đảm bảo chất lượng chăm sóc khách hàng 24/7.",
    rating: 5,
    initials: "LN",
  },
  {
    name: "Phạm Quỳnh Anh",
    role: "Sales Manager, AutoParts VN",
    content: "Tích hợp dễ dàng, đội ngũ support rất chuyên nghiệp. AI học rất nhanh về sản phẩm của chúng tôi và tư vấn chính xác như nhân viên đã làm việc lâu năm.",
    rating: 5,
    initials: "PA",
  },
];

export function SocialProofSection() {
  return (
    <section id="testimonials" className="py-24 bg-background">
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
            Khách hàng <span className="text-primary">nói gì về chúng tôi</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hơn 500 doanh nghiệp đã tin tưởng và sử dụng AI Sales Agent để tối ưu hóa quy trình bán hàng.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300 border-card-border">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4 mb-4">
                    <Quote className="w-8 h-8 text-primary/30 flex-shrink-0" />
                    <p className="text-foreground leading-relaxed">
                      "{testimonial.content}"
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-border">
                    <div className="flex items-center gap-3">
                      <Avatar className="w-10 h-10">
                        <AvatarFallback className="bg-primary/10 text-primary text-sm font-medium">
                          {testimonial.initials}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-sm">{testimonial.name}</div>
                        <div className="text-xs text-muted-foreground">{testimonial.role}</div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-chart-4 text-chart-4" />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
