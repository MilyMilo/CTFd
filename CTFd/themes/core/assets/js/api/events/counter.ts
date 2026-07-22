/** Notification read/unread bookkeeping, persisted per browser in localStorage. */

function getStorage(key: string): number[] {
  return JSON.parse(localStorage.getItem(`CTFd:${key}`) ?? "null") || [];
}

function setStorage(key: string, value: number[]): void {
  localStorage.setItem(`CTFd:${key}`, JSON.stringify(value));
}

export const read = {
  getAll: () => getStorage("read_notifications"),
  setAll: (notifications: number[]) => setStorage("read_notifications", notifications),

  add(notificationId: number): number[] {
    const all = [...read.getAll(), notificationId];
    read.setAll(all);
    unread.remove(notificationId);
    return all;
  },

  getLast(): number {
    const all = read.getAll();
    return all.length === 0 ? 0 : Math.max(...all);
  },
};

export const unread = {
  getAll: () => getStorage("unread_notifications"),
  setAll: (notifications: number[]) =>
    setStorage("unread_notifications", notifications),

  add(notificationId: number): number[] {
    const all = [...unread.getAll(), notificationId];
    unread.setAll(all);
    return all;
  },

  remove(notificationId: number): void {
    unread.setAll(unread.getAll().filter(n => n !== notificationId));
  },

  /** Move every unread notification into the read set. */
  readAll(): void {
    read.setAll(read.getAll().concat(unread.getAll()));
    unread.setAll([]);
  },
};
