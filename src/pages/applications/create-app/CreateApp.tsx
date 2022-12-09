import { useId, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import {
  useCreateAppMutation,
  selectActiveGroup,
} from '../../../store/appsSlice';
// import { useAppDispatch } from '../../../store/hooks';
import { useSelector } from 'react-redux';

export function CreateApp() {
  const navigate = useNavigate();
  // const dispatch = useAppDispatch()

  const activeGroup = useSelector(selectActiveGroup);

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
          <div className="row mb-5">
            <div className="col-md-6 col-12">
              <h2>Create new application</h2>
            </div>
            <div className="col-6 d-none d-md-block text-end">
              <Link to="/">
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                ></button>
              </Link>
            </div>
          </div>
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
