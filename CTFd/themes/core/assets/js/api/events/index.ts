import { config } from "../config";
import { apiFetch } from "../fetch";
import { WindowController } from "./controller";
import { read, unread } from "./counter";

export interface Notification {
  id: number;
  type: "toast" | "alert" | "background";
  title: string;
  content: string;
  html: string;
  sound?: boolean;
}

type NotificationHandler = (notification: Notification) => void;
type CountHandler = (count: number) => void;

const notificationHandlers = new Set<NotificationHandler>();
const countHandlers = new Set<CountHandler>();

let source: EventSource | null = null;
let sound: HTMLAudioElement | null = null;

const controller = new WindowController();

function emitCount(count: number): void {
  countHandlers.forEach(handler => handler(count));
}

function emitNotification(notification: Notification): void {
  notificationHandlers.forEach(handler => handler(notification));
}

/** Recompute the unread count, share it across tabs, and publish it locally. */
function publishCount(): void {
  const count = unread.getAll().length;
  controller.broadcast("counter", { count });
  emitCount(count);
}

function connect(): void {
  source = new EventSource(`${config.urlRoot}/events`);

  source.addEventListener("notification", (event: MessageEvent) => {
    const notification: Notification = JSON.parse(event.data);

    controller.broadcast(
      "notification",
      notification as unknown as Record<string, unknown>,
    );
    unread.add(notification.id);
    publishCount();
    emitNotification(notification);

    // Only the master tab plays audio, so N tabs do not make N sounds.
    if (notification.sound) {
      sound?.play().catch(() => {
        // Autoplay is commonly blocked until the user interacts with the page.
      });
    }
  });
}

function disconnect(): void {
  source?.close();
  source = null;
}

// One tab owns the EventSource; the rest receive rebroadcasts via localStorage.
const tabEvents = controller as unknown as Record<string, unknown>;
tabEvents.alert = (data: Notification) => emitNotification(data);
tabEvents.toast = (data: Notification) => emitNotification(data);
tabEvents.background = (data: Notification) => emitNotification(data);
tabEvents.notification = (data: Notification) => emitNotification(data);
tabEvents.counter = (data: { count: number }) => emitCount(data.count);
controller.masterDidChange = function masterDidChange(this: WindowController) {
  if (this.isMaster) {
    connect();
  } else {
    disconnect();
  }
};

export const events = {
  controller,
  counter: { read, unread },

  /** Subscribe to notifications pushed from the server or another tab. */
  onNotification(handler: NotificationHandler): void {
    notificationHandlers.add(handler);
  },

  /** Subscribe to unread-count changes. */
  onCount(handler: CountHandler): void {
    countHandlers.add(handler);
  },

  async init(sounds: string[] = []): Promise<void> {
    if (sounds.length > 0) {
      sound = new Audio(config.urlRoot + sounds[0]);
    }

    // A HEAD request returns the unread count without transferring the bodies.
    const response = await apiFetch(
      `/api/v1/notifications?since_id=${read.getLast()}`,
      { method: "HEAD" },
    );

    const count = response.headers.get("result-count");
    if (count) {
      controller.broadcast("counter", { count: Number(count) });
      emitCount(Number(count));
    }
  },
};
