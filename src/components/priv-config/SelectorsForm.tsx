import { useId, useMemo } from 'react';
import Alert from 'react-bootstrap/Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import SubmitButton from '../common/SubmitButton';
import {
  addSelector,
  selectNewPrivSelectors,
  PrivSelector,
  removeAllSelectors,
  removeSelector,
  useAddSelectorsMutation,
  useGetPrivacyScopeDimenstionsQuery,
} from '../../store/privConfigSlice';
import { dataCategories } from '../../consts/data-categories';
import {
  renderBadFormatError,
  renderRequiredError,
} from '../../util/validations';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { Form } from 'react-bootstrap';

export function SelectorForm({
  selectors,
  onSubmit,
}: {
  selectors: Array<string>;
  onSubmit: (s: PrivSelector) => void;
}) {
  const id = useId();

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<PrivSelector>();

  const validateSelector = () => {
    return !selectors.includes(
      `${getValues().dataCategory}.${getValues().name}`
    );
  };

  const submit: SubmitHandler<PrivSelector> = (data) => {
    reset();
    onSubmit(data);
  };

  return (
    <Form className="p-3 border rounded" onSubmit={handleSubmit(submit)}>
      <h5 className="mb-1">Add new selector</h5>

      <div className="row g-3">
        <Form.Group
          className="col-xl-4 col-lg-12"
          controlId={`${id}-dataCategory`}
        >
          <Form.Select {...register('dataCategory', { required: true })}>
            {dataCategories.map((dc) => (
              <option key={dc} value={dc}>
                {dc}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="col-xl-7 col-lg-12" controlId={`${id}-name`}>
          <Form.Control
            type="text"
            placeholder="name"
            className={errors.name && 'is-invalid'}
            {...register('name', {
              required: true,
              validate: validateSelector,
            })}
          />
          {renderRequiredError(errors.name, 'Please enter selector name')}
          {renderBadFormatError(errors.name, 'Selector exists')}
        </Form.Group>

        <div className="col-xl-1 col-lg-12">
          <button
            type="submit"
            className="btn btn-primary px-0"
            style={{ width: '100%' }}
          >
            <span>
              <i className="bi bi-plus" />
            </span>
          </button>
        </div>
      </div>
    </Form>
  );
}

export function SelectorsForm({ token }: { token: string }) {
  const dispatch = useAppDispatch();
  const newPrivSelectors = useAppSelector(selectNewPrivSelectors);

  const [add, addState] = useAddSelectorsMutation();
  const { data, isSuccess, isError, isLoading } =
    useGetPrivacyScopeDimenstionsQuery(token);

  const selectors = useMemo(() => {
    return data?.data_categories.filter((dc) => !dataCategories.includes(dc));
  }, [data]);

  const onSubmit: SubmitHandler<PrivSelector> = async (data) => {
    const payload = newPrivSelectors.map((s) => ({
      name: s.name,
      data_category: s.dataCategory,
    }));

    const res = await add([token, payload]);
    if ('data' in res) {
      dispatch(removeAllSelectors());
    }
  };

  return (
    <>
      {isLoading && <div>loading...</div>}
      {isSuccess && selectors && (
        <>
          <h3>Existing</h3>
          <div className="list-group list-group-light overflow-auto mt-2">
            {selectors.map((s) => (
              <div
                key={s}
                className="list-group-item d-flex justify-content-between align-items-center px-3 border-0 rounded-3 mb-2 list-group-item-light"
              >
                <div
                  className="fw-bold text-muted"
                  style={{ fontSize: '120%' }}
                >
                  {s}
                </div>
              </div>
            ))}
          </div>

          <h3 className="mt-5">New</h3>
          <div className="list-group list-group-light overflow-auto mt-2">
            {newPrivSelectors.map((s) => (
              <div
                key={`${s.dataCategory}.${s.name}`}
                className="list-group-item d-flex justify-content-between align-items-center px-3 border-0 rounded-3 mb-2 list-group-item-light"
              >
                <div
                  className="fw-bold text-muted"
                  style={{ fontSize: '120%' }}
                >
                  {s.dataCategory}.{s.name}
                </div>
                <button
                  type="button"
                  onClick={() => dispatch(removeSelector(s))}
                  className="btn-close me-2"
                ></button>
              </div>
            ))}
          </div>
          <SelectorForm
            selectors={selectors}
            onSubmit={(s) => dispatch(addSelector(s))}
          />

          <div className="text-end mt-5">
            <span
              onClick={() => dispatch(removeAllSelectors())}
              className="btn btn-sm btn-neutral me-2"
            >
              Reset
            </span>
            <SubmitButton
              label="Save"
              onClick={onSubmit}
              isLoading={addState.isLoading}
            />
          </div>
        </>
      )}
      {isError && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )}
    </>
  );
}

export default SelectorsForm;
