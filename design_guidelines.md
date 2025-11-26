# Design Guidelines: AI Sales Agent Landing Page

## Design Approach
**Selected Approach**: Reference-Based (Modern B2B SaaS)
- Primary References: Linear (clean tech aesthetic), Intercom (chat-first experience), Stripe (trustworthy professional)
- Core Principle: Seamless transformation from static landing to conversational interface without page reload

## Typography System
- **Primary Font**: Inter or DM Sans via Google Fonts (modern, professional SaaS feel)
- **Hierarchy**:
  - Hero Headlines: text-5xl to text-6xl, font-bold
  - Section Headers: text-3xl to text-4xl, font-semibold
  - Body Text: text-base to text-lg, font-normal
  - Chatbot Messages: text-sm to text-base, font-medium
  - CTA Buttons: text-base, font-semibold

## Layout & Spacing System
**Tailwind Spacing Primitives**: Focus on units 2, 4, 6, 8, 12, 16, 20, 24
- Section Padding: py-20 to py-32 (desktop), py-12 to py-16 (mobile)
- Component Gaps: gap-6 to gap-8
- Container: max-w-7xl with consistent px-6 to px-8
- Chatbot Container: Fixed positioning, max-w-2xl centered

## Landing Page Structure

### Hero Section
- **Layout**: Full viewport height (min-h-screen), centered content
- **Image**: Large hero image showcasing AI/technology interface mockup (dashboard preview or abstract tech visualization)
- **Content**: 
  - Bold headline emphasizing "AI Sales Agent"
  - Subheadline explaining automation benefits
  - Primary CTA button (large, prominent) with blur background when over image
  - Trust indicators below CTA (e.g., "Trusted by 500+ businesses")

### Features Section
- **Layout**: 3-column grid (lg:grid-cols-3, md:grid-cols-2, grid-cols-1)
- **Cards**: Each feature with icon, title, description
- **Spacing**: gap-8 between cards, p-6 internal padding

### Social Proof Section
- **Layout**: Testimonials in 2-column grid or carousel
- **Elements**: Customer logos, ratings, testimonial quotes with photos

### Footer
- Quick links, contact information, social media icons
- Newsletter signup integration
- Company trust badges

## Chatbot Transition & Interface

### Floating Action Button (FAB)
- **Position**: fixed bottom-6 right-6
- **Style**: Rounded-full, large size (w-16 h-16), with chat bubble icon
- **Behavior**: Sticky on scroll, pulse animation to attract attention
- **No hover states** for floating button

### Transition Effect
- **Trigger**: CTA button or FAB click
- **Animation**: 
  - Landing page: Fade to 40% opacity with backdrop-blur-sm
  - Chatbot: Scale-up from 0.95 to 1.0 + fade-in (duration-500)
  - Feeling: "AI waking up" experience
- **No Page Reload**: Pure state-based transition

### Chatbot Interface Components

**Chat Container**:
- Full-screen modal overlay (z-50)
- Max-width: max-w-2xl, centered
- Height: min-h-[600px] max-h-[80vh]
- Background: Distinct from landing (clean white or subtle gradient)
- Close button (top-right)

**Message Layout**:
- AI messages: Flex-start with avatar (left side)
- User messages: Flex-end, no avatar (right side)
- Avatar: w-8 h-8 rounded-full with AI logo/icon
- Message bubbles: Rounded-2xl, appropriate padding (px-4 py-3)

**Typing Indicator**:
- Three animated dots before each AI message
- Display for 500ms-1s before showing message
- Animation: Bounce effect on dots

**Input Components**:
- **Quick Reply Chips**: Inline-flex gap-2, rounded-full buttons, immediate submit on click
- **Text Fields**: Full-width, rounded borders, validation states (success/error)
- **Checkboxes**: For multi-select channel questions, custom-styled with checkmark icons
- **Input Area**: Fixed at bottom, sticky positioning

**Progress Indicator**:
- Thin progress bar at top of chat container
- Shows completion percentage (e.g., "Question 3 of 7")
- Smooth fill animation as user progresses

**Auto-Scroll**:
- Smooth scroll to bottom when new messages appear
- Scroll behavior: smooth

**Validation States**:
- Email: Regex check for valid format
- Phone: Format check with visual feedback
- Required fields: Error message in red below input

## Component Library

### Buttons
- **Primary CTA**: Large (px-8 py-4), rounded-lg, prominent
- **Secondary**: Outlined style, same size
- **Chat Chips**: Small (px-4 py-2), rounded-full
- All buttons: Built-in hover/active states

### Forms
- Consistent input styling across text fields
- Label positioning: Above input, text-sm
- Error messages: Below input, text-red-600

### Cards
- Feature cards: Border or subtle shadow, rounded-xl, p-6
- Testimonial cards: Similar styling with quote formatting

### Navigation
- Sticky header with logo and CTA
- Mobile: Hamburger menu

## Images
- **Hero Image**: Large, high-quality visualization of AI dashboard or sales automation interface (placeholder: modern tech workspace with screens showing data)
- **Feature Icons**: Use Heroicons via CDN for consistency
- **Testimonial Photos**: Circular avatars (w-12 h-12)
- **Chatbot Avatar**: Small circular AI icon (w-8 h-8)

## Animations (Minimal & Strategic)
- Hero CTA: Subtle hover lift
- Chatbot transition: Scale + fade (duration-500)
- Typing indicator: Dot bounce
- Message entry: Slide-up + fade
- **No distracting animations elsewhere**

## Accessibility
- ARIA labels for chatbot messages
- Keyboard navigation for all inputs
- Focus states clearly visible
- Screen reader announcements for new messages

## Mobile Responsiveness
- Chatbot: Full-screen on mobile (100vw, 100vh)
- Grid layouts: Stack to single column
- FAB: Maintain visibility, adjust size slightly smaller
- Text sizes: Scale down appropriately