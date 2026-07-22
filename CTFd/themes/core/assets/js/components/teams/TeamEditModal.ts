import CTFd from "../../api/index.js";
import { ui } from "../../ui/adapter.js";
import { extendComponent } from "../extend.js";
import { createProfileForm } from "../forms/ProfileForm.js";

export const TeamEditModal = extendComponent(
  createProfileForm(data => CTFd.pages.teams.updateTeamSettings(data)),
  () => ({
    show() {
      ui().modal(this.$el).show();
    },
  }),
);
