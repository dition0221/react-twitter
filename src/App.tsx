import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState } from "react";
import { auth } from "./firebase";
// Routes
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
// Components
import LoadingScreen from "./components/LoadingScreen";
import ProtectedRoute from "./components/ProtectedRoute";

/* Router */
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
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
    element: (
      <ProtectedRoute isUser>
        <Login />
      </ProtectedRoute>
    ),
  },
  {
    path: "/create-account",
    element: (
      <ProtectedRoute isUser>
        <CreateAccount />
      </ProtectedRoute>
    ),
  },
]);

/* Global Style CSS */
const GlobalStyles = createGlobalStyle`
  ${reset};
  * {
    box-sizing:border-box;
  }
  body {
    padding: 0 10px;
    background-color: #222;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

/* CSS */
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

export default function App() {
  // Show loading screen while checking firebase authentication
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady(); // Check initial log-in
    setIsLoading(false);
  };
  useEffect(() => {
    init();
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? <LoadingScreen /> : <RouterProvider router={router} />}
    </Wrapper>
  );
}
