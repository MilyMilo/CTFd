import { config } from "./config.js";

/**
 * fetch() against the CTFd API: prefixes the URL root, sends the session cookie
 * and attaches the CSRF nonce.
 */
export function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
  return fetch(config.urlRoot + url, {
    method: "GET",
    ...options,
    credentials: "same-origin",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "CSRF-Token": config.csrfNonce,
      ...options.headers,
    },
  });
}

/** apiFetch() plus JSON decoding, for endpoints returning the standard envelope. */
export async function apiJson<T>(url: string, options?: RequestInit): Promise<T> {
  const response = await apiFetch(url, options);
  return (await response.json()) as T;
}
