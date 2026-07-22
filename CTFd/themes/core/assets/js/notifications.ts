import Alpine from "alpinejs";

import CTFd from "./index";
import { mount } from "./components/registry";

window.CTFd = CTFd;
window.Alpine = Alpine;

// Get unread notifications from server and mark them as read
const lastId = CTFd.events.counter.read.getLast();
CTFd.fetch(`/api/v1/notifications?since_id=${lastId}`)
  .then((response: Response) => response.json())
  .then((response: { data: { id: number }[] }) => {
    const read = CTFd.events.counter.read.getAll();
    response.data.forEach((n: { id: number }) => read.push(n.id));
    CTFd.events.counter.read.setAll(read);

    CTFd.events.counter.unread.readAll();

    // Broadcast our new count (which should be 0)
    const count = CTFd.events.counter.unread.getAll().length;
    CTFd.events.controller.broadcast("counter", { count });
    Alpine.store("unreadCount", count);
  });

mount();
