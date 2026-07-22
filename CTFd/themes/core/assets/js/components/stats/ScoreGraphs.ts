/* eslint-disable @typescript-eslint/no-explicit-any -- API payloads are untyped
 * until ctfd-js is absorbed. */
import { colorHash } from "@ctfdio/ctfd-js/ui";

import { embed } from "../../utils/graphs/echarts";
import { getOption as getUserScoreOption } from "../../utils/graphs/echarts/userscore";
import { component } from "../magics";

export interface ScoreSubject {
  /** Who the graph is about, used for the chart series label. */
  identity(): { id: number; name: string };
  solves(): Promise<any>;
  fails(): Promise<any>;
  awards(): Promise<any>;
  /** Per-page echarts overrides, set on `window` by the template. */
  chartOptions(): Record<string, any> | undefined;
}

export interface CategoryBreakdown {
  name: string;
  count: number;
  percent: string;
  color: string;
}

/**
 * Solve/fail/award statistics with a score-over-time chart.
 *
 * The users and teams pages, in both their public and private variants, all
 * render the same component against a different subject — so they share this
 * one implementation rather than four copies of it.
 */
export function createScoreGraphs(subject: ScoreSubject) {
  return component(() => ({
    solves: null as any,
    fails: null as any,
    awards: null as any,
    solveCount: 0,
    failCount: 0,
    awardCount: 0,

    getSolvePercentage() {
      return this.percentage(this.solveCount);
    },

    getFailPercentage() {
      return this.percentage(this.failCount);
    },

    percentage(count: number) {
      const total = this.solveCount + this.failCount;
      return total === 0 ? "0.00" : ((count / total) * 100).toFixed(2);
    },

    getCategoryBreakdown(): CategoryBreakdown[] {
      // Templates call this during the first render, before init() resolves.
      if (this.solves === null) {
        return [];
      }

      const categories: string[] = this.solves.data.map(
        (solve: any) => solve.challenge.category,
      );

      const breakdown: Record<string, number> = {};
      categories.forEach(category => {
        breakdown[category] = (breakdown[category] ?? 0) + 1;
      });

      return Object.entries(breakdown).map(([name, count]) => ({
        name,
        count,
        percent: ((count / categories.length) * 100).toFixed(2),
        color: colorHash(name),
      }));
    },

    async init() {
      this.solves = await subject.solves();
      this.fails = await subject.fails();
      this.awards = await subject.awards();

      this.solveCount = this.solves.meta.count;
      this.failCount = this.fails.meta.count;
      this.awardCount = this.awards.meta.count;

      const { id, name } = subject.identity();

      embed(
        this.$refs.scoregraph,
        getUserScoreOption(
          id,
          name,
          this.solves.data,
          this.awards.data,
          subject.chartOptions(),
        ),
      );
    },
  }));
}
