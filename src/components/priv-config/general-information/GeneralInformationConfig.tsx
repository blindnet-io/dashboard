import { Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import {
  useGetGeneralInformationQuery,
  useUpdateGeneralInformationMutation,
} from '../../../store/privConfigSlice';
import GeneralInformationForm from './GeneralInformationForm';

// TODO: make dataConsumerCategories and countries Array<string> and control with form hook
export type GeneralInformation = {
  organization: string;
  dpo: string;
  dataConsumerCategories?: string;
  countries?: string;
  privacyPolicyLink?: string;
  dataSecurityInfo?: string;
};

export function GeneralInformationConfig({ token }: { token: string }) {
  const [update, updateState] = useUpdateGeneralInformationMutation();
  const { data, isSuccess, /*isError,*/ isFetching, isLoading } =
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
          <GeneralInformationForm
            data={data}
            isSaving={updateState.isLoading}
            onSubmit={onSubmit}
          />
        </>
      )}
      {!isSuccess && (
        // TODO: only for 404
        <>
          <GeneralInformationForm
            data={{
              organization: '',
              dpo: '',
            }}
            isSaving={updateState.isLoading}
            onSubmit={onSubmit}
          />
        </>
      )}
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
      {/* {isError && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )} */}
    </>
  );
}

export default GeneralInformationConfig;
