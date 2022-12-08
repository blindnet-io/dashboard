import { useId, useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import Alert from 'react-bootstrap/Alert';
import {
  useLoginMutation,
  authenticate
} from '../../../store/authSlice'
import logo from '../../../assets/logos/b-logo.png'
import { useAppDispatch } from '../../../store/hooks';
import { hashPassword } from '../../../util/crypto';

export function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [login, loginState] = useLoginMutation()

  const id = useId()

  const submit = async () => {
    const hash = await hashPassword(password)

    const res = await login({ email, password: hash })
    if ("data" in res) {
      const { token } = res.data
      localStorage.setItem("token", token)
      dispatch(authenticate({ token }))
      navigate("/")
    }
  }

  return (
    <div className="px-5 py-5 p-lg-0 bg-surface-secondary">
      <div className="d-flex justify-content-center">
        <div className="col-12 col-md-9 col-lg-6 min-h-lg-screen d-flex flex-column justify-content-center py-lg-16 px-lg-20 position-relative">
          <div className="row">
            <div className="col-lg-10 col-md-9 col-xl-7 mx-auto">
              <div className="text-center mb-12"><img src={logo} className="h-12" alt="..." />
                <h1 className="ls-tight font-bolder mt-6">Welcome back!</h1>
              </div>
              <div className="mb-5"><label className="form-label" htmlFor={`${id}-email`}>Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id={`${id}-email`}
                  placeholder="Your email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-5"><label className="form-label" htmlFor={`${id}-password`}>Password</label>
                <input
                  type="password"
                  className="form-control"
                  id={`${id}-password`}
                  placeholder="Password"
                  autoComplete="current-password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                />
              </div>
              <div>
                <button
                  className="btn btn-primary w-full"
                  onClick={submit}
                >
                  Sign in
                </button>
              </div>
              <div className="mt-5" />
              {loginState.isError &&
                <Alert variant="danger">
                  Login failed. Account not found or wrong password.
                </Alert>
              }
              <div className="my-6">
                <small>Don't have an account?</small> <Link className="text-warning text-sm font-semibold" to="/register">Sign up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginPage