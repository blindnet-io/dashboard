export const CONNECTOR_TYPE_GLOBAL = 'global' as const;
export const CONNECTOR_TYPE_CUSTOM = 'custom' as const;

export type CONNECTOR_TYPE =
  | typeof CONNECTOR_TYPE_GLOBAL
  | typeof CONNECTOR_TYPE_CUSTOM;

export const connectorTypes = [CONNECTOR_TYPE_GLOBAL, CONNECTOR_TYPE_CUSTOM];

export function connectorTypeInfo(type: CONNECTOR_TYPE) {
  switch (type) {
    case CONNECTOR_TYPE_CUSTOM:
      return { name: 'Custom connector' };
    case CONNECTOR_TYPE_GLOBAL:
      return { name: 'Global connector' };
  }
}

export const globalConnectorTypes = ['todo'];
