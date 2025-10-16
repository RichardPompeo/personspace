import { createBrowserRouter, redirect, RouterProvider } from "react-router";

import RootLayout from "@/layout/RootLayout";
import PublicLayout from "@/layout/PublicLayout";
import AuthLayout from "@/layout/AuthLayout";
import HomePage from "@/pages/HomePage";
import LoginPage from "@/pages/account/LoginPage";
import RegisterPage from "@/pages/account/RegisterPage";
import ProfilePage from "@/pages/account/ProfilePage";
import NotesPage from "@/pages/notes/NotesPage";
import SharedNotesPage from "@/pages/notes/SharedNotesPage";
import ExpandedNotePage from "@/pages/notes/ExpandedNotePage";
import ExpandedSharedNotePage from "@/pages/notes/ExpandedSharedNotePage";
import DashboardPage from "@/pages/DashboardPage";

import ProtectedRoute from "@/components/ProtectedRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
    ],
  },
  {
    path: "/login",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "/register",
    element: <AuthLayout />,
    children: [
      {
        index: true,
        element: <RegisterPage />,
      },
    ],
  },
  {
    path: "/profile",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <ProfilePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/dashboard",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/notes",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <NotesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ":id",
        element: (
          <ProtectedRoute>
            <ExpandedNotePage />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/shared-notes",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: (
          <ProtectedRoute>
            <SharedNotesPage />
          </ProtectedRoute>
        ),
      },
      {
        path: ":id",
        element: (
          <ProtectedRoute>
            <ExpandedSharedNotePage />
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
