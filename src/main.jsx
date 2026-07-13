import { StrictMode } from "react";
import "./styles/main.css";
import { createRoot } from "react-dom/client";
import { App } from "./App.jsx";
import { FirebaseProvider } from "./context/FirebaseContext.jsx";
import { MessageProvider } from "./context/MessageContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import { BrowserRouter } from "react-router-dom";
import { FiltersProvider } from "./context/FiltersContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <MessageProvider>
      <AuthProvider>
        <FirebaseProvider>
          <FiltersProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </FiltersProvider>
        </FirebaseProvider>
      </AuthProvider>
    </MessageProvider>
  </StrictMode>
);
