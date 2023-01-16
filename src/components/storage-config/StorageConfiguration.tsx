import { Alert, Spinner } from 'react-bootstrap';
import Accordion from 'react-bootstrap/Accordion';
import { ApplicationInfo } from '../../store/appsSlice';
import {
  useGetStorageConfigQuery,
  useUpdateStorageConfigMutation,
} from '../../store/privConfigSlice';
import { useLazyGetTokenQuery } from '../../store/storageConfigSlice';
import SubmitButton from '../common/SubmitButton';
import ConnectorsConfig from './connectors/ConnectorsConfig';

export function StorageConfiguration({ app }: { app: ApplicationInfo }) {
  const { data, isError, isLoading } = useGetStorageConfigQuery(app.pceToken);

  const [getStorageToken, getStorageTokenResult] = useLazyGetTokenQuery();

  const [createStorage, createStorageState] = useUpdateStorageConfigMutation();

  const onCreateStorage = () => {
    getStorageToken(app.dacToken)
      .unwrap()
      .then((token) =>
        createStorage([
          app.pceToken,
          { url: process.env.REACT_APP_STORAGE_API_URL, token },
        ])
      );
  };

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center h-20">
          <Spinner />
        </div>
      )}
      {isError && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )}
      {!data?.enabled && !createStorageState.isSuccess && (
        <div>
          Storage not enabled for the current app.
          <br />
          <div className="d-grid justify-content-md-center mt-5">
            <SubmitButton
              label="Enable storage"
              isLoading={
                getStorageTokenResult.isLoading ||
                (getStorageTokenResult.isSuccess &&
                  createStorageState.isLoading)
              }
              onClick={() => onCreateStorage()}
            />
          </div>
          {(getStorageTokenResult.isError || createStorageState.isError) && (
            <Alert variant="danger">Error occurred. Please try again.</Alert>
          )}
        </div>
      )}
      {(data?.enabled || createStorageState.isSuccess) && (
        <Accordion className="overflow-auto" defaultActiveKey="connectors">
          <Accordion.Item eventKey="connectors">
            <Accordion.Header>Connectors</Accordion.Header>
            <Accordion.Body>
              <ConnectorsConfig token={app.dacToken} />
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>
      )}
    </>
  );
}

export default StorageConfiguration;
