/* eslint-disable @typescript-eslint/no-explicit-any -- API payloads are untyped
 * until ctfd-js is absorbed. */
import CTFd from "../../index";
import { embed } from "../../utils/graphs/echarts";
import { getOption } from "../../utils/graphs/echarts/scoreboard";
import { component } from "../magics";

/** Default scoreboard polling interval, overridable per theme from the template. */
const DEFAULT_UPDATE_INTERVAL = 300000;

const updateInterval = () => window.scoreboardUpdateInterval || DEFAULT_UPDATE_INTERVAL;

export const ScoreboardDetail = component(() => ({
  data: {} as Record<string, any>,
  show: true,
  activeBracket: null as number | null,

  async update() {
    this.data = await CTFd.pages.scoreboard.getScoreboardDetail(10, this.activeBracket);

    const option = getOption(
      CTFd.config.userMode,
      this.data,
      window.scoreboardChartOptions,
    );

    embed(this.$refs.scoregraph, option);
    this.show = Object.keys(this.data).length > 0;
  },

  async init() {
    this.update();
    setInterval(() => this.update(), updateInterval());
  },
}));

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
      this.$dispatch("bracket-change", value);
    });

    this.update();
    setInterval(() => this.update(), updateInterval());
  },
}));
