import { createBrowserRouter } from "react-router-dom";
import Root from "../layout/Root";
import Home from "../Components/Home/Home";
import AboutUs from "../Components/Home/AboutUsSection";
import PopularSpots from "../Components/PopularSpots/PopularSpots";
import AllPopularSpots from "../Components/PopularSpots/AllPopularSpots";
import PopularSpot from "../Components/PopularSpots/PopularSpot";
import AllTouristSpots from "../Components/AllTouristSpots/AllTouristSpots";
import TouristSpot from "../Components/AllTouristSpots/TouristSpot";
import PrivateRoute from "./PrivateRoute";
import Booking from "../Components/Bookings/Booking";
import Bookings from "../Components/Bookings/Bookings";
import UpdateBooking from "../Components/Bookings/UpdateBooking";
import AddTouristSpots from "../Components/MySpots/AddTouristSpots";
import MyTouristSpots from "../Components/MySpots/MyTouristSpots";
import NotFoundPage from "../Components/NotFoundPage/NotFoundPage";
import Login from "../Components/login/Login";
import Register from "../Components/Register/Register";

const Router = createBrowserRouter([
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
      // didn't found the page ?
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
      },

      {
        path: "/allTouristSpots/touristSpot/:_id",
        element: <TouristSpot />,
      },
      {
        path: "/bookings",
        element: (
          <PrivateRoute>
            <Bookings />
          </PrivateRoute>
        ),
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
        path: "/updateBooking/:id",
        element: <UpdateBooking />,
      },
      // ... working complete till here!!
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

export default Router;
