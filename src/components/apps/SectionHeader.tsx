import { Link } from 'react-router-dom';

export function SectionHeader({ name }: { name?: string }) {
  return (
    <div className="row mb-5">
      <div className="col-md-6 col-12">{name && <h2>{name}</h2>}</div>
      <div className="col-6 d-none d-md-block text-end">
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
