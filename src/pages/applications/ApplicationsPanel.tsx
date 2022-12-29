import { useEffect } from 'react';
import { Alert, Spinner } from 'react-bootstrap';
import { Outlet, useNavigate } from 'react-router-dom';
import ApplicationsHeader from '../../components/apps/ApplicationsHeader';
import {
  useGetAppGroupsQuery,
  changeActiveGroup,
  selectActiveGroup,
} from '../../store/appsSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

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
    <>
      {groupsFetched && activeGroup && (
        <div className="px-3 px-lg-7 flex-grow-1 overflow-y-lg-auto">
          {/* header */}
          <ApplicationsHeader
            groups={appGroups}
            activeGroup={activeGroup}
            isLoading={fetchingGroups}
            onSelectGroup={changeGroup}
          />
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
        </div>
      )}

      {/* loading */}
      {loadingGroups && (
        <div className="d-flex flex-column flex-grow-1">
          <div className="d-flex justify-content-center mt-auto">
            <Spinner />
          </div>
          <div className="mt-auto"></div>
        </div>
      )}

      {/* error occurred */}
      {appGroupsFetchingError && !activeGroup && (
        <div className="d-flex flex-column flex-grow-1">
          <div className="d-flex justify-content-center mt-auto">
            <Alert variant="danger">Error occurred. Please refresh the page.</Alert>
          </div>
          <div className="mt-auto"></div>
        </div>
      )}
    </>
  );
}

export default ApplicationsPanel;
