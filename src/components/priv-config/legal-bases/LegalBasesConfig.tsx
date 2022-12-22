import { useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { useGetLegalBasesQuery } from '../../../store/privConfigSlice';
import { Modal, Spinner } from 'react-bootstrap';
import CreateLegalBase from './CreateLegalBase';
import LegalBasesList from './LegalBasesList';

export function LegalBasesConfig({ token }: { token: string }) {
  const [showNewLbModal, setShowNewLbModal] = useState(false);

  const { data, isSuccess, isError, isFetching, isLoading } =
    useGetLegalBasesQuery(token);

  const lbCreated = (id: string) => {
    setShowNewLbModal(false);
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
              onClick={() => setShowNewLbModal(true)}
            >
              <span>
                <i className="bi bi-plus" /> New legal base
              </span>
            </div>
          </div>
          <div className="mb-2"></div>
          <LegalBasesList legalBases={data} isFetching={isFetching} />

          <Modal
            show={showNewLbModal}
            fullscreen={true}
            onHide={() => setShowNewLbModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create new legal base</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateLegalBase token={token} onSuccess={lbCreated} />
            </Modal.Body>
          </Modal>
        </>
      )}
      {isError && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )}
    </>
  );
}

export default LegalBasesConfig;
