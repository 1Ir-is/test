import { createBrowserRouter, Routes, Route } from "react-router-dom";
import App from "../App";
import HomePage from "../Pages/HomePage/HomePage";
import LoginPage from "../Pages/LoginPage/LoginPage";
import RegisterPage from "../Pages/RegisterPage/RegisterPage";
import AboutPage from "../Pages/AboutPage/About";
import CarListing from "../Pages/CarListing/CarListing";
import CarDetails from "../UI/CarDetails/CarDetails";

import Blog from "../Pages/BlogPage/BlogPage";
import BlogDetails from "../UI/BlogDetails/BlogDetails";
import Contact from "../Pages/ContactPage/ContactPage";
import ProfilePage from "../Pages/ProfilePage/ProfilePage";
import OwnerPage from "../Pages/OwnerPage/OwnerPage";
import RentedCarView from "../Pages/RentedCarViewPage/RentedCarView";
import FavoriteVehicleList from "../Pages/FavoriteListPage/FavoriteList";
import VehiclePost from "../Pages/VehiclePost/VehiclePost";
import CreatePostPage from "../Pages/CreatePost/CreatePost";
import EditPost from "../Pages/EditPost/EditPost";
import ChangePasswordPage from "../Pages/ChangePassword/ChangePassword";
import { OwnerProtectedRoute } from "./ProtectedRoute";
import ForbiddenPage from "../Pages/ForbiddenPage/ForbiddenPage";

import { Navigate } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "", element: <HomePage /> },
      { path: "home", element: <HomePage /> },
      
      { path: "login", element: <LoginPage /> },
      { path: "register", element: <RegisterPage /> },
      { path: "change-password", element: <ChangePasswordPage /> }, 

      // For user
      { path: "about", element: <AboutPage /> },
      { path: "cars", element: <CarListing /> },
      { path: "car-details/:id", element: <CarDetails /> },
      { path: "blogs", element: <Blog /> },
      { path: "blogs/:slug", element: <BlogDetails /> },
      { path: "contact", element: <Contact /> },
      { path: "profile/:userId", element: <ProfilePage /> }, 
      { path: "rented-car", element: <RentedCarView /> },
      { path: "favorite-list", element: <FavoriteVehicleList /> },
      
      // Protected route for owner registration
      { path: "register-owner", element: <OwnerProtectedRoute><OwnerPage /></OwnerProtectedRoute> },

      // For owner - Protected routes
      { path: "vehicle-post", element: <OwnerProtectedRoute><VehiclePost /></OwnerProtectedRoute> },
      { path: "create-post", element: <OwnerProtectedRoute><CreatePostPage /></OwnerProtectedRoute> },
      { path: "edit-post/:postId", element: <OwnerProtectedRoute><EditPost /></OwnerProtectedRoute> },

      // 403 route
      { path: "access-denied", element: <ForbiddenPage /> },
      { path: "*", element: <Navigate to="/access-denied" replace /> },
    ],
  },
]);
