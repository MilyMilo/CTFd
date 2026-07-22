import Alpine from "alpinejs";

import CTFd from "../../api/index.js";
import { ui } from "../../ui/adapter.js";
import { markRead } from "./read.js";

export default () => {
  Alpine.store("toast", { title: "", html: "" });

  CTFd.events.onNotification(notification => {
    if (notification.type !== "toast") {
      return;
    }

    Alpine.store("toast", notification);

    const element = document.querySelector("[x-ref='toast']");
    if (element === null) {
      return;
    }

    const toast = ui().toast(element);

    // Dismissing counts as reading it; letting it time out does not.
    toast.onDismissed(() => markRead(notification.id));
    toast.show();
  });
};
