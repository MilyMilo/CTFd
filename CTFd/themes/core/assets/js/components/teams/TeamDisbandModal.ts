import CTFd from "../../api";
import { ui } from "../../ui/adapter";
import { apiErrors } from "../../utils/errors";
import { component } from "../magics";

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
