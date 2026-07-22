/** Shapes returned by the CTFd v1 API. */

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  errors?: Record<string, string | string[]>;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  meta: { count: number; pagination?: Record<string, number> };
}

export type SubmissionStatus =
  | "correct"
  | "incorrect"
  | "already_solved"
  | "authentication_required"
  | "paused"
  | "ratelimited";

export type SolutionState = "hidden" | "visible" | "solved";

export interface ChallengeSummary {
  id: number;
  name: string;
  category: string;
  value: number;
  solves: number | null;
  solved_by_me: boolean;
  type: string;
  tags: { value: string }[];
  template: string;
  script: string;
}

export interface ChallengeDetail extends ChallengeSummary {
  description: string;
  view: string;
  attempts: number;
  max_attempts: number;
  next_id: number | null;
  solution_id: number | null;
  solution_state: SolutionState | null;
  type_data: { id: string; name: string; scripts: { view: string } };
}

export interface Hint {
  id: number;
  title: string | null;
  content: string | null;
  html: string | null;
  cost: number;
}

export interface Solution {
  id: number;
  content: string | null;
  html: string | null;
  state: SolutionState;
}

export interface Solve {
  account_id: number;
  name: string;
  date: string;
  account_url: string;
}

export interface Submission {
  id: number;
  type: string;
  date: string;
  provided: string;
  challenge_id: number;
  challenge: { name: string; category: string; value: number };
}

export interface Award {
  id: number;
  name: string;
  date: string;
  value: number;
  category: string | null;
}

export interface SubmissionResult {
  status: SubmissionStatus;
  message: string;
}

export interface Standing {
  pos: number;
  account_id: number;
  account_url: string;
  name: string;
  score: number;
  bracket_id: number | null;
  bracket_name: string | null;
}

export interface Bracket {
  id: number;
  name: string;
  description: string;
  type: string;
}

export interface ScoreboardEntry {
  id: number;
  name: string;
  solves: { challenge_id: number; account_id: number; date: string; value: number }[];
}

export interface Token {
  id: number;
  value?: string;
  description: string | null;
  created: string;
  expiration: string;
}

export interface InviteToken {
  code: string;
}

export interface Rating {
  value: number;
  review: string | null;
}
