import React from "react";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Home from "./pages/home";
import Transactions from "./pages/transactions";
import Categories from "./pages/categories";
import Settings from "./pages/settings";
import NotFound from "./pages/404";
import EditAccount from "./pages/settings/edit";
import ChangePassword from "./pages/settings/change-password";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#2a9d8f",
      },
      secondary: {
        main: "#e76f51",
      },
    },
    typography: {
      fontFamily: ["Open Sans", "sans - serif"].join(","),
      fontSize: 16,
    },
  });

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/categories",
      element: <Categories />,
    },
    {
      path: "/transactions",
      element: <Transactions />,
    },
    {
      path: "/settings",
      element: <Settings />,
    },
    {
      path: "/settings/account/edit",
      element: <EditAccount />,
    },
    {
      path: "/settings/account/change-password",
      element: <ChangePassword />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]);
  return (
    <ThemeProvider theme={theme}>
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
