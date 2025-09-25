import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import AuthProvider from "./Providers/AuthProvider.jsx";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { store } from "./Redux/store";
import Router from "./routers/Router.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster />
    <Provider store={store}>
      <AuthProvider>
        <RouterProvider router={Router} />
      </AuthProvider>
    </Provider>
  </StrictMode>
);

// NEW TODO:
// 1. SETUP REDUX & REDUX RTK QUERY = Completed
// 2. REMOVE AXIOS & ACCESS THE RTK API CALL = On Going
// 3. FIX THE FORMATE OF THE FILE STUCTURE = Pendding

// OLD TODO:
// TODO : /booking & /bookings = have to show current user's bookings.
// TODO : /register = display name is not working in google register method.
