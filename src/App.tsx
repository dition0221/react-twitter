import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { useEffect, useState, createContext, useRef } from "react";
import { auth } from "./firebase";
import ReCAPTCHA from "react-google-recaptcha";
// Routes
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Profile from "./routes/Profile";
import Login from "./routes/Login";
import CreateAccount from "./routes/CreateAccount";
// Components
import LoadingScreen from "./components/LoadingScreen";
import ProtectedRoute from "./components/ProtectedRoute";
// ? import ReCaptcha from "./components/ReCaptcha";

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
    background-color: #222;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    padding: 0 10px;
  }
  `;

/* CSS */
const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

// !
export const ReCaptchaContext = createContext<ReCAPTCHA | null>(null);

export default function App() {
  // Show loading screen while checking firebase authentication
  const [isLoading, setIsLoading] = useState(true);
  const init = async () => {
    await auth.authStateReady(); // Check initial log-in
    setIsLoading(false);
  };

  // reCAPTCHA v2 (invisible)
  const reCaptchaRef = useRef<ReCAPTCHA>(null);

  useEffect(() => {
    init();
    console.log("reCaptchaRef", reCaptchaRef.current);
  }, []);

  return (
    <Wrapper>
      <GlobalStyles />
      {isLoading ? (
        <LoadingScreen />
      ) : (
        <ReCaptchaContext.Provider value={reCaptchaRef.current}>
          <ReCAPTCHA
            // style={{ display: "none" }}
            ref={reCaptchaRef}
            size="invisible"
            sitekey={
              import.meta.env.DEV
                ? import.meta.env.VITE_FIREBASE_APPCHECK_DEV_PUBLIC_KEY
                : import.meta.env.VITE_FIREBASE_APPCHECK_PUBLIC_KEY
            }
          />
          <RouterProvider router={router} />
        </ReCaptchaContext.Provider>
      )}
    </Wrapper>
  );
}
