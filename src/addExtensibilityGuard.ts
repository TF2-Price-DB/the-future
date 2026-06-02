export function addExtensibilityGuard(stringifiedBling: string) {
  return stringifiedBling + "_" + xorshift32() + "^";
}

let state = 69420;
function xorshift32() {
  let x = state;
  x ^= x << 13;
  x ^= x >>> 17;
  x ^= x << 5;
  state = x;
  return state & 0xff;
}
