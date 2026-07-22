/* eslint-disable @typescript-eslint/no-explicit-any -- API payloads are untyped
 * until ctfd-js is absorbed. */
import Alpine from "alpinejs";
import { serializeJSON } from "@ctfdio/ctfd-js/forms";

import CTFd from "../../index";
import { ui } from "../../ui/adapter";
import { copyToClipboard } from "../../utils/clipboard";
import { extendComponent } from "../extend";
import { createProfileForm } from "../forms/ProfileForm";
import { component } from "../magics";

/**
 * Window events the captain menu dispatches to open each modal.
 *
 * The modals are siblings of the menu in the template, not descendants, so the
 * menu cannot reach them through `$refs`. Rather than look them up by id, each
 * modal listens for its own event and shows itself — which also keeps the
 * Bootstrap-specific lookup out of the menu entirely.
 */
export const TEAM_MODAL_EVENTS = {
  edit: "open-team-edit",
  captain: "open-team-captain",
  invite: "open-team-invite",
  disband: "open-team-disband",
} as const;

export const TeamEditModal = extendComponent(
  createProfileForm(data => CTFd.pages.teams.updateTeamSettings(data)),
  () => ({
    show() {
      ui().modal(this.$el).show();
    },
  }),
);

export const TeamCaptainModal = component(() => ({
  success: null as boolean | null,
  error: null as boolean | null,
  errors: [] as string[],

  show() {
    ui().modal(this.$el).show();
  },

  async updateCaptain() {
    const data = serializeJSON(this.$refs.form, null, true);
    const response = await CTFd.pages.teams.updateTeamSettings(data);

    if (response.success) {
      window.location.reload();
      return;
    }

    this.success = false;
    this.error = true;
    for (const key of Object.keys(response.errors)) {
      this.errors.push(response.errors[key]);
    }
  },
}));

export const TeamInviteModal = component(() => ({
  show() {
    ui().modal(this.$el).show();
  },

  copy() {
    copyToClipboard(this.$refs.link);
  },
}));

export const TeamDisbandModal = component(() => ({
  errors: [] as string[],

  show() {
    ui().modal(this.$el).show();
  },

  async disbandTeam() {
    const response = await CTFd.pages.teams.disbandTeam();

    if (response.success) {
      window.location.reload();
      return;
    }

    this.errors = response.errors[""];
  },
}));

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
