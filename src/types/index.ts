export type GeneralInformationPayload = {
  organization: string;
  dpo: string;
  data_consumer_categories?: Array<string>;
  countries?: Array<string>;
  privacy_policy_link?: string;
  data_security_info?: string;
};

export type ResolutionStrategy = 'auto' | 'manual';

export type RequestResolution = {
  transparency: ResolutionStrategy;
  access: ResolutionStrategy;
  delete: ResolutionStrategy;
  revoke_consent: ResolutionStrategy;
  object_scope: ResolutionStrategy;
  restrict_scope: ResolutionStrategy;
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

export type LegalBaseLite = {
  id: string;
  lb_type: string;
  name?: string;
  description?: string;
  active: boolean;
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
