import { useId } from 'react';
import Alert from 'react-bootstrap/Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import { renderRequiredError } from '../../util/validations';
import SubmitButton from '../SubmitButton';
import {
  useGetGeneralInformationQuery,
  useUpdateGeneralInformationMutation,
} from '../../store/privConfigSlice';

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
  handleOnSubmit,
}: {
  data: GeneralInformation;
  isSaving: boolean;
  handleOnSubmit: (data: GeneralInformation) => any;
}) {
  const id = useId();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<GeneralInformation>({ defaultValues: data });

  const onSubmit: SubmitHandler<GeneralInformation> = (data) => {
    handleOnSubmit(data);
  };

  return (
    <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
      <div className="row g-5">
        <div className="col-12">
          <div className="mb-5">
            <label className="form-label" htmlFor={`${id}-organization`}>
              Organization
            </label>
            <input
              type="text"
              id={`${id}-organization`}
              className={`form-control ${
                errors.organization ? 'is-invalid' : ''
              }`}
              {...register('organization', { required: true })}
            />
            {renderRequiredError(
              errors.organization,
              'Please enter your organization name'
            )}
          </div>

          <div className="mb-5">
            <label className="form-label" htmlFor={`${id}-dpo`}>
              DPO
            </label>
            <textarea
              id={`${id}-dpo`}
              className={`form-control ${errors.dpo ? 'is-invalid' : ''}`}
              {...register('dpo', { required: true })}
            />
            {renderRequiredError(
              errors.dpo,
              "Please enter your organization's DPO information"
            )}
          </div>

          <div className="mb-5">
            <label
              className="form-label"
              htmlFor={`${id}-dataConsumerCategories`}
            >
              Data consumer categories
            </label>
            <textarea
              id={`${id}-dataConsumerCategories`}
              className={`form-control ${
                errors.dataConsumerCategories ? 'is-invalid' : ''
              }`}
              {...register('dataConsumerCategories')}
            />
          </div>

          <div className="mb-5">
            <label className="form-label" htmlFor={`${id}-countries`}>
              Countries
            </label>
            <textarea
              id={`${id}-countries`}
              className={`form-control ${errors.countries ? 'is-invalid' : ''}`}
              {...register('countries')}
            />
          </div>

          <div className="mb-5">
            <label className="form-label" htmlFor={`${id}-privacyPolicyLink`}>
              Privacy policy link
            </label>
            <input
              type="text"
              id={`${id}-privacyPolicyLink`}
              className={`form-control ${
                errors.privacyPolicyLink ? 'is-invalid' : ''
              }`}
              {...register('privacyPolicyLink')}
            />
          </div>

          <div className="mb-5">
            <label className="form-label" htmlFor={`${id}-dataSecurityInfo`}>
              Data security information
            </label>
            <textarea
              id={`${id}-dataSecurityInfo`}
              className={`form-control ${
                errors.dataSecurityInfo ? 'is-invalid' : ''
              }`}
              {...register('dataSecurityInfo')}
            />
          </div>
        </div>

        <div className="col-12 text-end">
          <span onClick={() => reset()} className="btn btn-sm btn-neutral me-2">
            Reset
          </span>
          <SubmitButton label="Save" isLoading={isSaving} />
        </div>
      </div>
    </form>
  );
}

export function GeneralInformationForm({ token }: { token: string }) {
  const [update, updateState] = useUpdateGeneralInformationMutation();
  const { data, isSuccess, isError, isLoading } =
    useGetGeneralInformationQuery(token);

  const onSubmit = async (data: GeneralInformation) => {
    const res = await update([token, data]);
    console.log(res);
  };

  return (
    <>
      {isLoading && <div>loading...</div>}
      {isSuccess && (
        <>
          <GeneralInformationFormInner
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
