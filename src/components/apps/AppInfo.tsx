import { useId } from 'react';
import { Application } from '../../store/appsSlice';

// import styles from './styles/app-info.module.css';

export function AppInfo({ app }: { app: Application }) {
  const elid = useId();

  const copy = () => {
    (document.getElementById(`${elid}-app-id`) as HTMLInputElement).select();
    navigator.clipboard.writeText(app.id);
  };

  return (
    <>
      <div className="form-floating">
        <div className="row g-5">
          <div className="col-12">
            <div className="input-group shadow-none">
              <input
                id={`${elid}-app-id`}
                type="text"
                className="form-control"
                value={app.id}
                readOnly
                disabled
              />
              <span
                className={`input-group-text cursor-pointer`}
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

export default AppInfo;
