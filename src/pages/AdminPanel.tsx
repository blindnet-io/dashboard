import React, { useEffect } from 'react'
import { Outlet, useNavigate, Link } from "react-router-dom"
import logo from '../assets/logos/full-logo.png'

import { selectToken } from '../store/authSlice'
import {
  useGetAppGroupsQuery,
  changeActiveGroup,
  // selectAppGroupsData,
  // selectActiveGroup
} from '../store/appsSlice'
import {
  useGetInfoQuery,
  // selectAccountInfo
} from '../store/accountSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

export function AdminPanel() {
  const dispatch = useAppDispatch()

  const token = useAppSelector(selectToken)

  const {
    error: accountInfoError,
    isLoading: accountInfoLoading
  } = useGetInfoQuery(token)

  useEffect(() => {
    if (accountInfoError) logout()
  }, [accountInfoError])

  const logout = () => {
    localStorage.removeItem("token")
    window.location.reload()
    return false
  }

  return (
    <div className="d-flex flex-column flex-lg-row h-lg-full bg-gray-100">
      {/* Vertical Navbar */}
      <nav className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 py-lg-0 navbar-light bg-light border-end-lg" id="navbarVertical">
        <div className="container-fluid">
          {/* Toggler */}
          <button className="navbar-toggler ms-n2" type="button" data-bs-toggle="collapse" data-bs-target="#sidebarCollapse" aria-controls="sidebarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          {/* Brand */}
          <a className="navbar-brand py-lg-5 mb-lg-5 px-lg-6 me-0" href="/">
            <img style={{ width: '130px', height: 'auto' }} src={logo} alt="..." />
          </a>
          {/* User menu (mobile) */}
          <div className="navbar-user d-lg-none">
          </div>
          {/* Collapse */}
          <div className="collapse navbar-collapse" id="sidebarCollapse">
            {/* Navigation */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-house" /> Applications
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-database-gear" /> Configuration
                </Link>
              </li>
            </ul>
            {/* Divider */}
            <hr className="navbar-divider my-5 opacity-20" />
            {/* Navigation */}
            <ul className="navbar-nav mb-md-4">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-gear" /> Settings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-bell" /> Notifications
                  <span className="badge bg-opacity-30 bg-danger text-danger rounded-pill d-inline-flex align-items-center ms-auto">1</span>
                </Link>
              </li>
            </ul>
            {/* Push content down */}
            <div className="mt-auto" />
            <ul className="navbar-nav mb-5">
              <li className="nav-item">
                {accountInfoLoading &&
                  <Link className="nav-link" to="/">
                    <i className="bi bi-person-square" /> <span className="spinner-border spinner-border-sm"></span>
                  </Link>
                }
                {!accountInfoLoading &&
                  <Link className="nav-link" to="/">
                    <i className="bi bi-person-square" /> Account
                  </Link>
                }
              </li>
              <li className="nav-item">
                <div className="nav-link" style={{ cursor: 'pointer' }} onClick={logout}>
                  <i className="bi bi-box-arrow-left" /> Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Main content */}
      <Outlet />
    </div >
  )
}

export default AdminPanel