import { useId } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { Application, useGetAppQuery } from '../../../store/appsSlice';

import styles from './style.module.scss';

export function AppView() {
  const { id } = useParams();

  const { data, isError, isLoading } = useGetAppQuery(id || skipToken);

  const elid = useId();

  const copy = () => {
    (document.getElementById(`${elid}-app-id`) as HTMLInputElement).select();
    navigator.clipboard.writeText(data!.id);
  };

  function renderApp(app: Application) {
    return (
      <>
        <div className="row">
          <div className="col-6">
            <h2>{app.name}</h2>
          </div>
          <div className="col-6 text-end">
            <Link to="/">
              <button
                type="button"
                className="btn-close"
                aria-label="Close"
              ></button>
            </Link>
          </div>
        </div>
        <div className="form-floating">
          <div className="row g-5">
            <div className="col-12">
              <label className="form-label" htmlFor={`${elid}-app-id`}>
                Id
              </label>
              <div className="input-group">
                <input
                  id={`${elid}-app-id`}
                  type="text"
                  className="form-control"
                  value={app.id}
                  readOnly
                />
                <span
                  className={`input-group-text ${styles.copy}`}
                  onClick={copy}
                >
                  <i className="bi bi-clipboard"></i>
                </span>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      {id ? <></> : <Navigate to="/" />}
      <div className="h-screen flex-grow-1 overflow-y-lg-auto">
        <div className="container-fluid max-w-screen-md vstack gap-6">
          {isLoading && <Spinner />}
          {isError && (
            <Alert variant="danger">
              Error occurred. Please refresh the page.
            </Alert>
          )}
          {data && renderApp(data)}
        </div>
      </div>
    </>
  );
}

export default AppView;