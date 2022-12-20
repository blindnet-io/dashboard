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
import SectionHeader from '../../../components/apps/SectionHeader';
import {
  renderBadFormatError,
  renderRequiredError,
  validateSecretKey,
} from '../../../util/validations';
import { Form, InputGroup } from 'react-bootstrap';

import styles from './style.module.scss';
import SubmitButton from '../../../components/common/SubmitButton';

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
      <div className="container-fluid max-w-screen-lg vstack gap-6">
        <SectionHeader name={'Create new group'} />

        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mb-5" controlId={`${id}-name`}>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              className={errors.name && 'is-invalid'}
              {...register('name', { required: true })}
            />
            {renderRequiredError(errors.name, "Please enter the groups's name")}
          </Form.Group>

          <Form.Group className="mb-5" controlId={`${id}-private-key`}>
            <Form.Label>Key</Form.Label>
            <InputGroup
              className={
                errors.key && `is-invalid ${styles.removeInputGroupShadow}`
              }
            >
              <Form.Control
                as="textarea"
                className={errors.key && 'is-invalid'}
                {...register('key', {
                  required: true,
                  validate: validateSecretKey,
                })}
              />
              <InputGroup.Text
                className={`input-group-text cursor-pointer ${styles.copy}`}
                onClick={copyKey}
              >
                <i className="bi bi-clipboard"></i>
              </InputGroup.Text>
              {renderRequiredError(errors.key, 'Please enter the key')}
              {renderBadFormatError(
                errors.key,
                'Please enter the base64 encoded Ed25519 key'
              )}
            </InputGroup>
            <div className="mt-2"></div>
            <Form.Text className="text-muted">
              Save this key and keep it secret. If lost, you'll have to generate
              a new one.
            </Form.Text>
          </Form.Group>

          {createGroupState.isError && <Alert variant="danger">Error</Alert>}

          <div className="d-grid d-md-flex justify-content-md-end gap-2 mt-10 mt-md-5">
            <Link to="/" className="btn btn-sm btn-neutral">
              Cancel
            </Link>
            <SubmitButton label="Save" isLoading={createGroupState.isLoading} />
          </div>
        </Form>
      </div>
    </div>
  );
}

export default CreateAppGroup;
