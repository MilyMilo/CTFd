import CTFd from "../../api/index.js";
import { ui } from "../../ui/adapter.js";
import { component } from "../magics.js";

export const Tokens = component(() => ({
  selectedTokenId: null as number | null,

  async deleteTokenModal(tokenId: number) {
    this.selectedTokenId = tokenId;
    ui().modal(this.$refs.confirmModal).show();
  },

  async deleteSelectedToken() {
    await CTFd.pages.settings.deleteToken(this.selectedTokenId);
    this.$refs[`token-${this.selectedTokenId}`]?.remove();
  },
}));
