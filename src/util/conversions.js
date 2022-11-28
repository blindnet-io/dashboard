export function str2bin(str) {
  return new TextEncoder().encode(str)
}

export function bin2str(ab) {
  return new TextDecoder().decode(ab)
}

export function b64str2bin(b64str) {
  return Uint8Array.from(window.atob(b64str), c => c.charCodeAt(0))
}

export function bin2b64str(arrayBuffer) {
  const x = new Uint8Array(arrayBuffer)
  let str = ''
  for (let i = 0; i < x.length; i++) {
    str += String.fromCharCode(x[i])
  }
  return window.btoa(str)
}