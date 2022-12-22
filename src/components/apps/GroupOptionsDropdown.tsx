import { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import Dropdown from 'react-bootstrap/Dropdown';
import { Link } from 'react-router-dom';
import { AppGroup } from '../../store/appsSlice';
import styles from './styles/group-options-dropdown.module.css';

function truncate(s: string, len: number) {
  return s.length > len ? s.slice(0, len - 1) + '…' : s;
}

function GroupOptionsDropdown({
  isLoading,
  activeGroup,
  groups,
  onSelectGroup,
}: {
  isLoading: boolean;
  activeGroup: AppGroup;
  groups: AppGroup[];
  onSelectGroup: (id: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState('');

  return (
    <Dropdown
      show={open}
      onToggle={() => {
        setFilter('');
        setOpen(!open);
      }}
    >
      <Dropdown.Toggle as={Button} variant="outline-primary">
        {isLoading && <Spinner size={'sm'} />} {truncate(activeGroup.name, 20)}{' '}
        {'   '}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropMenu}>
        <div className="d-grid d-md-flex gap-2">
          <Link
            to="#"
            onClick={() => setOpen(false)}
            className="btn btn-sm btn-neutral mx-1 ms-md-2"
          >
            <span>
              <i className="bi bi-pencil" /> Edit
            </span>
          </Link>
          <Link
            to="/group/create"
            onClick={() => setOpen(false)}
            className="btn btn-sm btn-primary mx-1 mx-md-0"
          >
            <span>
              <i className="bi bi-plus" /> Create new
            </span>
          </Link>
        </div>

        <Dropdown.Divider />

        <span className="p-2">Active groups</span>

        <form className="p-2 bg-light">
          <input
            type="search"
            className="form-control form-control-sm"
            placeholder="Filter groups..."
            value={filter}
            onChange={(e) => setFilter(e.target.value.toLowerCase())}
          />
        </form>
        {groups
          .filter((g) => g.name.toLowerCase().startsWith(filter))
          .map((d) => {
            return (
              <Dropdown.Item
                key={d.id}
                onClick={() => {
                  setOpen(false);
                  onSelectGroup(d.id);
                }}
                className={styles.dropMenuItem}
              >
                {d.name}
              </Dropdown.Item>
            );
          })}
      </Dropdown.Menu>
    </Dropdown>
  );
}

export default GroupOptionsDropdown;
