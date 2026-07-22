/* eslint-disable @typescript-eslint/no-explicit-any -- merges arbitrary chart option trees. */

/**
 * Deep-merge `source` into `target`, mutating and returning `target`.
 * https://stackoverflow.com/a/65817907
 */
export function mergeObjects(target: any, source: any): any {
  for (const key of Object.keys(source)) {
    if (source[key] instanceof Object) {
      Object.assign(source[key], mergeObjects(target[key], source[key]));
    }
  }
  Object.assign(target || {}, source);
  return target;
}
