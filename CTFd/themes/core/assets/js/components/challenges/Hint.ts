import CTFd from "../../index";
import { addTargetBlank } from "../../utils/html";
import { component } from "../magics";

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
      CTFd._functions.challenge.displayUnlockError(response);
      return;
    }

    if (response.data.content) {
      this.html = addTargetBlank(response.data.html);
      return;
    }

    const confirmed = await CTFd.pages.challenge.displayUnlock(this.id);
    if (!confirmed) {
      event.target.open = false;
      return;
    }

    const unlock = await CTFd.pages.challenge.loadUnlock(this.id);
    if (!unlock.success) {
      event.target.open = false;
      CTFd._functions.challenge.displayUnlockError(unlock);
      return;
    }

    const unlocked = await CTFd.pages.challenge.loadHint(this.id);
    this.html = addTargetBlank(unlocked.data.html);
  },
}));
