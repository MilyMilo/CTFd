/* eslint-disable @typescript-eslint/no-explicit-any -- echarts option trees and
 * operator-defined settings have no fixed shape. */
import { extractCustomFields, serializeJSON } from "../../utils/forms";
import { apiErrors } from "../../utils/errors";
import { component } from "../magics";

/** How long a success/error banner stays up before clearing itself. */
const FEEDBACK_TIMEOUT = 3000;

/**
 * A settings form that submits only changed fields and reports success or
 * validation errors inline.
 *
 * The user settings page and the team edit modal are the same form against
 * different endpoints, so they share this implementation.
 *
 * Requires `x-ref="form"` on the `<form>` element. The previous version relied
 * on `$el`, which Alpine scopes to whichever element's expression is currently
 * evaluating — it was the component root during `init()` but the `<form>`
 * during `@submit`, and `serializeJSON` only works on a real form element.
 */
export function createProfileForm(update: (data: any) => Promise<any>) {
  return component(() => ({
    success: null as boolean | null,
    error: null as boolean | null,
    initial: null as any,
    errors: [] as string[],

    init() {
      this.initial = serializeJSON(this.$refs.form as HTMLFormElement);
    },

    async updateProfile() {
      this.success = null;
      this.error = null;
      this.errors = [];

      const data = extractCustomFields(
        serializeJSON(this.$refs.form as HTMLFormElement, this.initial, true),
      );

      const response = await update(data);

      if (response.success) {
        this.success = true;
        this.error = false;

        setTimeout(() => {
          this.success = null;
          this.error = null;
        }, FEEDBACK_TIMEOUT);
      } else {
        this.success = false;
        this.error = true;

        this.errors = apiErrors(response.errors);
      }
    },
  }));
}
