import { Link } from 'react-router-dom';
// import { Spinner } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { AppGroup } from '../store/appsSlice';

export function ApplicationsHeader({
  groups,
  activeGroup,
  fetching,
  change,
}: {
  groups: AppGroup[];
  activeGroup: AppGroup;
  fetching: boolean;
  change: (id: string) => void;
}) {
  return (
    <header className="bg-surface-secondary border-top">
      <div className="container-xl">
        <div className="py-5 border-bottom">
          <div>
            <div className="row align-items-center">
              <div className="col-md-6 col-12 mb-3 mb-md-0">
                <h1 className="h2 mb-0 ls-tight">
                  App group {}
                  <Dropdown>
                    <Dropdown.Toggle variant="success" id="dropdown-basic">
                      {activeGroup && activeGroup.name}
                      {fetching && (
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                        ></span>
                      )}
                    </Dropdown.Toggle>

                    {groups && (
                      <Dropdown.Menu>
                        {groups.map((d) => {
                          return (
                            <Dropdown.Item
                              key={d.id}
                              onClick={() => change(d.id)}
                            >
                              {d.name}
                            </Dropdown.Item>
                          );
                        })}
                      </Dropdown.Menu>
                    )}
                  </Dropdown>
                </h1>
              </div>
              <div className="col-md-6 col-12 text-md-end">
                <div className="mx-n1">
                  {activeGroup && (
                    <Link
                      to="#"
                      className="btn d-inline-flex btn-sm btn-neutral mx-1"
                    >
                      <span>
                        <i className="bi bi-pencil" /> Edit
                      </span>
                    </Link>
                  )}
                  <Link
                    to="/group/create"
                    className="btn d-inline-flex btn-sm btn-primary mx-1"
                  >
                    <span>
                      <i className="bi bi-plus" /> New group
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ApplicationsHeader;
