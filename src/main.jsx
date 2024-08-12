import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./style.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { ApiProvider } from "./Contex/index.tsx";
import { SearchProvider } from "./Contex/searchContext.tsx";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApiProvider>
      <SearchProvider>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
      </SearchProvider>
    </ApiProvider>
  </React.StrictMode>
);
