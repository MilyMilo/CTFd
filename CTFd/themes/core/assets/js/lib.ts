/**
 * Public entry point for themes building on top of this one.
 *
 * Importing this module has no side effects: it registers nothing and touches
 * no DOM. A theme composes what it needs, registers its own UI adapter, and
 * calls mount() itself. (The theme root, index.ts, is the opposite — it is the
 * core theme's own bootstrap.)
 */

// Page bootstrap
export { registerPage, page } from "./pages.js";
export type { PageName } from "./pages.js";

// Component composition
export {
  component,
  extendComponent,
  mount,
  override,
  register,
  registered,
} from "./components/registry.js";
export type { ComponentFactory, Magics } from "./components/registry.js";

// UI adapter
export { registerUI, ui } from "./ui/adapter.js";
export type {
  ModalHandle,
  TabHandle,
  ToastHandle,
  TooltipHandle,
  TooltipOptions,
  UIAdapter,
} from "./ui/adapter.js";
export { bootstrapUI } from "./ui/bootstrap.js";

// API
export { default as CTFd } from "./api/index.js";
export * from "./api/types.js";

// Components
export { Challenge } from "./components/challenges/Challenge.js";
export { ChallengeBoard } from "./components/challenges/ChallengeBoard.js";
export { Hint } from "./components/challenges/Hint.js";
export { CHALLENGE_EVENTS } from "./components/challenges/events.js";
export { challengeStore } from "./components/challenges/store.js";

export { createProfileForm } from "./components/forms/ProfileForm.js";

export { ScoreboardDetail } from "./components/scoreboard/ScoreboardDetail.js";
export { ScoreboardList } from "./components/scoreboard/ScoreboardList.js";
export { SCOREBOARD_EVENTS } from "./components/scoreboard/events.js";

export { LanguageForm } from "./components/settings/LanguageForm.js";
export { Tokens } from "./components/settings/Tokens.js";
export { TokensForm } from "./components/settings/TokensForm.js";

export { SetupForm } from "./components/setup/SetupForm.js";

export { createScoreGraphs } from "./components/stats/ScoreGraphs.js";
export type {
  ScoreSubject,
  CategoryBreakdown,
} from "./components/stats/ScoreGraphs.js";
export {
  currentTeam,
  currentUser,
  publicTeam,
  publicUser,
} from "./components/stats/subjects.js";

export { CaptainMenu } from "./components/teams/CaptainMenu.js";
export { TeamCaptainModal } from "./components/teams/TeamCaptainModal.js";
export { TeamDisbandModal } from "./components/teams/TeamDisbandModal.js";
export { TeamEditModal } from "./components/teams/TeamEditModal.js";
export { TeamInviteModal } from "./components/teams/TeamInviteModal.js";
export { TEAM_MODAL_EVENTS } from "./components/teams/events.js";

// Page bootstrap helpers. A theme calls these from its own entry if it wants
// core's notification behaviour; they are not run on import.
export { default as initNotificationRead } from "./utils/notifications/read.js";
export { default as initNotificationAlerts } from "./utils/notifications/alerts.js";
export { default as initNotificationToasts } from "./utils/notifications/toasts.js";
export { markRead } from "./utils/notifications/read.js";

// Helpers a theme is likely to reuse
export { apiErrors } from "./utils/errors.js";
export { colorHash } from "./utils/colors.js";
export { copyToClipboard } from "./utils/clipboard.js";
export { extractCustomFields, serializeJSON } from "./utils/forms.js";
export { addTargetBlank } from "./utils/html.js";
export { embed } from "./utils/graphs/echarts/index.js";
export { intl } from "./theme/times.js";
