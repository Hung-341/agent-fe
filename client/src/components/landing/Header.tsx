import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface HeaderProps {
  onOpenChat: () => void;
}

export function Header({ onOpenChat }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-lg border-b border-border shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo - Hidden */}
          {/* <a href="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary flex items-center justify-center">
              <Bot className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-lg font-bold hidden sm:block">
              AICI Chatbot
            </span>
          </a> */}

          {/* Desktop Navigation - Hidden */}
          {/* <nav className="hidden md:flex items-center gap-8">
            <a
              href="#features"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Tính năng
            </a>
            <a
              href="#testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Khách hàng
            </a>
            <a
              href="#pricing"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Bảng giá
            </a>
            <a
              href="#contact"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Liên hệ
            </a>
          </nav> */}

          {/* CTA Buttons - Hidden */}
          {/* <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              className="hidden md:inline-flex"
              data-testid="button-header-login"
            >
              Đăng nhập
            </Button>
            <Button
              onClick={onOpenChat}
              className="hidden sm:inline-flex"
              data-testid="button-header-cta"
            >
              Nhận báo giá
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu-toggle"
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div> */}
        </div>
      </div>

      {/* Mobile Menu - Hidden */}
      {/* <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border"
          >
            <nav className="flex flex-col p-4 space-y-3">
              <a
                href="#features"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Tính năng
              </a>
              <a
                href="#testimonials"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Khách hàng
              </a>
              <a
                href="#pricing"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Bảng giá
              </a>
              <a
                href="#contact"
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors py-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Liên hệ
              </a>
              <div className="pt-2 space-y-2">
                <Button variant="outline" className="w-full">
                  Đăng nhập
                </Button>
                <Button
                  className="w-full"
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenChat();
                  }}
                >
                  Nhận báo giá
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence> */}
    </header>
  );
}
