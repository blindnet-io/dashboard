import { AppGroup } from '../../store/appsSlice';
import GroupOptionsDropdown from './GroupOptionsDropdown';

export function ApplicationsHeader({
  groups,
  activeGroup,
  isLoading,
  onSelectGroup,
}: {
  groups: AppGroup[];
  activeGroup: AppGroup;
  isLoading: boolean;
  onSelectGroup: (id: string) => void;
}) {
  return (
    <header className="bg-surface-secondary border-top">
      <div className="container-xl">
        <div className="py-5 border-bottom">
          <div>
            <div className="row align-items-center">
              <div className="col-md-6 col-12 mb-3 mb-md-0">
                <h1 className="h2 mb-0 ls-tight">
                  <GroupOptionsDropdown
                    isLoading={isLoading}
                    activeGroup={activeGroup}
                    groups={groups}
                    onSelectGroup={onSelectGroup}
                  />
                </h1>
              </div>
              {/* <div className="col-md-6 col-12 text-md-end">
                <div className="mx-n1">
                  <Link
                    to="/group/create"
                    className="btn d-inline-flex btn-sm btn-primary mx-1"
                  >
                    <span>
                      <i className="bi bi-plus" /> New group
                    </span>
                  </Link>
                </div>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default ApplicationsHeader;
