import { Navigate } from "react-router-dom";
import { auth } from "../firebase";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = auth.currentUser; // Check Log-In
  if (!user) return <Navigate to="/login" />; // If not log-in, Go to <Login>

  return children;
}

// 로그인한 사용자는 볼 수 있고
// 로그인하지 않은 사용자는 볼 수 없게 -> Log-In or Join 페이지로 redirect
