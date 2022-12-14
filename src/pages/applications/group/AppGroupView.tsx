import { Alert, Spinner } from 'react-bootstrap';
import { skipToken } from '@reduxjs/toolkit/query/react';
import AppList from '../../../components/apps/AppList';
import {
  useGetAppGroupQuery,
  selectActiveGroup,
  useGetAppGroupAppsQuery,
} from '../../../store/appsSlice';
import { useAppSelector } from '../../../store/hooks';

export function AppsGroupView() {
  const activeGroup = useAppSelector(selectActiveGroup);

  const {
    data: group,
    error: groupFetchingError,
    isLoading: loadingGroup,
  } = useGetAppGroupQuery(activeGroup?.id || skipToken);

  const {
    data: apps,
    error: appsFetchingError,
    isLoading: loadingApps,
  } = useGetAppGroupAppsQuery(activeGroup?.id || skipToken);

  return (
    <>
      {(loadingGroup || loadingApps) && (
        <div className="d-flex justify-content-center">
          <Spinner />
        </div>
      )}
      {(groupFetchingError || appsFetchingError) && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )}
      {group !== undefined && apps !== undefined && (
        <div className="flex-grow-1 overflow-y-lg-auto">
          <AppList apps={apps} />
        </div>
      )}
    </>
  );
}

export default AppsGroupView;
