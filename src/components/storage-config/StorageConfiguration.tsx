import Accordion from 'react-bootstrap/Accordion';
import { ApplicationInfo } from '../../store/appsSlice';
import ConnectorsConfig from './connectors/ConnectorsConfig';

export function StorageConfiguration({ app }: { app: ApplicationInfo }) {
  return (
    <Accordion className="overflow-auto" defaultActiveKey="connectors">
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
