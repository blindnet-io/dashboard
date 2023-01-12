import { useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { Navigate, useSearchParams } from 'react-router-dom';
import { useVerifyTokenMutation } from '../../../store/authSlice';

export function VerifyTokenPage() {
  const [searchParams] = useSearchParams();

  const emailToken = searchParams.get('token');

  const [verify, verifyState] = useVerifyTokenMutation();

  useEffect(() => {
    if (emailToken !== null) {
      verify(emailToken);
    }
  }, [emailToken, verify]);

  return (
    <div className="container">
      <div className="h-screen h-100 d-flex flex-column flex-grow-1 overflow-y-lg-auto">
        {verifyState.isLoading && (
          <>
            <div className="d-flex justify-content-center mt-auto">
              <Spinner />
              <span className="ms-2">Verifying</span>
            </div>
            <div className="mt-auto"></div>
          </>
        )}
        {verifyState.isError && (
          <>
            <div className="d-flex justify-content-center mt-auto">
              <Alert variant="danger">
                Error occurred. Please refresh the page.
              </Alert>
            </div>
            <div className="mt-auto"></div>
          </>
        )}
        {verifyState.isSuccess && <Navigate to="/" />}
      </div>
    </div>
  );
}

export default VerifyTokenPage;
