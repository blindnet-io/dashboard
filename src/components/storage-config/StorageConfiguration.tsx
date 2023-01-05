import Accordion from 'react-bootstrap/Accordion';
import { Application } from '../../store/appsSlice';
import TokenConfig from './token/TokenConfig';

export function StorageConfiguration({ app }: { app: Application }) {
  return (
    <Accordion
      className="overflow-auto"
      // defaultActiveKey="token"
    >
      <Accordion.Item eventKey="token">
        <Accordion.Header>API token</Accordion.Header>
        <Accordion.Body>
          <TokenConfig token="" />
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default StorageConfiguration;
