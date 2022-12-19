import { useId } from 'react';
import Alert from 'react-bootstrap/Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import SubmitButton from '../SubmitButton';
import {
  useGetRequestResolutionQuery,
  useUpdateRequestResolutionMutation,
} from '../../store/privConfigSlice';

export type ResolutionStrategy = 'auto' | 'manual';

export type RequestResolution = {
  transparency: ResolutionStrategy;
  access: ResolutionStrategy;
  delete: ResolutionStrategy;
  revoke_consent: ResolutionStrategy;
  object_scope: ResolutionStrategy;
  restrict_scope: ResolutionStrategy;
};

function RequestResolutionFormInner({
  data,
  isSaving,
  handleOnSubmit,
}: {
  data: RequestResolution;
  isSaving: boolean;
  handleOnSubmit: (data: RequestResolution) => any;
}) {
  const id = useId();

  const { register, handleSubmit, reset } = useForm<RequestResolution>({
    defaultValues: data,
  });

  const onSubmit: SubmitHandler<RequestResolution> = (data) => {
    handleOnSubmit(data);
  };

  return (
    <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
      <div className="row g-5">
        <div className="col-md-4">
          <label className="form-label" htmlFor={`${id}-transparency`}>
            Transparency
          </label>
          <select
            id={`${id}-transparency`}
            className="form-select"
            {...register('transparency', { required: true })}
          >
            <option value="auto">automatic</option>
            <option value="manual">manual</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor={`${id}-access`}>
            access
          </label>
          <select
            id={`${id}-access`}
            className="form-select"
            {...register('access', { required: true })}
          >
            <option value="auto">automatic</option>
            <option value="manual">manual</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor={`${id}-delete`}>
            delete
          </label>
          <select
            id={`${id}-delete`}
            className="form-select"
            {...register('delete', { required: true })}
          >
            <option value="auto">automatic</option>
            <option value="manual">manual</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor={`${id}-revoke_consent`}>
            revoke_consent
          </label>
          <select
            id={`${id}-revoke_consent`}
            className="form-select"
            {...register('revoke_consent', { required: true })}
          >
            <option value="auto">automatic</option>
            <option value="manual">manual</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor={`${id}-object_scope`}>
            object_scope
          </label>
          <select
            id={`${id}-object_scope`}
            className="form-select"
            {...register('object_scope', { required: true })}
          >
            <option value="auto">automatic</option>
            <option value="manual">manual</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label" htmlFor={`${id}-restrict_scope`}>
            restrict_scope
          </label>
          <select
            id={`${id}-restrict_scope`}
            className="form-select"
            {...register('restrict_scope', { required: true })}
          >
            <option value="auto">automatic</option>
            <option value="manual">manual</option>
          </select>
        </div>

        <div className="col-12 text-end">
          <span
            onClick={() => reset(data)}
            className="btn btn-sm btn-neutral me-2"
          >
            Reset
          </span>
          <SubmitButton label="Save" isLoading={isSaving} />
        </div>
      </div>
    </form>
  );
}

export function RequestResolutionFormForm({ token }: { token: string }) {
  const [update, updateState] = useUpdateRequestResolutionMutation();
  const { data, isSuccess, isError, isLoading } =
    useGetRequestResolutionQuery(token);

  const onSubmit = async (data: RequestResolution) => {
    const res = await update([token, data]);
    console.log(res);
  };

  return (
    <>
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <>
          <RequestResolutionFormInner
            data={data}
            isSaving={updateState.isLoading}
            handleOnSubmit={onSubmit}
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

export default RequestResolutionFormForm;
