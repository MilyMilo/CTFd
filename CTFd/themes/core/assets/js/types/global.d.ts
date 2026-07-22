/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Alpine } from "alpinejs";

declare global {
  interface Window {
    Alpine: Alpine;
    CTFd: any;
    /** Server-rendered bootstrap payload, consumed by `CTFd.init()` in base.html. */
    init: Record<string, any>;
    scoreboardUpdateInterval?: number;
    scoreboardChartOptions?: Record<string, any>;
    teamScoreGraphChartOptions?: Record<string, any>;
    userScoreGraphChartOptions?: Record<string, any>;
    /** Set by the public profile templates. */
    USER: { id: number; name: string };
    /** OAuth state passed to the MLC setup integration. */
    STATE: string;
    TEAM: { id: number; name: string };
  }
}

export {};
