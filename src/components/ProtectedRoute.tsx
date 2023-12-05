import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

interface IProtectedRouteProps {
  children: React.ReactNode;
  isUser?: boolean;
}

export default function ProtectedRoute({
  children,
  isUser,
}: IProtectedRouteProps) {
  const user = auth.currentUser; // Check Log-In

  // If not user, Go to <Login>
  if (!isUser && !user) return <Navigate to="/login" />;
  // If user, Go to <Home>
  if (isUser && user) return <Navigate to="/" />;

  return children;
}

// 로그인한 사용자는 볼 수 있고
// 로그인하지 않은 사용자는 볼 수 없게 -> Log-In or Join 페이지로 redirect
