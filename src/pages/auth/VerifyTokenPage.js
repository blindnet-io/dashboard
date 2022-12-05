import { Spinner } from "react-bootstrap";
import { Navigate, useSearchParams } from "react-router-dom";
import { useVerifyTokenQuery } from '../../store/authSlice'

export function VerifyTokenPage() {
  const [searchParams] = useSearchParams();

  const { data, error, isLoading } = useVerifyTokenQuery(searchParams.get("token"))

  return (
    <>
      {
        isLoading && <Spinner className="centered" />
      }
      {
        data && <Navigate to="/" replace />
      }
      {
        error && <span>Could not verify</span>
      }
    </>
  )
}

export default VerifyTokenPage