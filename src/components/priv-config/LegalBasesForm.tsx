import { useId, useState } from 'react';
import Alert from 'react-bootstrap/Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import { renderRequiredError } from '../../util/validations';
import SubmitButton from '../common/SubmitButton';
import {
  useCreateLegalBaseMutation,
  useGetLegalBasesQuery,
  useGetPrivacyScopeDimenstionsQuery,
} from '../../store/privConfigSlice';
import { Container, Form, Modal, Spinner } from 'react-bootstrap';
import { NewLegalBase } from '../../types';
import { legalBaseTypes } from '../../consts/legal-base-types';
import { dataCategories } from '../../consts/data-categories';
import { processingPurposes } from '../../consts/processing-purposes';
import { processingCategories } from '../../consts/processing-categories';

function CreateNewLegalBaseForm({
  token,
  onSuccess,
}: {
  token: string;
  onSuccess: (_: string) => void;
}) {
  const id = useId();

  const {
    data: scopeDimensions,
    isError: scopeDimensionsError,
    isLoading: scopeDimensionsLoading,
  } = useGetPrivacyScopeDimenstionsQuery(token);

  const [create, createState] = useCreateLegalBaseMutation();

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    formState: { errors },
  } = useForm<NewLegalBase>({
    defaultValues: {
      scope: [
        {
          data_categories: [],
          processing_categories: [],
          processing_purposes: [],
        },
      ],
    },
  });

  const dcOnChange = (ev: any) => {
    const selectedDcs = [...ev.target.selectedOptions].map(
      (s: { value: string }) => s.value
    );
    setValue('scope', [
      { ...getValues().scope[0], data_categories: selectedDcs },
    ]);
  };

  const pcOnChange = (ev: any) => {
    const selectedPcs = [...ev.target.selectedOptions].map(
      (s: { value: string }) => s.value
    );
    setValue('scope', [
      { ...getValues().scope[0], processing_categories: selectedPcs },
    ]);
  };

  const ppOnChange = (ev: any) => {
    const selectedPps = [...ev.target.selectedOptions].map(
      (s: { value: string }) => s.value
    );
    setValue('scope', [
      { ...getValues().scope[0], processing_purposes: selectedPps },
    ]);
  };

  const submit: SubmitHandler<NewLegalBase> = async (data) => {
    const res = await create([token, data]);
    if ('data' in res) onSuccess(res.data);
  };

  return (
    <Container className="container-sm">
      <Form onSubmit={handleSubmit(submit)}>
        <Form.Group className="mb-5" controlId={`${id}-name`}>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            className={errors.name && 'is-invalid'}
            {...register('name', { required: true })}
          />
          {renderRequiredError(
            errors.name,
            "Please enter the legal base's name"
          )}
        </Form.Group>

        <Form.Group className="mb-5" controlId={`${id}-type`}>
          <Form.Label>Type</Form.Label>
          <Form.Select {...register('lb_type', { required: true })}>
            {legalBaseTypes.map((lbType) => (
              <option key={lbType} value={lbType}>
                {lbType}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-5" controlId={`${id}-description`}>
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            className={errors.description && 'is-invalid'}
            {...register('description')}
          />
        </Form.Group>

        <div className="mb-10">
          {scopeDimensionsError && (
            <Alert variant="danger">
              Error occurred. Please refresh the page.
            </Alert>
          )}
          {scopeDimensionsLoading && <div>loading...</div>}
          {scopeDimensions && (
            <div className="d-grid d-lg-flex gap-5">
              <Form.Group className="flex-lg-fill">
                <Form.Label>Data categories</Form.Label>
                <select
                  className="form-select"
                  style={{ height: '200px' }}
                  multiple
                  onChange={dcOnChange}
                >
                  {dataCategories.map((dc) => (
                    <option key={dc} value={dc}>
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
                  onChange={pcOnChange}
                >
                  {processingCategories.map((pc) => (
                    <option key={pc} value={pc}>
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
                  onChange={ppOnChange}
                >
                  {processingPurposes.map((pp) => (
                    <option key={pp} value={pp}>
                      {pp}
                    </option>
                  ))}
                </select>
              </Form.Group>
            </div>
          )}
        </div>

        <div className="d-grid d-md-flex justify-content-md-end gap-2">
          <span onClick={() => reset()} className="btn btn-sm btn-neutral">
            Reset
          </span>
          <SubmitButton label="Save" isLoading={createState.isLoading} />
        </div>
      </Form>
    </Container>
  );
}

export function LegalBasesForm({ token }: { token: string }) {
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
          <div className="list-group list-group-light">
            {data.map((lb) => (
              <div
                key={lb.id}
                className="list-group-item list-group-item-action list-group-item-light d-flex justify-content-between align-items-center border-0 rounded-3 px-3 mb-2 cursor-pointer"
              >
                <div>
                  <div
                    className="fw-bold text-muted"
                    style={{ fontSize: '120%' }}
                  >
                    {lb.name}
                  </div>
                  <div className="">{lb.id}</div>
                  <div className="mt-3 text-muted">{lb.description}</div>
                </div>
                {lb.active && (
                  <span className="badge rounded-pill bg-success">Active</span>
                )}
                {!lb.active && (
                  <span className="badge rounded-pill bg-danger">Disabled</span>
                )}
              </div>
            ))}
          </div>

          {isFetching && (
            <div
              className="list-group-item list-group-item-light d-flex justify-content-center align-items-center border-0 rounded-3 px-3 mb-2"
              style={{ height: '40px' }}
            >
              <Spinner size="sm" />
            </div>
          )}

          <Modal
            show={showNewLbModal}
            fullscreen={true}
            onHide={() => setShowNewLbModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Create new legal base</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateNewLegalBaseForm token={token} onSuccess={lbCreated} />
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

export default LegalBasesForm;
