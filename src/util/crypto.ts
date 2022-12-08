import { bin2b64str, str2bin } from './conversions';

export async function hashPassword(password: string, iterations: number = 1e6) {
  const pwKey = await crypto.subtle.importKey(
    'raw',
    str2bin(password),
    'PBKDF2',
    false,
    ['deriveBits']
  );
  // TODO: salt
  const salt = new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
  const hashBuf = await crypto.subtle.deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations },
    pwKey,
    256
  );
  const hash = bin2b64str(hashBuf);

  return hash;
}
