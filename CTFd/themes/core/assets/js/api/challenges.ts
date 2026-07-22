import { apiJson } from "./fetch.js";
import type { ApiResponse, ChallengeDetail, ChallengeSummary } from "./types.js";

export async function getChallenges(): Promise<ChallengeSummary[]> {
  const body = await apiJson<ApiResponse<ChallengeSummary[]>>("/api/v1/challenges");
  return body.data;
}

export async function getChallenge(
  challengeId: number | string,
): Promise<ChallengeDetail> {
  const body = await apiJson<ApiResponse<ChallengeDetail>>(
    `/api/v1/challenges/${challengeId}`,
  );
  return body.data;
}
