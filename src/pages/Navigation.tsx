import { Outlet, Link } from 'react-router-dom';
import logo from '../assets/logos/full-logo.png';
import LegalLinksFooter from '../components/legal/LegalLinksFooter';
// import { selectToken } from '../store/authSlice'
// import { useAppDispatch, useAppSelector } from '../store/hooks'

export function Navigation() {
  // const dispatch = useAppDispatch()

  const logout = () => {
    localStorage.removeItem('token');
    window.location.reload();
    return false;
  };

  return (
    <div className="h-screen d-flex flex-column flex-lg-row h-lg-full bg-gray-100">
      {/* Vertical navbar */}
      <nav
        className="navbar show navbar-vertical h-lg-screen navbar-expand-lg px-0 py-3 py-lg-0 navbar-light bg-light border-end-lg"
        id="navbarVertical"
      >
        <div className="container-fluid">
          {/* Collapse navbar */}
          <button
            className="navbar-toggler ms-n2"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#sidebarCollapse"
            aria-controls="sidebarCollapse"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          {/* Blindnet logo */}
          <a className="navbar-brand py-lg-5 mb-lg-5 px-lg-6 me-0" href="/">
            <img
              style={{ width: '130px', height: 'auto' }}
              src={logo}
              alt="..."
            />
          </a>
          {/* User menu (mobile) */}
          <div className="navbar-user d-lg-none"></div>
          {/* Collapse */}
          <div className="collapse navbar-collapse" id="sidebarCollapse">
            {/* Navigation */}
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-house" /> Applications
                </Link>
              </li>
            </ul>
            {/* Divider */}
            <hr className="navbar-divider my-5 opacity-20" />
            {/* Navigation */}
            <ul className="navbar-nav mb-md-4">
              <li className="nav-item">
                <Link className="nav-link" to="/priv-config">
                  <i className="bi bi-p-square" /> Pending Requests
                  <span className="badge bg-opacity-30 bg-danger text-danger rounded-pill d-inline-flex align-items-center ms-auto">
                    2
                  </span>
                </Link>
              </li>
              <Link className="nav-link" to="/">
                <i className="bi bi-bell" /> Notifications
                <span className="badge bg-opacity-30 bg-danger text-danger rounded-pill d-inline-flex align-items-center ms-auto">
                  1
                </span>
              </Link>
            </ul>
            {/* Push content down */}
            <div className="mt-auto" />
            <ul className="navbar-nav mb-5">
              <li className="nav-item">
                <Link className="nav-link" to="/">
                  <i className="bi bi-person-square" /> Account
                </Link>
              </li>
              <li className="nav-item">
                <div
                  className="nav-link"
                  style={{ cursor: 'pointer' }}
                  onClick={logout}
                >
                  <i className="bi bi-box-arrow-left" /> Logout
                </div>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      {/* Main content */}
      <div className="h-screen h-100 d-flex flex-column flex-grow-1 overflow-y-lg-auto">
        <Outlet />

        <footer className="footer mt-auto py-1 ps-5 bg-light">
          <LegalLinksFooter />
        </footer>
      </div>
    </div>
  );
}

export default Navigation;
