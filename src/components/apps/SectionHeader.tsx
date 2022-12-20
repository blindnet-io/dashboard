import { Link } from 'react-router-dom';

export function SectionHeader({ name }: { name?: string }) {
  return (
    <div className="d-md-flex">
      <div className="me-auto">{name && <h2>{name}</h2>}</div>
      <div className="d-none d-md-block pt-1">
        <Link to="/">
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </Link>
      </div>
    </div>
  );
}

export default SectionHeader;
