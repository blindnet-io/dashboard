import { useId } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import {
  connectorTypeInfo,
  CONNECTOR_TYPE_GLOBAL,
} from '../../../consts/connectors';
import {
  useGetConnectorQuery,
  useGetConnectorTokenQuery,
  useResetConnectorTokenMutation,
} from '../../../store/storageConfigSlice';
import { Connector } from '../../../types';
import SubmitButton from '../../common/SubmitButton';

function ConnectorViewInner({
  connector,
  token,
}: {
  connector: Connector;
  token: string;
}) {
  const id = useId();

  const {
    data: apiToken,
    isSuccess,
    isError,
    isLoading,
    isFetching,
  } = useGetConnectorTokenQuery([token, connector.id]);

  const [resetApiToken, resetApiTokenState] = useResetConnectorTokenMutation();

  const copyId = () => {
    (document.getElementById(`${id}-id`) as HTMLInputElement).select();
    navigator.clipboard.writeText(connector.id);
  };

  const copyToken = () => {
    if (apiToken) {
      (document.getElementById(`${id}-token`) as HTMLInputElement).select();
      navigator.clipboard.writeText(apiToken);
    }
  };

  return (
    <Container className="container-sm">
      <h1>{connectorTypeInfo(connector.type).name}</h1>
      {connector.type === CONNECTOR_TYPE_GLOBAL && (
        <h3>{connector.settings.type}</h3>
      )}
      <div className="mb-5" />

      <Form>
        <Form.Group className="mb-5" controlId={`${id}-id`}>
          <Form.Label>Id</Form.Label>
          <div className="input-group shadow-none">
            <Form.Control type="text" value={connector.id} readOnly />
            <span
              className={`input-group-text cursor-pointer`}
              onClick={copyId}
            >
              <i className="bi bi-clipboard"></i>
            </span>
          </div>
        </Form.Group>

        <Form.Group className="mb-5" controlId={`${id}-token`}>
          <Form.Label>Connector API token</Form.Label>
          <div className="d-block d-md-flex">
            <div className="flex-grow-1">
              <div className="input-group shadow-none">
                {isSuccess && !isFetching && !resetApiTokenState.isLoading && (
                  <>
                    <Form.Control type="text" value={apiToken} readOnly />
                    <span
                      className={`input-group-text cursor-pointer`}
                      onClick={copyToken}
                    >
                      <i className="bi bi-clipboard"></i>
                    </span>
                  </>
                )}
                {(isLoading || isFetching || resetApiTokenState.isLoading) && (
                  <Form.Control type="text" disabled />
                )}
              </div>
            </div>
            <div className="d-grid d-md-flex justify-content-md-end gap-2 ms-md-2 mt-2 mt-md-0">
              <SubmitButton
                label={isLoading ? '' : 'Reset'}
                type="button"
                onClick={() => resetApiToken([token, connector.id])}
                isLoading={
                  isLoading || isFetching || resetApiTokenState.isLoading
                }
              />
            </div>
          </div>
          {isError && <div>Error</div>}
        </Form.Group>

        <Form.Group className="mb-5" controlId={`${id}-name`}>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={connector.name} readOnly />
        </Form.Group>

        {connector.type === CONNECTOR_TYPE_GLOBAL && (
          // TODO: new component per connector type
          <Form.Group className="mb-5" controlId={`${id}-config`}>
            <Form.Label>Configuration</Form.Label>
            <Form.Control
              as="textarea"
              value={connector.settings.config}
              readOnly
            />
          </Form.Group>
        )}
      </Form>
    </Container>
  );
}

function ConnectorView({ token, id }: { token: string; id: string }) {
  const { data, isSuccess, isError, isLoading } = useGetConnectorQuery([
    token,
    id,
  ]);

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      )}
      {isSuccess && <ConnectorViewInner connector={data} token={token} />}
      {isError && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )}
    </>
  );
}

export default ConnectorView;
