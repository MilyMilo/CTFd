import CTFd from "@ctfdio/ctfd-js";

import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";

import times from "./theme/times";
import styles from "./theme/styles";
import highlight from "./theme/highlight";

import { registerUI } from "./ui/adapter";
import { bootstrapUI } from "./ui/bootstrap";

import alerts from "./utils/alerts";
import tooltips from "./utils/tooltips";
import collapse from "./utils/collapse";

import eventAlerts from "./utils/notifications/alerts";
import eventToasts from "./utils/notifications/toasts";
import eventRead from "./utils/notifications/read";

import { LanguageForm } from "./components/settings/LanguageForm";
import { register } from "./components/registry";

dayjs.extend(advancedFormat);
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
