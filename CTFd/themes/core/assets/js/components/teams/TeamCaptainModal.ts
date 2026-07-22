import { serializeJSON } from "../../utils/forms";

import CTFd from "../../api";
import { ui } from "../../ui/adapter";
import { apiErrors } from "../../utils/errors";
import { component } from "../magics";

export const TeamCaptainModal = component(() => ({
  success: null as boolean | null,
  error: null as boolean | null,
  errors: [] as string[],

  show() {
    ui().modal(this.$el).show();
  },

  async updateCaptain() {
    const data = serializeJSON(this.$refs.form as HTMLFormElement, null, true);
    const response = await CTFd.pages.teams.updateTeamSettings(data);

    if (response.success) {
      window.location.reload();
      return;
    }

    this.success = false;
    this.error = true;
    this.errors = apiErrors(response.errors);
  },
}));
