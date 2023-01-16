import {
  CONNECTOR_TYPE_CUSTOM,
  CONNECTOR_TYPE_GLOBAL,
} from '../consts/connectors';

export type GeneralInformationPayload = {
  organization: string;
  dpo: string;
  data_consumer_categories?: string;
  countries?: string;
  privacy_policy_link?: string;
  data_security_info?: string;
};

export type ResolutionStrategy = 'auto' | 'manual';

export type RequestResolution = {
  transparency: ResolutionStrategy;
  access: ResolutionStrategy;
  delete: ResolutionStrategy;
  revoke_consent: ResolutionStrategy;
  object: ResolutionStrategy;
  restrict: ResolutionStrategy;
};

export type PrivacyScopeDimensions = {
  data_categories: Array<string>;
  processing_categories: Array<string>;
  purposes: Array<string>;
};

export type SelectorPayload = {
  name: string;
  data_category: string;
};

export type PrivacyScopeTriple = {
  dc: string;
  pc: string;
  pp: string;
};

export type LegalBaseLite = {
  id: string;
  lb_type: string;
  name?: string;
  description?: string;
  active: boolean;
};

export type LegalBase = {
  id: string;
  lb_type: string;
  name?: string;
  description?: string;
  active: boolean;
  scope: {
    triples: Array<PrivacyScopeTriple>;
  };
};

export type NewLegalBase = {
  lb_type: string;
  name: string;
  description?: string;
  scope: Array<{
    data_categories: Array<string>;
    processing_categories: Array<string>;
    processing_purposes: Array<string>;
  }>;
};

export type ConnectorPayload = {
  id: string;
  name: string;
  typ?: string;
  config?: string;
};

export type CreateConnectorPayload = {
  name: string;
  type?: string;
  config?: string;
};

export type NewConnector =
  | {
      type: typeof CONNECTOR_TYPE_GLOBAL;
      name: string;
      settings: GlobalConnectorSettings;
    }
  | {
      type: typeof CONNECTOR_TYPE_CUSTOM;
      name: string;
    };

// TODO
export type GlobalConnectorSettings = { type: 'todo'; config: string };

export type GlobalConnector = {
  type: typeof CONNECTOR_TYPE_GLOBAL;
  id: string;
  name: string;
  settings: GlobalConnectorSettings;
};

export type CustomConnector = {
  type: typeof CONNECTOR_TYPE_CUSTOM;
  id: string;
  name: string;
};

export type Connector = GlobalConnector | CustomConnector;
