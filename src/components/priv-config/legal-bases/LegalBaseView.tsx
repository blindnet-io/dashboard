import { useId } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { useGetLegalBaseQuery } from '../../../store/privConfigSlice';
import { LegalBase } from '../../../types';

function LegalBaseViewInner({ legalBase }: { legalBase: LegalBase }) {
  const id = useId();

  return (
    <Container className="container-sm">
      <Form>
        <Form.Group className="mb-5" controlId={`${id}-name`}>
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" value={legalBase.name} readOnly />
        </Form.Group>

        <Form.Group className="mb-5" controlId={`${id}-type`}>
          <Form.Label>Type</Form.Label>
          <Form.Control type="text" value={legalBase.lb_type} readOnly />
        </Form.Group>

        <Form.Group className="mb-5" controlId={`${id}-description`}>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" value={legalBase.description} readOnly />
        </Form.Group>

        <div className="mb-10">
          {legalBase.scope.triples.map((t, i) => (
            <div key={i.toString()}>
              {t.data_category} {t.processing_category} {t.purpose}
            </div>
          ))}
        </div>
      </Form>
    </Container>
  );
}

function LegalBaseView({ token, id }: { token: string; id: string }) {
  const { data, isSuccess, isError, isLoading } = useGetLegalBaseQuery([
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
      {isSuccess && (
        <>
          <LegalBaseViewInner legalBase={data} />
        </>
      )}
      {isError && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )}
    </>
  );
}

export default LegalBaseView;
