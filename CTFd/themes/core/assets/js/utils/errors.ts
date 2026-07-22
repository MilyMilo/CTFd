/** Flatten an API error map into a flat list of messages. */
export function apiErrors(errors?: Record<string, string | string[]>): string[] {
  if (!errors) {
    return [];
  }
  return Object.values(errors).flatMap(error =>
    Array.isArray(error) ? error : [error],
  );
}
