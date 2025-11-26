import { motion } from "framer-motion";
import { CheckCircle2, ArrowLeft, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Card className="border-card-border">
          <CardContent className="p-8 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="w-20 h-20 rounded-full bg-chart-2/10 flex items-center justify-center mx-auto mb-6"
            >
              <CheckCircle2 className="w-10 h-10 text-chart-2" />
            </motion.div>

            <h1 className="text-2xl font-bold mb-2">Cảm ơn bạn!</h1>
            <p className="text-muted-foreground mb-6">
              Chúng tôi đã nhận được thông tin của bạn. Đội ngũ tư vấn sẽ liên hệ
              trong vòng 24 giờ.
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Mail className="w-5 h-5 text-primary" />
                <span className="text-sm">Báo giá sẽ được gửi qua email</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                <Phone className="w-5 h-5 text-primary" />
                <span className="text-sm">Tư vấn viên sẽ gọi điện xác nhận</span>
              </div>
            </div>

            <Link href="/">
              <Button className="w-full" data-testid="button-back-home">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Quay về trang chủ
              </Button>
            </Link>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
