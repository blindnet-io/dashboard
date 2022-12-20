import { useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import {
  useCreateAppMutation,
  selectActiveGroup,
} from '../../../store/appsSlice';
import { useAppSelector } from '../../../store/hooks';
import SectionHeader from '../../../components/apps/SectionHeader';
import { renderRequiredError } from '../../../util/validations';
import SubmitButton from '../../../components/common/SubmitButton';
import { Form } from 'react-bootstrap';

type Inputs = {
  name: string;
};

export function CreateApp() {
  const navigate = useNavigate();

  const activeGroup = useAppSelector(selectActiveGroup);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [create, createAppState] = useCreateAppMutation();

  const id = useId();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await create({ group: activeGroup!.id, name: data.name });
    if ('data' in res) {
      navigate('/');
    }
  };

  return (
    <div className="flex-grow-1 overflow-y-lg-auto">
      <div className="container-fluid max-w-screen-lg vstack gap-6">

        <SectionHeader name={'Create new application'} />

        <Form className="form-floating" onSubmit={handleSubmit(onSubmit)}>

          <Form.Group controlId={`${id}-name`}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              className={errors.name && 'is-invalid'}
              {...register('name', { required: true })}
            />
            {renderRequiredError(
              errors.name,
              "Please enter your application's name"
            )}
          </Form.Group>

          <div className="d-grid d-md-flex justify-content-md-end gap-2 mt-5">
            <Link to="/" className="btn btn-sm btn-neutral">
              Cancel
            </Link>
            <SubmitButton
              className=""
              label="Save"
              isLoading={createAppState.isLoading}
            />
          </div>

          {createAppState.isError && (
            <Alert variant="danger">
              Error occurred. Please try again.
            </Alert>
          )}
        </Form>
      </div>
    </div >
  );
}

export default CreateApp;
