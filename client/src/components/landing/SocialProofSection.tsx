import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const testimonials = [
  {
    name: "Nguyễn Văn Minh",
    role: "CEO, TechViet JSC",
    content:
      "Customer Service Agent đã giúp chúng tôi tăng 40% tỷ lệ chuyển đổi khách hàng trong 3 tháng đầu triển khai. Đội ngũ sales giờ có thể tập trung vào các deal lớn hơn.",
    rating: 5,
    initials: "NM",
  },
  {
    name: "Trần Thị Hương",
    role: "Marketing Director, ShopNow",
    content:
      "Chatbot hoạt động mượt mà trên cả website và Facebook. Khách hàng rất hài lòng với tốc độ phản hồi và độ chính xác của thông tin.",
    rating: 5,
    initials: "TH",
  },
  {
    name: "Lê Hoàng Nam",
    role: "Founder, StartupX",
    content:
      "Giải pháp tuyệt vời cho startup như chúng tôi. Tiết kiệm chi phí nhân sự đáng kể mà vẫn đảm bảo chất lượng chăm sóc khách hàng 24/7.",
    rating: 5,
    initials: "LN",
  },
  {
    name: "Phạm Quỳnh Anh",
    role: "Sales Manager, AutoParts VN",
    content:
      "Tích hợp dễ dàng, đội ngũ support rất chuyên nghiệp. AI học rất nhanh về sản phẩm của chúng tôi và tư vấn chính xác như nhân viên đã làm việc lâu năm.",
    rating: 5,
    initials: "PA",
  },
];

const companies = [
  { name: "MBS", color: "#1E3A8A", logo: "/mbs.jpg" },
  { name: "10X VALUE", color: "#F59E0B", logo: "/10x-value.jpg" },
  { name: "OneAds", color: "#EF4444", logo: "/oneads.jpg" },
  { name: "SeniArt", color: "#8B5CF6", logo: "/seniart.jpg" },
  { name: "Mộc Gia", color: "#059669", logo: "/mocgia.jpg" },
  { name: "MB", color: "#1D4ED8", logo: "/Mb.jpg" },
  { name: "VietinBank", color: "#DC2626", logo: "/vietinbanl.jpg" },
  { name: "FPT Polytechnic", color: "#F97316", logo: "/fpt.jpg" },
];

export function SocialProofSection() {
  return (
    <section id="testimonials" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        {/* Trusted By Companies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-20"
        >
          {/* Decorative background */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-3xl" />

            <div className="relative bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-12">
              <div className="text-center mb-10">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4"
                >
                  <div className="flex -space-x-2">
                    <div className="w-6 h-6 rounded-full bg-primary/20 border-2 border-background" />
                    <div className="w-6 h-6 rounded-full bg-primary/30 border-2 border-background" />
                    <div className="w-6 h-6 rounded-full bg-primary/40 border-2 border-background" />
                  </div>
                  <span className="text-sm font-semibold text-primary">
                    500+ doanh nghiệp
                  </span>
                </motion.div>
                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                  Được tin dùng bởi các thương hiệu hàng đầu
                </h3>
                <p className="text-muted-foreground">
                  Từ startup đến tập đoàn lớn, Customer Service Agent là lựa chọn của
                  nhiều doanh nghiệp
                </p>
              </div>

              {/* Scrolling Carousel */}
              <div className="relative overflow-hidden">
                {/* Gradient overlays */}
                <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-card/50 to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-card/50 to-transparent z-10 pointer-events-none" />

                <motion.div
                  className="flex gap-6"
                  animate={{
                    x: [0, -1920],
                  }}
                  transition={{
                    x: {
                      repeat: Infinity,
                      repeatType: "loop",
                      duration: 20,
                      ease: "linear",
                    },
                  }}
                >
                  {/* Render companies twice for seamless loop */}
                  {[...companies, ...companies].map((company, index) => (
                    <div
                      key={`${company.name}-${index}`}
                      className="group relative bg-background border border-border rounded-xl px-8 py-6 flex items-center justify-center hover:shadow-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer flex-shrink-0 min-w-[200px]"
                      style={{
                        borderColor: `${company.color}20`,
                      }}
                    >
                      <div
                        className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `linear-gradient(135deg, ${company.color}10, transparent)`,
                        }}
                      />
                      <img
                        src={company.logo}
                        alt={company.name}
                        className="relative h-10 w-auto max-w-[160px] object-contain transition-all duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                  ))}
                </motion.div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16 mt-20"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Khách hàng <span className="text-primary">nói gì về chúng tôi</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Hơn 500 doanh nghiệp đã tin tưởng và sử dụng Customer Service Agent để tối
            ưu hóa quy trình bán hàng.
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
                        <div className="font-semibold text-sm">
                          {testimonial.name}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.role}
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: testimonial.rating }).map(
                        (_, i) => (
                          <Star
                            key={i}
                            className="w-4 h-4 fill-chart-4 text-chart-4"
                          />
                        )
                      )}
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
