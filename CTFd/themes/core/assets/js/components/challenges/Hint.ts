import CTFd from "../../api/index.js";
import { addTargetBlank } from "../../utils/html.js";
import { apiErrors } from "../../utils/errors.js";
import { component } from "../magics.js";

/** The `<details>` element a hint is rendered into. */
type HintToggleEvent = Event & { target: HTMLDetailsElement };

export const Hint = component(() => ({
  id: null as number | null,
  html: null as string | null,

  async showHint(event: HintToggleEvent) {
    if (!event.target.open) {
      return;
    }

    const response = await CTFd.pages.challenge.loadHint(this.id);

    // Hint has some kind of prerequisite or access prevention
    if (response.errors) {
      event.target.open = false;
      this.showUnlockError(response.errors);
      return;
    }

    if (response.data.content) {
      this.html = addTargetBlank(response.data.html ?? "");
      return;
    }

    if (!this.confirmUnlock()) {
      event.target.open = false;
      return;
    }

    const unlock = await CTFd.pages.challenge.loadUnlock(this.id);
    if (!unlock.success) {
      event.target.open = false;
      this.showUnlockError(unlock.errors ?? {});
      return;
    }

    const unlocked = await CTFd.pages.challenge.loadHint(this.id);
    this.html = addTargetBlank(unlocked.data.html ?? "");
  },

  /** Override in a theme to replace the browser confirm dialog. */
  confirmUnlock(): boolean {
    return confirm("Are you sure you'd like to unlock this hint?");
  },

  /** Override in a theme to render unlock failures inline instead of alerting. */
  showUnlockError(errors: Record<string, string | string[]>): void {
    alert(apiErrors(errors).join("\n"));
  },
}));
