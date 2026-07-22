import { apiJson } from "./fetch.js";
import type { Award, PaginatedResponse, Solve, Submission } from "./types.js";

type UserId = number | "me";

export const userSolves = (id: UserId) =>
  apiJson<PaginatedResponse<Solve>>(`/api/v1/users/${id}/solves`);

export const userFails = (id: UserId) =>
  apiJson<PaginatedResponse<Submission>>(`/api/v1/users/${id}/fails`);

export const userAwards = (id: UserId) =>
  apiJson<PaginatedResponse<Award>>(`/api/v1/users/${id}/awards`);

export const userSubmissions = (id: UserId, challengeId: number | null) =>
  apiJson<PaginatedResponse<Submission>>(
    `/api/v1/users/${id}/submissions?challenge_id=${challengeId}`,
  );
