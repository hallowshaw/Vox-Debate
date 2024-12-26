import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store";
import { UserContext, UserContextProvider } from "./context/UserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <UserContextProvider>
        <App />
      </UserContextProvider>
    </Provider>
  </StrictMode>
);