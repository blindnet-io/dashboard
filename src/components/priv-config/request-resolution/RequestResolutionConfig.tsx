import { Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import {
  useGetRequestResolutionQuery,
  useUpdateRequestResolutionMutation,
} from '../../../store/privConfigSlice';
import { RequestResolution } from '../../../types';
import RequestResolutionForm from './RequestResolutionForm';

export function RequestResolutionConfig({ token }: { token: string }) {
  const [update, updateState] = useUpdateRequestResolutionMutation();
  const { data, isSuccess, isError, isFetching, isLoading } =
    useGetRequestResolutionQuery(token);

  const onSubmit = async (data: RequestResolution) => {
    const res = await update([token, data]);
    console.log(res);
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
          <RequestResolutionForm
            data={data}
            isSaving={updateState.isLoading}
            onSubmit={onSubmit}
          />
          {updateState.isError && (
            <Alert className="mt-5" variant="danger">
              Error occurred. Please try again.
            </Alert>
          )}
          {updateState.isSuccess && (
            <Alert className="mt-5" variant="success" dismissible>
              Automatic resolution strategies updated
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

export default RequestResolutionConfig;
