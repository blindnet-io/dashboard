import { FieldError } from 'react-hook-form';
import { b64str2bin } from './conversions';
import * as ed from '@noble/ed25519';

// export const validateEmail = (x: any) => true
export const validateEmail = (value: string) =>
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
    value
  );

export const validateSecretKey = (k: string) =>
  new Promise<Uint8Array>((r) => r(b64str2bin(k)))
    .then((k) => ed.getPublicKey(k))
    .then((_) => true)
    .catch((_) => false);

export const renderRequiredError = (e: FieldError | undefined, msg: string) =>
  e?.type === 'required' && (
    <span className="mt-2 invalid-feedback">
      {msg || 'This field is required'}
    </span>
  );

export const renderBadFormatError = (e: FieldError | undefined, msg: string) =>
  e?.type === 'validate' && (
    <span className="mt-2 invalid-feedback">{msg}</span>
  );
