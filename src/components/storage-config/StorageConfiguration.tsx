import Accordion from 'react-bootstrap/Accordion';
import { ApplicationInfo } from '../../store/appsSlice';
import ConnectorsConfig from './connectors/ConnectorsConfig';
import TokenConfig from './token/TokenConfig';

export function StorageConfiguration({ app }: { app: ApplicationInfo }) {
  return (
    <Accordion className="overflow-auto" defaultActiveKey="connectors">
      <Accordion.Item eventKey="token">
        <Accordion.Header>API token</Accordion.Header>
        <Accordion.Body>
          <TokenConfig token={app.dacToken} />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="connectors">
        <Accordion.Header>Connectors</Accordion.Header>
        <Accordion.Body>
          <ConnectorsConfig token={app.dacToken} />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default StorageConfiguration;
