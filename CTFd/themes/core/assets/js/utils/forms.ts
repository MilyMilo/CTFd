/* eslint-disable @typescript-eslint/no-explicit-any -- form payloads are untyped. */

/**
 * Rewrite the flat `fields[<id>]` inputs produced by the custom-field macros
 * into the `fields: [{ field_id, value }]` array the API expects. Mutates and
 * returns the payload.
 */
export function extractCustomFields(data: Record<string, any>): Record<string, any> {
  const fields: { field_id: number; value: any }[] = [];

  for (const property of Object.keys(data)) {
    if (/^fields\[\d+\]$/.test(property)) {
      fields.push({ field_id: parseInt(property.slice(7, -1)), value: data[property] });
      delete data[property];
    }
  }

  data.fields = fields;
  return data;
}
