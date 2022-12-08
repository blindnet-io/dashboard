import { Link, useOutletContext } from "react-router-dom"
import { useSelector } from 'react-redux'
import { Alert, Spinner } from 'react-bootstrap';
import { skipToken } from '@reduxjs/toolkit/query/react'
import {
  useGetAppGroupQuery,
  selectActiveGroup,
  AppGroup,
  useGetAppGroupAppsQuery,
  Application,
} from '../../../store/appsSlice'


export function AppsGroupPage() {
  const { token } = useOutletContext<{ token: string }>()

  const activeGroup = useSelector(selectActiveGroup(token))

  const {
    data: group,
    error: groupFetchingError,
    isLoading: loadingGroup
  } = useGetAppGroupQuery(activeGroup ? { token, id: activeGroup.id } : skipToken)

  const {
    data: apps,
    error: appsFetchingError,
    isLoading: loadingApps
  } = useGetAppGroupAppsQuery(activeGroup ? { token, id: activeGroup.id } : skipToken)

  function render(group: AppGroup, apps: Array<Application>) {
    return (
      <>
        <div className="d-grid justify-content-md-end">
          <Link to="/app/create" className="btn d-inline-flex btn-sm btn-primary mx-1">
            <span><i className="bi bi-plus" /> New App</span>
          </Link>
        </div>
        <div className="mb-2"></div>
        <div className="list-group list-group-light overflow-auto" style={{ height: "80vh", minHeight: "200px" }}>
          {apps.map(app => (
            <Link to={`/app/${app.id}`} key={app.id} className="list-group-item list-group-item-action d-flex justify-content-between align-items-center px-3 border-0 rounded-3 mb-2 list-group-item-light" >
              <div>
                <div className="fw-bold text-muted" style={{ fontSize: "120%" }}>{app.name}</div>
                <div className="">{app.id}</div>
              </div>
              {true && <span className="badge rounded-pill bg-success">Active</span>}
              {false && <span className="badge rounded-pill bg-danger">Disabled</span>}
            </Link>
          )
          )}
        </div>
      </>
    )
  }

  return (
    <>
      {(loadingGroup || loadingApps) && <Spinner />}
      {(groupFetchingError || appsFetchingError) &&
        <Alert variant="danger">
          Error occurred. Please refresh the page.
        </Alert>
      }
      {(group !== undefined && apps !== undefined) && render(group, apps)}
    </>
  )
}

export default AppsGroupPage