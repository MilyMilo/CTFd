/* eslint-disable @typescript-eslint/no-explicit-any -- Alpine stores and watched
 * values are untyped by nature; narrowing them here would be a fiction. */

import type { ComponentFactory } from "./extend.js";

/**
 * The properties Alpine injects onto a component instance at runtime. They are
 * not present on the object a factory returns, so they are mixed into `this`
 * via `ThisType` rather than declared as fields.
 */
export interface Magics {
  $el: HTMLElement;
  $root: HTMLElement;
  $refs: Record<string, HTMLElement>;
  $store: Record<string, any>;
  $data: Record<string, any>;
  $dispatch: (event: string, detail?: unknown) => void;
  $watch: (property: string, callback: (value: any, previous: any) => void) => void;
  $nextTick: (callback?: () => void) => Promise<void>;
}

/**
 * Declare a component. Identical to writing the factory by hand, except that
 * `this` inside its methods is typed to include Alpine's magic properties.
 */
export function component<T extends object>(
  factory: (...args: any[]) => T & ThisType<T & Magics>,
): ComponentFactory<T> {
  return factory;
}
