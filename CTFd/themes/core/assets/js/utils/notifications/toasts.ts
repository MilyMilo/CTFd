import Alpine from "alpinejs";

import CTFd from "../../api";
import { ui } from "../../ui/adapter";
import { markRead } from "./read";

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
    const close = element.querySelector("[data-bs-dismiss='toast']");
    const handler = () => markRead(notification.id);
    close?.addEventListener("click", handler, { once: true });

    toast.onHidden(() => close?.removeEventListener("click", handler));
    toast.show();
  });
};
