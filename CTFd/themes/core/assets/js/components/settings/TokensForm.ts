import { serializeJSON } from "../../utils/forms";

import CTFd from "../../index";
import { ui } from "../../ui/adapter";
import { copyToClipboard } from "../../utils/clipboard";
import { component } from "../magics";

export const TokensForm = component(() => ({
  token: null as string | null,

  async generateToken() {
    const data = serializeJSON(this.$refs.form as HTMLFormElement);

    if (!data.expiration) {
      delete data.expiration;
    }

    const response = await CTFd.pages.settings.generateToken(data);
    this.token = response.data.value ?? null;

    ui().modal(this.$refs.tokenModal).show();
  },

  copyToken() {
    copyToClipboard(this.$refs.token);
  },
}));
