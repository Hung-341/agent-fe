import { motion } from "framer-motion";
import { 
  Bot, 
  MessageSquare, 
  BarChart3, 
  Zap, 
  Clock, 
  Shield,
  Users,
  TrendingUp,
  Globe
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Bot,
    title: "AI Thông Minh",
    description: "Chatbot được huấn luyện để hiểu và phản hồi tự nhiên như một nhân viên bán hàng chuyên nghiệp.",
  },
  {
    icon: Clock,
    title: "Hoạt Động 24/7",
    description: "Không bỏ lỡ bất kỳ khách hàng tiềm năng nào, AI luôn sẵn sàng tư vấn mọi lúc.",
  },
  {
    icon: MessageSquare,
    title: "Đa Kênh",
    description: "Tích hợp liền mạch với Website, Facebook, Zalo và các nền tảng phổ biến khác.",
  },
  {
    icon: BarChart3,
    title: "Analytics Chi Tiết",
    description: "Theo dõi hiệu suất, tỷ lệ chuyển đổi và insight khách hàng realtime.",
  },
  {
    icon: Zap,
    title: "Phản Hồi Tức Thì",
    description: "Thời gian phản hồi dưới 1 giây, không để khách hàng phải chờ đợi.",
  },
  {
    icon: Shield,
    title: "Bảo Mật Cao",
    description: "Dữ liệu khách hàng được mã hóa và bảo vệ theo tiêu chuẩn quốc tế.",
  },
];

const stats = [
  { value: "500+", label: "Doanh nghiệp tin dùng", icon: Users },
  { value: "2M+", label: "Cuộc hội thoại/tháng", icon: MessageSquare },
  { value: "35%", label: "Tăng tỷ lệ chuyển đổi", icon: TrendingUp },
  { value: "15+", label: "Ngôn ngữ hỗ trợ", icon: Globe },
];

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 bg-muted/30">
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
            Tính năng <span className="text-primary">nổi bật</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            AI Sales Agent được thiết kế để tối ưu hóa quy trình bán hàng và mang lại trải nghiệm tốt nhất cho khách hàng.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover-elevate transition-all duration-300 border-card-border">
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-card border border-card-border rounded-2xl p-8 md:p-12"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                  <stat.icon className="w-5 h-5 text-primary" />
                </div>
                <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
