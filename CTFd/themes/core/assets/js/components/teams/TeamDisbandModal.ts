import CTFd from "../../index";
import { ui } from "../../ui/adapter";
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

    this.errors = response.errors[""];
  },
}));
