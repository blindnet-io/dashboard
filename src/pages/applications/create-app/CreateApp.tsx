import { useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import {
  useCreateAppMutation,
  selectActiveGroup,
} from '../../../store/appsSlice';
import { useAppSelector } from '../../../store/hooks';
import SectionHeader from '../../../components/SectionHeader';

export function CreateApp() {
  const navigate = useNavigate();

  const activeGroup = useAppSelector(selectActiveGroup);

  const [name, setName] = useState('');

  const [create, { isError }] = useCreateAppMutation();

  const id = useId();

  const submit = async () => {
    const res = await create({ group: activeGroup!.id, name });
    if ('data' in res) {
      navigate('/');
    }
  };

  return (
    <div className="h-screen flex-grow-1 overflow-y-lg-auto">
      <div className="container-fluid max-w-screen-md vstack gap-6">
        <div>
          <SectionHeader name={'Create new application'} />
          <div className="form-floating">
            <div className="row g-5">
              <div className="col-12">
                <div>
                  <label className="form-label" htmlFor={`${id}-name`}>
                    Name
                  </label>
                  <input
                    type="text"
                    id={`${id}-name`}
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

              {isError && (
                <Alert variant="danger">
                  Error occurred. Please try again.
                </Alert>
              )}

              <div className="col-12 text-end">
                <Link to="/" className="btn btn-sm btn-neutral me-2">
                  Cancel
                </Link>
                <button
                  type="submit"
                  onClick={submit}
                  className="btn btn-sm btn-primary"
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateApp;
