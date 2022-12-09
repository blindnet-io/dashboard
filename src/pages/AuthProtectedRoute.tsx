import { Navigate, Outlet } from 'react-router-dom';
import { selectIsAuthenticated, selectToken } from '../store/authSlice';
import { useAppSelector } from '../store/hooks';

const AuthProtectedRoute = () => {
  const token = useAppSelector(selectToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // TODO: periodically invalidate token

  return isAuthenticated ? (
    <Outlet context={{ token }} />
  ) : (
    <Navigate to="/login" />
  );
};

export default AuthProtectedRoute;
