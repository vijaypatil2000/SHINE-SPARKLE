# SHINE & SPARKLE - Luxury Indian Jewelry E-commerce

A modern, highly immersive e-commerce platform for handcrafted fine Indian jewelry. Built with **React** and **Vite**, featuring a responsive architectural design, smooth animations, a fully functional shopping cart, and mock payment integrations. 

## Key Features
- **Immersive UI/UX**: Premium aesthetic styling with dark mode highlights, fluid transitions, and glassmorphism components.
- **Product Filtering & Categories**: Robust dynamic category switching and responsive product grid layouts.
- **Interactive Cart**: Modal-based sliding cart overview seamlessly integrated with a comprehensive multi-step Checkout Page.
- **Spin & Win Promotional System**: Custom gamified promotional modal with local storage tracking.
- **Order Confirmation Backend**: Automatic backend integration to securely capture customer details and send confirmation details via **Nodemailer** directly to customer and admin.

## Tech Stack
- Frontend: React 18, React Router DOM, Vite
- Styling: Plain CSS with custom Design Tokens & animations
- Icons: Lucide-React
- Backend API (Vercel Functions): Node.js, Nodemailer
- Package Management: NPM

## Getting Started

### 1. Installation
Clone the repository, then install the dependencies sequentially:
```bash
npm install
```

### 2. Environment Variables (.env)
If you wish to enable the live e-mail confirmation sender, create a `.env` file at the root of the project with:
```properties
EMAIL_USER=your_admin_email@gmail.com
EMAIL_PASS=your_16_character_app_password
```
*(Without these credentials, the backend operates locally in "Mock Mode" printing emails to the console for safely testing handovers)*

### 3. Local Development
Start the hot-reloading development server:
```bash
npm run dev
```

### 4. Build for Production
To bundle the frontend with Vite:
```bash
npm run build
```

---
*Created by the team at SHINE & SPARKLE.*
