import { Alert, Spinner } from 'react-bootstrap';
import { skipToken } from '@reduxjs/toolkit/query/react';
import {
  useGetAppGroupQuery,
  selectActiveGroup,
  useGetAppGroupAppsQuery,
} from '../../../store/appsSlice';
import { useAppSelector } from '../../../store/hooks';
import AppList from '../../../components/AppList';

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
      {(loadingGroup || loadingApps) && <Spinner />}
      {(groupFetchingError || appsFetchingError) && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )}
      {group !== undefined && apps !== undefined && <AppList apps={apps} />}
    </>
  );
}

export default AppsGroupView;
