/* eslint-disable @typescript-eslint/no-explicit-any --
 * Alpine passes through whatever arguments a template writes in
 * `x-data="Component(...)"`. `any[]` keeps factories bivariant so a concrete
 * component can be stored in the registry without an unsound cast. */

import type { Magics } from "./magics.js";

export type ComponentFactory<T extends object = Record<string, unknown>> = (
  ...args: any[]
) => T;

/**
 * Compose a component factory over a base factory.
 *
 * The result is a *flat* object: parent and override properties are merged into
 * a single object with own properties only, never a prototype chain. Alpine
 * wraps component data in a `@vue/reactivity` proxy, and reactivity tracking on
 * prototype-inherited properties is unreliable — own properties are not.
 *
 * Overrides are written as a function of the base instance, and must return a
 * fresh object each call:
 *
 *     override("Challenge", parent => ({
 *       seen: false,
 *       async showSolves() {
 *         await parent.showSolves.call(this);
 *         this.seen = true;
 *       },
 *     }));
 *
 * A function — rather than a plain object — is required for the same reason
 * `Alpine.data` takes one: an object literal is evaluated once, so any mutable
 * value on it (`[]`, `{}`) would be shared by every instance of the component.
 *
 * To call the base implementation, close over the `parent` argument. The parent
 * is deliberately *not* exposed on the instance (as a `$super` property or
 * similar): resolving it through `this` breaks as soon as a theme extends an
 * already-extended component, because the middle layer would re-read
 * `this.<parent>`, find its own child's parent, and call itself forever. A
 * lexical binding is correct at any depth.
 */
export function extendComponent<B extends object, E extends object>(
  base: ComponentFactory<B>,
  // `ThisType` types `this` inside the returned literal's methods as the merged
  // component plus Alpine's magics, so overrides can reach inherited fields and
  // `$refs`/`$dispatch` with full inference.
  overrides: (parent: B) => E & ThisType<B & E & Magics>,
): ComponentFactory<B & E> {
  return (...args: any[]) => {
    const parent = base(...args);
    return Object.assign({}, parent, overrides(parent));
  };
}
