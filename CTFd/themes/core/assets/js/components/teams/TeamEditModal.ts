import CTFd from "../../api";
import { ui } from "../../ui/adapter";
import { extendComponent } from "../extend";
import { createProfileForm } from "../forms/ProfileForm";

export const TeamEditModal = extendComponent(
  createProfileForm(data => CTFd.pages.teams.updateTeamSettings(data)),
  () => ({
    show() {
      ui().modal(this.$el).show();
    },
  }),
);
