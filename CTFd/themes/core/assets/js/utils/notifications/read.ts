import Alpine from "alpinejs";

import CTFd from "../../index";

export default () => {
  CTFd._functions.events.eventCount = (count: number) => {
    Alpine.store("unread_count", count);
  };

  CTFd._functions.events.eventRead = (eventId: number) => {
    CTFd.events.counter.read.add(eventId);
    const count = CTFd.events.counter.unread.getAll().length;
    CTFd.events.controller.broadcast("counter", { count });
    Alpine.store("unread_count", count);
  };

  document.addEventListener("alpine:init", () => {
    CTFd._functions.events.eventCount(CTFd.events.counter.unread.getAll().length);
  });
};
