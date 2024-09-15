import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Layout/Root.jsx";
import Home from "./Components/Home/Home.jsx";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
import AllTouristsSpots from "./Components/AllTouristsSpots/AllTouristsSpots.jsx";
import AllSpots from "./Components/AllTouristsSpots/AllSpots.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/aboutus",
        element: <AboutUs />,
      },
      {
        path: "/AllTouristsSpots",
        element: <AllTouristsSpots />,
      },
      {
        path: "/AllTouristsSpot/:country",
        element: <AllSpots />,
        loader: () => fetch("http://localhost:5000/spots"),
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
