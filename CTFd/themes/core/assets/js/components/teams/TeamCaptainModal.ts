import { serializeJSON } from "@ctfdio/ctfd-js/forms";

import CTFd from "../../index";
import { ui } from "../../ui/adapter";
import { component } from "../magics";

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
