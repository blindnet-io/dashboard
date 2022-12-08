import { useEffect } from 'react'
import { Outlet, useNavigate, Link, useOutletContext } from "react-router-dom"
import { Spinner } from "react-bootstrap"
import Dropdown from 'react-bootstrap/Dropdown'

import {
  useGetAppGroupsQuery,
  changeActiveGroup,
  selectActiveGroup
} from '../../store/appsSlice'
import { useAppDispatch } from '../../store/hooks'
import { useSelector } from 'react-redux';

export function ApplicationsPanel() {
  const { token } = useOutletContext<{ token: string }>()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const activeGroup = useSelector(selectActiveGroup(token))

  const {
    data: appGroups,
    error: appGroupsFetchingError,
    isLoading: loadingGroups,
    isFetching: fetchingGroups
  } = useGetAppGroupsQuery(token, { pollingInterval: 60000 })

  useEffect(() => {
    if (activeGroup && appGroups?.find(g => g.id === activeGroup.id))
      return
    else if (appGroups && appGroups.length > 0)
      dispatch(changeActiveGroup(appGroups[0].id))
  }, [activeGroup, appGroups, dispatch])

  const changeGroup = (id: string) => {
    dispatch(changeActiveGroup(id))
    navigate("/")
  }

  return (
    <div className="h-screen px-3 px-lg-7 flex-grow-1 overflow-y-lg-auto">
      <header className="bg-surface-secondary border-top">
        <div className="container-xl">
          <div className="py-5 border-bottom">
            <div>
              <div className="row align-items-center">
                <div className="col-md-6 col-12 mb-3 mb-md-0">
                  <h1 className="h2 mb-0 ls-tight">App group { }
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {activeGroup && activeGroup.name}
                        {fetchingGroups && <span className="spinner-border spinner-border-sm" role="status"></span>}
                      </Dropdown.Toggle>

                      {appGroups &&
                        <Dropdown.Menu>
                          {appGroups.map(d => {
                            return (
                              <Dropdown.Item
                                key={d.id}
                                onClick={() => changeGroup(d.id)}
                              >
                                {d.name}
                              </Dropdown.Item>
                            )
                          })}
                        </Dropdown.Menu>
                      }
                    </Dropdown>
                  </h1>

                </div>
                <div className="col-md-6 col-12 text-md-end">
                  <div className="mx-n1">
                    {activeGroup &&
                      <Link to="#" className="btn d-inline-flex btn-sm btn-neutral mx-1">
                        <span><i className="bi bi-pencil" /> Edit</span>
                      </Link>
                    }
                    <Link to="/group/create" className="btn d-inline-flex btn-sm btn-primary mx-1">
                      <span><i className="bi bi-plus" /> New group</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <main className="py-10 bg-surface-secondary">
        {/* Container */}
        <div className="container-xl">
          {/* <div className="border border-2 bg-surface-secondary h-full border-dashed rounded d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 400 }}>
              <div className="display-4 font-semibold text-muted opacity-50">
              </div>
            </div> */}
          {(appGroupsFetchingError && !activeGroup) && "Error"}
          {loadingGroups && <Spinner />}
          <Outlet context={{ token }} />
        </div>
      </main>
    </div>
  )
}

export default ApplicationsPanel