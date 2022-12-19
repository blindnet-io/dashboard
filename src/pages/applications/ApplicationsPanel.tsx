import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Alert, Spinner } from 'react-bootstrap';

import {
  useGetAppGroupsQuery,
  changeActiveGroup,
  selectActiveGroup,
} from '../../store/appsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ApplicationsHeader from '../../components/apps/ApplicationsHeader';

export function ApplicationsPanel() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const activeGroupId = useAppSelector((state) => state.apps.activeGroup);
  const activeGroup = useAppSelector(selectActiveGroup);

  const {
    data: appGroups,
    error: appGroupsFetchingError,
    isLoading: loadingGroups,
    isFetching: fetchingGroups,
    isSuccess: groupsFetched,
  } = useGetAppGroupsQuery(undefined, { pollingInterval: 60000 });

  // first fetch or removal of active group
  useEffect(() => {
    if (activeGroupId === null && groupsFetched) {
      if (appGroups && appGroups.length > 0)
        dispatch(changeActiveGroup(appGroups[0].id));
      // TODO: should be some tutorial page
      else if (appGroups.length === 0) navigate('/group/create');
    }
  }, [activeGroupId, appGroups, dispatch, groupsFetched, navigate]);

  const changeGroup = (id: string) => {
    dispatch(changeActiveGroup(id));
    navigate('/');
  };

  return (
    <div className="px-3 px-lg-7 flex-grow-1 overflow-y-lg-auto">
      {/* header */}
      {groupsFetched && activeGroup && (
        <ApplicationsHeader
          groups={appGroups}
          activeGroup={activeGroup}
          fetching={fetchingGroups}
          onSelectGroup={changeGroup}
        />
      )}
      {/* main content */}
      <main className="py-10 bg-surface-secondary">
        <div className="container-xl">
          {/* <div className="border border-2 bg-surface-secondary h-full border-dashed rounded d-flex flex-column justify-content-center align-items-center" style={{ minHeight: 400 }}>
                <div className="display-4 font-semibold text-muted opacity-50">
                </div>
              </div> */}
          <Outlet />
        </div>
      </main>
      {/* loading */}
      {loadingGroups && <Spinner />}
      {/* error occurred */}
      {appGroupsFetchingError && !activeGroup && (
        <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
      )}
    </div>
  );
}

export default ApplicationsPanel;
