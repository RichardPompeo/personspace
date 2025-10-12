import { Navigate, useLocation } from "react-router";
import { useAuth } from "@/hooks/useAuth";
import LoadingSpinner from "./LoadingSpinner";

interface ProtectedRouteProps {
  children: React.ReactNode;
  redirectTo?: string;
}

const ProtectedRoute = ({
  children,
  redirectTo = "/login"
}: ProtectedRouteProps) => {
  const { isLogged, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!isLogged) {
    // Redirect to login page with return url
    return (
      <Navigate
        to={redirectTo}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
