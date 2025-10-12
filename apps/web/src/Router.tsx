import { createBrowserRouter, redirect, RouterProvider } from "react-router";

import RootLayout from "@/layout/RootLayout";
import HomePage from "@/pages/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
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
