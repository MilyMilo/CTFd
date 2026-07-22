/** Default scoreboard polling interval, overridable per theme from the template. */
export const DEFAULT_SCOREBOARD_UPDATE_INTERVAL = 300000;

export const scoreboardUpdateInterval = () =>
  window.scoreboardUpdateInterval || DEFAULT_SCOREBOARD_UPDATE_INTERVAL;
