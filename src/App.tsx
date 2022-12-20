import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/home";
import Transactions from "./pages/transactions";
import Categories from "./pages/categories";
import Settings from "./pages/settings";
import NotFound from "./pages/404";
import EditAccount from "./pages/settings/edit";
import ChangePassword from "./pages/settings/change-password";
import Auth from "./pages/auth/auth";
import SignUp from "./pages/auth/signup";
import Dashboard from "./pages/dashboard";
import { AuthContextProvider } from "./context/auth";
import "./App.css";
import { GlobalDataProvider } from "./context/globalData";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1561f0",
      },
      secondary: {
        main: "#F4F0E8",
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
      path: "/auth",
      element: <Auth />,
    },
    {
      path: "/account/signup",
      element: <SignUp />,
    },
    {
      path: "/dashboard",
      element: <Dashboard />,
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
      <AuthContextProvider>
        <GlobalDataProvider>
          <RouterProvider router={router} />
        </GlobalDataProvider>
      </AuthContextProvider>
    </ThemeProvider>
  );
}

export default App;
