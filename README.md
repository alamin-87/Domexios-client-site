# 🏛️ Domexis — Client
A premium, boutique-grade residential management portal built with React 19, Vite, and Tailwind CSS 4.
**Boutique UI · AI Smart Tools · Role-Based Dashboard · Secure Payments**

![Engine](https://img.shields.io/badge/Engine-React_19-blue?style=for-the-badge&logo=react)
![Styling](https://img.shields.io/badge/Styling-Tailwind_4-38B2AC?style=for-the-badge&logo=tailwind-css)
![Query](https://img.shields.io/badge/Data_Fetching-TanStack_Query-FF4154?style=for-the-badge&logo=react-query)
![Animation](https://img.shields.io/badge/Animation-GSAP_|_Framer_Motion-black?style=for-the-badge)

---

## 📋 Table of Contents
- [Project Overview](#-project-overview)
- [Recent Updates](#-recent-updates)
- [Tech Stack](#-tech-stack)
- [Prerequisites](#-prerequisites)
- [Installation](#-installation)
- [Environment Setup](#-environment-setup)
- [Full Project Folder Structure](#-full-project-folder-structure)
- [Detailed Folder Descriptions](#-detailed-folder-descriptions)
- [Multi-Role User Flow](#-multi-role-user-flow)
- [Development](#-development)
- [Key Modules & Interactivity](#-key-modules--interactivity)
- [Authentication & Security](#-authentication--security)
- [Environment Variables Reference](#-environment-variables-reference)
- [Deployment](#-deployment)
- [Performance & UX](#-performance--ux)
- [Contributing](#-contributing)
- [Support & Questions](#-support--questions)

---

## 🎯 Project Overview
Domexis Client is a sophisticated residential management portal that combines a "Boutique" aesthetic with enterprise-grade automation. It provides a seamless interface for tenants to manage their luxury living experience.

| Capability | Description |
| :--- | :--- |
| **Boutique UI/UX** | A premium design system using vibrant colors, glassmorphism, and smooth animations (GSAP/Framer). |
| **AI Smart Concierge** | Intelligent AI-driven tools for unit matching, pricing estimation, and resident support. |
| **Role-Based Auth** | Dynamic dashboard layouts tailored for Guest, Resident (User), Member, and Admin roles. |
| **Financial Control** | Secure rent payment processing via Stripe with real-time coupon application. |
| **Agreement Tracking** | Full visual monitoring of the apartment rental lifecycle. |
| **Data Orchestration** | High-performance data fetching and caching with TanStack Query v5. |

---

## 🆕 Recent Updates
| Feature | Description |
| :--- | :--- |
| **Retail-Style AI Concierge** | Launched a full-screen AI chat interface with RAG capabilities for resident inquiries. |
| **Tailwind CSS 4 Upgrade** | Migrated the entire design system to Tailwind 4 for peak CSS performance and modern syntax. |
| **Luxe Dashboard Redesign** | Overhauled the Member and Admin dashboards with glassmorphism and animated stats cards. |
| **Stripe Intent Syncing** | Integrated real-time client-side feedback for successful payment finalization. |

---

## 🛠 Tech Stack
| Layer | Technology |
| :--- | :--- |
| **Runtime / Build** | Vite + Node.js 20 |
| **Library** | React 19 (Functional Components) |
| **Styling** | Tailwind CSS 4 + DaisyUI 5 |
| **State Management** | TanStack Query v5 (React Query) |
| **Animations** | GSAP, Framer Motion, AOS |
| **Auth** | Firebase Authentication |
| **Mapping** | Leaflet / React-Leaflet |
| **Icons & Charts** | Lucide React, Recharts |

---

## 📦 Prerequisites
- **Node.js 20.x** or higher
- **NPM** or **Yarn** package manager
- **Firebase Project API Keys**
- **Stripe Publishable Key**

---

## 🚀 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/domexis-client.git
cd domexis-client
```

### 2. Install Dependencies
```bash
npm install
```

---

## 🔐 Environment Setup
Create a `.env.local` file in the project root with the following variables:

```env
# Firebase Configuration
VITE_apiKey=your_api_key
VITE_authDomain=your_project.firebaseapp.com
VITE_projectId=your_project_id
VITE_storageBucket=your_project.appspot.com
VITE_messagingSenderId=your_sender_id
VITE_appId=your_app_id

# Stripe Integration
VITE_STRIPE_PUBLIC_KEY=pk_test_...

# API Context
VITE_BASE_URL=http://localhost:5000
```

---

## 📂 Full Project Folder Structure
```text
src/
├── assets/         # Static assets and media
├── components/     # Specialized UI organisms
├── context/        # Global Auth/Theme providers
├── data/           # Mock data and static taxonomies
├── firebase/       # Client-side SDK initialization
├── hooks/          # Domain-specific logic (useRole, useAxios)
├── layouts/        # Root and dashboard structural views
├── pages/          # Full route components (Home, Dashboard)
├── router/         # React Router 7 configuration
├── routes/         # Guarded route logic
└── main.jsx        # App mounting point
```

---

## 📖 Detailed Folder Descriptions
| Path | Purpose |
| :--- | :--- |
| `src/hooks` | Custom hooks like `useAxiosSecure` for pre-configured API instances. |
| `src/layouts` | Higher-order components for Dashboard and Public page structures. |
| `src/pages/Home` | Modular sections of the landing page (Banners, Smart Tools, Testimonials). |
| `src/routes` | Implementation of Private and Admin route protection. |

---

## 🗄️ Multi-Role User Flow

| Role | Lifecycle |
| :--- | :--- |
| **GUEST** | Land → Search Apartments → Match Lifestyle via AI → Sign Up. |
| **USER** | Browse → Request Agreement → Wait for Admin Verification. |
| **MEMBER** | Pay Rent via Stripe → Apply Coupons → View Exclusive Announcements. |
| **ADMIN** | Moderation → Unit Inventory Control → Coupon Generation → Site-wide Stats. |

---

## 🔧 Development
| Command | Description |
| :--- | :--- |
| `npm run dev` | Start development server with hot-reload on http://localhost:5173. |
| `npm run build` | Compile and optimize application for production delivery. |
| `npm run preview` | Locally preview the finalized production build. |

---

## ✨ Key Modules & Interactivity
### 🤖 AI Intelligence Suite
- **Concierge:** 24/7 assistant powered by server-side Gemini RAG.
- **Property Match:** Intelligent unit weighting based on lifestyle inputs.

### 💰 Financial Engine
- **Rent Gateway:** Direct Stripe card processing with instant role upgrades.
- **Coupon Manager:** Real-time discount verification and totaling.

---

## 🔑 Authentication & Security
### Better Security Posture
- **Identity:** Managed by Firebase Authentication for secure OIDC/OAuth2 flows.
- **Access Control:** Centralized `useRole` hook to prevent UI leaks across tiers.
- **Private Routing:** Route guards ensure unauthorized users cannot sniff dashboard data.

---

## 📝 Environment Variables Reference
| Variable | Description |
| :--- | :--- |
| `VITE_apiKey` | Firebase credentials for client auth. |
| `VITE_STRIPE_PUBLIC_KEY` | Public key for initializing Stripe browser-side. |
| `VITE_BASE_URL` | The endpoint of the Domexis Server API. |

---

## 🚢 Deployment
### Deploy to Firebase Hosting / Vercel
The application is optimized for modern edge deployment.
```bash
# Production deployment on Vercel
vercel --prod
```

---

## ⚡ Performance & UX
- **Stale-While-Revalidate:** Implemented via TanStack Query for near-instant data loads.
- **Smooth Interaction:** Lenis/GSAP scroll logic for a premium boutique feel.
- **Responsive:** Fluid HSL-based design system optimized for high-density mobile displays.

---

## 🤝 Contributing
1. Create a feature branch.
2. Follow the **Boutique Design System** tokens.
3. Submit a Pull Request.

---

## 📞 Support & Questions
For issues, contact engineering@domexis.com or open a issue in the GitHub repository.

---

**Built with ❤️ for Luxury Living. © 2026 Domexis.**
