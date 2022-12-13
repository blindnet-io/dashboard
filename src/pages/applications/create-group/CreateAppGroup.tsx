import { useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as ed from '@noble/ed25519';
import { bin2b64str, b64str2bin } from '../../../util/conversions';
import {
  useCreateAppGroupMutation,
  changeActiveGroup,
} from '../../../store/appsSlice';
import { useAppDispatch } from '../../../store/hooks';
import SectionHeader from '../../../components/SectionHeader';
import {
  renderBadFormatError,
  renderRequiredError,
  validateSecretKey,
} from '../../../util/validations';

import styles from './style.module.scss';
import SubmitButton from '../../../components/SubmitButton';

type Inputs = {
  name: string;
  key: string;
};

export function CreateAppGroup() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      key: bin2b64str(ed.utils.randomPrivateKey()),
    },
  });

  const [create, createGroupState] = useCreateAppGroupMutation();

  const id = useId();

  const copyKey = () => {
    (document.getElementById(`${id}-private-key`) as HTMLInputElement).select();
    navigator.clipboard.writeText(getValues().key);
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const publicKey = await ed.getPublicKey(b64str2bin(data.key));
    const res = await create({ name: data.name, key: bin2b64str(publicKey) });

    if ('data' in res) {
      dispatch(changeActiveGroup(res.data));
      navigate('/');
    }
  };

  return (
    <div className="flex-grow-1 overflow-y-lg-auto">
      <div className="container-fluid max-w-screen-md vstack gap-6">
        <SectionHeader name={'Create new group'} />

        <form className="form-floating" onSubmit={handleSubmit(onSubmit)}>
          <div className="row g-5">
            <div className="col-12">
              <div>
                <label className="form-label" htmlFor={`${id}-name`}>
                  Name
                </label>
                <input
                  type="text"
                  id={`${id}-name`}
                  className={`form-control ${errors.name ? 'is-invalid' : ''}`}
                  {...register('name', { required: true })}
                />
                {renderRequiredError(
                  errors.name,
                  "Please enter the groups's name"
                )}
              </div>
            </div>

            <div className="col-12">
              <label className="form-label" htmlFor={`${id}-private-key`}>
                Key
              </label>
              <div
                className={`input-group ${
                  errors.key
                    ? `is-invalid ${styles.removeInputGroupShadow}`
                    : ''
                }`}
              >
                <textarea
                  id={`${id}-private-key`}
                  className={`form-control ${errors.key ? 'is-invalid' : ''}`}
                  {...register('key', {
                    required: true,
                    validate: validateSecretKey,
                  })}
                />
                <span
                  className={`input-group-text ${styles.copy}`}
                  onClick={copyKey}
                >
                  <i className="bi bi-clipboard"></i>
                </span>
                {renderRequiredError(errors.key, 'Please enter the key')}
                {renderBadFormatError(
                  errors.key,
                  'Please enter the base64 encoded Ed25519 key'
                )}
              </div>
              <span className="d-block mt-2 text-sm text-muted">
                Save this key and keep it secret. If lost, you'll have to
                generate a new one.
              </span>
            </div>

            {createGroupState.isError && <Alert variant="danger">Error</Alert>}

            <div className="col-12 text-end">
              <Link to="/" className="btn btn-sm btn-neutral me-2">
                Cancel
              </Link>
              <SubmitButton
                label="Save"
                isLoading={createGroupState.isLoading}
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateAppGroup;
