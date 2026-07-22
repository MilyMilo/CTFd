import Alpine from "alpinejs";

import CTFd from "../../index";
import { component } from "../magics";
import { TEAM_MODAL_EVENTS } from "./events";

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
      for (const key of Object.keys(response.errors)) {
        alert(response.errors[key]);
      }
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
