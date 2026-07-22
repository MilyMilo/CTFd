/* eslint-disable @typescript-eslint/no-explicit-any -- settings payloads are
 * shaped by the operator's custom fields. */
import { apiJson } from "./fetch.js";
import type { ApiResponse, Token } from "./types.js";

export const updateSettings = (body: any) =>
  apiJson<ApiResponse<any>>("/api/v1/users/me", {
    method: "PATCH",
    body: JSON.stringify(body),
  });

export const generateToken = (body: any) =>
  apiJson<ApiResponse<Token>>("/api/v1/tokens", {
    method: "POST",
    body: JSON.stringify(body),
  });

export const deleteToken = (tokenId: number | null) =>
  apiJson<ApiResponse<Token>>(`/api/v1/tokens/${tokenId}`, { method: "DELETE" });
