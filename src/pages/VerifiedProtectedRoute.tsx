import { Outlet, useOutletContext } from 'react-router-dom';
import { useStatusQuery } from '../store/authSlice';
import { Alert, Spinner } from 'react-bootstrap';

const VerifiedProtectedRoute = () => {
  const { token } = useOutletContext<{ token: string }>();

  const { data, isError, isLoading } = useStatusQuery(token!);

  return (
    <div className="h-screen flex-grow-1 overflow-y-lg-auto">
      {isLoading && (
        // TODO: put to center of page
        <Spinner />
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
      {data?.verified === true && <Outlet context={{ token }} />}
    </div>
  );
};

export default VerifiedProtectedRoute;
