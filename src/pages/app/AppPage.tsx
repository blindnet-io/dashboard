import React, { useState, useEffect, InputHTMLAttributes } from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap';
import { selectToken } from '../../store/authSlice'
import {
  Application,
  selectApp,
} from '../../store/appsSlice'

import styles from './app.module.scss'

export function AppPage() {
  const { id } = useParams()

  const token = useSelector(selectToken)

  const app = useSelector(selectApp(token!, id!))

  const copy = () => {
    (document.getElementById('app-id') as HTMLInputElement).select()
    navigator.clipboard.writeText(app!.id)
  }

  function renderApp(app: Application) {
    return (
      <>
        <div className="row">
          <div className="col-6">
            <h2>{app.name}</h2>
          </div>
          <div className="col-6 text-end">
            <Link to="/"><button type="button" className="btn-close" aria-label="Close"></button></Link>
          </div>
        </div>
        <div className="form-floating">
          <div className="row g-5">
            <div className="col-12">
              <label className="form-label">Id</label>
              <div className="input-group">
                <input id="app-id" type="text" className="form-control" value={app.id} readOnly />
                <span className={`input-group-text ${styles.copy}`} onClick={copy}>
                  <i className="bi bi-clipboard" aria-hidden="true"></i>
                </span>
              </div>
            </div>
            <div className="col-12">
              <label className="form-label">Description</label>
              <textarea className="form-control" value={app.description} readOnly />
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="h-screen flex-grow-1 overflow-y-lg-auto">
      <div className="container-fluid max-w-screen-md vstack gap-6">
        {app != null
          ? renderApp(app)
          :
          <>
            <div className="col-6 text-end">
              <Link to="/"><button type="button" className="btn-close" aria-label="Close"></button></Link>
            </div>
            <Spinner className="centered" />
          </>
        }
      </div>
    </div>
  )
}

export default AppPage