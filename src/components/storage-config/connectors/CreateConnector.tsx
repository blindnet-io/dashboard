import { useId } from 'react';
import { Container, Form } from 'react-bootstrap';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import {
  connectorTypeInfo,
  CONNECTOR_TYPE_CUSTOM,
  CONNECTOR_TYPE_GLOBAL,
} from '../../../consts/connectors';
import { useCreateConnectorMutation } from '../../../store/storageConfigSlice';
import { NewConnector } from '../../../types';
import {
  renderRequiredError,
  renderRequiredFreeError,
} from '../../../util/validations';
import SubmitButton from '../../common/SubmitButton';
import styles from './styles/create-connector.module.css';

function CreateConnector({
  token,
  onSuccess,
}: {
  token: string;
  onSuccess: (_: string) => void;
}) {
  const id = useId();

  const [create, createState] = useCreateConnectorMutation();

  const defaultValues = {
    type: CONNECTOR_TYPE_GLOBAL,
  };

  const {
    register,
    handleSubmit,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm<NewConnector>({ defaultValues });

  const connType = watch('type');

  const submit: SubmitHandler<NewConnector> = async (data) => {
    const payload =
      data.type === 'global'
        ? {
            name: data.name,
            type: data.settings.type,
            config: data.settings.config,
          }
        : { name: data.name };

    const res = await create([token, payload]);
    if ('data' in res) onSuccess(res.data.id);
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
            "Please enter the connector's name"
          )}
        </Form.Group>

        <Form.Group className="mb-5" controlId={`${id}-type`}>
          <Form.Label>Type</Form.Label>
          <Form.Select {...register('type', { required: true })}>
            <option key={CONNECTOR_TYPE_GLOBAL} value={CONNECTOR_TYPE_GLOBAL}>
              {connectorTypeInfo(CONNECTOR_TYPE_GLOBAL).name}
            </option>
            <option key={CONNECTOR_TYPE_CUSTOM} value={CONNECTOR_TYPE_CUSTOM}>
              {connectorTypeInfo(CONNECTOR_TYPE_CUSTOM).name}
            </option>
          </Form.Select>
        </Form.Group>

        {connType === CONNECTOR_TYPE_GLOBAL && (
          <>
            <Controller
              control={control}
              name="settings.type"
              rules={{ required: true }}
              render={({ field, fieldState, formState }) => (
                <>
                  <div className="row mb-5">
                    <div className="col-sm-4 mb-3 mb-sm-0">
                      <div
                        className={`card ${styles.serviceCard} ${
                          field.value === 'todo'
                            ? styles.serviceCardSelected
                            : ''
                        }`}
                        onClick={() => field.onChange('todo')}
                      >
                        <div className="card-body">
                          <h5 className="card-title">
                            Email marketing service
                          </h5>
                          <div className="card-text">
                            <i
                              className="bi bi-mailbox"
                              style={{ fontSize: '3rem' }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className={`card ${styles.serviceCardDisabled}`}>
                        <div className="card-body">
                          <h5 className="card-title text-muted">
                            Storage service (soon)
                          </h5>
                          <div className="card-text">
                            <i
                              className="bi bi-database text-muted"
                              style={{ fontSize: '3rem' }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-sm-4">
                      <div className={`card ${styles.serviceCardDisabled}`}>
                        <div className="card-body">
                          <h5 className="card-title text-muted">
                            Analytics service (soon)
                          </h5>
                          <div className="card-text">
                            <i
                              className="bi bi-bar-chart-line text-muted"
                              style={{ fontSize: '3rem' }}
                            ></i>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {renderRequiredFreeError(
                    fieldState.error,
                    'Select the global connector type'
                  )}
                </>
              )}
            />

            <Form.Group className="mb-5 mt-5" controlId={`${id}-config`}>
              <Form.Label>Configuration</Form.Label>
              <Form.Control
                as="textarea"
                className={
                  'settings' in errors
                    ? errors.settings?.config && 'is-invalid'
                    : ''
                }
                {...register('settings.config', { required: true })}
              />
              {renderRequiredError(
                'settings' in errors ? errors.settings?.config : undefined,
                "Please enter the connector's name"
              )}
            </Form.Group>
          </>
        )}

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

export default CreateConnector;
