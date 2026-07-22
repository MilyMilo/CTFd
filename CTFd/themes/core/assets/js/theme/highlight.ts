import lolight from "lolight";

import CTFd from "../api";

export default () => {
  const settings = CTFd.config.themeSettings;
  // default to true if config is not defined yet
  if (
    !Object.hasOwn(settings, "use_builtin_code_highlighter") ||
    settings.use_builtin_code_highlighter === true
  ) {
    lolight("pre code");
  }
};
