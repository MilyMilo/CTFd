import { apiJson } from "./fetch";
import type { ApiResponse, Bracket, ScoreboardEntry, Standing } from "./types";

export async function getScoreboard(): Promise<Standing[]> {
  const body = await apiJson<ApiResponse<Standing[]>>("/api/v1/scoreboard");
  return body.data;
}

export async function getScoreboardDetail(
  count: number,
  bracketId: number | null = null,
): Promise<Record<string, ScoreboardEntry>> {
  const url = bracketId
    ? `/api/v1/scoreboard/top/${count}?bracket_id=${bracketId}`
    : `/api/v1/scoreboard/top/${count}`;

  const body = await apiJson<ApiResponse<Record<string, ScoreboardEntry>>>(url);
  return body.data;
}

export async function getBrackets(userMode: string): Promise<Bracket[]> {
  const body = await apiJson<ApiResponse<Bracket[]>>(
    `/api/v1/brackets?type=${userMode}`,
  );
  return body.data;
}
