import Alpine from "alpinejs";

import { extendComponent } from "./extend";
import type { ComponentFactory } from "./extend";

export { extendComponent };
export type { ComponentFactory };

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- see extend.ts
const registry = new Map<string, ComponentFactory<any>>();

/** Register a component under the name used by `x-data` in templates. */
export function register<T extends object>(
  name: string,
  factory: ComponentFactory<T>,
): void {
  registry.set(name, factory);
}

/**
 * Replace a registered component with one extending it. Must run before `mount()`.
 * See `extendComponent` for how to call the base implementation.
 */
export function override<B extends object, E extends object>(
  name: string,
  overrides: (parent: B) => E & ThisType<B & E>,
): void {
  const base = registry.get(name);
  if (base === undefined) {
    throw new Error(
      `Cannot override unregistered component "${name}". Known components: ${[
        ...registry.keys(),
      ].join(", ")}`,
    );
  }
  registry.set(name, extendComponent<B, E>(base, overrides));
}

export function registered(name: string): boolean {
  return registry.has(name);
}

/** Push every registered component into Alpine and start it. Call once, last. */
export function mount(): void {
  for (const [name, factory] of registry) {
    Alpine.data(name, factory);
  }
  Alpine.start();
}
