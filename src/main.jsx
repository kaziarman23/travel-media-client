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
import AddTouristSpots from "./Components/MySpots/AddTouristSpots.jsx";
import MyTouristSpots from "./Components/MySpots/MyTouristSpots.jsx";
import Register from "./Components/Register/Register.jsx";
import Login from "./Components/login/Login.jsx";
import PrivateRoute from "./Components/PrivateRoute/PrivateRoute.jsx";
import { Toaster } from "react-hot-toast";

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
        path: "/popularSpots",
        element: <PopularSpots />,
      },
      {
        path: "/popularSpots/:country",
        element: <AllPopularSpots />,
        loader: () =>
          fetch("https://travel-media-server.vercel.app/popularspots"),
      },
      {
        path: "/popularSpots/:country/popularSpot/:spot_id",
        element: <PopularSpot />,
      },
      {
        path: "/allTouristSpots",
        element: <AllTouristSpots />,
        loader: () => fetch("https://travel-media-server.vercel.app/AllSpots"),
      },
      {
        path: "/allTouristSpots/touristSpot/:_id",
        element: <TouristSpot />,
        loader: () => fetch("https://travel-media-server.vercel.app/AllSpots"),
      },
      {
        path: "/booking",
        element: (
          <PrivateRoute>
            <Booking />
          </PrivateRoute>
        ),
      },
      {
        path: "/bookings",
        element: (
          <PrivateRoute>
            <Bookings />
          </PrivateRoute>
        ),
        loader: () => fetch("https://travel-media-server.vercel.app/bookings"),
      },
      {
        path: "/updateBooking/:id",
        element: <UpdateBooking />,
        loader: ({ params }) =>
          fetch(`https://travel-media-server.vercel.app/bookings/${params.id}`),
      },
      {
        path: "/addTouristSpots",
        element: (
          <PrivateRoute>
            <AddTouristSpots />
          </PrivateRoute>
        ),
      },
      {
        path: "/myTouristSpots",
        element: (
          <PrivateRoute>
            <MyTouristSpots />
          </PrivateRoute>
        ),
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/login",
        element: <Login />,
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
    <Toaster />
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>
);

// TODO : /booking & /bookings = have to show current user's bookings.
// TODO : /register = display name is not working in google register method.
