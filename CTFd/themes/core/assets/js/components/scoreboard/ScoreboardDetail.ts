/* eslint-disable @typescript-eslint/no-explicit-any -- echarts option trees and
 * operator-defined settings have no fixed shape. */
import CTFd from "../../api";
import { embed } from "../../utils/graphs/echarts";
import { getOption } from "../../utils/graphs/echarts/scoreboard";
import { component } from "../magics";
import { scoreboardUpdateInterval } from "./interval";

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
    setInterval(() => this.update(), scoreboardUpdateInterval());
  },
}));
