import Accordion from 'react-bootstrap/Accordion';
import { Application } from '../../store/appsSlice';
import GeneralInformationConfig from './general-information/GeneralInformationConfig';
import LegalBasesConfig from './legal-bases/LegalBasesConfig';
import AutomaticResolutionForm from './request-resolution/RequestResolutionConfig';
import SelectorsConfig from './selectors/SelectorsConfig';

export function PrivacyConfiguration({ app }: { app: Application }) {
  return (
    <Accordion
      className="overflow-auto"
      // defaultActiveKey="general"
    >
      <Accordion.Item eventKey="general">
        <Accordion.Header>General Information</Accordion.Header>
        <Accordion.Body>
          <GeneralInformationConfig token="" />
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
          <SelectorsConfig token="" />
        </Accordion.Body>
      </Accordion.Item>
      <Accordion.Item eventKey="legal-bases">
        <Accordion.Header>Legal bases</Accordion.Header>
        <Accordion.Body>
          <LegalBasesConfig token="" />
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
