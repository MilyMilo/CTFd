import { ui } from "../../ui/adapter";
import { copyToClipboard } from "../../utils/clipboard";
import { component } from "../magics";

export const TeamInviteModal = component(() => ({
  show() {
    ui().modal(this.$el).show();
  },

  copy() {
    copyToClipboard(this.$refs.link);
  },
}));
