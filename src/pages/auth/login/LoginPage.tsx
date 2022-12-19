import { useId } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Alert from 'react-bootstrap/Alert';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLoginMutation } from '../../../store/authSlice';
import logo from '../../../assets/logos/b-logo.png';
import { hashPassword } from '../../../util/crypto';
import {
  renderBadFormatError,
  renderRequiredError,
  validateEmail,
} from '../../../util/validations';
import SubmitButton from '../../../components/common/SubmitButton';
import LegalLinks from '../../../components/legal/LegalLinks';

type Inputs = {
  email: string;
  password: string;
};

export function LoginPage() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const [login, loginState] = useLoginMutation();

  const id = useId();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const hash = await hashPassword(data.password);
    const res = await login({ email: data.email, password: hash });
    if ('data' in res) {
      const { token } = res.data;
      localStorage.setItem('token', token);
      navigate('/');
    }
  };

  return (
    <div className="px-5 py-5 p-lg-0 bg-surface-secondary">
      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-9 col-lg-6 min-h-lg-screen d-flex flex-column justify-content-center py-lg-16 px-lg-20 position-relative">
          <div className="row">
            <div className="col-lg-10 col-md-9 col-xl-7 mx-auto">
              <div className="text-center mb-12">
                <img src={logo} className="h-12" alt="..." />
                <h1 className="ls-tight font-bolder mt-6">Welcome back!</h1>
              </div>

              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-5">
                  <label className="form-label" htmlFor={`${id}-email`}>
                    Email address
                  </label>
                  <input
                    type="text"
                    className={`form-control ${
                      errors.email ? 'is-invalid' : ''
                    }`}
                    id={`${id}-email`}
                    placeholder="Your email address"
                    {...register('email', {
                      required: true,
                      validate: validateEmail,
                    })}
                  />
                  {renderRequiredError(errors.email, 'Please enter your email')}
                  {renderBadFormatError(errors.email, 'Email in wrong format')}
                </div>
                <div className="mb-5">
                  <label className="form-label" htmlFor={`${id}-password`}>
                    Password
                  </label>
                  <input
                    type="password"
                    className={`form-control ${
                      errors.password ? 'is-invalid' : ''
                    }`}
                    id={`${id}-password`}
                    placeholder="Password"
                    autoComplete="current-password"
                    {...register('password', { required: true })}
                  />
                  {renderRequiredError(
                    errors.password,
                    'Please enter your password'
                  )}
                </div>
                <div>
                  <SubmitButton
                    label="Login"
                    isLoading={loginState.isLoading}
                    big
                  />
                </div>
              </form>

              {loginState.isError && (
                <Alert variant="danger" className="mt-5">
                  Login failed. Account not found or wrong password.
                </Alert>
              )}
              <div className="my-6">
                <small>Don't have an account?</small>{' '}
                <Link
                  className="text-warning text-sm font-semibold"
                  to="/register"
                >
                  Sign up
                </Link>
              </div>
              <div className="mt-5">
                <LegalLinks />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
