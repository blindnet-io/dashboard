import { Alert, Spinner } from 'react-bootstrap';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import { Navigate, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import AppInfo from '../../../components/apps/AppInfo';
import SectionHeader from '../../../components/apps/SectionHeader';
import PrivacyConfiguration from '../../../components/priv-config/PrivacyConfiguration';
import StorageConfiguration from '../../../components/storage-config/StorageConfiguration';
import { useGetAppQuery } from '../../../store/appsSlice';

export function AppView() {
  const { id } = useParams();

  const { data, isError, isLoading } = useGetAppQuery(id || skipToken);

  return (
    <>
      {id ? <></> : <Navigate to="/" />}
      {isLoading && (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      )}
      <div className="flex-grow-1 overflow-y-lg-auto">
        <div className="container-fluid max-w-screen-lg vstack gap-6">
          {isError && (
            <Alert variant="danger">
              Error occurred. Please refresh the page.
            </Alert>
          )}
          {data && (
            <>
              <SectionHeader name={data.name} />
              <Tabs
                defaultActiveKey="info"
                // defaultActiveKey="priv-config"
                className="mb-3"
                justify
              >
                <Tab eventKey="info" title="Info">
                  <AppInfo app={data} />
                </Tab>
                <Tab eventKey="priv-config" title="Privacy Configuration">
                  <PrivacyConfiguration app={data} />
                </Tab>
                <Tab eventKey="storage-config" title="Storage Configuration">
                  <StorageConfiguration app={data} />
                </Tab>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default AppView;
