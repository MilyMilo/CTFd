import Alpine from "alpinejs";

import { Challenge } from "./components/challenges/Challenge.js";
import { ChallengeBoard } from "./components/challenges/ChallengeBoard.js";
import { Hint } from "./components/challenges/Hint.js";
import { createProfileForm } from "./components/forms/ProfileForm.js";
import { mount, register } from "./components/registry.js";
import { ScoreboardDetail } from "./components/scoreboard/ScoreboardDetail.js";
import { ScoreboardList } from "./components/scoreboard/ScoreboardList.js";
import { Tokens } from "./components/settings/Tokens.js";
import { TokensForm } from "./components/settings/TokensForm.js";
import { SetupForm } from "./components/setup/SetupForm.js";
import { createScoreGraphs } from "./components/stats/ScoreGraphs.js";
import {
  currentTeam,
  currentUser,
  publicTeam,
  publicUser,
} from "./components/stats/subjects.js";
import { CaptainMenu } from "./components/teams/CaptainMenu.js";
import { TeamCaptainModal } from "./components/teams/TeamCaptainModal.js";
import { TeamDisbandModal } from "./components/teams/TeamDisbandModal.js";
import { TeamEditModal } from "./components/teams/TeamEditModal.js";
import { TeamInviteModal } from "./components/teams/TeamInviteModal.js";
import CTFd from "./api/index.js";

/** The stock component set for each page CTFd serves. */
const PAGES = {
  /** CTFd's CMS pages and any template with no components of its own. */
  content: () => {},

  challenges: () => {
    Alpine.store("challenge", { data: { view: "" } });
    register("Hint", Hint);
    register("Challenge", Challenge);
    register("ChallengeBoard", ChallengeBoard);
  },

  scoreboard: () => {
    register("ScoreboardDetail", ScoreboardDetail);
    register("ScoreboardList", ScoreboardList);
  },

  settings: () => {
    register(
      "SettingsForm",
      createProfileForm(data => CTFd.pages.settings.updateSettings(data)),
    );
    register("TokensForm", TokensForm);
    register("Tokens", Tokens);
  },

  setup: () => {
    register("SetupForm", SetupForm);
  },

  usersPrivate: () => {
    register("UserGraphs", createScoreGraphs(currentUser));
  },

  usersPublic: () => {
    register("UserGraphs", createScoreGraphs(publicUser));
  },

  usersList: () => {},

  teamsPrivate: () => {
    Alpine.store("inviteToken", "");
    register("TeamEditModal", TeamEditModal);
    register("TeamCaptainModal", TeamCaptainModal);
    register("TeamInviteModal", TeamInviteModal);
    register("TeamDisbandModal", TeamDisbandModal);
    register("CaptainMenu", CaptainMenu);
    register("TeamGraphs", createScoreGraphs(currentTeam));
  },

  teamsPublic: () => {
    register("TeamGraphs", createScoreGraphs(publicTeam));
  },

  teamsList: () => {},
} as const;

export type PageName = keyof typeof PAGES;

/** Register a page's stock components without starting Alpine. */
export function registerPage(name: PageName): void {
  PAGES[name]();
}

/**
 * Register a page's stock components and start Alpine.
 *
 * A theme that changes nothing about a page needs only:
 *
 *     import "./index.js";
 *     page("challenges");
 *
 * `customize` runs after registration and before mount, which is where a theme
 * calls override() or registers components of its own.
 */
export function page(name: PageName, customize?: () => void): void {
  registerPage(name);
  customize?.();
  mount();
}
