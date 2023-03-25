import { useAuth } from "../../contexts/AuthProvider";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const AuthRoute = () => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (!loading) {
    return user ? (
      <Outlet />
    ) : (
      <Navigate to={"/login"} replace state={{ path: location.pathname }} />
    );
  }
};

export default AuthRoute;