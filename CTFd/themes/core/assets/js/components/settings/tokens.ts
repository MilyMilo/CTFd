/* eslint-disable @typescript-eslint/no-explicit-any -- API payloads are untyped
 * until ctfd-js is absorbed. */
import { serializeJSON } from "@ctfdio/ctfd-js/forms";

import CTFd from "../../index";
import { ui } from "../../ui/adapter";
import { copyToClipboard } from "../../utils/clipboard";
import { component } from "../magics";

export const TokensForm = component(() => ({
  token: null as string | null,

  async generateToken() {
    const data = serializeJSON(this.$refs.form);

    if (!data.expiration) {
      delete data.expiration;
    }

    const response = await CTFd.pages.settings.generateToken(data);
    this.token = response.data.value;

    ui().modal(this.$refs.tokenModal).show();
  },

  copyToken() {
    copyToClipboard(this.$refs.token);
  },
}));

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
