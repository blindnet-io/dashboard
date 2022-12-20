import { useId } from 'react';
import Alert from 'react-bootstrap/Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import SubmitButton from '../common/SubmitButton';
import {
  useGetRequestResolutionQuery,
  useUpdateRequestResolutionMutation,
} from '../../store/privConfigSlice';
import { Form } from 'react-bootstrap';
import { RequestResolution } from '../../types';

function RequestResolutionFormInner({
  data,
  isSaving,
  onSubmit,
}: {
  data: RequestResolution;
  isSaving: boolean;
  onSubmit: (data: RequestResolution) => any;
}) {
  const id = useId();

  const { register, handleSubmit, reset } = useForm<RequestResolution>({
    defaultValues: data,
  });

  const submit: SubmitHandler<RequestResolution> = (data) => {
    onSubmit(data);
  };

  return (
    <Form
      className="row row-cols-md-3 row-cols-1 g-5"
      onSubmit={handleSubmit(submit)}
    >
      <Form.Group controlId={`${id}-transparency`}>
        <Form.Label>Transparency</Form.Label>
        <Form.Select {...register('transparency', { required: true })}>
          <option value="auto">automatic</option>
          <option value="manual">manual</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId={`${id}-access`}>
        <Form.Label>Access</Form.Label>
        <Form.Select {...register('access', { required: true })}>
          <option value="auto">automatic</option>
          <option value="manual">manual</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId={`${id}-delete`}>
        <Form.Label>Delete</Form.Label>
        <Form.Select {...register('delete', { required: true })}>
          <option value="auto">automatic</option>
          <option value="manual">manual</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId={`${id}-revoke_consent`}>
        <Form.Label>Revoke consent</Form.Label>
        <Form.Select {...register('revoke_consent', { required: true })}>
          <option value="auto">automatic</option>
          <option value="manual">manual</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId={`${id}-object_scope`}>
        <Form.Label>Object</Form.Label>
        <Form.Select {...register('object_scope', { required: true })}>
          <option value="auto">automatic</option>
          <option value="manual">manual</option>
        </Form.Select>
      </Form.Group>

      <Form.Group controlId={`${id}-restrict_scope`}>
        <Form.Label>Restrict</Form.Label>
        <Form.Select {...register('restrict_scope', { required: true })}>
          <option value="auto">automatic</option>
          <option value="manual">manual</option>
        </Form.Select>
      </Form.Group>

      <div className="offset-md-8 d-grid d-md-flex justify-content-md-end gap-2">
        <span onClick={() => reset(data)} className="btn btn-sm btn-neutral">
          Reset
        </span>
        <SubmitButton label="Save" isLoading={isSaving} />
      </div>
    </Form>
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

export default RequestResolutionFormForm;
