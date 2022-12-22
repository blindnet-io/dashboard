import { Spinner } from 'react-bootstrap';
import { LegalBaseLite } from '../../../types';

export function LegalBasesListItem({
  legalBase,
}: {
  legalBase: LegalBaseLite;
}) {
  return (
    <div className="list-group-item list-group-item-action list-group-item-light d-flex justify-content-between align-items-center border-0 rounded-3 px-3 mb-2 cursor-pointer">
      <div>
        <div className="fw-bold text-muted" style={{ fontSize: '120%' }}>
          {legalBase.name}
        </div>
        <div className="">{legalBase.id}</div>
        <div className="mt-3 text-muted">{legalBase.description}</div>
      </div>
      {legalBase.active && (
        <span className="badge rounded-pill bg-success">Active</span>
      )}
      {!legalBase.active && (
        <span className="badge rounded-pill bg-danger">Disabled</span>
      )}
    </div>
  );
}

export function LegalBaseItemLoading() {
  return (
    <div
      className="list-group-item list-group-item-light d-flex justify-content-center align-items-center border-0 rounded-3 px-3 mb-2"
      style={{ height: '40px' }}
    >
      <Spinner size="sm" />
    </div>
  );
}

export function LegalBasesList({
  legalBases,
  isFetching,
  onSelect,
}: {
  legalBases: Array<LegalBaseLite>;
  isFetching: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="list-group list-group-light">
      {legalBases.map((lb) => (
        <div key={lb.id} onClick={() => onSelect(lb.id)}>
          <LegalBasesListItem legalBase={lb} />
        </div>
      ))}
      {isFetching && <LegalBaseItemLoading />}
    </div>
  );
}

export default LegalBasesList;
