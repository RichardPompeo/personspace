import { createBrowserRouter, redirect, RouterProvider } from "react-router";

import RootLayout from "@/layout/RootLayout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/account/LoginPage";
import RegisterPage from "@/pages/account/RegisterPage";
import ProfilePage from "@/pages/account/ProfilePage";
import NotesPage from "@/pages/notes/NotesPage";
import ExpandedNotePage from "@/pages/notes/ExpandedNotePage";

import ProtectedRoute from "@/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/notes",
        element: (
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/notes/:id",
        element: (
          <ProtectedRoute>
            <ExpandedNotePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    loader: () => redirect("/"),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
