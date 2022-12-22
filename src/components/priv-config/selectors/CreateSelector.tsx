import { useId } from 'react';
import { Form } from 'react-bootstrap';
import { SubmitHandler, useForm } from 'react-hook-form';
import { dataCategories } from '../../../consts/data-categories';
import { PrivSelector } from '../../../store/privConfigSlice';
import {
  renderBadFormatError,
  renderRequiredError,
} from '../../../util/validations';

export function CreateSelector({
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
      <h5 className="mb-1">Create new selector</h5>

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

export default CreateSelector;
