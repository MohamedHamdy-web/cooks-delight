import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { ClerkProvider } from "@clerk/react";
import { Toaster } from "react-hot-toast";

const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider
      publishableKey={clerkPubKey}
      signInForceRedirectUrl="/"
      signInFallbackRedirectUrl="/"
      signUpForceRedirectUrl="/"
      signUpFallbackRedirectUrl="/"
    >
      <App />
      <Toaster position="top-right" />
    </ClerkProvider>
  </StrictMode>,
);
