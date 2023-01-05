import { useId } from 'react';
import { Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import {
  useGetTokenQuery,
  useResetTokenMutation,
} from '../../../store/storageConfigSlice';
import SubmitButton from '../../common/SubmitButton';

// TODO: update pce token
export function TokenConfig({ token }: { token: string }) {
  const { data, isSuccess, isError, isFetching, isLoading } =
    useGetTokenQuery(token);
  const [resetToken, resetTokenState] = useResetTokenMutation();

  const reset = async () => {
    const res = await resetToken(token);
    console.log(res);
  };

  const elid = useId();

  const copy = () => {
    if (isSuccess) {
      (document.getElementById(`${elid}-token`) as HTMLInputElement).select();
      navigator.clipboard.writeText(data);
    }
  };

  return (
    <>
      {(isLoading || isFetching) && (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      )}
      {isSuccess && (
        <>
          <div className="d-block d-md-flex">
            <div className="flex-grow-1">
              <div className="input-group shadow-none">
                <input
                  id={`${elid}-token`}
                  type="text"
                  className="form-control"
                  value={data}
                  readOnly
                />
                <span
                  className={`input-group-text cursor-pointer`}
                  onClick={copy}
                >
                  <i className="bi bi-clipboard"></i>
                </span>
              </div>
            </div>
            <div className="d-grid d-md-flex justify-content-md-end gap-2 ms-md-2 mt-2 mt-md-0">
              <SubmitButton
                label="Reset"
                onClick={reset}
                isLoading={resetTokenState.isLoading}
              />
            </div>
          </div>
          {resetTokenState.isError && (
            <Alert className="mt-5" variant="danger">
              Error occurred. Please try again.
            </Alert>
          )}
          {resetTokenState.isSuccess && (
            <Alert className="mt-5" variant="success" dismissible>
              API token updated
            </Alert>
          )}
        </>
      )}
      {isError && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )}
    </>
  );
}

export default TokenConfig;
