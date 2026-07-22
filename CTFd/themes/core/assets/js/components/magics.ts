/* eslint-disable @typescript-eslint/no-explicit-any -- Alpine stores and watched
 * values are untyped by nature; narrowing them here would be a fiction. */

import type { ComponentFactory } from "./extend.js";
import { checkRefs } from "./refs.js";

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

export interface ComponentOptions {
  /** Component name, used in the missing-ref warning. */
  name?: string;
  /** `x-ref` names this component reads; checked on init during development. */
  refs?: readonly string[];
}

/**
 * Declare a component. Identical to writing the factory by hand, except that
 * `this` inside its methods is typed to include Alpine's magic properties, and
 * any declared refs are checked when the component initialises.
 */
export function component<T extends object>(
  factory: (...args: any[]) => T & ThisType<T & Magics>,
  options: ComponentOptions = {},
): ComponentFactory<T> {
  const required = options.refs;
  if (!required?.length) {
    return factory;
  }

  return (...args: any[]) => {
    const instance = factory(...args) as T & { init?: () => unknown };
    const original = instance.init;

    instance.init = function init(this: T & Magics) {
      checkRefs(options.name ?? "component", required, this.$refs);
      return original?.call(this);
    };

    return instance;
  };
}
