import { serializeJSON } from "../../utils/forms.js";

import CTFd from "../../api/index.js";
import { ui } from "../../ui/adapter.js";
import { copyToClipboard } from "../../utils/clipboard.js";
import { component } from "../magics.js";

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
