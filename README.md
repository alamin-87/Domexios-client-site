# Domexis Client Site

Domexis Client Site is a modern, full-featured React web application for building and apartment management. It provides a seamless experience for tenants, members, and admins to manage apartments, agreements, payments, and more.

## Project Overview

This project is the client-side of the Domexis platform, built with [React](https://react.dev/) and [Vite](https://vitejs.dev/). It features a responsive UI, role-based dashboards, secure authentication, and integration with third-party services like Firebase and Stripe.

### Key Features

- **Authentication:** Secure login and registration with email/password and Google (via Firebase).
- **Role-Based Dashboard:** Separate dashboards for users, members, and admins with tailored features.
- **Apartment Listings:** Browse, filter, and view apartment details.
- **Agreement Management:** Request, approve, or cancel apartment agreements.
- **Payment System:** Pay rent securely using Stripe, with coupon/discount support.
- **Coupon Management:** Admins can create, update, and delete coupons; members can apply them during payment.
- **Announcements:** Admins can post announcements; all users can view them.
- **Member Management:** Admins can manage member roles and permissions.
- **Amenities & Location:** View building amenities and interactive location map.
- **Testimonials:** Resident testimonials for social proof.
- **Responsive Design:** Works on all devices with a modern, clean interface.

### Tech Stack

- **React** (functional components, hooks)
- **Vite** (development/build tool)
- **Tailwind CSS** & **DaisyUI** (styling)
- **React Router** (routing)
- **Firebase** (authentication)
- **Stripe** (payments)
- **React Query** (data fetching/caching)
- **Axios** (HTTP requests)
- **AOS** (animations)
- **SweetAlert2** (alerts)
- **React Hook Form** (forms)
- **React Icons** (icons)
- **Leaflet/React-Leaflet** (maps)

### Project Structure

- `src/pages`: Main pages (Home, Dashboard, Auth, etc.)
- `src/layouts`: Layout components for different sections
- `src/hooks`: Custom hooks for authentication, API, and role management
- `src/context`: Auth context/provider
- `src/assets`: Images and static assets
- `src/router` & `src/routes`: Routing and route guards
- `src/data`, `src/firebase`: Data and Firebase initialization

## Getting Started

### Prerequisites

- Node.js (v16 or higher recommended)
- npm or yarn

### Installation

Clone the repository and install dependencies:

```bash
git clone <your-repo-url>
cd domexis-client-site
npm install
# or
yarn install
```

### Running the Development Server

```bash
npm run dev
# or
yarn dev
```

The app will be available at [http://localhost:5173](http://localhost:5173) by default.

### Building for Production

```bash
npm run build
# or
yarn build
```

### Preview Production Build

```bash
npm run preview
# or
yarn preview
```

## ESLint Configuration

This project uses ESLint for code linting. You can expand the configuration as needed for your team or production requirements.

## Learn More

- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [ESLint Documentation](https://eslint.org/)

---

*This project was bootstrapped with the official Vite + React template.*
