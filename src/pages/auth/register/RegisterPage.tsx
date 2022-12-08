import { Link, Navigate, useNavigate } from "react-router-dom"
import React, { useEffect, useId, useState } from 'react'
import Alert from 'react-bootstrap/Alert';
import { str2bin, bin2b64str } from '../../../util/conversions'
import {
  authenticate,
  useRegisterMutation,
} from '../../../store/authSlice'
import logo from '../../../assets/logos/b-logo.png'
import { useAppDispatch } from "../../../store/hooks";
import { hashPassword } from "../../../util/crypto";

import styles from "./style.module.scss"

export function RegisterPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [register, registerState] = useRegisterMutation()

  const id = useId()

  const submit = async () => {
    const hash = await hashPassword(password)

    const res = await register({ email, password: hash })
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
              <div className="text-center mb-12"><a className="d-inline-block" href="#"><img src={logo} className="h-12" alt="..." /></a>
                <h1 className="ls-tight font-bolder mt-6">Sign up</h1>
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
                  Sign up
                </button>
              </div>
              {registerState.isError &&
                <Alert variant="danger">
                  Registration failed. Please try again.
                </Alert>
              }
              <div className="my-6">
                <small>Have an account?</small> <Link className="text-warning text-sm font-semibold" to="/login">Log in</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage