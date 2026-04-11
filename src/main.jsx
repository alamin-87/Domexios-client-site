import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import AOS from "aos";
import "aos/dist/aos.css";
import { RouterProvider } from "react-router";
import AuthProvider from "./context/AuthContext/AuthProvider.jsx";
import { router } from "./router/router.jsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
AOS.init();
const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <div>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <RouterProvider router={router} />
          <Toaster position="top-center" reverseOrder={false} />
        </AuthProvider>
      </QueryClientProvider>
    </div>
  </StrictMode>
);
