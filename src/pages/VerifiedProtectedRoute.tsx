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
        <div className="mt-10">
          <Alert variant="danger">
            Error occurred. Please refresh the page.
          </Alert>
        </div>
      )}
      {data?.verified === false && (
        <div className="mt-10">
          <Alert variant="danger">
            You need to verify your email address. Check your email inbox.
          </Alert>
        </div>
      )}
      {data?.verified === true && <Outlet />}
    </>
  );
};

export default VerifiedProtectedRoute;
