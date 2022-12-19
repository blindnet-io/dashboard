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
        <div>
          <SectionHeader name={'Create new application'} />

          <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
            <div className="row g-5">
              <div className="col-12">
                <div className="mb-5">
                  <label className="form-label" htmlFor={`${id}-name`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id={`${id}-name`}
                    className={`form-control ${
                      errors.name ? 'is-invalid' : ''
                    }`}
                    {...register('name', { required: true })}
                  />
                  {renderRequiredError(
                    errors.name,
                    "Please enter your application's name"
                  )}
                </div>
              </div>

              <div className="col-12 text-end">
                <Link to="/" className="btn btn-sm btn-neutral me-2">
                  Cancel
                </Link>
                <SubmitButton
                  label="Save"
                  isLoading={createAppState.isLoading}
                />
              </div>

              {createAppState.isError && (
                <Alert variant="danger">
                  Error occurred. Please try again.
                </Alert>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreateApp;
