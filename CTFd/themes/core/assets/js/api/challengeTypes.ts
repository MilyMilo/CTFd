/* eslint-disable @typescript-eslint/no-explicit-any -- a challenge type's data
 * is whatever its plugin defines. */

/**
 * The interface a challenge type plugin implements in its `view.js`.
 *
 * Plugin scripts are loaded as classic <script> tags, not modules, so they
 * register through the global `CTFd.challenge` rather than by exporting.
 */
export interface ChallengeTypeHandler {
  /** Set by the theme before preRender(), so hooks can read the challenge. */
  data?: any;
  /** Runs after the challenge data is attached, before the view is inserted. */
  preRender?(): void;
  /** Runs after the view has been inserted into the DOM. */
  postRender?(): void;
  /** Submit the challenge. Only used by the admin preview; themes submit directly. */
  submit?(preview?: boolean): Promise<unknown>;
}

let current: ChallengeTypeHandler = {};

export const challenge = {
  /**
   * Called by a plugin's view.js to install its hooks. Replaces any previously
   * registered handler, so each challenge load starts from a clean slate.
   */
  register(handler: ChallengeTypeHandler): void {
    current = handler;
  },

  /** Discard the registered handler before loading a new challenge type. */
  reset(): void {
    current = {};
  },

  /** The handler registered by the most recently loaded view.js. */
  get current(): ChallengeTypeHandler {
    return current;
  },

  /** Attach challenge data and run the plugin's pre-render hook. */
  preRender(data: any): void {
    current.data = data;
    current.preRender?.();
  },

  /** Run the plugin's post-render hook. */
  postRender(): void {
    current.postRender?.();
  },
};
