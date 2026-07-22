import Alpine from "alpinejs";

import CTFd from "../../index";
import { ui } from "../../ui/adapter";

export default () => {
  Alpine.store("toast", { title: "", html: "" });

  CTFd._functions.events.eventToast = (data: { id: number }) => {
    Alpine.store("toast", data);

    const element = document.querySelector("[x-ref='toast']");
    if (element === null) {
      return;
    }

    const toast = ui().toast(element);

    // Dismissing counts as reading it; letting it time out does not.
    const close = element.querySelector("[data-bs-dismiss='toast']");
    const handler = () => CTFd._functions.events.eventRead(data.id);
    close?.addEventListener("click", handler, { once: true });

    toast.onHidden(() => close?.removeEventListener("click", handler));
    toast.show();
  };
};
