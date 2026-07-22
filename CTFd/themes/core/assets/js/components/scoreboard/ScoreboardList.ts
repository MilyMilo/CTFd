/* eslint-disable @typescript-eslint/no-explicit-any -- API payloads are untyped
 * until ctfd-js is absorbed. */
import CTFd from "../../index";
import { component } from "../magics";
import { SCOREBOARD_EVENTS } from "./events";
import { scoreboardUpdateInterval } from "./interval";

export const ScoreboardList = component(() => ({
  standings: [] as Record<string, any>[],
  brackets: [] as Record<string, any>[],
  activeBracket: null as number | null,

  async update() {
    this.brackets = await CTFd.pages.scoreboard.getBrackets(CTFd.config.userMode);
    this.standings = await CTFd.pages.scoreboard.getScoreboard();
  },

  async init() {
    this.$watch("activeBracket", value => {
      this.$dispatch(SCOREBOARD_EVENTS.bracketChange, value);
    });

    this.update();
    setInterval(() => this.update(), scoreboardUpdateInterval());
  },
}));
