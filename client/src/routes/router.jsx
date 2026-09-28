import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import ProtectedRoute from "../components/common/ProtectedRoute";
import GuestRoute from "../components/common/GuestRoute";
import HomeRedirect from "../components/common/HomeRedirect";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
import Admin from "../pages/Admin";
import PublicProfile from "../pages/PublicProfile";
import NotFound from "../pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <HomeRedirect />,
      },
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: (
          <GuestRoute>
            <Login />
          </GuestRoute>
        ),
      },
      {
        path: "register",
        element: (
          <GuestRoute>
            <Register />
          </GuestRoute>
        ),
      },
      {
        path: "u/:username",
        element: <PublicProfile />,
      },
      {
        path: "dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "admin",
        element: (
          <ProtectedRoute adminOnly={true}>
            <Admin />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
