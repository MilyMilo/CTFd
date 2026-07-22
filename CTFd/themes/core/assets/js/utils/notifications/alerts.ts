import Alpine from "alpinejs";

import CTFd from "../../index";
import { ui } from "../../ui/adapter";

export default () => {
  Alpine.store("modal", { title: "", html: "" });

  CTFd._functions.events.eventAlert = (data: { id: number }) => {
    Alpine.store("modal", data);

    const modal = ui().modal("[x-ref='modal']");
    modal.onHidden(() => CTFd._functions.events.eventRead(data.id));
    modal.show();
  };
};
