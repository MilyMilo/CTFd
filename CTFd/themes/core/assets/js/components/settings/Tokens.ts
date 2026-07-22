import CTFd from "../../index";
import { ui } from "../../ui/adapter";
import { component } from "../magics";

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
