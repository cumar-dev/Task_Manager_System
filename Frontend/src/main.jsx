import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import {
  QueryClient,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
const QueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60 * 1000,
    },
  },
});
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider>
      <App />
    </QueryClientProvider>
  </StrictMode>,
);
