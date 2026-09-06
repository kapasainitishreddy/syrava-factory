import React from "react";
import ReactDOM from "react-dom/client";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import App from "./App.jsx";

const url = import.meta.env.VITE_CONVEX_URL;
if (!url) {
  document.body.innerHTML = "<pre>GrantPulse is not configured yet. Set VITE_CONVEX_URL after creating the Convex deployment.</pre>";
} else {
  const convex = new ConvexReactClient(url);
  ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
      <ConvexProvider client={convex}>
        <App />
      </ConvexProvider>
    </React.StrictMode>
  );
}
