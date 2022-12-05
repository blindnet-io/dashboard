import React, { useState, useEffect } from "react"
import { Link, useParams } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux'
import { Spinner } from 'react-bootstrap';
import { selectToken } from '../../store/authSlice'
import {
  useGetAppGroupInfoQuery,
  changeActiveGroup,
  selectActiveGroup,
  AppGroup,
} from '../../store/appsSlice'

import styles from './app-groups.module.scss'

export function AppsGroupPage() {
  const token = useSelector(selectToken)
  const activeGroup = useSelector(selectActiveGroup(token!))

  function renderApps(g: AppGroup) {
    return (
      <>
        <div className="d-grid justify-content-md-end">
          <Link to="/app/new" className="btn d-inline-flex btn-sm btn-primary mx-1">
            <span><i className="bi bi-plus" /> New App</span>
          </Link>
        </div>
        <div className="mb-2"></div>
        <div className="list-group list-group-light overflow-auto" style={{ height: "80vh", minHeight: "200px" }}>
          {g.applications.map(app => (
            <Link to={`/app/${app.id}`} key={app.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-3 border-0 rounded-3 mb-2 list-group-item-light" >
              <div>
                <div className="fw-bold text-muted" style={{ fontSize: "120%" }}>{app.name}</div>
                <div className="">{app.id}</div>
              </div>
              {app.active && <span className="badge rounded-pill bg-success">Active</span>}
              {!app.active && <span className="badge rounded-pill bg-danger">Disabled</span>}
            </Link>
          )
          )}
        </div>
      </>
    )
  }

  return (
    <>
      {activeGroup == undefined
        ? <Spinner className="centered" />
        : renderApps(activeGroup)
      }
    </>
  )
}
export default AppsGroupPage