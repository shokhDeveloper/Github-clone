import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import { ContextProvider, store } from "./Settings";
import { BrowserRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
const root = ReactDOM.createRoot(document.getElementById("root"));
const client = new QueryClient()
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ContextProvider>
          <QueryClientProvider client={client}>
            <App />
          </QueryClientProvider>
        </ContextProvider>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);
