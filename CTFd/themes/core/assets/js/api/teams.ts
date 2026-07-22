/* eslint-disable @typescript-eslint/no-explicit-any -- settings payloads are
 * shaped by the operator's custom fields. */
import { apiJson } from "./fetch";
import type {
  ApiResponse,
  Award,
  InviteToken,
  PaginatedResponse,
  Solve,
  Submission,
} from "./types";

type TeamId = number | "me";

export const teamSolves = (id: TeamId) =>
  apiJson<PaginatedResponse<Solve>>(`/api/v1/teams/${id}/solves`);

export const teamFails = (id: TeamId) =>
  apiJson<PaginatedResponse<Submission>>(`/api/v1/teams/${id}/fails`);

export const teamAwards = (id: TeamId) =>
  apiJson<PaginatedResponse<Award>>(`/api/v1/teams/${id}/awards`);

export const getInviteToken = () =>
  apiJson<ApiResponse<InviteToken>>("/api/v1/teams/me/members", { method: "POST" });

export const disbandTeam = () =>
  apiJson<ApiResponse<unknown>>("/api/v1/teams/me", { method: "DELETE" });

export const updateTeamSettings = (data: any) =>
  apiJson<ApiResponse<any>>("/api/v1/teams/me", {
    method: "PATCH",
    body: JSON.stringify(data),
  });
