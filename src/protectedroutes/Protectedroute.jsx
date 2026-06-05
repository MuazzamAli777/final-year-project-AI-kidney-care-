import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);

  if (loading) return <div>Loading...</div>; // 🔥 wait karo

  if (!isAuthenticated) {
    return <Navigate to="/AuthPage" />;
  }

  return children;
}

export default ProtectedRoute;