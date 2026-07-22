/**
 * Events the challenge components dispatch on the window.
 *
 * Templates bind these as string literals (`@load-challenges.window="..."`), so
 * the values here are the contract between the markup and the components.
 */
export const CHALLENGE_EVENTS = {
  /** Refresh the board's challenge list. */
  loadChallenges: "load-challenges",
  /** Open a specific challenge; detail is the challenge id. */
  loadChallenge: "load-challenge",
} as const;

export type ChallengeEvent = (typeof CHALLENGE_EVENTS)[keyof typeof CHALLENGE_EVENTS];
