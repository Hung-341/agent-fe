# AI Sales Agent Landing Page

## Overview
This is a modern B2B SaaS landing page for "AI Sales Agent" product with a conversational chatbot interface for collecting quote requests. The key feature is the seamless transition from static landing page to an interactive chatbot experience.

## Project Structure
```
client/
├── src/
│   ├── components/
│   │   ├── landing/           # Landing page sections
│   │   │   ├── Header.tsx     # Sticky header with navigation
│   │   │   ├── HeroSection.tsx    # Hero with CTA buttons
│   │   │   ├── FeaturesSection.tsx # Features grid
│   │   │   ├── SocialProofSection.tsx # Testimonials
│   │   │   └── Footer.tsx     # Footer with newsletter
│   │   ├── chatbot/           # Chatbot components
│   │   │   ├── ChatbotModal.tsx   # Main chatbot modal
│   │   │   ├── ChatMessage.tsx    # Message bubble
│   │   │   ├── TypingIndicator.tsx # 3 dots animation
│   │   │   ├── QuickReplyChips.tsx # Quick reply buttons
│   │   │   ├── ChatInput.tsx  # Text input with validation
│   │   │   ├── CheckboxGroup.tsx  # Multi-select checkboxes
│   │   │   ├── ProgressBar.tsx    # Progress indicator
│   │   │   └── FloatingChatButton.tsx # FAB button
│   │   └── ui/                # Shadcn UI components
│   ├── pages/
│   │   ├── LandingPage.tsx    # Main landing page
│   │   ├── ThankYouPage.tsx   # Thank you page
│   │   └── not-found.tsx      # 404 page
│   ├── App.tsx                # Router setup
│   └── index.css              # Tailwind styles
server/
├── routes.ts                  # API endpoints
├── storage.ts                 # In-memory storage
└── app.ts                     # Express app setup
shared/
└── schema.ts                  # Data models (Drizzle + Zod)
```

## User Flow
1. User visits Landing Page (Hero, Features, Social Proof)
2. User clicks CTA button "Nhận báo giá" or Floating Chat Button
3. Landing Page fades and Chatbot Modal appears (no page reload)
4. Chatbot greets and asks questions step by step:
   - Name (text input)
   - SKU Range (quick reply chips)
   - Sales Channels (multi-select checkboxes)
   - Email (input with validation)
   - Phone (input with validation)
5. On completion, shows success message and saves lead data

## API Endpoints
- `POST /api/leads` - Create new lead
- `GET /api/leads` - Get all leads
- `GET /api/leads/:id` - Get specific lead
- `GET /api/health` - Health check

## Data Model (Lead)
```typescript
{
  id: string;
  name: string;
  email: string;
  phone: string;
  skuRange: string;
  channels: string[];
  additionalInfo?: string;
  createdAt: Date;
}
```

## Technologies
- Frontend: React, Tailwind CSS, Shadcn UI, Framer Motion
- Backend: Express.js, Zod validation
- Storage: In-memory (MemStorage)
- State: TanStack Query

## Design
- Style: Modern B2B SaaS (clean, tech-vibes, trustworthy)
- Font: Inter, DM Sans
- Colors: Blue primary (#3b82f6), dark foreground
- Animations: Fade in/slide up for chatbot, typing indicator, message animations

## Key Features
- Smooth chatbot transition (no page reload)
- Typing indicator (3 dots animation)
- Auto-scroll to latest message
- Progress bar showing completion
- Input validation (email, phone format)
- Quick reply chips and checkboxes
- Floating action button (sticky on scroll)
- Mobile responsive design
