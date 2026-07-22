/** Events the scoreboard components dispatch on the window. */
export const SCOREBOARD_EVENTS = {
  /** The selected bracket changed; detail is the bracket id or null. */
  bracketChange: "bracket-change",
} as const;

export type ScoreboardEvent =
  (typeof SCOREBOARD_EVENTS)[keyof typeof SCOREBOARD_EVENTS];
