import { ui } from "../../ui/adapter.js";
import { copyToClipboard } from "../../utils/clipboard.js";
import { component } from "../magics.js";

export const TeamInviteModal = component(
  () => ({
    show() {
      ui().modal(this.$el).show();
    },

    copy() {
      copyToClipboard(this.$refs.link);
    },
  }),
  { name: "TeamInviteModal", refs: ["link"] },
);
