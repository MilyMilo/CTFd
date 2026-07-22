import CTFd from "../../api/index.js";
import { ui } from "../../ui/adapter.js";
import { apiErrors } from "../../utils/errors.js";
import { component } from "../magics.js";

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

    this.errors = apiErrors(response.errors);
  },
}));
