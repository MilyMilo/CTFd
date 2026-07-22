/**
 * Components address their markup through `x-ref`, never through ids or
 * classes, so the refs a component reads are part of its public contract with
 * a theme's templates.
 *
 * Nothing enforces that at build time — a theme discovers a missing ref as a
 * TypeError deep in a handler. Declaring them lets the component say so up
 * front, naming the component and the ref.
 *
 * The check runs in production builds too. It costs a few property reads per
 * component and a missing ref is a real bug wherever it happens, and theme
 * authors generally run a production bundle. Each component+ref combination is
 * reported once so a repeated component cannot flood the console.
 */

/** Reported once per component+ref so a repeated component does not spam. */
const reported = new Set<string>();

export function checkRefs(
  name: string,
  required: readonly string[],
  refs: Record<string, HTMLElement> | undefined,
): void {
  const missing = required.filter(ref => !refs?.[ref]);
  if (missing.length === 0) {
    return;
  }

  const key = `${name}:${missing.join(",")}`;
  if (reported.has(key)) {
    return;
  }
  reported.add(key);

  console.warn(
    `[CTFd] <${name}> is missing x-ref: ${missing.map(r => `"${r}"`).join(", ")}. ` +
      `Add them to the element(s) this component reads, ` +
      `e.g. x-ref="${missing[0]}". Without them the component cannot work.`,
  );
}
