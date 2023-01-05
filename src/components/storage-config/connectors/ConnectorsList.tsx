import { Spinner } from 'react-bootstrap';
import { Connector } from '../../../types';

export function ConnectorListItem({ connector }: { connector: Connector }) {
  return (
    <div className="list-group-item list-group-item-action list-group-item-light d-flex justify-content-between align-items-center border-0 rounded-3 px-3 mb-2 cursor-pointer">
      <div>
        <div className="fw-bold text-muted" style={{ fontSize: '120%' }}>
          {connector.name}
        </div>
        <div className="">{connector.id}</div>
        <div className="mt-3 text-muted">{connector.type}</div>
      </div>
    </div>
  );
}

export function ConnectorItemLoading() {
  return (
    <div
      className="list-group-item list-group-item-light d-flex justify-content-center align-items-center border-0 rounded-3 px-3 mb-2"
      style={{ height: '40px' }}
    >
      <Spinner size="sm" />
    </div>
  );
}

export function ConnectorsList({
  connectors,
  isFetching,
  onSelect,
}: {
  connectors: Array<Connector>;
  isFetching: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="list-group list-group-light">
      {connectors.map((conn) => (
        <div key={conn.id} onClick={() => onSelect(conn.id)}>
          <ConnectorListItem connector={conn} />
        </div>
      ))}
      {isFetching && <ConnectorItemLoading />}
    </div>
  );
}

export default ConnectorsList;
