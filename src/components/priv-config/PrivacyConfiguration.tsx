import { Application } from '../../store/appsSlice';
import Accordion from 'react-bootstrap/Accordion';
import GeneralInformationForm from './GeneralInformationForm';
import AutomaticResolutionForm from './RequestResolutionForm';
import SelectorsForm from './SelectorsForm';

export function PrivacyConfiguration({ app }: { app: Application }) {
  return (
    <Accordion className="overflow-auto" defaultActiveKey="selectors">
      <Accordion.Item eventKey="general">
        <Accordion.Header>General Information</Accordion.Header>
        <Accordion.Body>
          <GeneralInformationForm token="" />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="resolution">
        <Accordion.Header>Request resolution strategy</Accordion.Header>
        <Accordion.Body>
          <AutomaticResolutionForm token="" />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="selectors">
        <Accordion.Header>Selectors</Accordion.Header>
        <Accordion.Body>
          <SelectorsForm token="" />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="legal-bases">
        <Accordion.Header>Legal bases</Accordion.Header>
        <Accordion.Body>
          <></>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="retention-policies">
        <Accordion.Header>Retention policies</Accordion.Header>
        <Accordion.Body>
          <></>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="provenances">
        <Accordion.Header>Provenances</Accordion.Header>
        <Accordion.Body>
          <></>
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="regulations">
        <Accordion.Header>Regulations</Accordion.Header>
        <Accordion.Body>
          <></>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default PrivacyConfiguration;
