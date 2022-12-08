import { Navigate, Outlet } from 'react-router-dom';
import { selectToken } from '../store/authSlice';
import { useAppSelector } from '../store/hooks';

const AuthProtectedRoute = () => {
  const token = useAppSelector(selectToken);

  // TODO: periodically invalidate token

  return token ? <Outlet context={{ token }} /> : <Navigate to="/login" />;
};

export default AuthProtectedRoute;
