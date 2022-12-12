import { Navigate, useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetAppQuery } from '../../../store/appsSlice';
import AppInfo from '../../../components/AppInfo';
import SectionHeader from '../../../components/SectionHeader';

export function AppView() {
  const { id } = useParams();

  const { data, isError, isLoading } = useGetAppQuery(id || skipToken);

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
          {data && (
            <>
              <SectionHeader name={data.name} />
              <AppInfo app={data} />
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AppView;
