import { Outlet } from 'react-router-dom';
import { useStatusQuery } from '../store/authSlice';
import { Alert, Spinner } from 'react-bootstrap';

const VerifiedProtectedRoute = () => {
  const { data, isError, isLoading } = useStatusQuery(undefined);

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center mt-auto">
          <Spinner />
        </div>
      )}
      {isError && (
        <Alert className="mt-10" variant="danger">
          Error occurred. Please refresh the page.
        </Alert>
      )}
      {data?.verified === false && (
        <Alert className="mt-10" variant="danger">
          You need to verify your email address. Check your email inbox.
        </Alert>
      )}
      {data?.verified === true && <Outlet />}
    </>
  );
};

export default VerifiedProtectedRoute;
