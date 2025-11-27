import { Button } from "@/components/ui/button";
import { Bot, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

interface HeroSectionProps {
  onOpenChat: () => void;
}

export function HeroSection({ onOpenChat }: HeroSectionProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-primary/5 to-transparent rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          {/* Badge - Hidden */}
          {/* <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20"
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium text-primary">
              AI-Powered Sales Automation
            </span>
          </motion.div> */}

          {/* Main Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight"
          >
            <span className="text-foreground">Tự động hóa bán hàng với</span>
            <br />
            <span 
              className="bg-clip-text text-transparent"
              style={{ backgroundImage: 'linear-gradient(to right, #48469d, #633e91, #c62b94)' }}
            >
              Customer Service Agent
            </span>
          </motion.h1>

          {/* CTA Buttons - Mobile: show here with pulse effect, Desktop: hidden */}
          <motion.div
            initial={{ opacity: 0, scale: 0, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 1, type: "spring", stiffness: 200 }}
            className="flex md:hidden items-center justify-center pt-4"
          >
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 0 0 rgba(59, 130, 246, 0.4)",
                  "0 0 0 15px rgba(59, 130, 246, 0)",
                ],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="rounded-xl"
            >
              <Button
                size="lg"
                onClick={onOpenChat}
                className="group px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-white"
                style={{ background: 'linear-gradient(to right, #48469d, #633e91, #c62b94)' }}
                data-testid="button-hero-cta-mobile"
              >
                <Bot className="w-5 h-5 mr-2" />
                Nhận báo giá ngay
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>
          </motion.div>

          {/* Subheadline */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-muted-foreground leading-relaxed"
          >
            Giải pháp bán hàng & CSKH tự động cho doanh nghiệp Việt. Tăng hiệu
            quả bán hàng, giảm mạnh chi phí vận hành với trải nghiệm khách hàng
            chuyên nghiệp.
          </motion.p>

          {/* CTA Buttons - Desktop: show here, Mobile: hidden */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="hidden md:flex items-center justify-center pt-4"
          >
            <Button
              size="lg"
              onClick={onOpenChat}
              className="group px-8 py-6 text-lg font-semibold rounded-xl shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 text-white"
              style={{ background: 'linear-gradient(to right, #48469d, #633e91, #c62b94)' }}
              data-testid="button-hero-cta"
            >
              <Bot className="w-5 h-5 mr-2" />
              Nhận báo giá ngay
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            {/* <Button
              variant="outline"
              size="lg"
              className="px-8 py-6 text-lg font-semibold rounded-xl"
              data-testid="button-hero-secondary"
            >
              Tìm hiểu thêm
            </Button> */}
          </motion.div>

          {/* Trust indicators - Stats - Hidden */}
          {/* <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="pt-12"
          >
            <div className="flex items-center justify-center gap-8 md:gap-12 flex-wrap">
              {[
                { value: "24/7", label: "Hoạt động không ngừng" },
                { value: "100%", label: "Tự động hóa" },
                { value: "AI", label: "Hiểu ngữ cảnh" },
                { value: "Omni", label: "Đa kênh" },
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                  className="flex flex-col items-center gap-1"
                >
                  <div className="text-2xl md:text-3xl font-bold text-primary">
                    {stat.value}
                  </div>
                  <div className="text-xs md:text-sm text-muted-foreground text-center">
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div> */}
        </motion.div>

        {/* Hero Image / Dashboard Preview - Hidden */}
        {/* <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-16 relative"
        >
          <div className="relative mx-auto max-w-4xl">
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />
            <div className="bg-card border border-card-border rounded-2xl shadow-2xl overflow-hidden">
              <div className="bg-muted/50 px-4 py-3 flex items-center gap-2 border-b border-border">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-destructive/60" />
                  <div className="w-3 h-3 rounded-full bg-chart-4/60" />
                  <div className="w-3 h-3 rounded-full bg-chart-2/60" />
                </div>
                <div className="flex-1 text-center">
                  <div className="inline-block px-4 py-1 bg-background/50 rounded-md text-xs text-muted-foreground">
                    ai-sales-agent.app
                  </div>
                </div>
              </div>
              <div className="p-8 bg-gradient-to-br from-card to-background">
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2 space-y-4">
                    <div className="h-32 bg-muted/30 rounded-lg animate-pulse" />
                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-muted/20 rounded-lg" />
                      <div className="h-20 bg-muted/20 rounded-lg" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="h-24 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Bot className="w-8 h-8 text-primary" />
                    </div>
                    <div className="h-28 bg-muted/20 rounded-lg" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div> */}
      </div>
    </section>
  );
}
