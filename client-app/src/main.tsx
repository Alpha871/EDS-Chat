import React from "react";
import ReactDOM from "react-dom/client";
import { router } from "@/app/router/Route";
import { RouterProvider } from "react-router-dom";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { store, StoreContext } from "./app/store/store";

const clientId = import.meta.env.VITE_CLIENT_KEY;
console.log("clientId", clientId);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={store}>
    <React.StrictMode>
      <GoogleOAuthProvider clientId={clientId}>
        <RouterProvider router={router} />
      </GoogleOAuthProvider>
    </React.StrictMode>
  </StoreContext.Provider>
);
