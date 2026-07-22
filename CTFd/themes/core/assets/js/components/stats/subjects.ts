/* eslint-disable @typescript-eslint/no-explicit-any -- echarts option trees and
 * operator-defined settings have no fixed shape. */
import CTFd from "../../api";

import type { ScoreSubject } from "./ScoreGraphs";

/** The logged-in user, whose endpoints take the "me" pseudo-id. */
export const currentUser: ScoreSubject = {
  identity: () => ({ id: CTFd.user.id!, name: CTFd.user.name! }),
  solves: () => CTFd.pages.users.userSolves("me"),
  fails: () => CTFd.pages.users.userFails("me"),
  awards: () => CTFd.pages.users.userAwards("me"),
  chartOptions: () => window.userScoreGraphChartOptions,
};

/** A user's public profile; the template sets `window.USER`. */
export const publicUser: ScoreSubject = {
  identity: () => ({ id: window.USER.id, name: window.USER.name }),
  solves: () => CTFd.pages.users.userSolves(window.USER.id),
  fails: () => CTFd.pages.users.userFails(window.USER.id),
  awards: () => CTFd.pages.users.userAwards(window.USER.id),
  chartOptions: () => window.userScoreGraphChartOptions,
};

/** The logged-in user's team. */
export const currentTeam: ScoreSubject = {
  identity: () => ({ id: CTFd.team.id!, name: CTFd.team.name! }),
  solves: () => CTFd.pages.teams.teamSolves("me"),
  fails: () => CTFd.pages.teams.teamFails("me"),
  awards: () => CTFd.pages.teams.teamAwards("me"),
  chartOptions: () => window.teamScoreGraphChartOptions,
};

/** A team's public profile; the template sets `window.TEAM`. */
export const publicTeam: ScoreSubject = {
  identity: () => ({ id: window.TEAM.id, name: window.TEAM.name }),
  solves: () => CTFd.pages.teams.teamSolves(window.TEAM.id),
  fails: () => CTFd.pages.teams.teamFails(window.TEAM.id),
  awards: () => CTFd.pages.teams.teamAwards(window.TEAM.id),
  chartOptions: () => window.teamScoreGraphChartOptions,
};
