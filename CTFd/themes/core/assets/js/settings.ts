import Alpine from "alpinejs";

import CTFd from "./index.js";
import { createProfileForm } from "./components/forms/ProfileForm.js";
import { mount, register } from "./components/registry.js";
import { Tokens } from "./components/settings/Tokens.js";
import { TokensForm } from "./components/settings/TokensForm.js";

window.Alpine = Alpine;
window.CTFd = CTFd;

register(
  "SettingsForm",
  createProfileForm(data => CTFd.pages.settings.updateSettings(data)),
);
register("TokensForm", TokensForm);
register("Tokens", Tokens);

mount();
