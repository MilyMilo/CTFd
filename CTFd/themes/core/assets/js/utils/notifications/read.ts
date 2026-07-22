import Alpine from "alpinejs";

import CTFd from "../../api";

export default () => {
  CTFd.events.onCount(count => Alpine.store("unreadCount", count));

  document.addEventListener("alpine:init", () => {
    Alpine.store("unreadCount", CTFd.events.counter.unread.getAll().length);
  });
};

/** Mark a notification read and republish the count to every tab. */
export function markRead(notificationId: number): void {
  CTFd.events.counter.read.add(notificationId);
  const count = CTFd.events.counter.unread.getAll().length;
  CTFd.events.controller.broadcast("counter", { count });
  Alpine.store("unreadCount", count);
}
