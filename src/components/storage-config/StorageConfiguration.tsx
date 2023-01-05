import Accordion from 'react-bootstrap/Accordion';
import { Application } from '../../store/appsSlice';
import ConnectorsConfig from './connectors/ConnectorsConfig';
import TokenConfig from './token/TokenConfig';

export function StorageConfiguration({ app }: { app: Application }) {
  return (
    <Accordion className="overflow-auto" defaultActiveKey="connectors">
      <Accordion.Item eventKey="token">
        <Accordion.Header>API token</Accordion.Header>
        <Accordion.Body>
          <TokenConfig token="" />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="connectors">
        <Accordion.Header>Connectors</Accordion.Header>
        <Accordion.Body>
          <ConnectorsConfig token="" />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default StorageConfiguration;
