import { useId, useMemo } from 'react';
import { Container, Form, Spinner } from 'react-bootstrap';
import Alert from 'react-bootstrap/Alert';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { dataCategories } from '../../../consts/data-categories';
import { legalBaseTypes } from '../../../consts/legal-base-types';
import { processingCategories } from '../../../consts/processing-categories';
import { processingPurposes } from '../../../consts/processing-purposes';
import {
  useCreateLegalBaseMutation,
  useGetSelectorsQuery,
} from '../../../store/privConfigSlice';
import { NewLegalBase } from '../../../types';
import {
  renderBadFormatFreeError,
  renderRequiredError,
} from '../../../util/validations';
import SubmitButton from '../../common/SubmitButton';

function CreateLegalBase({
  token,
  onSuccess,
}: {
  token: string;
  onSuccess: (_: string) => void;
}) {
  const id = useId();

  const {
    data: selectors,
    isError: selectorsError,
    isLoading: selectorsLoading,
  } = useGetSelectorsQuery(token);

  const scopeDimensions = useMemo(
    () => ({
      data_categories: [...dataCategories, ...(selectors || [])].sort(),
      processing_categories: processingCategories,
      processing_purposes: processingPurposes,
    }),
    [selectors]
  );

  const [create, createState] = useCreateLegalBaseMutation();

  const defaultValues = {
    scope: [
      {
        data_categories: [],
        processing_categories: [],
        processing_purposes: [],
      },
    ],
  };

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<NewLegalBase>({ defaultValues });

  const submit: SubmitHandler<NewLegalBase> = async (data) => {
    const res = await create([token, data]);
    if ('data' in res) onSuccess(res.data);
  };

  return (
    <Container className="container-sm">
      <Form
        onReset={() => reset(defaultValues)}
        onSubmit={handleSubmit(submit)}
      >
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
          {selectorsError && (
            <Alert variant="danger">
              Error occurred. Please refresh the page.
            </Alert>
          )}
          {selectorsLoading && (
            <div className="d-flex justify-content-center">
              <Spinner />
            </div>
          )}
          {scopeDimensions && (
            <Controller
              control={control}
              name="scope"
              rules={{
                required: true,
                validate: (v) =>
                  v[0].data_categories.length > 0 &&
                  v[0].processing_categories.length > 0 &&
                  v[0].processing_purposes.length > 0,
              }}
              render={({ field, fieldState, formState }) => (
                <>
                  <div className="d-grid d-lg-flex gap-5">
                    <Form.Group className="flex-lg-fill">
                      <Form.Label>Data categories</Form.Label>
                      <select
                        className="form-select"
                        style={{ height: '200px' }}
                        multiple
                        value={field.value[0].data_categories}
                        onChange={(ev: any) => {
                          const selectedDcs = [
                            ...ev.target.selectedOptions,
                          ].map((s: { value: string }) => s.value);
                          field.onChange([
                            { ...field.value[0], data_categories: selectedDcs },
                          ]);
                        }}
                      >
                        {scopeDimensions.data_categories.map((dc) => (
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
                        value={field.value[0].processing_categories}
                        onChange={(ev: any) => {
                          const selectedPcs = [
                            ...ev.target.selectedOptions,
                          ].map((s: { value: string }) => s.value);
                          field.onChange([
                            {
                              ...field.value[0],
                              processing_categories: selectedPcs,
                            },
                          ]);
                        }}
                      >
                        {scopeDimensions.processing_categories.map((pc) => (
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
                        value={field.value[0].processing_purposes}
                        onChange={(ev: any) => {
                          const selectedPps = [
                            ...ev.target.selectedOptions,
                          ].map((s: { value: string }) => s.value);
                          field.onChange([
                            {
                              ...field.value[0],
                              processing_purposes: selectedPps,
                            },
                          ]);
                        }}
                      >
                        {scopeDimensions.processing_purposes.map((pp) => (
                          <option key={pp} value={pp}>
                            {pp}
                          </option>
                        ))}
                      </select>
                    </Form.Group>
                  </div>
                  <div className="mb-2" />

                  {renderBadFormatFreeError(
                    fieldState.error,
                    'Please select privacy scope'
                  )}
                </>
              )}
            />
          )}
        </div>

        <div className="d-grid d-md-flex justify-content-md-end gap-2">
          <button type="reset" className="btn btn-sm btn-neutral">
            Reset
          </button>
          <SubmitButton label="Save" isLoading={createState.isLoading} />
        </div>
      </Form>
    </Container>
  );
}

export default CreateLegalBase;
