import { Link } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import { AppGroup } from '../store/appsSlice';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

import styles from './styles/group-options-dropdown.module.css';

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
      <Dropdown.Toggle as={Button}>
        {isLoading && (
          <span
            className="spinner-border spinner-border-sm"
            role="status"
          ></span>
        )}{' '}
        {activeGroup.name}
      </Dropdown.Toggle>

      <Dropdown.Menu className={styles.dropMenu}>
        <Link
          to="#"
          onClick={() => setOpen(false)}
          className="btn d-inline-flex btn-sm btn-neutral mx-1"
        >
          <span>
            <i className="bi bi-pencil" /> Edit
          </span>
        </Link>
        <Link
          to="/group/create"
          onClick={() => setOpen(false)}
          className="btn d-inline-flex btn-sm btn-primary mx-1"
        >
          <span>
            <i className="bi bi-plus" /> Create new
          </span>
        </Link>

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
