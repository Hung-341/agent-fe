import { useState } from "react";
import { Header } from "@/components/landing/Header";
import { HeroSection } from "@/components/landing/HeroSection";
import { FeaturesSection } from "@/components/landing/FeaturesSection";
import { SocialProofSection } from "@/components/landing/SocialProofSection";
import { PricingSection } from "@/components/landing/PricingSection";
import { ContactSection } from "@/components/landing/ContactSection";
import { Footer } from "@/components/landing/Footer";
import { ChatbotModal } from "@/components/chatbot/ChatbotModal";
import { FloatingChatButton } from "@/components/chatbot/FloatingChatButton";

export default function LandingPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleOpenChat = () => {
    setIsChatOpen(true);
  };

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onOpenChat={handleOpenChat} />
      <main>
        <HeroSection onOpenChat={handleOpenChat} />
        {/* <FeaturesSection /> */}
        {/* <SocialProofSection /> */}
        {/* <PricingSection onOpenChat={handleOpenChat} /> */}
        {/* <ContactSection onOpenChat={handleOpenChat} /> */}
      </main>
      {/* <Footer onOpenChat={handleOpenChat} /> */}

      {/* Floating Chat Button */}
      <FloatingChatButton onClick={handleOpenChat} />

      {/* Chatbot Modal */}
      <ChatbotModal isOpen={isChatOpen} onClose={handleCloseChat} />
    </div>
  );
}
