import Alpine from "alpinejs";

import CTFd from "../../api/index.js";
import { ui } from "../../ui/adapter.js";
import { markRead } from "./read.js";

export default () => {
  Alpine.store("modal", { title: "", html: "" });

  CTFd.events.onNotification(notification => {
    if (notification.type !== "alert") {
      return;
    }

    Alpine.store("modal", notification);

    const modal = ui().modal("[x-ref='modal']");
    modal.onHidden(() => markRead(notification.id));
    modal.show();
  });
};
