import { Bot, Mail, Phone, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface FooterProps {
  onOpenChat: () => void;
}

export function Footer({ onOpenChat }: FooterProps) {
  return (
    <footer className="bg-card border-t border-card-border">
      {/* CTA Section */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-chart-3/10 rounded-2xl p-8 md:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold mb-4">
            Sẵn sàng tăng doanh số với AI?
          </h3>
          <p className="text-muted-foreground mb-6 max-w-xl mx-auto">
            Nhận báo giá miễn phí và demo trực tiếp trong 15 phút
          </p>
          <Button
            size="lg"
            onClick={onOpenChat}
            className="px-8 py-6 text-lg font-semibold rounded-xl"
            data-testid="button-footer-cta"
          >
            <Bot className="w-5 h-5 mr-2" />
            Tư vấn ngay
          </Button>
        </div>
      </div>

      {/* Main Footer */}
      <div className="border-t border-border">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Brand */}
            <div className="md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg bg-primary flex items-center justify-center">
                  <Bot className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-lg font-bold">AICI Chatbot</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Giải pháp bán hàng & CSKH tự động cho doanh nghiệp Việt. Powered
                by AICI Global.
              </p>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="font-semibold mb-4">Sản phẩm</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#features"
                    className="hover:text-foreground transition-colors"
                  >
                    Tính năng
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Bảng giá
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Tích hợp
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    API
                  </a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="font-semibold mb-4">Công ty</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Về chúng tôi
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Blog
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="hover:text-foreground transition-colors"
                  >
                    Tuyển dụng
                  </a>
                </li>
                <li>
                  <a
                    href="#testimonials"
                    className="hover:text-foreground transition-colors"
                  >
                    Khách hàng
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold mb-4">Liên hệ</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>kimchi@aiciglobal.com</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>0903.780.128</span>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 mt-0.5" />
                  <span>Đoàn Kim Chi - Giám đốc Kinh doanh</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="mt-12 pt-8 border-t border-border">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <h4 className="font-semibold mb-1">Đăng ký nhận tin</h4>
                <p className="text-sm text-muted-foreground">
                  Nhận tips và tin tức mới nhất về AI trong bán hàng
                </p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <Input
                  type="email"
                  placeholder="Email của bạn"
                  className="max-w-xs"
                  data-testid="input-newsletter-email"
                />
                <Button data-testid="button-newsletter-subscribe">
                  Đăng ký
                </Button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            <p>
              &copy; 2025 AICI Global. Customer Service Agent Chatbot - Giải pháp bán
              hàng tự động cho doanh nghiệp Việt.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
