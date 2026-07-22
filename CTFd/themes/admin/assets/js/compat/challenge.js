/**
 * Registry a challenge type plugin's view.js registers into.
 *
 * Mirrors the core theme's implementation so a single view.js works in both.
 */
let current = {};

export const challenge = {
  register(handler) {
    current = handler;
  },

  reset() {
    current = {};
  },

  get current() {
    return current;
  },

  preRender(data) {
    current.data = data;
    if (current.preRender) {
      current.preRender();
    }
  },

  postRender() {
    if (current.postRender) {
      current.postRender();
    }
  },

  submit(preview) {
    return current.submit(preview);
  },
};
