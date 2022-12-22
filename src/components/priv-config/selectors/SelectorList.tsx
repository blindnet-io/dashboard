import { Spinner } from 'react-bootstrap';

export function SelectorListItem({ selector }: { selector: string }) {
  return (
    <div className="list-group-item d-flex justify-content-between align-items-center px-3 border-0 rounded-3 mb-2 list-group-item-light">
      <div className="fw-bold text-muted" style={{ fontSize: '120%' }}>
        {selector}
      </div>
    </div>
  );
}

export function SelectorListItemLoading() {
  return (
    <div className="list-group-item px-3 border-0 rounded-3 mb-2 list-group-item-light">
      <div className="d-flex justify-content-center">
        <Spinner size="sm" />
      </div>
    </div>
  );
}

export function SelectorList({
  selectors,
  isFetching,
}: {
  selectors: Array<string>;
  isFetching: boolean;
}) {
  return (
    <div className="list-group list-group-light overflow-auto mt-2">
      {selectors.map((s) => (
        <div key={s}>
          <SelectorListItem selector={s} />
        </div>
      ))}
      {isFetching && <SelectorListItemLoading />}
    </div>
  );
}

export default SelectorList;
