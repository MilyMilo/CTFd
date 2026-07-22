import Alpine from "alpinejs";

import CTFd from "./api/index.js";

import times from "./theme/times.js";
import styles from "./theme/styles.js";
import highlight from "./theme/highlight.js";

import { registerUI } from "./ui/adapter.js";
import { bootstrapUI } from "./ui/bootstrap.js";

import alerts from "./utils/alerts.js";
import tooltips from "./utils/tooltips.js";
import collapse from "./utils/collapse.js";

import eventAlerts from "./utils/notifications/alerts.js";
import eventToasts from "./utils/notifications/toasts.js";
import eventRead from "./utils/notifications/read.js";

import { LanguageForm } from "./components/settings/LanguageForm.js";
import { register } from "./components/registry.js";

// Plugin view.js scripts are classic scripts and reach these off window.
window.CTFd = CTFd;
window.Alpine = Alpine;

CTFd.init(window.init);

// Themes replace this by calling registerUI() with their own adapter.
registerUI(bootstrapUI);

// Present in the navbar on every page, so registered for all entrypoints.
register("LanguageForm", LanguageForm);

(() => {
  styles();
  times();
  highlight();

  alerts();
  tooltips();
  collapse();

  eventRead();
  eventAlerts();
  eventToasts();
})();

export default CTFd;
