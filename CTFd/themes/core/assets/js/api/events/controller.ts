// https://gist.github.com/neilj/4146038
// https://fastmail.blog/2012/11/26/inter-tab-communication-using-local-storage/

export class WindowController {
  id: number;
  isMaster: boolean;
  others: Record<string, number>;
  private _checkInterval: ReturnType<typeof setInterval>;
  private _pingInterval: ReturnType<typeof setInterval>;

  constructor() {
    this.id = Math.random();
    this.isMaster = false;
    this.others = {};

    window.addEventListener("storage", this);
    window.addEventListener("unload", this);

    this.broadcast("hello");

    // schedule initial check
    setTimeout(this.check.bind(this), 500);

    this._checkInterval = setInterval(this.check.bind(this), 9000);
    this._pingInterval = setInterval(this.sendPing.bind(this), 17000);
  }

  destroy(): void {
    clearInterval(this._pingInterval);
    clearInterval(this._checkInterval);

    window.removeEventListener("storage", this);
    window.removeEventListener("unload", this);

    this.broadcast("bye");
  }

  handleEvent(event: Event & { newValue?: string }) {
    if (event.type === "unload") {
      this.destroy();
      return;
    }

    if (event.type === "broadcast") {
      try {
        const data = JSON.parse(event.newValue ?? "null");
        if (data === null) return;

        if (data.id !== this.id) {
          (this as unknown as Record<string, (d: unknown) => void>)[data.type](data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  sendPing(): void {
    this.broadcast("ping");
  }

  hello(event: { id: number }): void {
    this.ping(event);

    if (event.id < this.id) {
      this.check();
      return;
    }

    this.sendPing();
  }

  ping(event: { id: number }): void {
    this.others[event.id] = Date.now();
  }

  bye(event: { id: number }): void {
    delete this.others[event.id];
    this.check();
  }

  check(): void {
    const now = Date.now();
    let takeMaster = true;

    for (const id in this.others) {
      if (this.others[id] + 23000 < now) {
        delete this.others[id];
      } else if (Number(id) < this.id) {
        takeMaster = false;
      }
    }

    if (this.isMaster !== takeMaster) {
      this.isMaster = takeMaster;
      this.masterDidChange();
    }
  }

  masterDidChange(): void {}

  broadcast(type: string, data?: Record<string, unknown>): void {
    const event = {
      id: this.id,
      type,
      ...data,
    };

    try {
      localStorage.setItem("broadcast", JSON.stringify(event));
    } catch (error) {
      console.error(error);
    }
  }
}
