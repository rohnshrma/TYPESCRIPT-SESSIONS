// Like throwError in function.ts: this function never returns
export function fail(message: string): never {
  throw new Error(message);
}
