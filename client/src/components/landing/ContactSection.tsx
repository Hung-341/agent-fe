import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface ContactSectionProps {
  onOpenChat: () => void;
}

const contactInfo = [
  {
    icon: Phone,
    title: "Điện thoại",
    content: "0903.780.128",
    subContent: "Đoàn Kim Chi - Giám đốc Kinh doanh",
  },
  {
    icon: Mail,
    title: "Email",
    content: "kimchi@aiciglobal.com",
    subContent: "Phản hồi trong vòng 24h",
  },
  {
    icon: MapPin,
    title: "Địa chỉ",
    content: "AICI Global",
    subContent: "TP. Hồ Chí Minh, Việt Nam",
  },
  {
    icon: Clock,
    title: "Hỗ trợ",
    content: "24/7",
    subContent: "AI Agent luôn sẵn sàng",
  },
];

export function ContactSection({ onOpenChat }: ContactSectionProps) {
  return (
    <section id="contact" className="py-24 bg-background">
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
            Liên hệ <span className="text-primary">với chúng tôi</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Đội ngũ chuyên gia sẵn sàng tư vấn và hỗ trợ bạn 24/7
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Contact Info Cards */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            ></motion.div>

            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="hover:shadow-md transition-shadow duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-muted-foreground mb-1">
                          {info.title}
                        </h4>
                        <p className="text-base font-semibold mb-1">
                          {info.content}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {info.subContent}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center"
          >
            <Card className="w-full bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5 border-primary/20">
              <CardContent className="p-8 md:p-12 text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
                  <Send className="w-8 h-8 text-primary" />
                </div>

                <h3 className="text-2xl md:text-3xl font-bold mb-4">
                  Nhận báo giá ngay
                </h3>
                <p className="text-muted-foreground mb-8">
                  Trò chuyện với Customer Service Agent của chúng tôi để nhận báo giá
                  chi tiết trong vòng 5 phút
                </p>

                <Button
                  onClick={onOpenChat}
                  size="lg"
                  className="w-full md:w-auto px-8 py-6 text-lg font-semibold"
                >
                  <Send className="w-5 h-5 mr-2" />
                  Bắt đầu trò chuyện
                </Button>

                <div className="mt-8 pt-8 border-t border-border"></div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Google Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-16"
        >
          <Card className="overflow-hidden">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.0227880879797!2d106.66124824038107!3d10.809566400721014!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3175298e2c46567b%3A0x5dfa081a0965cf1f!2zTeG7mWMgR2lhIExhbmQ!5e0!3m2!1svi!2s!4v1764207752901!5m2!1svi!2s"
              width="100%"
              height="400"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Bản đồ văn phòng"
            />
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
