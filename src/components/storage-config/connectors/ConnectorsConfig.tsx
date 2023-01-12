import { useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { useGetConnectorsQuery } from '../../../store/storageConfigSlice';
import ConnectorView from './ConnectorView';
import ConnectorsList from './ConnectorsList';
import CreateConnector from './CreateConnector';

export function ConnectorsConfig({ token }: { token: string }) {
  const [showNewConnModal, setShowNewConnModal] = useState(false);
  const [showConnModal, setShowConnModal] = useState<{ id: string | null }>({
    id: null,
  });

  const { data, isSuccess, isError, isFetching, isLoading } =
    useGetConnectorsQuery(token);

  const connCreated = (id: string) => {
    setShowNewConnModal(false);
    console.log(id);
  };

  return (
    <>
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      )}
      {isSuccess && (
        <>
          <div className="d-grid justify-content-md-end">
            <div
              className="btn d-inline-flex btn-sm btn-primary mx-1"
              onClick={() => setShowNewConnModal(true)}
            >
              <span>
                <i className="bi bi-plus" /> New connector
              </span>
            </div>
          </div>
          <div className="mb-2"></div>
          <ConnectorsList
            connectors={data}
            isFetching={isFetching}
            onSelect={(id) => setShowConnModal({ id })}
          />

          <Modal
            show={showNewConnModal}
            fullscreen={true}
            onHide={() => setShowNewConnModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create new connector</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateConnector token={token} onSuccess={connCreated} />
            </Modal.Body>
          </Modal>

          {showConnModal.id !== null && (
            <Modal
              show={true}
              fullscreen={true}
              onHide={() => setShowConnModal({ id: null })}
            >
              <Modal.Header closeButton>Connector</Modal.Header>
              <Modal.Body>
                <ConnectorView token={token} id={showConnModal.id} />
              </Modal.Body>
            </Modal>
          )}
        </>
      )}
      {isError && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )}
    </>
  );
}

export default ConnectorsConfig;
