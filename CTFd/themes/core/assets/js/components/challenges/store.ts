/* eslint-disable @typescript-eslint/no-explicit-any -- the challenge payload is
 * whatever the challenge type plugin renders; it has no fixed shape. */
import Alpine from "alpinejs";

export interface ChallengeStore {
  data: Record<string, any>;
}

/** The shared store holding the currently-open challenge. */
export function challengeStore(): ChallengeStore {
  return Alpine.store("challenge") as ChallengeStore;
}
