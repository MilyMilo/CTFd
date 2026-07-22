import { challenge } from "./challengeTypes.js";
import { config } from "./config.js";
import type { CTFdConfig } from "./config.js";
import { apiFetch } from "./fetch.js";
import { getScript } from "./script.js";
import * as challengeApi from "./challenge.js";
import * as challengesApi from "./challenges.js";
import * as scoreboardApi from "./scoreboard.js";
import * as settingsApi from "./settings.js";
import * as teamsApi from "./teams.js";
import * as usersApi from "./users.js";
import { events } from "./events/index.js";
import type { ChallengeDetail } from "./types.js";

export interface Account {
  id: number | null;
  name: string | null;
  email?: string | null;
}

const user: Account = { id: null, name: null, email: null };
const team: Account = { id: null, name: null };

/**
 * Load a challenge: fetch it, pull in its type's view script, then hand the
 * rendered view to the caller between the plugin's pre/post render hooks.
 */
async function displayChallenge(
  challengeId: number | string,
  render: (challenge: ChallengeDetail) => void,
): Promise<void> {
  challenge.reset();

  const data = await challengesApi.getChallenge(challengeId);
  await getScript(config.urlRoot + data.type_data.scripts.view);

  challenge.preRender(data);
  render(data);
  challenge.postRender();
}

/** The payload base.html writes to `window.init`. */
export interface InitOptions {
  urlRoot?: string;
  csrfNonce?: string;
  userMode?: CTFdConfig["userMode"];
  userId?: number | null;
  userName?: string | null;
  userEmail?: string | null;
  teamId?: number | null;
  teamName?: string | null;
  start?: string | null;
  end?: string | null;
  themeSettings?: CTFdConfig["themeSettings"];
  eventSounds?: string[];
}

let initialized = false;

function init(data: InitOptions = {}): void {
  if (initialized) {
    return;
  }
  initialized = true;

  config.urlRoot = data.urlRoot ?? config.urlRoot;
  config.csrfNonce = data.csrfNonce ?? config.csrfNonce;
  config.userMode = data.userMode ?? config.userMode;
  config.start = data.start ?? config.start;
  config.end = data.end ?? config.end;
  config.themeSettings = data.themeSettings ?? config.themeSettings;
  config.preview = false;

  user.id = data.userId ?? null;
  user.name = data.userName ?? null;
  user.email = data.userEmail ?? null;
  team.id = data.teamId ?? null;
  team.name = data.teamName ?? null;

  void events.init(data.eventSounds ?? []);
}

export const CTFd = {
  init,
  config,
  user,
  team,
  fetch: apiFetch,
  getScript,
  /** Registry used by challenge type plugins to install their hooks. */
  challenge,
  events,
  pages: {
    challenge: { ...challengeApi, displayChallenge },
    challenges: challengesApi,
    scoreboard: scoreboardApi,
    settings: settingsApi,
    teams: teamsApi,
    users: usersApi,
  },
};

export default CTFd;
