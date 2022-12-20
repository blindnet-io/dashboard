import { Link } from 'react-router-dom';
import { Application } from '../../store/appsSlice';

export function AppList({ apps }: { apps: Application[] }) {
  return (
    <>
      <div className="d-grid justify-content-md-end">
        <Link
          to="/app/create"
          className="btn d-inline-flex btn-sm btn-primary mx-1"
        >
          <span>
            <i className="bi bi-plus" /> New App
          </span>
        </Link>
      </div>
      <div className="mb-2"></div>
      <div
        className="list-group list-group-light overflow-auto"
        style={{ height: '70vh', minHeight: '200px' }}
      >
        {apps.map((app) => (
          <Link
            to={`/app/${app.id}`}
            key={app.id}
            className="list-group-item list-group-item-action list-group-item-light d-flex justify-content-between align-items-center border-0 rounded-3 px-3 mb-2"
          >
            <div>
              <div className="fw-bold text-muted" style={{ fontSize: '120%' }}>
                {app.name}
              </div>
              <div className="">{app.id}</div>
            </div>
            {true && (
              <span className="badge rounded-pill bg-success">Active</span>
            )}
            {false && (
              <span className="badge rounded-pill bg-danger">Disabled</span>
            )}
          </Link>
        ))}
      </div>
    </>
  );
}

export default AppList;
