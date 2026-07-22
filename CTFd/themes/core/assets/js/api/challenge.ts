import { apiJson } from "./fetch";
import type {
  ApiResponse,
  Hint,
  PaginatedResponse,
  Rating,
  Solution,
  SolutionState,
  Solve,
  SubmissionResult,
  SubmissionStatus,
} from "./types";

export async function submitChallenge(
  challengeId: number | null,
  submission: string,
  preview = false,
): Promise<ApiResponse<SubmissionResult>> {
  const url = preview
    ? "/api/v1/challenges/attempt?preview=true"
    : "/api/v1/challenges/attempt";

  return apiJson<ApiResponse<SubmissionResult>>(url, {
    method: "POST",
    body: JSON.stringify({ challenge_id: challengeId, submission }),
  });
}

export async function loadHint(hintId: number | null): Promise<ApiResponse<Hint>> {
  return apiJson<ApiResponse<Hint>>(`/api/v1/hints/${hintId}`);
}

export async function loadUnlock(
  targetId: number | null,
  targetType: "hints" | "solutions" = "hints",
): Promise<ApiResponse<unknown>> {
  return apiJson<ApiResponse<unknown>>("/api/v1/unlocks", {
    method: "POST",
    body: JSON.stringify({ target: targetId, type: targetType }),
  });
}

export async function loadSolves(challengeId: number | null): Promise<Solve[]> {
  const body = await apiJson<ApiResponse<Solve[]>>(
    `/api/v1/challenges/${challengeId}/solves`,
  );
  return body.data;
}

export async function getSolution(challengeId: number | null): Promise<Solution> {
  const body = await apiJson<ApiResponse<Solution>>(
    `/api/v1/challenges/${challengeId}/solution`,
  );
  return body.data;
}

export async function loadSolution(solutionId: number): Promise<Solution> {
  const body = await apiJson<ApiResponse<Solution>>(`/api/v1/solutions/${solutionId}`);
  return body.data;
}

export async function submitRating(
  challengeId: number | null,
  value: number,
  review: string,
): Promise<Rating> {
  const body = await apiJson<ApiResponse<Rating>>(
    `/api/v1/challenges/${challengeId}/ratings`,
    { method: "PUT", body: JSON.stringify({ value, review }) },
  );
  return body.data;
}

/**
 * Whether the UI should fetch a solution after a submission.
 *
 * Defaults to true for unrecognised states so a new solution state errs towards
 * showing the solution rather than hiding it.
 */
export function shouldCheckSolution(
  solutionState: SolutionState | null,
  submissionStatus: SubmissionStatus,
): boolean {
  if (solutionState === "hidden" || solutionState === "visible") {
    return false;
  }
  if (solutionState === "solved") {
    return submissionStatus === "correct";
  }
  return true;
}

export type { PaginatedResponse };
