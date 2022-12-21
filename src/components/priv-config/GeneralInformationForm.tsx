import { useId } from 'react';
import Alert from 'react-bootstrap/Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import { renderRequiredError } from '../../util/validations';
import SubmitButton from '../common/SubmitButton';
import {
  useGetGeneralInformationQuery,
  useUpdateGeneralInformationMutation,
} from '../../store/privConfigSlice';
import { Form, Spinner } from 'react-bootstrap';

export type GeneralInformation = {
  organization: string;
  dpo: string;
  dataConsumerCategories?: Array<string>;
  countries?: Array<string>;
  privacyPolicyLink?: string;
  dataSecurityInfo?: string;
};

function GeneralInformationFormInner({
  data,
  isSaving,
  onSubmit,
}: {
  data: GeneralInformation;
  isSaving: boolean;
  onSubmit: (data: GeneralInformation) => any;
}) {
  const id = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GeneralInformation>({ defaultValues: data });

  const submit: SubmitHandler<GeneralInformation> = (data) => {
    onSubmit(data);
  };

  return (
    <Form onSubmit={handleSubmit(submit)}>
      <Form.Group className="mb-5" controlId={`${id}-organization`}>
        <Form.Label>Organization</Form.Label>
        <Form.Control
          type="text"
          className={errors.organization && 'is-invalid'}
          {...register('organization', { required: true })}
        />
        {renderRequiredError(
          errors.organization,
          'Please enter your organization name'
        )}
      </Form.Group>

      <Form.Group className="mb-5" controlId={`${id}-dpo`}>
        <Form.Label>DPO</Form.Label>
        <Form.Control
          as="textarea"
          className={errors.dpo && 'is-invalid'}
          {...register('dpo', { required: true })}
        />
        {renderRequiredError(
          errors.dpo,
          "Please enter your organization's DPO information"
        )}
      </Form.Group>

      <Form.Group className="mb-5" controlId={`${id}-dataConsumerCategories`}>
        <Form.Label>Data consumer categories</Form.Label>
        <Form.Control
          as="textarea"
          className={errors.dataConsumerCategories && 'is-invalid'}
          {...register('dataConsumerCategories')}
        />
      </Form.Group>

      <Form.Group className="mb-5" controlId={`${id}-countries`}>
        <Form.Label>Data consumer categories</Form.Label>
        <Form.Control
          as="textarea"
          className={errors.countries && 'is-invalid'}
          {...register('countries')}
        />
      </Form.Group>

      <Form.Group className="mb-5" controlId={`${id}-privacyPolicyLink`}>
        <Form.Label>Data consumer categories</Form.Label>
        <Form.Control
          type="text"
          className={errors.privacyPolicyLink && 'is-invalid'}
          {...register('privacyPolicyLink')}
        />
      </Form.Group>

      <Form.Group className="mb-5" controlId={`${id}-dataSecurityInfo`}>
        <Form.Label>Data consumer categories</Form.Label>
        <Form.Control
          as="textarea"
          className={errors.dataSecurityInfo && 'is-invalid'}
          {...register('dataSecurityInfo')}
        />
      </Form.Group>

      <div className="d-grid d-md-flex justify-content-md-end gap-2">
        <span onClick={() => reset()} className="btn btn-sm btn-neutral">
          Reset
        </span>
        <SubmitButton label="Save" isLoading={isSaving} />
      </div>
    </Form>
  );
}

export function GeneralInformationForm({ token }: { token: string }) {
  const [update, updateState] = useUpdateGeneralInformationMutation();
  const { data, isSuccess, isError, isFetching, isLoading } =
    useGetGeneralInformationQuery(token);

  const onSubmit = async (data: GeneralInformation) => {
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
          <GeneralInformationFormInner
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
              General information updated
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

export default GeneralInformationForm;
