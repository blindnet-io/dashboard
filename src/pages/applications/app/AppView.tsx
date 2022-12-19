import { Navigate, useParams } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import { useGetAppQuery } from '../../../store/appsSlice';
import AppInfo from '../../../components/apps/AppInfo';
import SectionHeader from '../../../components/apps/SectionHeader';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import PrivacyConfiguration from '../../../components/priv-config/PrivacyConfiguration';

export function AppView() {
  const { id } = useParams();

  const { data, isError, isLoading } = useGetAppQuery(id || skipToken);

  return (
    <>
      {id ? <></> : <Navigate to="/" />}
      <div className="flex-grow-1 overflow-y-lg-auto">
        <div className="container-fluid max-w-screen-lg vstack gap-6">
          {isLoading && <Spinner />}
          {isError && (
            <Alert variant="danger">
              Error occurred. Please refresh the page.
            </Alert>
          )}
          {data && (
            <>
              <SectionHeader name={data.name} />
              <Tabs
                // defaultActiveKey="info"
                defaultActiveKey="priv-config"
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
                  <></>
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
