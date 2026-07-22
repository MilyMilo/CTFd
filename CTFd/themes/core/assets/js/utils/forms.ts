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

/* eslint-disable @typescript-eslint/no-explicit-any -- form payloads are shaped
 * by the operator's custom fields. */

/** Serialize a form into a plain object, optionally omitting unchanged empties. */
export function serializeJSON(
  form: HTMLFormElement,
  initial?: Record<string, any> | null,
  omitNulls = false,
): Record<string, any> {
  const params: Record<string, any> = {};
  const values: { name: string; value: any }[] = [];

  for (const [name, value] of new FormData(form)) {
    values.push({ name, value });
  }

  form
    .querySelectorAll<HTMLInputElement>("input[type=checkbox]:checked")
    .forEach(box => {
      values.push({ name: box.name, value: true });
    });
  form
    .querySelectorAll<HTMLInputElement>("input[type=checkbox]:not(:checked)")
    .forEach(box => {
      values.push({ name: box.name, value: false });
    });

  for (const { name, value } of values) {
    if (!omitNulls) {
      params[name] = value;
      continue;
    }

    if (value !== null && value !== "") {
      params[name] = value;
      continue;
    }

    // Empty, but still send it if it differs from what the form loaded with.
    const input = form.querySelector<HTMLInputElement>(`[name='${name}']`);
    if (input && initial && initial[input.name] !== input.value) {
      params[name] = value;
    }
  }

  return params;
}
