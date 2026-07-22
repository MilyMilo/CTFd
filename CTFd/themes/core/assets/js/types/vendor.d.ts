/**
 * Temporary ambient declarations for dependencies that ship no types.
 *
 * `@ctfdio/ctfd-js` is absorbed into this theme as TypeScript in a later step;
 * these declarations exist so components can be migrated first and go away with
 * the dependency.
 */

declare module "@ctfdio/ctfd-js" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const CTFd: any;
  export default CTFd;
}

declare module "@ctfdio/ctfd-js/forms" {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  export function serializeJSON(form: any, initial?: any, diff?: boolean): any;
}

declare module "@ctfdio/ctfd-js/ui" {
  export function colorHash(value: string): string;
  export function hashCode(value: string): number;
}

declare module "lolight" {
  const lolight: (selector: string) => void;
  export default lolight;
}
