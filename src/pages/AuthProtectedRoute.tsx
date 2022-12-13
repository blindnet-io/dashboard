import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Navigate, Outlet } from 'react-router-dom';
import {
  selectIsAuthenticated,
  selectToken,
  useStatusQuery,
} from '../store/authSlice';
import { useAppSelector } from '../store/hooks';

const AuthProtectedRoute = () => {
  const token = useAppSelector(selectToken);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  // TODO: use other endpoint to check token validity
  // TODO: periodically invalidate token
  const { isError, isLoading } = useStatusQuery(token || skipToken, {
    pollingInterval: 60000,
  });

  return (
    <>
      {isLoading && <></>}
      {(token == null || isError) && <Navigate to="/login" />}
      {isAuthenticated && <Outlet context={{ token }} />}
    </>
  );
};

export default AuthProtectedRoute;
