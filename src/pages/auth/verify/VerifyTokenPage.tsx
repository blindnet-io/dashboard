import { useEffect } from "react";
import { Alert, Spinner } from "react-bootstrap";
import { Link, useSearchParams } from "react-router-dom";
import { useVerifyTokenMutation } from '../../../store/authSlice'

export function VerifyTokenPage() {
  const [searchParams] = useSearchParams();

  const token = searchParams.get("token")

  const [verify, verifyState] = useVerifyTokenMutation()

  useEffect(() => {
    if (token !== null) {
      verify(token)
    }
  }, [token, verify])

  return (
    <div className="container">
      <div className="h-100 d-flex align-items-center justify-content-center">
        {
          verifyState.isLoading &&
          <div>
            <Spinner />
            <span>Verifying</span>
          </div>
        }
        {
          verifyState.isError &&
          <Alert variant="danger">
            Error occurred. Please refresh the page.
          </Alert>
        }
        {
          verifyState.isSuccess &&
          <Alert variant="success">
            Account verified! Click <Link to="/">here</Link> to navigate to home page.
          </Alert>
        }
      </div>
    </div>
  )
}

export default VerifyTokenPage