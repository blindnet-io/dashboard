import React, { useEffect, useId, useState } from 'react';
import { Link, Navigate, useNavigate } from "react-router-dom"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Alert from 'react-bootstrap/Alert';
import { str2bin, bin2b64str } from '../../util/conversions';
import {
  useLoginMutation,
  authenticate
} from '../../store/authSlice'
import styles from "./login.module.scss"
import logo from '../../assets/logos/b-logo.png'
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export function LoginPage() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [login, loginState] = useLoginMutation()

  const id = useId()

  const submit = async () => {
    const hashedPassword = await crypto.subtle.digest('SHA-256', str2bin(password)).then(bin2b64str)
    const res = await login({ username, password: hashedPassword })
    if ("data" in res) {
      const token = res.data.token
      localStorage.setItem("token", token)
      dispatch(authenticate(token))
      navigate("/")
    }
  }

  return (
    <div id="app">
      <div className="px-5 py-5 p-lg-0 bg-surface-secondary">
        <div className="d-flex justify-content-center">
          <div className="col-12 col-md-9 col-lg-6 min-h-lg-screen d-flex flex-column justify-content-center py-lg-16 px-lg-20 position-relative">
            <div className="row">
              <div className="col-lg-10 col-md-9 col-xl-7 mx-auto">
                <div className="text-center mb-12"><a className="d-inline-block" href="#"><img src={logo} className="h-12" alt="..." /></a>
                  <h1 className="ls-tight font-bolder mt-6">Welcome back!</h1>
                </div>
                <div className="mb-5"><label className="form-label" htmlFor={`${id}-email`}>Email address</label>
                  <input
                    type="email"
                    className="form-control"
                    id={`${id}-email`}
                    placeholder="Your email address"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
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
                    Error
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
    </div>
  )
}

export default LoginPage