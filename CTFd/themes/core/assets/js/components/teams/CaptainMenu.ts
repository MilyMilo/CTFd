import Alpine from "alpinejs";

import CTFd from "../../api/index.js";
import { apiErrors } from "../../utils/errors.js";
import { component } from "../magics.js";
import { TEAM_MODAL_EVENTS } from "./events.js";

export const CaptainMenu = component(() => ({
  captain: false,

  editTeam() {
    this.$dispatch(TEAM_MODAL_EVENTS.edit);
  },

  chooseCaptain() {
    this.$dispatch(TEAM_MODAL_EVENTS.captain);
  },

  disbandTeam() {
    this.$dispatch(TEAM_MODAL_EVENTS.disband);
  },

  async inviteMembers() {
    const response = await CTFd.pages.teams.getInviteToken();

    if (!response.success) {
      alert(apiErrors(response.errors).join("\n"));
      return;
    }

    const code = response.data.code;
    // The invite input renders from this store via x-bind:value.
    Alpine.store(
      "inviteToken",
      `${window.location.origin}${CTFd.config.urlRoot}/teams/invite?code=${code}`,
    );
    this.$dispatch(TEAM_MODAL_EVENTS.invite);
  },
}));
