import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
// Routes
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
// Components
import LoadingScreen from "./components/LoadingScreen";

/* Router */
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "profile",
        element: <Profile />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/create-account",
    element: <CreateAccount />,
  },
]);

/* Global Style CSS */
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing:border-box;
  }
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

export default function App() {
  // Loading screen while checking firebase authentication
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    // Wait for Firebase
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </>
  );
}
