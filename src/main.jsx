import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Root from "./Components/Layout/Root.jsx";
import Home from "./Components/Home/Home.jsx";
import AboutUs from "./Components/AboutUs/AboutUs.jsx";
import PopularSpots from "./Components/PopularSpots/PopularSpots.jsx";
import AllPopularSpots from "./Components/PopularSpots/AllPopularSpots.jsx";
import PopularSpot from "./Components/PopularSpots/PopularSpot.jsx";
import AuthProvider from "./AuthProvider/AuthProvider.jsx";
import NotFoundPage from "./Components/NotFoundPage/NotFoundPage.jsx";
import AllTouristSpots from "./Components/AllTouristSpots/AllTouristSpots.jsx";
import TouristSpot from "./Components/AllTouristSpots/TouristSpot.jsx";
import Booking from "./Components/Bookings/Booking.jsx";
import Bookings from "./Components/Bookings/Bookings.jsx";
import UpdateBooking from "./Components/Bookings/UpdateBooking.jsx";

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
        path: "/PopularSpots",
        element: <PopularSpots />,
      },
      {
        path: "/PopularSpots/:country",
        element: <AllPopularSpots />,
        loader: () => fetch("http://localhost:5000/PopularSpots"),
      },
      {
        path: "/PopularSpots/:country/PopularSpot/:spot_id",
        element: <PopularSpot />,
      },
      {
        path: "/AllTouristSpots",
        element: <AllTouristSpots />,
        loader: () => fetch("http://localhost:5000/AllSpots"),
      },
      {
        path: "/AllTouristSpots/touristSpot/:_id",
        element: <TouristSpot />,
        loader: () => fetch("http://localhost:5000/AllSpots"),
      },
      {
        path: "/booking",
        element: <Booking />,
      },
      {
        path: "/bookings",
        element: <Bookings />,
        loader: () => fetch("http://localhost:5000/bookings"),
      },
      {
        path: "/updateBooking/:id",
        element: <UpdateBooking />,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
      {
        path: "*",
        element: <NotFoundPage />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);
