import React, { useState, useEffect, InputHTMLAttributes, useId } from "react"
import { Link, useParams } from "react-router-dom"
import { Spinner } from 'react-bootstrap';
import { selectToken } from '../../store/authSlice'
import {
  Application,
  selectApp,
} from '../../store/appsSlice'

import styles from './app.module.scss'
import { useAppSelector } from "../../store/hooks";

export function AppPage() {
  const { id } = useParams()

  const token = useAppSelector(selectToken)
  const app = useAppSelector(selectApp(token!, id!))

  const elid = useId()

  const copy = () => {
    (document.getElementById(`${elid}-app-id`) as HTMLInputElement).select()
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
              <label className="form-label" htmlFor={`${elid}-app-id`}>Id</label>
              <div className="input-group">
                <input id={`${elid}-app-id`} type="text" className="form-control" value={app.id} readOnly />
                <span className={`input-group-text ${styles.copy}`} onClick={copy}>
                  <i className="bi bi-clipboard"></i>
                </span>
              </div>
            </div>
            <div className="col-12">
              <label className="form-label" htmlFor={`${elid}-description`}>Description</label>
              <textarea id={`${elid}-description`} className="form-control" value={app.description} readOnly />
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