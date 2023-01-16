import { useId, useMemo } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { useGetLegalBaseQuery } from '../../../store/privConfigSlice';
import { LegalBase, PrivacyScopeTriple } from '../../../types';

function LegalBaseViewInner({ legalBase }: { legalBase: LegalBase }) {
  const id = useId();

  const copy = () => {
    (document.getElementById(`${id}-id`) as HTMLInputElement).select();
    navigator.clipboard.writeText(legalBase.id);
  };

  const group = (ts: Array<PrivacyScopeTriple>) => {
    const tDcs = ts.map((t) => t.dc).filter((v, i, a) => a.indexOf(v) === i);
    const tPcs = ts.map((t) => t.pc).filter((v, i, a) => a.indexOf(v) === i);
    const tPps = ts.map((t) => t.pp).filter((v, i, a) => a.indexOf(v) === i);

    return {
      dataCategories: tDcs,
      processingCategories: tPcs,
      processingPurposes: tPps,
    };
  };

  const grouped = useMemo(
    () => group(legalBase.scope.triples),
    [legalBase.scope]
  );

  return (
    <Container className="container-sm">
      <Form>
        <Form.Group className="mb-5" controlId={`${id}-id`}>
          <Form.Label>Id</Form.Label>
          <div className="input-group shadow-none">
            <Form.Control type="text" value={legalBase.id} readOnly />
            <span className={`input-group-text cursor-pointer`} onClick={copy}>
              <i className="bi bi-clipboard"></i>
            </span>
          </div>
        </Form.Group>

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

        <div className="d-grid d-lg-flex gap-5">
          <Form.Group className="flex-lg-fill">
            <Form.Label>Data categories</Form.Label>
            <select
              className="form-select"
              style={{ height: '200px' }}
              multiple
            >
              {grouped.dataCategories.map((dc) => (
                <option
                  key={dc}
                  value={dc}
                  disabled
                  style={{ color: '#161616' }}
                >
                  {dc}
                </option>
              ))}
            </select>
          </Form.Group>

          <Form.Group className="flex-lg-fill">
            <Form.Label>Processing categories</Form.Label>
            <select
              className="form-select"
              style={{ height: '200px' }}
              multiple
            >
              {grouped.processingCategories.map((pc) => (
                <option
                  key={pc}
                  value={pc}
                  disabled
                  style={{ color: '#161616' }}
                >
                  {pc}
                </option>
              ))}
            </select>
          </Form.Group>

          <Form.Group className="flex-lg-fill">
            <Form.Label>Processing purposes</Form.Label>
            <select
              className="form-select"
              style={{ height: '200px' }}
              multiple
            >
              {grouped.processingPurposes.map((pp) => (
                <option
                  key={pp}
                  value={pp}
                  disabled
                  style={{ color: '#161616' }}
                >
                  {pp}
                </option>
              ))}
            </select>
          </Form.Group>
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
